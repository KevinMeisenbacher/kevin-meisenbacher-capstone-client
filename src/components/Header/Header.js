import { useState, useEffect } from 'react';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loggedIn) setLoginText('Log Out');
    }, [!loading])

    const handleLogin = () => {
        setSigningUp(false);
        setLoggingIn(!loggingIn);
        if (loginText === 'Log Out') {
            setLoggedIn(false);
            setLoginText('Log In');
            setLoading(true);
        }
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
        </span>
        {signingUp && <SignUp 
            signedUp={signedUp}
            setSignedUp={setSignedUp} 
            setSignupText={setSignupText}
        />}
        {loggingIn && <SignIn 
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn} 
            setLoginText={setLoginText}
            setLoading={setLoading}
        />}
    </header>
}

export default Header;