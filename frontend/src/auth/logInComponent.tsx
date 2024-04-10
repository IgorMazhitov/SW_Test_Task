import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {}

const LoginComponent: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<any>( // Type annotation for response
        'http://localhost:3300/auth/login',
        {
          username,
          password,
        }
      );

      // Handle successful login (e.g., store token, redirect)
      console.log('Login successful:', response.data);
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
