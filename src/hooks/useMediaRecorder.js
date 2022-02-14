import {useMemo, useState} from "react";
import { useDispatch } from "react-redux";
import {createRecordingAction} from '../redux/state/actions';

/**
 * This media recorder hook keeps all the logic needed to perform an audio recording decoupling it from any component
 * so it can be reused if needed.
 *
 * This way, when it comes to testing you only need to mock this `recorder` hook and its returned values.
 *
 * The hook in use would look like this:
 * const { recording, isRecording } = useMediaRecorded(stream);
 *
 *
 * @param {Object} stream
 * @returns {{
 *  recorder: { start: Function, stop: Function },
 *  isRecording: boolean,
 * }}
 *
 */
export default function useMediaRecorder(stream) {
  const [isRecording, setIsRecording] = useState(false),
    [chunks, setChunks] = useState([]),
    recorder = useMemo(() => new MediaRecorder(stream), [stream]),
    dispatch = useDispatch();

  const handleStart = () => {
    setIsRecording(true);
  }

  const handleStop = async () => {
    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' }),
      audioURL = window.URL.createObjectURL(blob),
      now = new Date();

    const newRecording = {
      stream: audioURL,
      name: now.toISOString().split('.')[0].split('T').join(' '),
      id: `id${window.performance.now().toString()}`
    };
    dispatch(createRecordingAction(newRecording));
    setChunks([]);
    setIsRecording(false);
  }

  const handleDataAvailable = (e) => {
    setChunks(currentChunks => [...currentChunks, e.data]);
  }

  recorder.onstop = handleStop;
  recorder.onstart = handleStart;
  recorder.ondataavailable = handleDataAvailable;

  return {
    recorder,
    isRecording,
  }
}
