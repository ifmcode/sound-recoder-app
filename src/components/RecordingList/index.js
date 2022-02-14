import './style.less'
import React from 'react';
import Icon from '../Icon';
import {stateStatus} from '../../redux/state/types';

/**
 * Recording list component that show a default phrase or recordings name displayed as a list
 * @param {*} recordings 
 * @param {*} selectedRecording // This recording has a special style to show which recordint is selected
 * @param {*} storeStatus 
 * @param {*} onSelectRecordingHandler //Funtion that it call when a recording is clicked
 * @returns 
 */
const RecordingList = ({recordings, selectedRecording, storeStatus, onSelectRecordingHandler}) => {

  const getDefaultPhrase = () => {
    // Error case
    let defaultPhrase = <p className='default-phrase-recording-list'>- An error retrieving data has ocurred -</p>
    if (storeStatus === stateStatus.ZERO) {
      defaultPhrase = <p className='default-phrase-recording-list'>- Loading recordings -</p>
    } else if (storeStatus === stateStatus.SUCCESS) {
      defaultPhrase = <p className='default-phrase-recording-list'>- There are not recordings -</p>
    }
    return defaultPhrase;
  }

  const renderRecordingList = () => {
    let ret = getDefaultPhrase(); 
    if (recordings && recordings.length && selectedRecording) {
      ret = <ul id='recording-list-wrapper'>
        {
          recordings.map((recording) => {
            const isSelected = selectedRecording.id === recording.id;
            return <li
              key={recording.id}
              onClick={() => onSelectRecordingHandler(recording)}
              className={ isSelected
                ? 'recording-list-item selected-recording'
                : 'recording-list-item'}>
                {
                  isSelected &&
                    <Icon iconName="indicator"/>
                }
                {recording.name}
            </li>
          })
        }
      </ul>
    }
    return ret;
  }
  
  return (
    <div id="recording-list-container">
      {renderRecordingList()}
    </div>
  );
};

export default RecordingList;
