import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Alert from '../components/Alert/Alert';
import { loginUser } from '../services/api/authApi';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const loginData = {
      email,
      password,
    };

    try {
      setLoading(true);
      setApiError('');

      const response = await loginUser(loginData);

      login(response);

      navigate('/dashboard');
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        setApiError('Invalid email or password.');
      } else if (error.status === 400) {
        setApiError('Please enter valid login details.');
      } else {
        setApiError('Unable to login. Please try again later.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <p>Login to your TradeMasterFX account</p>
        </div>

        <Alert
          type="error"
          message={apiError}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          error={errors.password}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <p className="auth-switch">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;