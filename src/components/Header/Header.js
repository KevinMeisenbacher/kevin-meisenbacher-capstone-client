import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Header = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginText, setLoginText] = useState('Log In');
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
          setSigningUp(false);
          setToken(sessionStorage.getItem('JWTtoken'));
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProfile();
    }, [token, loggedIn]); 

    return <header className='header'>
      <Link to='/'>
        <img src={logo}></img>
      </Link>
      <aside className='side-bar'>
      {token && <h3 className='profile-box'>
        {currentUser}
      </h3>}
      <section className='dashboard'>
        <span className="header-btns">
          <button className='butt-header' onClick={() => handleLogin()}>
            {loggedIn ? 'Log Out' : 'Log In'}</button>
          <button className='butt-header' onClick={() => handleSignup()}>
            {signupText}</button>
        </span>
        {signingUp && <SignUp 
            signedUp={signedUp}
            setSignedUp={setSignedUp} 
            setSignupText={setSignupText}
        />}
        {loggingIn && <SignIn 
          setToken={setToken}
        />}
      </section>
      </aside>
  </header>
}

export default Header;