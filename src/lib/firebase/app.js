import { initializeApp } from "firebase/app"

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

// Guard: if env vars are missing (e.g. Vercel deploy without env set),
// don't blow up the whole React tree — degrade to a no-op auth/db so the
// app still renders (login/like features become inert, but user can browse).
let firebaseApp = null

if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId) {
   try {
      firebaseApp = initializeApp(firebaseConfig)
   } catch (err) {
      console.error("[firebase] initialize failed:", err?.message || err)
   }
} else {
   console.warn(
      "[firebase] missing REACT_APP_FIREBASE_* env vars — auth and Firestore disabled. Set them in Vercel Project Settings → Environment Variables, then redeploy."
   )
}

// Auth and Firestore live in sibling modules (lib/firebase/auth, lib/firebase/firestore)
// so that importing one does not drag the other's SDK into the bundle.
export { firebaseApp }
