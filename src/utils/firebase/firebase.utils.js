import  {initializeApp} from 'firebase/app'
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider } from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAsrvovyPuydy2P6WAEfzVcAQIppl28Bwc",
    authDomain: "crown-clothing-db-daa29.firebaseapp.com",
    projectId: "crown-clothing-db-daa29",
    storageBucket: "crown-clothing-db-daa29.firebasestorage.app",
    messagingSenderId: "772895611529",
    appId: "1:772895611529:web:a4b2361ac0d7a8b3ba8458"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider=new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth=getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth , provider)
  export const db=getFirestore()

  export const createUserDocumentFromAuth=async(userAuth) => {
    const userDocRef=doc(db,'users',userAuth.uid)

    console.log(userDocRef)

    const userSnapshot=await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth
        const createdAt=new Date()
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
         })
    }
    catch(error){
        console.log('error creating the user',error.message)
    }
}

  }