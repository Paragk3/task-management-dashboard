// pages/api/auth/[...nextauth].js (Moralis example)
import Moralis from 'moralis';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'MoralisAuth',
      name: 'MoralisAuth',
      credentials: {
        message: { label: 'Message', type: 'text', placeholder: '0x0' },
        signature: { label: 'Signature', type: 'text', placeholder: '0x0' },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials;
          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
          const { address, profileId, expirationTime } = (await Moralis.Auth.verify({ message, signature, network: 'evm' })).raw;
          const user = { address, profileId, expirationTime, signature };
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // ... other configurations
});