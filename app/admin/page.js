"use client";

import React, { useState } from 'react';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressValue, setProgressValue] = useState(''); 

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleProgressChange = (e) => setProgressValue(e.target.value);

  const handleProgressSubmit = async () => {
    const progress = parseInt(progressValue, 10);
    if (isNaN(progress)) {
      alert('Please enter a valid number');
      return;
    }
    try {
      const res = await fetch('/api/set-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Progress set to ${progress} lei`);
      } else {
        alert(`Error setting progress: ${data.error}`);
      }
    } catch (error) {
      alert('Network error setting progress');
      console.error(error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h1>Admin Login</h1>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
          <button onClick={handleLogin} className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      ) : (
        <div className="flex-col">
          <h1>Seteaza suma de bani stransa (lei)</h1>
          <input
            type="number"
            value={progressValue}
            onChange={handleProgressChange}
            placeholder="Introduceti suma de bani stransa"
          />
          <button onClick={handleProgressSubmit} className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Seteaza
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
