import './SignUp.scss';
import axios from 'axios';

const SignIn = ({ formValues, setFormValues, setToken, setLoggingIn, setLoginText, setLoading }) => {
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
            setLoggingIn(false);
            setLoginText('Log Out');
            setLoading(true);
        })
        .catch(err => console.error(err));
    }

    const handleLogin = () => {
        login();
    }
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
                <button className='butt signin' onClick={e => handleLogin()}>Enter</button>
            </div>
        </form>
    );
}

export default SignIn;