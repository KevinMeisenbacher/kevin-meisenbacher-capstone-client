import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss';

const SignUp = ({ signedUp, setSignedUp, signingUp, setSignupText}) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    });

    const handleForm = (e) => {
        const {value, name} = e.target;
        console.log(value);
        setFormValues({...formValues, [name]: value});
        setErrors({...errors, [name]: value.length > 0
            ? '' : `Missing value for ${name}`
        });

        // const { username, password, confirmPassword, email, phone} = formValues;
        // if (username && password && confirmPassword === password && email && phone)
        //     setFormValues(formValues);
        // else return;
    }
    const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(formValues);
        console.error(errors && errors);

        if (errors) return;
        else axios.post('http://localhost:8080/signup', formValues)
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
                <div className='input-field__container'>
                    <input type="text" name="username" onChange={username => {handleForm(username)}} /> 
                    <span className='input-field__error'>{errors.username}</span>
                </div>
 
            </div>
            <div className='input-field--signup'>
            <span>Password</span> 
                <div className='input-field__container'>
                    <input type="password" name="password" onChange={password => {handleForm(password)}} /> 
                    <span className='input-field__error'>{errors.password}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Confirm Password</span> 
                <div className='input-field__container'>
                    <input type="password" name="confirmPassword" onChange={confirmPassword => {handleForm(confirmPassword)}} /> 
                    <span className='input-field__error'>{errors.confirmPassword}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Email</span> 
                <div className='input-field__container'>
                    <input type="email" name="email" onChange={email => {handleForm(email)}} /> 
                    <span className='input-field__error'>{errors.email}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Phone</span> 
                <div className='input-field__container'>
                    <input type="tel" name="phone" onChange={phone => {handleForm(phone)}} /> 
                    <span className='input-field__error'>{errors.phone}</span>
                </div>
            </div>
            <div className='input-field--signup'>
                <span></span> <button className='butt signup'>Lock me in</button>
            </div>
        </form>
    )
}

export default SignUp;