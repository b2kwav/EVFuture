import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition">
            <Zap className="w-6 h-6 text-primary" />
            <span>ElectriCore</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link href="/journey" className="hover:text-primary transition">
              Start Journey
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}