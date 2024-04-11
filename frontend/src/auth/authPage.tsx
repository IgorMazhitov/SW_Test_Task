import React, { useState } from "react";
import LoginComponent from "./logInComponent";
import SignupComponent from "./signUpComponent";

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  if (!isSignup) {
    return (
      <>
        <LoginComponent />
        <button onClick={toggleForm}>
          {isSignup ? "Switch to LogIn" : "Switch to SignUp"}
        </button>
      </>
    );
  } else {
    return (
      <>
        <SignupComponent />
        <button onClick={toggleForm}>
          {isSignup ? "Switch to LogIn" : "Switch to SignUp"}
        </button>
      </>
    );
  }
};

export default AuthForm;
