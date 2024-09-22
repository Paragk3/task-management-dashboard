import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3001/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
        const user = await res.json()
    
        if (res.ok && user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Return any object with the property 'error' e.g. { error: 'Something went wrong.' }
          // to redirect the user to the login page with a specific error message
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' // Use JWTs for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Set a strong secret for JWT signing
  pages: {
    signIn: '/login' // Customize the sign-in page URL if needed
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    }
  }
});