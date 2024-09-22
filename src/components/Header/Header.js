import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const [display, setDisplay] = useState('none');
    const [currentUser, setCurrentUser] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [signupText, setSignupText] = useState('Sign Up');
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const [token, setToken] = useState(sessionStorage.getItem("JWTtoken"));

    const handleLogin = (e) => {
      if (loggedIn) {
          setLoggingOut(true);
          sessionStorage.setItem('JWTtoken', '');
          setToken(null);
          setLoginText('Log In');
          setLoggingOut(false);
      }
      else {
          e.preventDefault();
          setSigningUp(false);
          setLoggingIn(!loggingIn);
          console.log(loggingIn);
          location.pathname = loggingIn ? '/' : '/login';
      }
    }

    const handleSignup = () => {
        setLoggingIn(false);
        setSigningUp(!signingUp);
        location.pathname = signingUp ? '/' : '/signup';
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
          setLoading(false);
          console.log(response.data);
          setCurrentUser(response.data.username);
          sessionStorage.setItem('username', response.data.username);
          setLoggedIn(true);
          setToken(sessionStorage.getItem('JWTtoken'));
          console.log(token);
          setLoginText('Log Out');
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProfile();
    }, [token, loggedIn]); 

    return <header className='header'>
        <img src={logo}></img>
        <aside className='side-bar'>
        {token && <h3 className='profile-box'>
          {currentUser}
        </h3>}
        <section className='dashboard'>
            <span className="header-btns">
                <button type='submit' className='butt-header' onClick={(e) => handleLogin(e)}>{loginText}</button>
                <button className='butt-header' onClick={() => handleSignup()}>{signupText}</button>
            </span>
            <SignUp 
                signedUp={signedUp}
                setSignedUp={setSignedUp} 
                setSignupText={setSignupText}
            />
              {loggingIn && <SignIn 
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} 
                  setLoggingIn={setLoggingIn}
                  setLoginText={setLoginText}
                  setToken={setToken}
                  loading={loading}
                  setLoading={setLoading}
                  display={display}
                  setDisplay={setDisplay}
              />}
        </section>
        </aside>
    </header>
}

export default Header;