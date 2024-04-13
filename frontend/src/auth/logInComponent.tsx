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
        backgroundColor: "#f8f9fa", // Fancy background color
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
          style={{
            marginRight: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ced4da", // Fancy input border color
          }}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          style={{
            marginRight: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ced4da", // Fancy input border color
          }}
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
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)", // Fancy button shadow
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default observer(LoginComponent);
