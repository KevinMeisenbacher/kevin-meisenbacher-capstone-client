import { useState, useEffect } from 'react';
import axios from 'axios';
import './SignIn.scss';

const SignIn = ({ loggedIn, setLoggedIn, setCurrentUser, setLoginText, setLoading }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const [user, setUser] = useState(null);

    const handleForm = (e) => {
        const {value, name} = e.target;
        if (name === 'username') setFormValues({...formValues, username: value});
        if (name === 'password') setFormValues({...formValues, password: value});
    }

    useEffect(() => {
        if (localStorage.getItem('username') !== 'undefined') {
            setFormValues({
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            });
            console.log('formValues', formValues);
            console.log('localStorage', localStorage);
            setUser({
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            });
            login();
        }
        else console.log('Nothing in local storage');
    }, [])

    const login = () => {
        console.log('Logging in');
        axios.post('http://localhost:8080/signin', formValues)
        .then(response => {
            sessionStorage.setItem("JWTtoken", response.data.token);
        })
        .then(setLoggedIn(!loggedIn))
        .then(setLoginText(loggedIn
            ? 'Log Out'
            : 'Log In'
        ))
        .catch(err => console.error(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <form className='form form--signin'>
        <div className='input-field--signin'>
            <span></span> <h3>Log In</h3>
        </div>
            <div className='input-field--signin'>
                <span>Username</span> 
                <input type="text" name="username" onChange={e => handleForm(e)} /> 
            </div>
            <div className='input-field--signin'>
                <span>Password</span> 
                <input type="password" name="password" onChange={e => handleForm(e)} />
            </div>
            <div>
                <span></span> 
                <button className='butt signin' onClick={e => handleLogin(e)}>Enter</button>
            </div>
        </form>
    )
}

export default SignIn;