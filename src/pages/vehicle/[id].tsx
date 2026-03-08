import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Zap, Gauge, Battery, Cpu, ChevronLeft, Share2 } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  category: string;
  range: number;
  batterySize: number;
  chargingSpeed: string;
  fastCharging: string;
  price: number;
  seating: number;
  acceleration: string;
  topSpeed: number;
  strengths: string[];
  description: string;
}

export default function VehicleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch('/data/vehicles.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.vehicles.find((v: Vehicle) => v.id === parseInt(id as string));
        setVehicle(found);
      });
  }, [id]);

  if (!vehicle) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <p>Loading vehicle details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-blue-600 mb-8 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Main Image/Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary/10 to-blue-100 p-12 rounded-xl mb-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">⚡</div>
                <p className="text-2xl font-bold text-secondary">{vehicle.name}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">Overview</h2>
              <p className="text-gray-700 mb-6 text-lg">{vehicle.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Battery, label: 'Battery', value: `${vehicle.batterySize} kWh` },
                  { icon: Gauge, label: 'Range', value: `${vehicle.range} km` },
                  { icon: Zap, label: 'Acceleration', value: vehicle.acceleration },
                  { icon: Cpu, label: 'Top Speed', value: `${vehicle.topSpeed} km/h` },
                ].map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <div key={idx} className="bg-blue-50 p-4 rounded-lg text-center">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-gray-500">{spec.label}</p>
                      <p className="font-bold text-secondary">{spec.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-secondary mb-4">Key Strengths</h3>
              <ul className="space-y-3">
                {vehicle.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Starting from</p>
                <p className="text-4xl font-bold text-primary">${vehicle.price.toLocaleString()}</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Seating</p>
                  <p className="font-semibold text-secondary">{vehicle.seating} passengers</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Charging (AC)</p>
                  <p className="font-semibold text-secondary">{vehicle.chargingSpeed}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fast Charging (DC)</p>
                  <p className="font-semibold text-secondary">{vehicle.fastCharging}</p>
                </div>
              </div>

              <button className="w-full btn-primary mb-3">
                Schedule Test Drive
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-blue-50 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                📞 Contact our sales team for special offers and financing options.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Specs */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-secondary mb-6">Technical Specifications</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Battery Capacity', value: `${vehicle.batterySize} kWh` },
              { label: 'EPA Range', value: `${vehicle.range} km` },
              { label: 'Acceleration (0-100)', value: vehicle.acceleration },
              { label: 'Top Speed', value: `${vehicle.topSpeed} km/h` },
              { label: 'Seating Capacity', value: `${vehicle.seating} seats` },
              { label: 'AC Charging', value: vehicle.chargingSpeed },
              { label: 'DC Fast Charging', value: vehicle.fastCharging },
              { label: 'Starting Price', value: `$${vehicle.price.toLocaleString()}` },
            ].map((spec, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">{spec.label}</p>
                <p className="font-bold text-secondary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}