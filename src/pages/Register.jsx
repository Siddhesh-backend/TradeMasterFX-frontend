import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Alert from '../components/Alert/Alert';
import { registerUser } from '../services/api/authApi';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      validationErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (!mobileNumber.trim()) {
      validationErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      validationErrors.mobileNumber =
        'Mobile number must be exactly 10 digits';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
    };

    try {
      setLoading(true);
      setApiError('');

      await registerUser(registrationData);

      navigate('/login');
    } catch (error) {
      if (error.status === 409) {
        setApiError('Email is already registered.');
      } else if (error.status === 400) {
        setApiError('Please enter valid registration details.');
      } else {
        setApiError('Unable to register. Please try again later.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <h1>Register</h1>
          <p>Create your TradeMasterFX account</p>
        </div>

        <Alert
          type="error"
          message={apiError}
        />

        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Enter your first name"
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Enter your last name"
          error={errors.lastName}
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

        <Input
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          placeholder="Enter your 10-digit mobile number"
          error={errors.mobileNumber}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <p className="auth-switch">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;