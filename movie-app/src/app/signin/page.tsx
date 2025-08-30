'use client';

import { signIn } from 'next-auth/react';

import { useState } from 'react';

import { useRouter } from 'next/navigation';



export default function SignIn() {

 const [email, setEmail] = useState('');

 const [password, setPassword] = useState('');

 const [error, setError] = useState('');

 const router = useRouter();



 const handleSubmit = async (e: React.FormEvent) => {

   e.preventDefault();

   const result = await signIn('credentials', {

     redirect: false,

     email,

     password,

   });

   if (result?.error) {

     setError(result.error);

   } else {

     router.push('/');

   }

 };



 return (

   <div className="flex justify-center items-center h-screen">

     <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded">

       <h1 className="text-2xl mb-4">Sign In</h1>

       {error && <p className="text-red-500">{error}</p>}

       <input

         type="email"

         placeholder="Email"

         value={email}

         onChange={(e) => setEmail(e.target.value)}

         className="w-full mb-4 p-2 bg-gray-900"

       />

       <input

         type="password"

         placeholder="Password"

         value={password}

         onChange={(e) => setPassword(e.target.value)}

         className="w-full mb-4 p-2 bg-gray-900"

       />

       <button type="submit" className="bg-yellow-500 text-black w-full p-2">Sign In</button>

     </form>

   </div>

 );

}
