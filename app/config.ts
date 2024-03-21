// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP8Dr5XUOz9TfQwWsJvqNe3bLkVt_vzAo",
  authDomain: "quillhub-5bbce.firebaseapp.com",
  projectId: "quillhub-5bbce",
  storageBucket: "quillhub-5bbce.appspot.com",
  messagingSenderId: "130947659604",
  appId: "1:130947659604:web:56e7904a50f87b85d07ac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)