import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../lib/context';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const signout = () => {
    logout();
  };

  console.log(currentUser?.email)
  return (
    <nav>
      <div className="navbar">
        <Link href="/">
          <h2>Blog</h2>
        </Link>
        <ul>
          {currentUser && <li onClick={signout}>Sign out</li>}
          {!currentUser && (
            <Link href="/auth/login">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
