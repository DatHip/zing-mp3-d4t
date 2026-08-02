import { getAuth } from "firebase/auth"
import { firebaseApp } from "./app"

// null when REACT_APP_FIREBASE_* env vars are missing — callers already guard.
export const auth = firebaseApp ? getAuth(firebaseApp) : null
