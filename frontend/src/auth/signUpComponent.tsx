import React, { useState } from 'react';
import axios from 'axios';

interface SignupProps {}

const SignupComponent: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post<any>( // Type annotation for response
        'http://localhost:3300/auth/signup',
        {
          username,
          email,
          password,
          roleId,
        }
      );

      console.log('Signup successful:', response.data);
    } catch (error: any) {
      setErrorMessage(error.response.data.message); 
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
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={4} // Basic password length validation
        maxLength={16}
      />
      <label htmlFor="roleId">Role Id (Optional)</label>
      <input
        type="number"
        id="roleId"
        value={roleId || ''} // Handle empty value
        onChange={(e) => setRoleId(Number(e.target.value))}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupComponent;

