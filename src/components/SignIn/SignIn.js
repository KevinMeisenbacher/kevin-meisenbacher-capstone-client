import { useState } from 'react';
import axios from 'axios';
import './SignIn.scss';

const SignIn = ({ loggedIn, setLoggedIn, setLoginText, setLoading }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const handleForm = (e) => {
        const {value, name} = e.target;
        if (name === 'username') setFormValues({...formValues, username: value});
        if (name === 'password') setFormValues({...formValues, password: value});
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post('http://localhost:8080/signin', formValues)
        .then(response => console.log(response.data))
        .then(setLoggedIn(!loggedIn))
        .then(setLoginText(loggedIn
            ? 'Log Out'
            : 'Log In'
        ))
        .then(setLoading(false))
        .catch(err => console.error(err));
    }

    return (
        <form>
        <div className='input-field'>
            <span></span> <h3>Log In</h3>
        </div>
            <div className='input-field'>
                <span>Username</span> 
                <input type="text" name="username" onChange={e => handleForm(e)} /> 
            </div>
            <div className='input-field'>
                <span>Password</span> 
                <input type="password" name="password" onChange={e => handleForm(e)} />
            </div>
            <div className='input-field'>
                <span></span> 
                <button onClick={e => handleLogin(e)}>Confirm</button>
            </div>
        </form>
    )
}

export default SignIn;