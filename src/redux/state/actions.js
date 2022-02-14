import {RecordingReducerType} from './types';
import {getSavedRecordings, saveNewRecording, updateRecording, removeRecording}
  from '../../firebase/firebaseOperations';

/*
  Actions are used by the front to save or restore data from store
*/

const getRecordingsAction = () => async (dispatch) => {
  try {
    const recordings = await getSavedRecordings();
    dispatch({
      type: RecordingReducerType.GET_RECORDINGS_SUCCESS,
      payload: {
        recordings,
      }
    });
  } catch (error) {
    dispatchError(dispatch, error);
  }
}

const createRecordingAction = (newRecording) => async (dispatch) => {
  try {
    await saveNewRecording(newRecording);
    dispatch({
      type: RecordingReducerType.CREATE_RECORDING_SUCCESS,
      payload: {
        newRecording,
      }
    });
  } catch (error) {
    dispatchError(dispatch, error);
  }
}

const updateRecordingAction = (recordingUpdated) => async (dispatch) => {
  try {
    await updateRecording(recordingUpdated);
    dispatch({
      type: RecordingReducerType.UPDATE_RECORDING_SUCCESS,
      payload: {
        recordingUpdated,
      }
    });
  } catch (error) {
    dispatchError(dispatch, error);
  }
}

const removeRecordingAction = (recordingId) => async (dispatch) => {
  try {
    await removeRecording(recordingId);
    dispatch({
      type: RecordingReducerType.REMOVE_RECORDING_SUCCESS,
      payload: {
        recordingId,
      }
    });
  } catch (error) {
    dispatchError(dispatch, error);
  }
}

const dispatchError = (dispatch, error) => {
  dispatch({
    type: RecordingReducerType.RECORDING_OPERATION_FAILED,
    payload: {
      error: error,
    }
  });
}

export {
  getRecordingsAction,
  createRecordingAction,
  updateRecordingAction,
  removeRecordingAction,
}