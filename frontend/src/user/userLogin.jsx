import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://wjeproject3.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const userResponse = await fetch('https://wjeproject3.onrender.com/api/users/search', {
          method: 'GET',
          credentials: 'include', 
        });

        if (!userResponse.ok) throw new Error('Failed to fetch user details after login');
        const userData = await userResponse.json();

        setIsLoggedIn(true);
        setUserInfo(userData[0]); 

        navigate('/home');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserLogin;
