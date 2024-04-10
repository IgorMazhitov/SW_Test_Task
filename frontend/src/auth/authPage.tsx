import React, { useState } from 'react';
import LoginComponent from './logInComponent';
import SignupComponent from './signUpComponent';

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      {isSignup ? <SignupComponent /> : <LoginComponent />}
      <button onClick={toggleForm}>
        {isSignup ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </div>
  );
};

export default AuthForm;
