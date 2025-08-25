'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-black p-4 flex items-center justify-between">
      <Link href="/" className="text-yellow-500 text-2xl font-bold">Moovie</Link>
      <form onSubmit={handleSearch} className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded"
        />
      </form>
      <div className="flex space-x-4">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/my-list" className="text-white">My List</Link>
       
      </div>
    </nav>
  );
};

export default Navbar;