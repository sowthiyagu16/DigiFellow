// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCkheY8ODqT2UcDg1cW3sx-jTeGJ8xiu84",
    authDomain: "digifellow-615a6.firebaseapp.com",
    projectId: "digifellow-615a6",
    storageBucket: "digifellow-615a6.firebasestorage.app",
    messagingSenderId: "590190294183",
    appId: "1:590190294183:web:07d86502ca64f6e43cd782",
    measurementId: "G-7F2WJ5BFGS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };