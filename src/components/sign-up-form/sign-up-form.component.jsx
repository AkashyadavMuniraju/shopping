import {useState} from'react'
import FormInput from '../form-input/form-input-component';
import Button from '../button/button.component'

import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss'


const defaultFormFields={
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}


const SignupForm =() => {

    const [formFields , setFormFields] =useState(defaultFormFields)
    const {displayName ,email,password,confirmPassword} =formFields

    console.log(formFields)

    const resetFormFields=() => {
        setFormFields(defaultFormFields)
    }


    const handleSubmit=async(event) => {

        event.preventDefault()

        if (password!== confirmPassword){
            alert("passwords do not match ")
        }

        try{
            const {user}=await createAuthUserWithEmailAndPassword(email,password)
            await createUserDocumentFromAuth(user,{displayName})

            resetFormFields()

        }catch(error){
            if(error.code=== 'auth/email-already-in-use'){
                alert('Cannot create user,email already in use')
            }
            else{

            console.log('user creation encountered an error',error)

        }
    }
    }

    const handelChange =(event) =>{
        const {name,value}=event.target

        setFormFields({...formFields,[name]:value})


    }
    return (

        <div className='sign-up-container'>
            <h2>  Dont have a account </h2>

            <span> SIgn up with your email and passwaord</span>
                <form onSubmit={handleSubmit}>
                    
                    <FormInput   label="Display Name" type='text' required onChange={handelChange } name="displayName" value={displayName}/>

                    <FormInput   label="Email"  type='email'required onChange={handelChange} name="email"  value={email}  />

                   
                    <FormInput  label=" Passwaord"  type='password' required onChange={handelChange} name="password"  value={password}/>

                   
                    <FormInput   label="Confirm Password"  type='password' required  onChange={handelChange} name="confirmPassword"  value={confirmPassword} />

    
                    <Button  type='submit'>Sign up</Button>
                </form>
           
        </div>
    )
}

export default SignupForm