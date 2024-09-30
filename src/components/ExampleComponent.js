import React, { useState } from 'react';
import { login } from '../services/api'; // Đảm bảo import đúng đường dẫn

const ExampleComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteId, setSiteId] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(username, password, siteId);
      setMessage(`Login successful: ${JSON.stringify(data)}`);
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Site ID"
        value={siteId}
        onChange={(e) => setSiteId(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExampleComponent;
