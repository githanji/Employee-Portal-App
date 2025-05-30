import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import EmployeeForm from './components/EmployeeForm';
import EmployeeSearch from './components/EmployeeSearch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Inline styles
  const containerStyle = {
    padding: '54px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px', // space between children
    boxSizing: 'border-box',
  };

  // Make sure you're logged in to see this styled page
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <EmployeeForm employees={employees} setEmployees={setEmployees} />
      <EmployeeSearch employees={employees} setEmployees={setEmployees} />
    </div>
  );
}

export default App;
