import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Wrench, AlertTriangle, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import { troubleshootingGuides, getGuideCategories } from '@/lib/troubleshootingGuides';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TroubleshootingGuideViewer() {
  const [selectedGuide, setSelectedGuide] = useState(troubleshootingGuides[0].id);
  const [expandedSections, setExpandedSections] = useState<string[]>(['symptoms', 'diagnostic']);
  const [currentStep, setCurrentStep] = useState(0);

  const guide = troubleshootingGuides.find(g => g.id === selectedGuide);
  const categories = getGuideCategories();

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'high':
        return 'bg-red-900/50 text-red-300 border-red-700';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'low':
        return 'bg-green-900/50 text-green-300 border-green-700';
      default:
        return 'bg-slate-900/50 text-slate-300 border-slate-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'hard':
        return 'bg-red-900/50 text-red-300 border-red-700';
      default:
        return 'bg-slate-900/50 text-slate-300 border-slate-700';
    }
  };

  if (!guide) return null;

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
            <AlertCircle className="w-10 h-10 text-red-400" />
            Troubleshooting Guides
          </h1>
          <p className="text-slate-300 text-lg">Diagnostic flowcharts and solutions for common power supply issues</p>
        </div>

        {/* Guide Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {troubleshootingGuides.map(g => (
            <Card
              key={g.id}
              className={`cursor-pointer transition-all ${
                selectedGuide === g.id
                  ? 'bg-red-900/50 border-red-600'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => {
                setSelectedGuide(g.id);
                setCurrentStep(0);
                setExpandedSections(['symptoms', 'diagnostic']);
              }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-200">{g.title}</h3>
                    <p className="text-sm text-slate-400 mt-2">{g.description}</p>
                    <Badge className="mt-3 bg-slate-700 text-slate-300 border-slate-600">
                      {g.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guide Details */}
        {guide && (
          <div className="space-y-8">
            {/* Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl">{guide.title}</CardTitle>
                <CardDescription className="text-base mt-2">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="bg-slate-700 text-slate-300 border-slate-600">
                  {guide.category}
                </Badge>
              </CardContent>
            </Card>

            {/* Symptoms */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('symptoms')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Symptoms
                  </CardTitle>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('symptoms') ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {expandedSections.includes('symptoms') && (
                <CardContent className="border-t border-slate-700 pt-6">
                  <ul className="space-y-3">
                    {guide.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Diagnostic Steps */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('diagnostic')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-400" />
                    Diagnostic Steps
                  </CardTitle>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('diagnostic') ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {expandedSections.includes('diagnostic') && (
                <CardContent className="border-t border-slate-700 pt-6 space-y-4">
                  {guide.diagnosticSteps.map((step) => (
                    <div key={step.step} className="bg-slate-700/30 rounded p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-200">{step.description}</h4>
                          <p className="text-sm text-slate-400 mt-2">
                            <strong>Look for:</strong> {step.whatToLookFor}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {step.tools.map((tool, idx) => (
                              <Badge key={idx} className="bg-slate-600 text-slate-200 border-slate-500">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Possible Causes */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('causes')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Possible Causes
                  </CardTitle>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('causes') ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {expandedSections.includes('causes') && (
                <CardContent className="border-t border-slate-700 pt-6 space-y-4">
                  {guide.possibleCauses.map((cause, idx) => (
                    <div key={idx} className={`rounded p-4 border ${getLikelihoodColor(cause.likelihood)}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold">{cause.cause}</h4>
                          <p className="text-sm mt-2">
                            <strong>How to check:</strong> {cause.howToCheck}
                          </p>
                        </div>
                        <Badge className={getLikelihoodColor(cause.likelihood)}>
                          {cause.likelihood.charAt(0).toUpperCase() + cause.likelihood.slice(1)} Likelihood
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Solutions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('solutions')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Solutions
                  </CardTitle>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('solutions') ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {expandedSections.includes('solutions') && (
                <CardContent className="border-t border-slate-700 pt-6 space-y-6">
                  {guide.solutions.map((solution, idx) => (
                    <div key={idx} className="bg-slate-700/30 rounded p-4 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-200">
                            {guide.possibleCauses.find(c => c.cause.toLowerCase().includes(solution.causeId.split('-')[0]))?.cause || 'Solution'}
                          </h4>
                          <p className="text-sm text-slate-400 mt-1">{solution.solution}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getDifficultyColor(solution.difficulty)}>
                            {solution.difficulty}
                          </Badge>
                          <Badge className="bg-slate-600 text-slate-200 border-slate-500">
                            {solution.estimatedTime}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-slate-300 mb-2">Steps:</h5>
                        <ol className="list-decimal list-inside space-y-2">
                          {solution.steps.map((step, stepIdx) => (
                            <li key={stepIdx} className="text-sm text-slate-300">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Prevention Tips */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('prevention')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Prevention Tips
                  </CardTitle>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedSections.includes('prevention') ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              {expandedSections.includes('prevention') && (
                <CardContent className="border-t border-slate-700 pt-6">
                  <ul className="space-y-3">
                    {guide.preventionTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Safety Warnings */}
            {guide.safetyWarnings.length > 0 && (
              <Alert className="bg-red-900/30 border-red-700">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <AlertDescription className="text-red-200 mt-2">
                  <strong className="block mb-2">Safety Warnings:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {guide.safetyWarnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* References */}
            {guide.references.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>References & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {guide.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-slate-700/30 rounded hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="text-blue-400 hover:text-blue-300 font-semibold">{ref.title}</div>
                        <div className="text-xs text-slate-400 mt-1 truncate">{ref.url}</div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
