import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCbiz4AbpGtPuO7zPrNB0-4-RVkwZyR8oE",
    authDomain: "clothing-site-842bd.firebaseapp.com",
    databaseURL: "https://clothing-site-842bd.firebaseio.com",
    projectId: "clothing-site-842bd",
    storageBucket: "clothing-site-842bd.appspot.com",
    messagingSenderId: "1087389426857",
    appId: "1:1087389426857:web:969ff67dacfd580af8b5b8",
    measurementId: "G-5ZV7XE929S"
  };


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot.exists);
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }) 
        } catch(error) {
            console.log('error', error.message);
        }
    }
    return userRef
    //  console.log(firestore.doc('users/sdfsd111f'));
} 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;