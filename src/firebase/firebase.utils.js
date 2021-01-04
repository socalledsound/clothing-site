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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot.exists);
    console.log(userAuth);
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



  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);



  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log("collectionref:", collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef);
        batch.set(newDocRef, object);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc
    }, {})
}

  export default firebase;