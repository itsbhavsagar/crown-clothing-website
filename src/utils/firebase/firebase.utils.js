import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, getDocFromCache } from 'firebase/firestore';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentsFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);

   console.log(userDocRef);
}