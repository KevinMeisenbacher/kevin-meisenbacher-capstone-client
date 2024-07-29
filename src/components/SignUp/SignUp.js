import './SignUp.scss';

const SignUp = ({ signedUp, setSignedUp, setSignupText}) => {

    const handleSignup = (e) => {
        e.preventDefault();
        setSignedUp(!signedUp);

        setSignupText(signedUp
            ? 'Account'
            : 'Sign Up'
        );
    }
    return (
        <form>
        <div className='input-field'>
            <span></span> <h3>Sign Up</h3>
        </div>
            <div className='input-field'>
                <span>Username</span> <input type="text" name="username" /> 
            </div>
            <div className='input-field'>
                <span>Password</span> <input type="password" name="password" />
            </div>
            <div className='input-field'>
                <span>Confirm Password</span> <input type="password" name="confirmPassword" />
            </div>
            <div className='input-field'>
                <span>Email</span> <input type="email" name="email" />
            </div>
            <div className='input-field'>
                <span>Phone</span> <input type="tel" name="phone" />
            </div>
            <div className='input-field'>
                <span></span> <button onClick={e => handleSignup(e)}>Confirm</button>
            </div>
        </form>
    )
}

export default SignUp;