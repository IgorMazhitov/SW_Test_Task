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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <LoginComponent />
        <button onClick={toggleForm}>
          {isSignup ? "Switch to LogIn" : "Switch to SignUp"}
        </button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <SignupComponent />
        <button onClick={toggleForm}>
          {isSignup ? "Switch to LogIn" : "Switch to SignUp"}
        </button>
      </div>
    );
  }
};

export default AuthForm;
