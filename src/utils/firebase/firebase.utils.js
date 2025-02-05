import  {initializeApp} from 'firebase/app'
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider ,createUserWithEmailAndPassword} from 'firebase/auth';
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

  const googleprovider=new GoogleAuthProvider();
  googleprovider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth=getAuth()

  export const signInWithGooglePopup = () => signInWithPopup(auth , googleprovider)

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);


  export const db=getFirestore()




  export const createUserDocumentFromAuth=async(userAuth,additionalInformation={}) => {

    if(!userAuth) return
    const userDocRef=doc(db,'users',userAuth.uid)


    const userSnapshot=await getDoc(userDocRef)
    

    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth
        const createdAt=new Date()
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         })
    }
    catch(error){
        console.log('error creating the user',error.message)
    }
}
return userDocRef

  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}
