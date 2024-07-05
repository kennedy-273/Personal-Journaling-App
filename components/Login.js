import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      // Login logic here (replace with actual API call)
      console.log('Logging in with', email, password);
    } else {
      // Signup logic here (replace with actual API call)
      console.log('Signing up with', email, password);
    }
    // Example error handling
    setError('An error occurred. Please try again.');
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // Update username and/or password logic here (replace with actual API call)
    console.log('Updating username and/or password');
    setError('An error occurred. Please try again.');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear error when toggling
  };

  // Styles object
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(111, 202, 186, 1)',
      height: '100vh',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '20px 40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      marginBottom: '20px',
      fontWeight: 700,
    },
    inputContainer: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 500,
      textAlign: 'left',
      display: 'block',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      width: '100%',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    toggleButton: {
      backgroundColor: 'transparent',
      color: '#007bff',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={isLogin ? handleSubmit : handleUpdate}>
        <h2 style={styles.header}>{isLogin ? 'Login' : 'Signup'}</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              style={styles.input}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {!isLogin && (
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="newPassword">New Password</label>
            <input
              style={styles.input}
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        )}
        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.button} type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <button style={styles.toggleButton} type="button" onClick={toggleForm}>
          {isLogin ? 'Need an account? Signup' : 'Have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
