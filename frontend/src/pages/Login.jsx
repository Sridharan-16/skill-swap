import React, { useState, useEffect } from 'react'; // ✅ fixed
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const { loading, error, success, login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.identifier, formData.password);
    if (!error) {
      localStorage.setItem("isLoggedIn", "true"); // ✅ persist login
      navigate('/');
    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
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
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
        <p style={styles.toggle}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} style={styles.link}>
            Sign Up
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


