import { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from '../Header/SignUp';
import SignIn from '../Header/SignIn';

const Header = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginText, setLoginText] = useState('Log In');
  const [currentUser, setCurrentUser] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [signupText, setSignupText] = useState('Sign Up');
  const [token, setToken] = useState(sessionStorage.getItem("JWTtoken"));

  const handleLogin = () => {
    if (token) {
        setToken(null);
        setLoginText('Log In');
        sessionStorage.clear();
    }
    else {
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
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentUser(response.data.username);
        sessionStorage.setItem('username', response.data.username);
        setToken(sessionStorage.getItem('JWTtoken'));
        setLoginText('Log Out');
        setSignupText('Account');
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [token]); 

  return <header className='header'>
    <img src={logo}></img>
    <aside className='side-bar'>
    {token && <h3 className='profile-box'>
      {currentUser}
    </h3>}
    <section className='dashboard'>
      <span className="header-btns">
        <button className='butt-header' onClick={() => handleLogin()}>{loginText}</button>
        <button className='butt-header' onClick={() => handleSignup()}>{signupText}</button>
      </span>
      {signingUp && <SignUp />}
      {loggingIn && <SignIn 
        setToken={setToken}
        setLoggingIn={setLoggingIn}
      />}
    </section>
    </aside>
  </header>
}

export default Header;