import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDmKgXmrzQ-flTUPfA9gf36NVPCE8UyyDg',

  authDomain: 'crown-clothing-db-7f07d.firebaseapp.com',

  projectId: 'crown-clothing-db-7f07d',

  storageBucket: 'crown-clothing-db-7f07d.appspot.com',

  messagingSenderId: '48787567437',

  appId: '1:48787567437:web:c1cfcbf8dcf3a2bb58fd04',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () =>
  signInWithGoogleRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentsFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

  // if user data exist

  // return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);

/**
 * {
 * next: callback
 * error: errorCallback,
 * complete: completeCallback
 * }
 */
