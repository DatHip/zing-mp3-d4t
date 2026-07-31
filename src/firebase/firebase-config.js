import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "REDACTED_FIREBASE_KEY",
   authDomain: "d4tmp3-reactjs-7195d.firebaseapp.com",
   projectId: "d4tmp3-reactjs-7195d",
   storageBucket: "d4tmp3-reactjs-7195d.appspot.com",
   messagingSenderId: "278324459087",
   appId: "REDACTED_APP_ID",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const database = getFirestore(app)
export const auth = getAuth(app)
