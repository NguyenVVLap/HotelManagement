import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCfxyekcsmQZJdfuMRZc-98swvZOQlQXHM",
    authDomain: "hotel-manager-1539e.firebaseapp.com",
    projectId: "hotel-manager-1539e",
    storageBucket: "hotel-manager-1539e.appspot.com",
    messagingSenderId: "124974073673",
    appId: "1:124974073673:web:46cac670fa76cc6d93bc98",
    measurementId: "G-RT0L2YZ0NV"
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);