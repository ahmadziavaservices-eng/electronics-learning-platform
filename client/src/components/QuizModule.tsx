import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy, Zap } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  passingScore: number; // percentage
  badge?: {
    name: string;
    icon: string;
    color: string;
  };
}

interface QuizModuleProps {
  quiz: Quiz;
  onComplete?: (score: number, passed: boolean) => void;
}

export default function QuizModule({ quiz, onComplete }: QuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const finalScore = Math.round((score / totalQuestions) * 100);
  const passed = finalScore >= quiz.passingScore;

  const handleAnswer = (optionIndex: number) => {
    setAnswered(optionIndex);
    setShowExplanation(true);
    
    const newAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(newAnswers);

    if (optionIndex === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      onComplete?.(finalScore, passed);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(null);
    setShowExplanation(false);
    setQuizComplete(false);
    setSelectedAnswers([]);
  };

  if (quizComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 text-green-400 animate-bounce" />
              ) : (
                <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
              )}
            </div>
            <CardTitle className="text-3xl text-white mb-2">
              {passed ? '🎉 Quiz Passed!' : '📚 Keep Learning!'}
            </CardTitle>
            <CardDescription className="text-lg text-cyan-300">
              Your Score: <span className="text-2xl font-bold text-cyan-400">{finalScore}%</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/30">
              <p className="text-white mb-2">
                You answered <span className="text-green-400 font-bold">{score}</span> out of{' '}
                <span className="text-cyan-400 font-bold">{totalQuestions}</span> questions correctly.
              </p>
              <p className="text-slate-300">
                {passed
                  ? `Congratulations! You've earned the "${quiz.badge?.name}" badge! 🏆`
                  : `You need ${quiz.passingScore}% to pass. Try again!`}
              </p>
            </div>

            {passed && quiz.badge && (
              <div className="flex justify-center">
                <div className="text-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/50">
                  <div className="text-4xl mb-2">{quiz.badge.icon}</div>
                  <Badge className="bg-yellow-500 text-black font-bold">
                    {quiz.badge.name}
                  </Badge>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleRestart}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
              >
                Back to Module
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-purple-600 text-white">
              Question {currentQuestion + 1}/{totalQuestions}
            </Badge>
            <Badge className="bg-slate-700 text-cyan-300">
              {finalScore}% Score
            </Badge>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <CardTitle className="text-white text-xl">{question.question}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = answered === index;
              const isCorrect = index === question.correctAnswer;
              const isWrong = isSelected && !isCorrect;

              let borderColor = 'border-slate-600';
              let bgColor = 'bg-slate-800';
              let hoverColor = 'hover:border-cyan-500';

              if (showExplanation) {
                if (isCorrect) {
                  borderColor = 'border-green-500';
                  bgColor = 'bg-green-500/10';
                  hoverColor = '';
                } else if (isWrong) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-500/10';
                  hoverColor = '';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${bgColor} ${borderColor} ${hoverColor} ${
                    showExplanation ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {showExplanation && isWrong && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mt-4">
              <p className="text-blue-300 font-semibold mb-2">Explanation:</p>
              <p className="text-slate-300">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold"
            >
              {currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
