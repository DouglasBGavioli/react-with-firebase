import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8q4cY25XMlutREmOM9go0DaPfoQIHgOU",
    authDomain: "eventos-9ee8f.firebaseapp.com",
    projectId: "eventos-9ee8f",
    storageBucket: "eventos-9ee8f.appspot.com",
    messagingSenderId: "511682090986",
    appId: "1:511682090986:web:ac3f3f06bc81b023d28493",
};
const app = initializeApp(firebaseConfig);
const firebase = getAuth(app);
const storage = getStorage(app);

export { app, firebase, storage };
