import {RecordingReducerType, stateStatus} from './types';

const initialData = {
  recordings: [],
  status: stateStatus.ZERO,
  error: null,
}

// Map that identify which function it calls when reducer receive a dispatch action
const ACTION_TYPE_FUNCTION_MAP = {
  [RecordingReducerType.GET_RECORDINGS_SUCCESS]: onGetRecordingsSuccess,
  [RecordingReducerType.CREATE_RECORDING_SUCCESS]: onCreateRecordingSuccess,
  [RecordingReducerType.UPDATE_RECORDING_SUCCESS]: onUpdateRecordingSuccess,
  [RecordingReducerType.REMOVE_RECORDING_SUCCESS]: onRemoveRecordingSuccess,
  [RecordingReducerType.RECORDING_OPERATION_FAILED]: onRecordingOperationFailed,
}

function onGetRecordingsSuccess(state, action) {
  return {
    ...state,
    recordings: action.payload.recordings,
    status: stateStatus.SUCCESS,
  };
}

function onCreateRecordingSuccess(state, action) {
  return {
    ...state,
    recordings: [...state.recordings, action.payload.newRecording],
    status: stateStatus.SUCCESS,
  };
}

function onUpdateRecordingSuccess(state, action) {
  const recordings = state.recordings,
    recordingUpdated = action.payload.recordingUpdated,
    indexOfRecordingtoUpdate = recordings.findIndex((recording) => recording.id === recordingUpdated.id);
  recordings[indexOfRecordingtoUpdate] = recordingUpdated;
  return {
    ...state,
    recordings,
    status: stateStatus.SUCCESS,
  };
}

function onRemoveRecordingSuccess(state, action) {
  const currentRecordings = state.recordings,
    recordingIdToDelete = action.payload.recordingId,
    recordings = currentRecordings.filter((recording) => recording.id !== recordingIdToDelete);
  return {
    ...state,
    recordings,
    status: stateStatus.SUCCESS,
  };
}

function onRecordingOperationFailed(state, action) {
  return {
    ...state,
    error: action.payload.error,
    status: stateStatus.FAILED,
  }
}

function soundRecordingReducer(state = initialData, action) {
  const fn = ACTION_TYPE_FUNCTION_MAP[action.type];
  return (fn)
    ? fn(state, action)
    : state;
}

export {
  soundRecordingReducer,
}
