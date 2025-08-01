import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear login flag
    localStorage.setItem("isLoggedIn", "false");

    // Optional: clear token or user data
    // localStorage.removeItem("token");

    // Redirect to login or home
    navigate('/');
  }, []);

  return null; // No UI needed
}
