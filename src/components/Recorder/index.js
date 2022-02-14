import './style.less'
import 'react-h5-audio-player/lib/styles.less'
import { useEffect, useState, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import useMediaRecorder from "../../hooks/useMediaRecorder";
import {getRecordingsAction, updateRecordingAction, removeRecordingAction} from '../../redux/state/actions';
import {stateStatus} from '../../redux/state/types';
import RecordingList from '../RecordingList';
import Button from '../Button';
import CircularButton from '../CircularButton';
import AudioPlayer from 'react-h5-audio-player';
import Popup from '../Popup';
import { PopupType } from '../Popup/popupConstants'

/**
 * Reducer component
 * @param {MediaStream} stream
 * @returns 
 */
const Recorder = ({ stream }) => {
  const dispatch = useDispatch(),
    recordingsStore = useSelector(store => store.soundRecordingReducer),
    { recorder, isRecording } = useMediaRecorder(stream),
    [ selectedRecording, setSelectedRecording] = useState(null),
    [isPlaying, setIsPlaying] = useState(false),
    [advice, setAdvice] = useState(""),
    audioPlayer = useRef(),
    [popupConfiguration, setPopupConfiguration] = useState({
      visible: false,
      popupType: null,
      onConfirm: null,
    });
  
  // Hook to control the store status, depending of that, request the recordings or set the selected recording
  useEffect(() => {
    if (recordingsStore.status === stateStatus.ZERO) {
      dispatch(getRecordingsAction());
    } else if (recordingsStore.status === stateStatus.SUCCESS) {
      const recordings = recordingsStore.recordings;
      if (recordings?.length) {
        setSelectedRecording(recordings[recordings.length - 1]);
      }
    }
  }, [recordingsStore.status, recordingsStore.recordings, dispatch]);

  const toggleRecording = () => {
    if (!isRecording) {
      recorder.start(1000);
    } else {
      recorder.stop();
    }
  }

  const togglePlayPause = () => {
    if (selectedRecording) {
      const prevStatus = isPlaying;
      setIsPlaying(!prevStatus);
      if (!prevStatus) {
        audioPlayer?.current?.audio?.current?.play();
      } else {
        audioPlayer?.current?.audio?.current?.pause();
      }
    }
  }

  const editRecordingName = (newName) => {
    if (selectedRecording) {
      if (newName === "") {
        setAdvice("Please insert a name");
      } else {
        setAdvice("");
        selectedRecording.name = newName;
        dispatch(updateRecordingAction(selectedRecording));
        hidePopup();
      }
    }
  }

  const deleteRecording = () => {
    if (selectedRecording) {
      dispatch(removeRecordingAction(selectedRecording.id));
      const recordings = recordingsStore.recordings;
      if (recordings.length) {
        setSelectedRecording(recordings[0]);
      } else {
        // The selectedRecording is set to null to prevent it from being used after deletion.
        setSelectedRecording(null);
      }
      hidePopup();
    }
  }

  const hidePopup = () => {
    setPopupConfiguration({
      visible: false
    });
  }

  const onClickDeleteButton = () => {
    if (selectedRecording) {
      // It shows the edit popup
      setPopupConfiguration({
        visible: true,
        popupType: PopupType.DELETE_POPUP,
        onConfirm: deleteRecording,
      });
    }
  }

  const onClickEditButton = () => {
    if (selectedRecording) {
      // It shows the edit popup
      setPopupConfiguration({
        visible: true,
        popupType: PopupType.EDIT_POPUP,
        onConfirm: editRecordingName,
      });
    }
  }

  const onSelectRecording = (recording) => {
    // If the recording selected is clicked second time, will be reproduced.
    if (recording.id !== selectedRecording.id) {
      setSelectedRecording(recording);
    } else {
      togglePlayPause();
    }
  }

  return (
    <>
      {
        popupConfiguration.visible &&
          <Popup
            popupType= {popupConfiguration.popupType}
            selectedRecording= {selectedRecording}
            onConfirm= {popupConfiguration.onConfirm}
            adviceMessage= {advice}
            onDeny= {hidePopup}
          />
      }
      <section className='buttons-section'>
        <Button buttonText="My list"/>
        <CircularButton iconName="settings" iconSize="small"/>
      </section>
      <RecordingList
        recordings= {recordingsStore.recordings}
        selectedRecording= {selectedRecording}
        storeStatus= {recordingsStore.status}
        onSelectRecordingHandler= {onSelectRecording}
      />
      <section className='big-buttons-section'>
        <div className='button-container'>
          <span>Send</span>
          <CircularButton iconName="plane" iconSize="medium"/>
        </div>
        <div className='button-container'>
          <span className={isRecording ? "is-recording" : ""}>Rec</span>
          <CircularButton
            iconName="recording"
            iconSize="big"
            isRecording={isRecording}
            onClick={toggleRecording}
          />
        </div>
        <div className='button-container'>
          <span>Delete</span>
          <CircularButton
            iconName="trash"
            iconSize="medium"
            onClick={onClickDeleteButton}
          />
        </div>
      </section>
      {
        selectedRecording?.stream &&
          <section className='playbar-section'>
            <AudioPlayer
              ref={audioPlayer}
              src={selectedRecording?.stream}
              preload="metadata"
              showJumpControls={false}
              showDownloadProgress={false}
              autoPlayAfterSrcChange={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </section>
      }
      <section className='buttons-section last-section'>
        <Button buttonText="Save" buttonSize="large"/>
        <Button
          buttonText={isPlaying ? "Pause" : "Play"}
          buttonSize="large"
          onClick={() => togglePlayPause()}
        />
        <Button
          buttonText="Edit"
          buttonSize="large"
          onClick={onClickEditButton}
        />
      </section>
    </>
  )
}

Recorder.propTypes = {
  stream: PropTypes.object
};

export default Recorder
