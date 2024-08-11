import { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

const Header = () => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState('Log In');
    const [currentUser, setCurrentUser] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [signupText, setSignupText] = useState('Sign Up');
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem("JWTtoken");

    const handleLogin = (e) => {
        if (loggedIn) {
            setLoggingOut(true);
            sessionStorage.setItem('JWTtoken', null);
            setLoggingOut(false);
        }
        else {
            e.preventDefault();
            setSigningUp(false);
            setLoggingIn(!loggingIn);
        }
    }

    const handleSignup = () => {
        setLoggingIn(false);
        setSigningUp(!signingUp);
    }
  
    useEffect(() => {
      if (!token) {
        return;
      }
  
      const fetchProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8080/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data.username);
          setLoggedIn(true);
          setLoginText('Log Out');
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProfile();
    }, [!loading]);

    return <header className='header'>
        <img src={logo}></img>
        <aside className='side-bar'>
            <h3 className='profile-box'>
                {token && currentUser}
            </h3>
            <section className='dashboard'>
                <span className="header-btns">
                    <button type='submit' className='butt-header' onClick={(e) => handleLogin(e)}>{loginText}</button>
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
                    setCurrentUser={setCurrentUser}
                    setLoading={setLoading}
                />}
            </section>
        </aside>
    </header>
}

export default Header;