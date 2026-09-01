import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Register:', {
      username,
      email,
      password,
    });
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <h1>Register</h1>
          <p>TradeMasterFX Registration Page</p>
        </div>

        <Input
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />

        <Button type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;