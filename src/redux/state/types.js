// Types to identify dispatch action
const RecordingReducerType = {
  GET_RECORDINGS_SUCCESS: 'GET_RECORDINGS_SUCCESS',
  CREATE_RECORDING_SUCCESS: 'CREATE_RECORDING_SUCCESS',
  UPDATE_RECORDING_SUCCESS: 'UPDATE_RECORDING_SUCCESS',
  REMOVE_RECORDING_SUCCESS: 'REMOVE_RECORDING_SUCCESS',
  RECORDING_OPERATION_FAILED: 'RECORDING_OPERATION_FAILED',
}

// Store state status
const stateStatus = {
  ZERO: 'zero',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export {
  RecordingReducerType,
  stateStatus,
}
