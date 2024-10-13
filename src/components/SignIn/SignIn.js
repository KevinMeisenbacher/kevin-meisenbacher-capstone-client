import { useState } from 'react';
import axios from 'axios';
import './SignIn.scss';

const SignIn = ({ setToken }) => {
    const [display, setDisplay] = useState('none');
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const handleForm = (e) => {
        const {value, name} = e.target;
        if (name === 'username') setFormValues({...formValues, username: value});
        if (name === 'password') setFormValues({...formValues, password: value});
    }

    const login = () => {
        axios.post('http://localhost:8080/signin', formValues)
        .then(response => {
            sessionStorage.setItem("JWTtoken", response.data.token);
            setToken(response.data.token);
        })
        .then(setDisplay('none'))
        .then(setLoading(false))
        .catch(err => console.error(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login();
    }

    const renderForm = () => {
        return (
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
    }

    return renderForm();
}

export default SignIn;