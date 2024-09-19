import nextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default nextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],

    callbacks:{
        async jwt(token, user, account, profile, isNewUser) {
            if (account.providers == 'github') {
                token.oauthAccesstocken = account.access_token;
            }
            return token;
        },
        async session(session, token) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    secret: process.env.SECRET,
    pages:{
        signIn: 'login',
        signOut: "/logout"
    },
});
