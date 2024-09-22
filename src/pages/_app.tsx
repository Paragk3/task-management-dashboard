'use client'
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }: any) {
  
  

  return (
    <main className="bg-gray-100 min-h-screen">
    
        <Component {...pageProps} />
       (
        <div className="container mx-auto p-4">
            <Link href="/login">Please login to access the task manager</Link>
          
        </div>
      )
    </main>
  );
}

export default MyApp;