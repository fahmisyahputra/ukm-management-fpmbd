'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });

  if (res?.error) {
    setError('Email atau password salah');
  } else {
    // Ambil session baru
    const sessionRes = await fetch('/api/auth/session');
    const session = await sessionRes.json();
    const role = session?.user?.role;

    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'clubManager') {
      router.push('/manager');
    } else {
      router.push('/student');
    }
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Navbar Placeholder */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center px-6">
        <div className="font-bold">ITS</div>
        <nav className="space-x-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/clubs" className="hover:underline">Clubs</a>
          <a href="/events" className="hover:underline">Events</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/login" className="hover:underline font-bold">Login</a>
        </nav>
      </header>

      {/* Main Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="flex flex-col md:flex-row w-full max-w-5xl gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Login</h2>
            <p className="text-sm text-gray-600">Fill in your details below.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-white p-8 border rounded shadow-sm"
          >
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <label className="block text-sm font-medium mb-1 text-blue-900">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mb-4 px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1 text-blue-900">Password</label>
            <input
              type="password"
              placeholder="Type your password here"
              className="w-full mb-2 px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-blue-700 mb-4 hover:underline cursor-pointer">
              Forgot your password?
            </p>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t text-center py-6 text-sm text-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center px-6">
          <p>Contact Us: email@example.edu</p>
          <p>Follow Us: Facebook | Instagram | Twitter</p>
          <p>&copy; 2023 Institute Of Technology Sepuluh Nopember</p>
        </div>
      </footer>
    </div>
  );
}
