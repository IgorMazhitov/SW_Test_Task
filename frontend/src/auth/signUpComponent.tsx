import React, { useState } from 'react';
import axios from 'axios';

interface SignupProps {}

const SignupComponent: React.FC<SignupProps> = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!userName || !email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post<any>( // Type annotation for response
        'http://localhost:3300/auth/signup',
        {
          userName,
          email,
          password,
          roleId,
        }
      );

      console.log('Signup successful:', response.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message); 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '5px', border: '1px solid #ccc' }}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '5px', border: '1px solid #ccc' }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={4} // Basic password length validation
        maxLength={16}
        style={{ padding: '5px', border: '1px solid #ccc' }}
      />
      <label htmlFor="roleId">Role Id (Optional)</label>
      <input
        type="number"
        id="roleId"
        value={roleId || ''} // Handle empty value
        onChange={(e) => setRoleId(Number(e.target.value))}
        style={{ padding: '5px', border: '1px solid #ccc' }}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
        Signup
      </button>
    </form>
  );
};

export default SignupComponent;
