// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'
// import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_BOYMCVHOlgFxt3UfyXzt1b7GunuBcGs",
  authDomain: "tutor-b4ce4.firebaseapp.com",
  projectId: "tutor-b4ce4",
  storageBucket: "tutor-b4ce4.appspot.com",
  messagingSenderId: "1045380698878",
  appId: "1:1045380698878:web:4a7590b1aa18aed8078baf",
  measurementId: "G-JS9L21SXLR"
};
// console.log('Hi =')
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)
// const storage = getStorage(app)
// const auth = getAuth(app);

// export {db, storage, app, auth}
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { firebase, auth };