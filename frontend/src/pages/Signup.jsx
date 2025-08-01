import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, error, success, signup } = useAuth();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    await signup({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    // ✅ Set login state and redirect
    if (!error) {
      localStorage.setItem("isLoggedIn", "true");
      navigate('/home');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
        <p style={styles.toggle}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={styles.link}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    backgroundColor: '#e6f0ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#0055cc',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '10px 14px',
    marginBottom: '15px',
    border: '1px solid #b3d1ff',
    borderRadius: '6px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0055cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  toggle: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
  link: {
    color: '#0055cc',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginLeft: '5px',
  },
};
