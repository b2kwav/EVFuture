import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Zap, Leaf, Gauge, Smile } from 'lucide-react';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
              Find the EV that fits <span className="text-primary">your life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your personal journey to discover the perfect electric vehicle. Understand EV technology through an
              interactive, game-like experience designed for first-time buyers.
            </p>

            <Link
              href="/journey"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`inline-block px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isHovering ? 'animate-pulse-glow' : ''
              }`}
            >
              🚀 Start the Journey
            </Link>
          </div>

          <div className="relative h-96 bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-40 h-40 text-primary opacity-20 animate-bounce" />
            </div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-lg font-semibold text-secondary">ElectriCore Vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-secondary mb-12">Why Choose ElectriCore?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Smile className="w-8 h-8" />,
                title: 'Interactive Learning',
                desc: 'Discover EV technology through guided questions',
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: 'Eco-Friendly',
                desc: 'Zero emissions with cutting-edge battery tech',
              },
              {
                icon: <Gauge className="w-8 h-8" />,
                title: 'Wide Selection',
                desc: 'From budget-friendly to premium performance',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Fast Charging',
                desc: 'Charge 80% battery in under 35 minutes',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-blue-50 p-6 rounded-lg card-hover">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="font-bold text-secondary mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-16">
        <div className="bg-gradient-to-r from-secondary to-blue-900 text-white p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 opacity-90">
            Take the interactive journey and find your perfect ElectriCore vehicle in minutes.
          </p>
          <Link href="/journey" className="inline-block px-8 py-4 bg-primary hover:bg-blue-500 rounded-lg font-bold transition">
            Begin Discovery 🚗
          </Link>
        </div>
      </section>
    </Layout>
  );
}