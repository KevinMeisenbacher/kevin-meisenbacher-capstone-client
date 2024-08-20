import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.scss';

const SignIn = ({ loggedIn, setLoggedIn, loggingIn, setLoggingIn, setLoginText, setToken, setDisplay, loading, setLoading }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleForm = (e) => {
        const {value, name} = e.target;
        if (name === 'username') setFormValues({...formValues, username: value});
        if (name === 'password') setFormValues({...formValues, password: value});
    }

    const login = () => {
        axios.post('http://localhost:8080/signin', formValues)
        .then(response => {
            console.log(response.data);
            sessionStorage.setItem("JWTtoken", response.data.token);
            setToken(response.data.token);
        })
        .then(setLoggedIn(true))
        .then(setLoggingIn(false))
        .then(setDisplay('none'))
        .then(setLoginText('Log Out'))
        .then(navigate('/'))
        .then(setLoading(false))
        .then(console.log('loading', loading))
        .catch(err => console.error(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login();
    }

    const location = useLocation();

    const renderForm = () => {
        if (location.pathname.includes('login')) return (
            <form className={`form form--signin`} >
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
        );
        else return <></>;
    }

    return renderForm();
}

export default SignIn;