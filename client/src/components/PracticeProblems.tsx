import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface ProblemStep {
  question: string;
  hint: string;
  expectedAnswer: number;
  tolerance: number; // percentage tolerance
  unit: string;
  explanation: string;
}

interface PracticeProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  realWorldScenario: string;
  steps: ProblemStep[];
  completionTime: string;
  relatedCalculators: string[];
}

interface PracticeProblemsProps {
  problems: PracticeProblem[];
}

export function PracticeProblems({ problems }: PracticeProblemsProps) {
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(problems[0] || null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | '' }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { correct: boolean; message: string } }>({});
  const [showHint, setShowHint] = useState<{ [key: number]: boolean }>({});
  const [problemsCompleted, setProblemsCompleted] = useState<string[]>([]);

  if (!selectedProblem) {
    return <div className="text-slate-400">No practice problems available</div>;
  }

  const problem = selectedProblem;
  const step = problem.steps[currentStep];
  const isAnswered = currentStep in feedback;
  const isCorrect = feedback[currentStep]?.correct;

  const checkAnswer = () => {
    const userAnswer = answers[currentStep];
    if (userAnswer === '') {
      alert('Please enter an answer');
      return;
    }

    const numAnswer = Number(userAnswer);
    const tolerance = (step.expectedAnswer * step.tolerance) / 100;
    const isCorrectAnswer =
      numAnswer >= step.expectedAnswer - tolerance &&
      numAnswer <= step.expectedAnswer + tolerance;

    setFeedback({
      ...feedback,
      [currentStep]: {
        correct: isCorrectAnswer,
        message: isCorrectAnswer
          ? `✓ Correct! ${step.explanation}`
          : `✗ Not quite. Expected: ${step.expectedAnswer}${step.unit} (±${step.tolerance}%). ${step.explanation}`
      }
    });
  };

  const nextStep = () => {
    if (currentStep < problem.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Problem completed
      if (!problemsCompleted.includes(problem.id)) {
        setProblemsCompleted([...problemsCompleted, problem.id]);
      }
      alert('🎉 Problem completed! Great job!');
    }
  };

  const resetProblem = () => {
    setCurrentStep(0);
    setAnswers({});
    setFeedback({});
    setShowHint({});
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900/20 border-green-500/50 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400';
      case 'Advanced':
        return 'bg-red-900/20 border-red-500/50 text-red-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  const completionPercentage = Math.round(
    (Object.keys(feedback).length / problem.steps.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Problem Selection */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-300">📝 Select a Practice Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {problems.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProblem(p);
                  resetProblem();
                }}
                className={`w-full p-3 rounded text-left transition border ${
                  selectedProblem?.id === p.id
                    ? 'bg-cyan-900/30 border-cyan-500/50'
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200">{p.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{p.completionTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                    {problemsCompleted.includes(p.id) && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Problem Details */}
      <Card className="bg-slate-900 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400">{problem.title}</CardTitle>
          <CardDescription>{problem.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Real-World Scenario */}
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <p className="text-sm font-semibold text-slate-300 mb-2">🌍 Real-World Scenario:</p>
            <p className="text-sm text-slate-400">{problem.realWorldScenario}</p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-slate-300">
                Step {currentStep + 1} of {problem.steps.length}
              </p>
              <p className="text-sm text-slate-400">{completionPercentage}% complete</p>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-4 space-y-3">
            <p className="text-blue-300 font-semibold">{step.question}</p>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter your answer"
                value={answers[currentStep] ?? ''}
                onChange={(e) => setAnswers({ ...answers, [currentStep]: e.target.value === '' ? '' : Number(e.target.value) })}
                disabled={isAnswered}
                className="bg-slate-800 border-slate-600 text-white flex-1"
              />
              <span className="text-slate-400 font-semibold">{step.unit}</span>
            </div>

            {/* Hint */}
            {!isAnswered && (
              <Button
                onClick={() => setShowHint({ ...showHint, [currentStep]: !showHint[currentStep] })}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showHint[currentStep] ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}

            {showHint[currentStep] && !isAnswered && (
              <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-3">
                <p className="text-yellow-300 text-sm">{step.hint}</p>
              </div>
            )}

            {/* Feedback */}
            {isAnswered && (
              <div
                className={`rounded p-3 flex items-start gap-2 ${
                  isCorrect
                    ? 'bg-green-900/20 border border-green-500/50'
                    : 'bg-red-900/20 border border-red-500/50'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                  {feedback[currentStep]?.message}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!isAnswered ? (
              <Button
                onClick={checkAnswer}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
              >
                {currentStep === problem.steps.length - 1 ? 'Complete Problem' : 'Next Step'}
              </Button>
            )}
            <Button
              onClick={resetProblem}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Calculators */}
      {problem.relatedCalculators.length > 0 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-300">🧮 Related Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-3">Use these calculators to help solve this problem:</p>
            <div className="flex flex-wrap gap-2">
              {problem.relatedCalculators.map(calc => (
                <a
                  key={calc}
                  href="/calculators"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-sm font-semibold"
                >
                  {calc}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <Card className="bg-blue-900/20 border-blue-500/50">
        <CardHeader>
          <CardTitle className="text-blue-400">💡 Problem-Solving Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-200">
          <p>• Read the problem carefully and identify what you need to find</p>
          <p>• List the given values and identify the formula to use</p>
          <p>• Use the related calculators to verify your calculations</p>
          <p>• Check your answer makes sense in the real-world context</p>
          <p>• If stuck, use the hint to guide your thinking</p>
          <p>• Review the explanation to understand the concept better</p>
        </CardContent>
      </Card>
    </div>
  );
}
