import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface AIAssistantPanelProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const assistantResponses: { [key: string]: string } = {
  commute_short:
    '🚗 Short commutes mean you don\'t need massive range. Focus on quick charging and maneuverability for city parking!',
  commute_medium:
    '🔋 Medium commutes need reliable range. A 400-450 km range vehicle will give you flexibility without overcharging.',
  commute_long:
    '⚡ Long commutes require range champions! Look for vehicles with 450+ km range and fast-charging capability.',
  charge_home:
    '🏠 Home charging is ideal! Overnight charging means you start each day with a full battery. Consider 7-11 kW home chargers.',
  charge_public:
    '📍 Public charging requires planning. Our vehicles support fast charging (80% in 25-35 min) for convenient stops.',
  drive_city: '🏙️ Urban driving needs agility! Smaller vehicles excel in city traffic with efficient battery usage.',
  drive_highway:
    '🛣️ Highway driving demands range and comfort. Look for vehicles with adaptive cruise control and highway range.',
  family_large:
    '👨‍👩‍👧‍👦 Large families need space! Consider our 7-8 seater models with spacious interiors.',
  budget_low:
    '💰 Great value models start at $25,000! Get excellent features without premium pricing.',
  priority_performance:
    '🏁 Performance seekers: Check out our sports models with 0-100 acceleration under 4 seconds!',
  priority_comfort:
    '☁️ Comfort-focused? Premium models feature luxury interiors, advanced climate control, and smooth suspension.',
  weekend_long:
    '🗺️ Frequent long trips? Invest in a vehicle with 480+ km range for stress-free weekend adventures.',
  climate_cold:
    '❄️ Cold climates? Our heating systems are optimized for winter. Battery preheating maintains efficiency.',
};

export default function AIAssistantPanel({ message, isOpen, onClose }: AIAssistantPanelProps) {
  const getResponse = (msg: string) => {
    return (
      assistantResponses[msg] ||
      "💡 Great choice! This helps me understand your needs better. Keep answering to find your perfect EV!"
    );
  };

  return (
    <div
      className={`fixed right-0 top-16 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 h-screen md:h-auto md:max-h-96 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-secondary">EV Assistant</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto mb-4 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">{getResponse(message)}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary text-sm"
        >
          Got it, continue
        </button>
      </div>
    </div>
  );
}