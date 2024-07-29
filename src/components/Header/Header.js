import { useState } from 'react';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

const Header = () => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState('Log In');
    const [signingUp, setSigningUp] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [signupText, setSignupText] = useState('Sign Up');

    const handleLogin = () => {
        setSigningUp(false);
        setLoggingIn(!loggingIn);
    }

    const handleSignup = () => {
        setLoggingIn(false);
        setSigningUp(!signingUp);
    }

    return <header className='header'>
        <img src={logo}></img>
        <span className="header-btns">
            <button className='butt-header' onClick={() => handleLogin()}>{loginText}</button>
            <button className='butt-header' onClick={() => handleSignup()}>{signupText}</button>
            {signingUp && <SignUp 
                signedUp={signedUp}
                setSignedUp={setSignedUp} 
                setSignupText={setSignupText}
            />}
            {loggingIn && <SignIn 
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn} 
                setLoginText={setLoginText}
            />}
        </span>
    </header>
}

export default Header;