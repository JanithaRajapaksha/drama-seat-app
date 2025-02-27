import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase'; // Make sure you have this set up

const testConnection = async () => {
    try {
      const snapshot = await getDocs(collection(db, "admins"));
      if (!snapshot.empty) {
        console.log("Connection successful, retrieved documents:", snapshot.docs.length);
      } else {
        console.log("No documents found in the 'admins' collection");
      }
    } catch (error) {
      console.error("Error connecting to Firestore:", error);
    }
  };

  const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const adminsRef = collection(db, 'admins'); // Collection in Firestore
        const snapshot = await getDocs(adminsRef);
        const admins = snapshot.docs.map(doc => doc.data());
  
        const user = admins.find(admin => admin.username === username && admin.password === password);
  
        if (user) {
          sessionStorage.setItem('loggedIn', 'true'); // Store logged-in status as string
          sessionStorage.setItem('username', user.username); // Store username
          onLogin();  // Update the logged-in state in the parent
          navigate('/seats'); // Use absolute path for redirection
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('Failed to connect to the database');
      }
    };
  
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Lily's Magic World Seat Booking - Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '200px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '200px' }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}
        >
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={{ marginTop: '20px', color: 'red' }}>
          If you want to request tickets, enter <strong>guest</strong> as your username and password.
        </p>
      </div>
    );
    
  };

testConnection();

export default Login;
