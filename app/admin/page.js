"use client"

import React, { useState } from 'react';
import dotenv from 'dotenv';
import { setProgress } from '@/actions/database';
dotenv.config();

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressValue, setProgressValue] = useState(''); 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleProgressChange = (e) => {
    setProgressValue(e.target.value); 
  };

  const handleProgressSubmit = () => {
    const progress = parseInt(progressValue, 10); 
    if (!isNaN(progress)) {
      setProgress(progress);
      alert(`Progress set to ${progress} lei`);
    } else {
      alert('Please enter a valid number');
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h1>Admin Login</h1>
          <div>

            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
          </div>
          <button onClick={handleLogin}className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Login</button>
        </div>
      ) : (
        <div className='flex-col'>
          <h1>Seteaza suma de bani stransa (lei) </h1>
          <div className='flex-col'>
            <div>

              <input
                type="number"
                value={progressValue}
                onChange={handleProgressChange}
                placeholder="Introduceti suma de bani stransa"
              />
            </div>
            <button 
              onClick={handleProgressSubmit} 
              className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              seteaza
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;