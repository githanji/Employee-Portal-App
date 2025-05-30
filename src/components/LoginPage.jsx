import React, { useState } from 'react';

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validUsername = 'admin';
  const validPassword = 'admin123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // 🔽 Inline style objects
  const containerStyle = {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '44px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    textAlign: 'left',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '16px',
    
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3b82f6', // blue-500
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    margin:'10px 0px 0px 10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb', // blue-600
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Login
        </button>
        <div>[Note : Username: admin, Password: admin123]</div>
      </form>
    </div>
  );
}

export default LoginPage;
