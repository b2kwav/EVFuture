import { Zap, Users, Gauge } from 'lucide-react';

interface VehicleCardProps {
  name: string;
  range: number;
  batterySize: number;
  chargingSpeed: string;
  fastCharging: string;
  price: number;
  acceleration: string;
  strengths: string[];
  onView: () => void;
  isRecommended?: boolean;
}

export default function VehicleCard({
  name,
  range,
  batterySize,
  chargingSpeed,
  fastCharging,
  price,
  acceleration,
  strengths,
  onView,
  isRecommended,
}: VehicleCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover transition-all ${
        isRecommended ? 'ring-2 ring-primary' : ''
      }`}
    >
      {isRecommended && (
        <div className="bg-primary text-white py-2 text-center font-bold text-sm">
          ⭐ RECOMMENDED FOR YOU
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary mb-4">{name}</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Range</p>
            <p className="text-lg font-bold text-primary">{range} km</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Battery</p>
            <p className="text-lg font-bold text-primary">{batterySize} kWh</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Charging</p>
            <p className="text-sm font-bold text-primary">{chargingSpeed}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Fast Charge</p>
            <p className="text-sm font-bold text-primary">{fastCharging}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-gray-700">{acceleration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-gray-700">Efficiency optimized</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-secondary mb-2">Strengths:</p>
          <ul className="space-y-1">
            {strengths.map((strength, idx) => (
              <li key={idx} className="text-sm text-gray-600">
                ✓ {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price.toLocaleString()}</span>
          <button onClick={onView} className="btn-primary text-sm">
            View Offer
          </button>
        </div>
      </div>
    </div>
  );
}