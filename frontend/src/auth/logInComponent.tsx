import React, { useState } from "react";
import axios from "axios";

interface LoginProps {}

const LoginComponent: React.FC<LoginProps> = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        console.log(password, userName)
      const response = await fetch("http://localhost:3300/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      console.log("Login successful:", response);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid userName or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "5px", border: "1px solid #ccc" }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "5px", border: "1px solid #ccc" }}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginComponent;
