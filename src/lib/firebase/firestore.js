import { getFirestore } from "firebase/firestore"
import { firebaseApp } from "./app"

// null when REACT_APP_FIREBASE_* env vars are missing — callers already guard.
export const database = firebaseApp ? getFirestore(firebaseApp) : null
