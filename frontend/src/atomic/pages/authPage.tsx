import React from "react";
import { AuthFormSwitcher } from "../../atomic/organisms/auth";
import { AuthPageTemplate } from "../../atomic/templates";

const AuthPage: React.FC = () => {
  return (
    <AuthPageTemplate>
      <AuthFormSwitcher />
    </AuthPageTemplate>
  );
};

export default AuthPage;
