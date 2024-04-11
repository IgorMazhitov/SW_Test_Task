import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "..";
import { observer } from "mobx-react-lite";

interface LoginProps {}

const LoginComponent: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <div
      style={{
        width: "max-content",
        height: "max-content",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
          style={{ marginRight: "10px" }}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={() => store.login(email, password)}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default observer(LoginComponent);
