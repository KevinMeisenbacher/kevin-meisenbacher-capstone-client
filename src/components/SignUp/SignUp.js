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

    const validatePassword = (value, passErrorString) => {
        const lowerRegex = new RegExp('[a-z]+');
        const upperRegex = new RegExp('[A-Z]+');
        const numRegex = new RegExp('[\\d]+');
        const symRegex = new RegExp('[\\W]+');

        const lowerTest = lowerRegex.test(value) ? '' : 'a-z ';
        const upperTest = upperRegex.test(value) ? '' : 'A-Z ';
        const numTest = numRegex.test(value) ? '' : '0-9 ';
        const symTest = symRegex.test(value) ? '' : '!@#$%^&*()';

        passErrorString = `${lowerTest} ${upperTest} ${numTest} ${symTest}`;
        console.log(passErrorString);
        return passErrorString;
    }

    const validateEmail = (value, emailErrorString) => { // Got regex from https://emailvalidation.io/blog/regex-email-validation/#:~:text=In%20order%20to%20check%20whether%20an%20email%20address%20is%20valid
        const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
        emailErrorString = regex.test(value) ? '' : 'something@email.something';
        return emailErrorString;
    }

    const validatePhone = (value, phoneErrorString) => {
        const regex = new RegExp(/0-9{10}/);
        phoneErrorString = regex.test(value) ? '' : `${value.length}/10 digits`
        return phoneErrorString;
    }

    const handleForm = (e) => {
        const {value, name} = e.target;
        setFormValues({...formValues, [name]: value});

        let nameError = '';
        let passError = '';
        let confirmPassError = '';
        let emailError = '';
        let phoneError = '';

        if (name === 'username') nameError = value.length > 2
            ? '' : 'Enter a unique name';
        
        let passErrorString = '';
        if (name === 'password') passError = validatePassword(value);

        if (name === 'confirmPassword') 
            confirmPassError = value === formValues.password
            ? '' : 'Passwords must match';

        let emailErrorString = '';
        if (name === 'email') emailError = validateEmail(value);

        let phoneErrorString = '';
        if (name === 'phone') phoneError = validatePhone(value);

        setErrors({
            username: nameError,
            password: passError,
            confirmPassword: confirmPassError,
            email: emailError,
            phone: phoneError
        });

        console.log(errors);
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