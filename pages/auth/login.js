import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/context';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Incorrect Email or Password');
    }
    return;
  };

  return (
    <div className="authForm">
      <form>
        <h2>Login</h2>
        {error && <div className="errorMessage">{error}</div>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={onSubmit}>Login</button>
        <Link href="/auth/register">
          <div className="redirect">No account? Click here to register</div>
        </Link>
      </form>
    </div>
  );
}
