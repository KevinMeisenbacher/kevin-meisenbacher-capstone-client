import { useState } from 'react';
import axios from 'axios';
import './SignUp.scss';

const SignUp = ({ signedUp, setSignedUp, setSignupText}) => {
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
            axios.post('http://localhost:8080/signup', formValues);
        else return;
    }

    const handleSignup = (e) => {
        e.preventDefault();

        const { username, password, confirmPassword, email, phone} = formValues;
        console.log(username, password, confirmPassword, email, phone);

        axios.post('http://localhost:8080/signup', formValues)
        .then(response => console.log(response.data))
        .then(setSignedUp(true))
        .then(setSignupText(signedUp
            ? 'Account'
            : 'Sign Up'
        ))
        .catch(err => console.error(err));
    }
    return (
        <form onSubmit={e => handleSignup(e)}>
            <div className='input-field'>
                <span></span> <h3>Sign Up</h3>
            </div>
            <div className='input-field'>
                <span>Username</span> 
                <input type="text" name="username" onChange={e => {handleForm(e);}} /> 
            </div>
            <div className='input-field'>
                <span>Password</span> 
                <input type="password" name="password" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field'>
                <span>Confirm Password</span> 
                <input type="password" name="confirmPassword" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field'>
                <span>Email</span> 
                <input type="email" name="email" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field'>
                <span>Phone</span> 
                <input type="tel" name="phone" onChange={e => {handleForm(e);}} />
            </div>
            <div className='input-field'>
                <span></span> <button className='butt-signup'>Confirm</button>
            </div>
        </form>
    )
}

export default SignUp;