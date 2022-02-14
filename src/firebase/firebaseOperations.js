import {db} from './firebase';
import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';

/**
 * Function that request all recordings to firebase database
 * @returns array of recordings
 */
const getSavedRecordings = async () => {
  try {
    const data = await getDocs(collection(db, "soundrecordings"));
    let arrayData = await data.docs.map((doc) => ({...doc.data()}));
    return arrayData;
  } catch(error) {
    console.log("FIREBASE ERROR: ", error);
  }
}

/**
 * Function that save new recording in firebase database
 * @param {Array} recording 
 * @returns 
 */
const saveNewRecording = async (recording) => {
  try {
    return await setDoc(doc(db, "soundrecordings", recording.id), recording);
  } catch(error) {
    console.log("FIREBASE ERROR: ", error);
  }
}


/**
 * Function that update a recording in firebase database
 * @param {Object} recording 
 * @returns 
 */
const updateRecording = async (recording) => {
  try {
    return await setDoc(doc(db, "soundrecordings", recording.id), recording);
  } catch(error) {
    console.log("FIREBASE ERROR: ", error);
  }
}

/**
 * Function that remove a recording in firebase database
 * @param {String} recordingId 
 * @returns 
 */
const removeRecording = async (recordingId) => {
  try {
    return await deleteDoc(doc(db, "soundrecordings", recordingId));
  } catch (error) {
    console.log("FIREBASE ERROR: ", error);
  }
}

export {
  getSavedRecordings,
  saveNewRecording,
  updateRecording,
  removeRecording,
}