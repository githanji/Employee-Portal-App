import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <EmployeePage />
      )}
    </div>
  );
}

export default App;
