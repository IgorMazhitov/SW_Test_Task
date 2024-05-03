import React, { useState } from "react";
import LoginComponent from "../components/logInComponent";
import SignupComponent from "../components/signUpComponent";
import { AuthPageLayout } from "../UI/styled/pages";

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <AuthPageLayout>
      {isSignup ? <SignupComponent callback={toggleForm} /> : <LoginComponent callback={toggleForm} />}
    </AuthPageLayout>
  );
};

export default AuthPage;
