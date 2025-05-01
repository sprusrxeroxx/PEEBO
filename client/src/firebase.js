import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the auth module
import.meta.env;

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
});

export const auth = app.auth();

// ensures that auth state is not shared across tabs/browsers
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default app;