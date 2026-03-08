import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import VehicleCard from '@/components/VehicleCard';
import Link from 'next/link';
import { Zap, ChevronLeft } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  range: number;
  batterySize: number;
  chargingSpeed: string;
  fastCharging: string;
  price: number;
  seating: number;
  acceleration: string;
  topSpeed: number;
  strengths: string[];
  category: string;
}

interface Questionnaire {
  questions: Array<{
    id: number;
    question: string;
    options: Array<{ id: string; label: string }>;
  }>;
}

export default function Profile() {
  const router = useRouter();
  const { answers: answersStr } = router.query;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [profile, setProfile] = useState<string>('');
  const [recommended, setRecommended] = useState<number[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);

  useEffect(() => {
    if (!answersStr) return;

    Promise.all([
      fetch('/data/vehicles.json').then((res) => res.json()),
      fetch('/data/questionnaire.json').then((res) => res.json()),
    ]).then(([vehicleData, questionData]) => {
      setVehicles(vehicleData.vehicles);
      setQuestionnaire(questionData);

      // Parse answers and generate profile
      const answers = JSON.parse(answersStr as string) as { [key: number]: string };

      // Generate profile description
      const profileDesc = generateProfile(answers, questionData);
      setProfile(profileDesc);

      // Get recommendations
      const recs = getRecommendations(answers, vehicleData.vehicles, questionData);
      setRecommended(recs);
    });
  }, [answersStr]);

  const generateProfile = (answers: { [key: number]: string }, questionData: Questionnaire) => {
    let profile = '';

    // Build profile from key answers
    if (answers[0]?.includes('short')) profile += 'Short commuter ';
    if (answers[0]?.includes('long')) profile += 'Long-distance traveler ';
    if (answers[1]?.includes('city')) profile += 'Urban driver ';
    if (answers[1]?.includes('highway')) profile += 'Highway enthusiast ';
    if (answers[5]?.includes('large')) profile += 'with large family needs ';
    if (answers[6]?.includes('low')) profile += 'budget-conscious ';
    if (answers[7]?.includes('performance')) profile += 'performance enthusiast ';

    return profile || 'Balanced EV explorer';
  };

  const getRecommendations = (
    answers: { [key: number]: string },
    vehicleList: Vehicle[],
    questionData: Questionnaire
  ): number[] => {
    const scores: { [key: number]: number } = {};

    vehicleList.forEach((vehicle) => {
      scores[vehicle.id] = 0;

      // Score based on commute distance
      if (answers[0]?.includes('short') && vehicle.range <= 350) scores[vehicle.id] += 2;
      if (answers[0]?.includes('long') && vehicle.range >= 450) scores[vehicle.id] += 2;

      // Score based on family size
      if (answers[5]?.includes('large') && vehicle.seating >= 7) scores[vehicle.id] += 2;
      if (answers[5]?.includes('single') && vehicle.seating <= 5) scores[vehicle.id] += 1;

      // Score based on budget
      if (answers[6]?.includes('low') && vehicle.price <= 35000) scores[vehicle.id] += 2;
      if (answers[6]?.includes('high') && vehicle.price >= 50000) scores[vehicle.id] += 1;

      // Score based on preferences
      if (answers[7]?.includes('performance') && vehicle.acceleration < '6s') scores[vehicle.id] += 2;
      if (answers[7]?.includes('efficiency') && vehicle.batterySize <= 60) scores[vehicle.id] += 1;
    });

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id]) => parseInt(id));
  };

  const toggleVehicleSelection = (vehicleId: number) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleViewOffer = (vehicleId: number) => {
    router.push(`/vehicle/${vehicleId}`);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Back Button */}
        <Link href="/journey" className="flex items-center gap-2 text-primary hover:text-blue-600 mb-8 transition">
          <ChevronLeft className="w-5 h-5" />
          Back to Journey
        </Link>

        {/* Profile Summary */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-8 rounded-xl mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 flex-shrink-0" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Mobility Profile</h1>
              <p className="text-lg opacity-90">
                {profile || 'Analyzing your answers...'}
              </p>
              <p className="mt-4 text-sm opacity-75">
                Based on your lifestyle, here are your top 3 recommended vehicles from our ElectriCore lineup.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-8">Your Recommendations</h2>

          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading recommendations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vehicles
                .filter((v) => recommended.includes(v.id))
                .map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    name={vehicle.name}
                    range={vehicle.range}
                    batterySize={vehicle.batterySize}
                    chargingSpeed={vehicle.chargingSpeed}
                    fastCharging={vehicle.fastCharging}
                    price={vehicle.price}
                    acceleration={vehicle.acceleration}
                    strengths={vehicle.strengths}
                    onView={() => handleViewOffer(vehicle.id)}
                    isRecommended={true}
                  />
                ))}
            </div>
          )}
        </div>

        {/* All Vehicles */}
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-8">Explore All ElectriCore Vehicles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles
              .filter((v) => !recommended.includes(v.id))
              .map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  name={vehicle.name}
                  range={vehicle.range}
                  batterySize={vehicle.batterySize}
                  chargingSpeed={vehicle.chargingSpeed}
                  fastCharging={vehicle.fastCharging}
                  price={vehicle.price}
                  acceleration={vehicle.acceleration}
                  strengths={vehicle.strengths}
                  onView={() => handleViewOffer(vehicle.id)}
                  isRecommended={false}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}