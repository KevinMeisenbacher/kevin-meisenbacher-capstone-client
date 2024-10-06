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
    const [errors, setErrors] = useState({});

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
        return passErrorString;
    }

    const validateEmail = (value, emailErrorString) => { // Got regex from https://emailvalidation.io/blog/regex-email-validation/#:~:text=In%20order%20to%20check%20whether%20an%20email%20address%20is%20valid
        const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
        emailErrorString = regex.test(value) ? '' : 'something@email.something';
        return emailErrorString;
    }

    const handleForm = (e) => {
        const {value, name} = e.target;
        setFormValues({...formValues, [name]: value});

        let nameError = '';
        let passError = '';
        let confirmPassError = '';
        let emailError = '';

        if (name === 'username') nameError = value.length > 2
            ? '' : 'Enter a unique name';
        
        if (name === 'password') passError = validatePassword(value);

        if (name === 'confirmPassword') 
            confirmPassError = value === formValues.password
            ? '' : 'Passwords must match';

        if (name === 'email') emailError = validateEmail(value);

        setErrors({
            username: nameError,
            password: passError,
            confirmPassword: confirmPassError,
            email: emailError
        });
    }

    const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();

        const { username, password, confirmPassword, email } = errors;
        if (username.includes('') && password.includes('') && confirmPassword.includes('') && email.includes(''))
            axios.post('http://localhost:8080/signup', formValues)
            .then(response => console.log(response.data))
            .then(setSignedUp(true))
            .then(setSignupText(signedUp
                ? 'Account'
                : 'Sign Up'
            ))
            .catch(err => console.error(err));
        else {
            return;
        }
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
                <span></span> <button className='butt signup'>Lock me in</button>
            </div>
        </form>
    )
}

export default SignUp;