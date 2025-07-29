import React from "react";
import { AuthFormSwitcher } from "../atomic/organisms/auth";
import { AuthPageTemplate } from "../atomic/templates";

/**
 * Authentication page component
 * @returns React component
 */
const AuthPage: React.FC = () => {
  return (
    <AuthPageTemplate>
      <AuthFormSwitcher />
    </AuthPageTemplate>
  );
};

export default AuthPage;
