import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-semibold tracking-tight">
            Perpustakaan Dashboard
          </Link>
          <div className="flex space-x-1">
            <Link href="/dashboard" className="px-4 py-2 rounded-full text-white text-sm font-medium bg-blue-400 bg-opacity-30 hover:bg-opacity-40 transition duration-300 ease-in-out">
              Dashboard
            </Link>
            <Link href="/data" className="px-4 py-2 rounded-full text-white text-sm font-medium bg-blue-400 bg-opacity-30 hover:bg-opacity-40 transition duration-300 ease-in-out">
              Data
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}