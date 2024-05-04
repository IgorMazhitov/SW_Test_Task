import React, { useState } from "react";
import LoginComponent from "../components/authComponents/logInComponent";
import SignupComponent from "../components/authComponents/signUpComponent";
import { Container } from "@mui/material";

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Container maxWidth="sm" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}>
      {isSignup ? <SignupComponent callback={toggleForm} /> : <LoginComponent callback={toggleForm} />}
    </Container>
  );
};

export default AuthPage;
