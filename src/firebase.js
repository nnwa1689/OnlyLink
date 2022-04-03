import { initializeApp, getApp, _apps } from "firebase/app";
import { getFirestore, } from "firebase/firestore"; 
import fbc from './firebaseconfig';

try {
    initializeApp(fbc);
} catch(e) {

}

export const db = getFirestore();