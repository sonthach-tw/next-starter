import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCi5HSFwmj4AWZYYIlxsEFfwmWQfRu926o",
    authDomain: "dogwood-dryad-328313.firebaseapp.com",
    databaseURL: "https://dogwood-dryad-328313-default-rtdb.firebaseio.com",
    projectId: "dogwood-dryad-328313",
    storageBucket: "dogwood-dryad-328313.appspot.com",
    messagingSenderId: "536996642510",
    appId: "1:536996642510:web:71a2b48e4455a41dbb1a9f",
    measurementId: "G-B9SVE8Y20L"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };