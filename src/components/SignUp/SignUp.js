import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss';

const SignUp = ({ signedUp, setSignedUp, signingUp, setSignupText}) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const handleForm = (e) => {
        const {value, name} = e.target;
        if (name === 'username') setFormValues({...formValues, username: value});
        if (name === 'password') setFormValues({...formValues, password: value});
        if (name === 'confirmPassword') setFormValues({...formValues, confirmPassword: value});
        if (name === 'email') setFormValues({...formValues, email: value});
        if (name === 'phone') setFormValues({...formValues, phone: value});

        const { username, password, confirmPassword, email, phone} = formValues;
        if (username && password && confirmPassword === password && email && phone)
            setFormValues(formValues);
        else return;
    }
    const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(formValues);

        axios.post('http://localhost:8080/signup', formValues)
        .then(response => console.log(response.data))
        .then(setSignedUp(true))
        .then(setSignupText(signedUp
            ? 'Account'
            : 'Sign Up'
        ))
        .catch(err => console.error(err));
    }
    if (location.pathname.includes('signup')) return (
        <form className='form form--signup' onSubmit={e => handleSignup(e)}>
            <div className='input-field--signup'>
                <span></span> <h3>Sign Up</h3>
            </div>
            <div className='input-field--signup'>
                <span>Username</span> 
                <input type="text" name="username" onChange={e => {handleForm(e);}} /> 
            </div>
            <div className='input-field--signup'>
                <span>Password</span> 
                <input type="password" name="password" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field--signup'>
                <span>Confirm Password</span> 
                <input type="password" name="confirmPassword" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field--signup'>
                <span>Email</span> 
                <input type="email" name="email" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field--signup'>
                <span>Phone</span> 
                <input type="tel" name="phone" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field--signup'>
                <span></span> <button className='butt signup'>Lock me in</button>
            </div>
        </form>
    )
}

export default SignUp;