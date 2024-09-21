'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push('/login');
    }
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {isLoggedIn ? (
        <Component {...pageProps} />
      ) : (
        <div className="container mx-auto p-4">
            <Link href="/login">Please login to access the task manager</Link>
          
        </div>
      )}
    </main>
  );
}

export default MyApp;