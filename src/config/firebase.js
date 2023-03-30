// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDYX8EnC4OyrrKo3waF8rq9gp0EnIbDy1A',
  authDomain: 'agent-smith-chatbot-da9fa.firebaseapp.com',
  projectId: 'agent-smith-chatbot-da9fa',
  storageBucket: 'agent-smith-chatbot-da9fa.appspot.com',
  messagingSenderId: '374594829981',
  appId: '1:374594829981:web:4189b80c51511acb221e74',
  measurementId: 'G-WQG5X29K1Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
