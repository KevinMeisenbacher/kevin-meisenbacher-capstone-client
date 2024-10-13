import { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

const Header = () => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [signupText, setSignupText] = useState('Sign Up');

    const [token, setToken] = useState(sessionStorage.getItem("JWTtoken"));

    const handleLogin = () => {
      if (loggedIn) {
          setToken('');
          sessionStorage.clear();
          setLoggedIn(false);
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
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data.username);
          sessionStorage.setItem('username', response.data.username);
          setLoggedIn(true);
          setLoggingIn(false);
          setToken(sessionStorage.getItem('JWTtoken'));
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
          <button className='butt-header' onClick={(e) => handleLogin()}>
            {loggedIn ? 'Log Out' : 'Log In'}</button>
          <button className='butt-header' onClick={() => handleSignup()}>
            {signupText}</button>
        </span>
        <SignUp 
            signedUp={signedUp}
            setSignedUp={setSignedUp} 
            setSignupText={setSignupText}
        />
        {loggingIn && <SignIn 
            setToken={setToken}
        />}
      </section>
      </aside>
  </header>
}

export default Header;