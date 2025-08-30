import NextAuth, { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from './db';


export const authOptions = {

 providers: [

   CredentialsProvider({

     name: 'Credentials',

     credentials: {

       email: { label: 'Email', type: 'text' },

       password: { label: 'Password', type: 'password' },

     },

    async authorize(credentials, req):Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null; 
        }
      
        try {
          const user = db.users.find(
            (u:{id:number;
            email:string;
        password:string}) => u.email === credentials.email
          );
      
          if (user ) {
            return { id: String(user.id), email: user.email }; 
          }
      
          return null; 
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      }

   }),

 ],

 secret: process.env.NEXTAUTH_SECRET,

 pages: {

   signIn: '/signin',

 },

};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };