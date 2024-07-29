import './SignIn.scss';

const SignIn = ({ loggedIn, setLoggedIn, setLoginText }) => {

    const handleLogin = (e) => {
        e.preventDefault();
        setLoggedIn(!loggedIn);

        setLoginText(loggedIn
            ? 'Log Out'
            : 'Log In'
        );
    }
    return (
        <form>
        <div className='input-field'>
            <span></span> <h3>Log In</h3>
        </div>
            <div className='input-field'>
                <span>Username</span> <input type="text" name="username" /> 
            </div>
            <div className='input-field'>
                <span>Password</span> <input type="password" name="password" />
            </div>
            <div className='input-field'>
                <span></span> <button onClick={e => handleLogin(e)}>Confirm</button>
            </div>
        </form>
    )
}

export default SignIn;