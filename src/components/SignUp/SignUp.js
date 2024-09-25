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
    const [formErrors, setFormErrors] = useState({
        errUname: '',
        errPass: '',
        errConfirm: '',
        errEmail: '',
        errPhone: ''
    });
    const [passErrors, setPassErrors] = useState({});

    const handleForm = (e) => {
        const {value, name} = e.target;
        setPassErrors(name === 'password' && {
            az: value.includes('[a-z]+') 
            ? '' : 'a-z ',
            AZ: value.includes('[A-Z]+') 
            ? '' : 'A-Z ',
            num: value.includes('\\d+') 
            ? '' : '0-9 ',
            sym: value.includes('\\W+') 
            ? '' : '!@#$%^&*()'
        });
        console.log(value);
        const {az, AZ, num, sym} = passErrors;
        if (name === 'username') {
            setFormValues({...formValues, username: value})
            setFormErrors(value.length > 1
            ? {...formErrors, errUname: ''}
                : {...formErrors, errUser: 'Write something unique'});
        }
        if (name === 'password') {
            setFormValues({...formValues, password: value})
            setFormErrors(!passErrors
            ? {...formErrors, errPass: ''}
                : {...formErrors, errPass: `${az} ${AZ} ${num} ${sym}`});
        }
        if (name === 'confirmPassword')  {
            setFormValues({...formValues, confirmPassword: value})
            setFormErrors(value === formValues.confirmPassword
            ? {...formErrors, errConfirm: ''}
                : {...formErrors, errConfirm: 'Passwords don\'t match'});
        }
        if (name === 'email') {
            setFormValues({...formValues, email: value})
            setFormErrors(formValues.email.includes('(.+@\\w+[.{1}]\\w+)')
            ? {...formErrors, errEmail: ''}
            : {...formErrors, errEmail: 'address@email.domain'});
        }
        if (name === 'phone') {
            setFormValues({...formValues, phone: value})
            setFormErrors(formValues.phone.includes('[0-9]{10}')
            ? {...formErrors, errPhone: ''}
            : {...formErrors, errPhone: value})
        }

        const { errUname, errPass, errConfirm, errEmail, errPhone} = formErrors;
        if (errUname || errPass || errConfirm || errEmail || errPhone) {
            setFormErrors(formErrors);
        }
        else setFormValues(formValues);
        // console.log('formValues', formValues);
        // console.log('formErrors', formErrors);
    }
    const location = useLocation();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('formValues', formValues);
        console.log('formErrors', formErrors);
        console.log('passErrors', passErrors);

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
                <div className='input-field__container'>
                    <input type="text" name="username" onChange={username => {handleForm(username)}} /> 
                    <span className='input-field__error'>{formErrors.errUname}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Password</span> 
                <div className='input-field__container'>
                    <input type="password" name="password" onChange={password => {handleForm(password)}} />
                    <span className='input-field__error'>{formErrors.errPass}</span>
                </div>
                </div>
            <div className='input-field--signup'>
            <span>Confirm Password</span> 
                <div className='input-field__container'>
                    <input type="password" name="confirmPassword" onChange={confirmPassword => {handleForm(confirmPassword)}} />
                    <span className='input-field__error'>{formErrors.errConfirm}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Email</span> 
                <div className='input-field__container'>
                    <input type="email" name="email" onChange={phone => {handleForm(phone)}} />
                    <span className='input-field__error'>{formErrors.errEmail}</span>
                </div>
            </div>
            <div className='input-field--signup'>
            <span>Phone</span> 
                <div className='input-field__container'>
                    <input type="tel" name="phone" onChange={email => {handleForm(email)}} />
                    <span className='input-field__error'>{formErrors.errPhone}</span>
                </div>
            </div>
            <div className='input-field--signup'>
                <span></span> <button className='butt signup'>Lock me in</button>
            </div>
        </form>
    )
}

export default SignUp;