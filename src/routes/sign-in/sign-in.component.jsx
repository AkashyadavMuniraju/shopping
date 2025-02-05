
import {  signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';

import SignupForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {


  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>
        Sign In With Google prompt
      </button>
      <SignupForm/>
      
    </div>
  );
};

export default SignIn;
