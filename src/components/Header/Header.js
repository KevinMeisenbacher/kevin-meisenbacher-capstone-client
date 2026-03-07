import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';
import logo from '../../assets/img/logo.png';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Header = ({url, setLoading}) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setUser] = useState('Log In');
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("JWTtoken"));
  const [signingUp, setSigningUp] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [loginText, setLoginText] = useState('Log In');
  const [signupText, setSignupText] = useState('Sign Up');
  const [formValues, setFormValues] = useState({
      username: '',
      password: '',
  });

    useEffect(() => {
      if (!signedUp) return;
        axios.get(`${url}/users`)
        .then(response => {
          setFormValues({
          username: response.data.at(-1).username,
          password: response.data.at(-1).password
        })
        })
        .catch(err => console.error(err));
    }, [signedUp])

    const handleLogin = () => {
        sessionStorage.clear();
        setSigningUp(false);
        setLoggingIn(!loggingIn);
        if (loggedIn) {
          setToken(null);
          setCurrentUser(null);
          setLoggedIn(false);
          setLoginText('Log In');
          setLoading(true);
        }
    }

    const handleSignup = () => {
      setLoggingIn(false);
      setSigningUp(!signingUp);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/users')
        .then(response => {
          setUser(response.data.find(person => person.username === sessionStorage.username)) 
        })
        .catch(err => console.error(err));
    }, [])
  
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
          <button className='butt-header' onClick={() => handleLogin()}>{loggedIn ? 'Log Out' : 'Log In'}</button>
          <button className='butt-header' onClick={() => handleSignup()}>{signupText}</button>
        </span>
        {signingUp && <SignUp 
            setSignedUp={setSignedUp}
        />}
        {loggingIn && <SignIn 
          setLoggingIn={setLoggingIn}
          setLoginText={setLoginText}
          formValues={formValues}
          setFormValues={setFormValues}
          token={token}
          setToken={setToken}
          setLoading={setLoading}
        />}
      </section>
      </aside>
  </header>
}

export default Header;