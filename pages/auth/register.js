import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/context';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { signup, currentUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push('/');
    } catch (err) {
      setError('Something went wrong');
    }
    return;
  };

  return (
    <div className="authForm">
      <form>
        <h2>Register</h2>
        {error && <div className="errorMessage">{error}</div>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={onSubmit}>Register</button>
        <Link href="/auth/login">
          <div className="redirect">Already have an account?</div>
        </Link>
      </form>
    </div>
  );
}
