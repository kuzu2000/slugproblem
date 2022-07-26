// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZ1faJZTHhmuyiDi-cR6kRigWGYlsOQJQ',
  authDomain: 'fir-v9-95061.firebaseapp.com',
  projectId: 'fir-v9-95061',
  storageBucket: 'fir-v9-95061.appspot.com',
  messagingSenderId: '846434582860',
  appId: '1:846434582860:web:7136e173b08be1bbba4fe9',
};
//<------ Yo! hide your credentials, but if you do it to let me testing, thank you :)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export { db, auth };
