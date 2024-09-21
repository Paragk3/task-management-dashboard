'use client'

import '@/styles/globals.css';


function MyApp({ Component, pageProps }: any) {
  

  
  return (
    <main className="bg-gray-100 min-h-screen">
       
        <Component {...pageProps} />
      
        
      
    </main>
  );
}

export default MyApp;