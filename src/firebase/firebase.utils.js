import firebase from 'firebase/app';
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBx7dSAP9fsZ0iRhpb0AhzSi-vh6mA_O3Y",
  authDomain: "vibez-e2744.firebaseapp.com",
  projectId: "vibez-e2744",
  storageBucket: "vibez-e2744.appspot.com",
  messagingSenderId: "251800051280",
  appId: "1:251800051280:web:7e0f2506db09d568a1fb55",
  measurementId: "G-FZ1HLL8PZX"
};

firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleProvider)
  } catch ({message}) {
    console.log(message)
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
  } catch ({message}) {
    console.log(message);
  }
}

export const getTextMessages = async () => {
  const colRef = firestore.collection('messages')

  try {
    const message = colRef.orderBy('createdAt').limit(50)
    console.log(message.docs());
  } catch ({message}) {
    console.log(message)
  }
}

export default firebase