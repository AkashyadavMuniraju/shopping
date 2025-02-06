import {useState} from'react'
import FormInput from '../form-input/form-input-component';
import Button from '../button/button.component'

import { signInWithGooglePopup ,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss'


const defaultFormFields={
    email:'',
    password:'',
}


const SignInForm =() => {

    const [formFields , setFormFields] =useState(defaultFormFields)
    const {email,password} =formFields

    console.log(formFields)

    const resetFormFields=() => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
      };


      const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Form fields:', formFields);
    
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) 
        {
            console.error('Error details:', error)
            alert(`Error Code: ${error.code}, Message: ${error.message}`);
            switch(error.code){

                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    alert('An unexpected error occurred');

            }
        }
    }
    
    

    const handelChange =(event) =>{
        const {name,value}=event.target

        setFormFields({...formFields,[name]:value})


    }
    return (

        <div className='sign-up-container'>
            <h2>  Already have a account </h2>

            <span> SIgn in with your email and passwaord</span>
                <form onSubmit={handleSubmit}>
                    
                    

                    <FormInput   label="Email"  type='email'required onChange={handelChange} name="email"  value={email}  />

                   
                    <FormInput  label=" Password"  type='password' required onChange={handelChange} name="password"  value={password}/>

                   
        

    <div  className='buttons-container'> 
        
        <Button type='submit'>Sign In</Button>
        <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>    </div>
                    
                </form>
           
        </div>
    )
}


export default SignInForm