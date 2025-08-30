import './globals.css';

import ClientProvider from '@/components/ClientProvider';
import Navbar from '@/components/Navbar';



export const metadata = {

 title: 'Moovie',

 description: 'Movie website',

};



export default function RootLayout({ children }: { children: React.ReactNode }) {

 return (

   <html lang="en">

     <body className="bg-black text-white">

       <ClientProvider>

         <Navbar />

         {children}

       </ClientProvider>

     </body>

   </html>

 );

}
