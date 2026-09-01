import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Login:', {
      email,
      password,
    });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <p>TradeMasterFX Login Page</p>
        </div>

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
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;