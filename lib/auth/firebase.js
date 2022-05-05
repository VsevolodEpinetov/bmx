import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1veOGsl_QDJsoHEUEbXRAcRfaQw3LY5k",
  authDomain: "bikes-559ff.firebaseapp.com",
  projectId: "bikes-559ff",
  storageBucket: "bikes-559ff.appspot.com",
  messagingSenderId: "756165415197",
  appId: "1:756165415197:web:7cc6be01210a5e317091f4"
};

  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername (username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON (doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  }
}