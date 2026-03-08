import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Progress from '@/components/Progress';
import QuestionCard from '@/components/QuestionCard';
import AIAssistantPanel from '@/components/AIAssistantPanel';
import { ChevronRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  type: string;
  options: Array<{ id: string; label: string; weight?: { [key: string]: number } }>;
}

export default function Journey() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [lastAnswer, setLastAnswer] = useState('');

  useEffect(() => {
    fetch('/data/questionnaire.json')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionId });
    setLastAnswer(optionId);
    setAssistantOpen(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 800);
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAssistantOpen(false);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    router.push({
      pathname: '/profile',
      query: { answers: JSON.stringify(answers) },
    });
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setAssistantOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <div className="animate-pulse text-primary">
            <div className="text-4xl mb-4">⚡</div>
            <p>Loading your journey...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <div className="bg-white p-12 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-secondary mb-4">Journey Complete! 🎉</h2>
            <p className="text-gray-600 mb-6">Analyzing your lifestyle profile...</p>
            <button onClick={handleComplete} className="btn-primary">
              View Your Profile & Recommendations
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Progress
                current={currentQuestion + 1}
                total={questions.length}
                label={`Step ${currentQuestion + 1} of ${questions.length}`}
              />
            </div>

            <QuestionCard
              question={q.question}
              options={q.options}
              onSelect={handleAnswer}
              selectedId={answers[currentQuestion]}
            />

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Journey
              </button>

              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  {currentQuestion + 1}/{questions.length}
                </p>
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-2 px-4 py-2 text-secondary hover:text-primary transition"
                >
                  Skip <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-blue-100 p-6 rounded-xl sticky top-24">
              <h3 className="font-bold text-secondary mb-4">💡 Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>✓ Be honest with your lifestyle</li>
                <li>✓ Think about your typical week</li>
                <li>✓ Consider future needs too</li>
                <li>✓ Our assistant will explain concepts</li>
              </ul>

              <button
                onClick={() => setAssistantOpen(!assistantOpen)}
                className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
              >
                {assistantOpen ? 'Hide' : 'Open'} EV Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <AIAssistantPanel
        message={lastAnswer}
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </Layout>
  );
}