// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { db } from './db';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const user = db.users.find(
//           (u) => u.email === credentials?.email && u.password === credentials?.password
//         );
//         if (user) {
//           return { email: user.email };
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/signin',
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };