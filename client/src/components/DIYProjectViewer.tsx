import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Clock, Zap, Wrench, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { diyProjects } from '@/lib/diyProjects';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DIYProjectViewer() {
  const [selectedProject, setSelectedProject] = useState(diyProjects[0].id);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const project = diyProjects.find(p => p.id === selectedProject);

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const toggleStepComplete = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
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

  if (!project) return null;

  const completionPercentage = (completedSteps.length / project.steps.length) * 100;

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
            <Wrench className="w-10 h-10 text-blue-400" />
            DIY Projects
          </h1>
          <p className="text-slate-300 text-lg">Complete step-by-step guides for building power supplies</p>
        </div>

        {/* Project Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {diyProjects.map(p => (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all ${
                selectedProject === p.id
                  ? 'bg-blue-900/50 border-blue-600'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => {
                setSelectedProject(p.id);
                setExpandedSteps([0]);
                setCompletedSteps([]);
              }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-200">{p.title}</h3>
                    <p className="text-sm text-slate-400 mt-2">{p.description}</p>
                    <div className="flex gap-2 mt-4">
                      <Badge className={getDifficultyColor(p.difficulty)}>
                        {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                      </Badge>
                      <Badge className="bg-slate-700 text-slate-300 border-slate-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {p.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Details */}
        {project && (
          <div className="space-y-8">
            {/* Project Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="text-base mt-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">Project Progress</span>
                    <span className="text-sm text-slate-400">{Math.round(completionPercentage)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 uppercase">Difficulty</div>
                    <div className="text-lg font-bold text-slate-200 mt-1 capitalize">{project.difficulty}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 uppercase">Duration</div>
                    <div className="text-lg font-bold text-slate-200 mt-1">{project.duration}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 uppercase">Steps</div>
                    <div className="text-lg font-bold text-slate-200 mt-1">{project.steps.length}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 uppercase">Materials</div>
                    <div className="text-lg font-bold text-slate-200 mt-1">{project.materials.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="materials" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 p-2 rounded-lg">
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="outcomes">Learning</TabsTrigger>
              </TabsList>

              {/* Materials Tab */}
              <TabsContent value="materials">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Materials & Components</CardTitle>
                    <CardDescription>All materials needed for this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.materials.map((material, idx) => (
                        <div key={idx} className="bg-slate-700/30 rounded p-4 flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-semibold text-slate-200">{material.name}</div>
                            <div className="text-sm text-slate-400 mt-1">
                              Quantity: {material.quantity} {material.unit}
                            </div>
                            {material.source && (
                              <a
                                href={material.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                              >
                                View on {material.source.includes('digilog') ? 'Digilog' : 'Supplier'} →
                              </a>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-200">{material.estimatedCost}</div>
                            <div className="text-xs text-slate-400 mt-1">Estimated</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Cost */}
                    <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded p-4">
                      <div className="text-sm text-slate-400">Total Estimated Cost</div>
                      <div className="text-2xl font-bold text-blue-400 mt-1">
                        Varies by supplier
                      </div>
                      <div className="text-xs text-slate-400 mt-2">
                        Check Digilog.pk for current pricing
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tools Tab */}
              <TabsContent value="tools">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Required Tools</CardTitle>
                    <CardDescription>Equipment needed to complete this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.tools.map((tool, idx) => (
                        <div key={idx} className="bg-slate-700/30 rounded p-4 flex items-center gap-3">
                          <Wrench className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-slate-200">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Steps Tab */}
              <TabsContent value="steps">
                <div className="space-y-4">
                  {project.steps.map((step) => (
                    <Card
                      key={step.number}
                      className="bg-slate-800/50 border-slate-700 cursor-pointer hover:border-slate-600 transition-all"
                      onClick={() => toggleStep(step.number)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex-shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="p-0 h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStepComplete(step.number);
                                }}
                              >
                                {completedSteps.includes(step.number) ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                                ) : (
                                  <div className="w-6 h-6 border-2 border-slate-500 rounded-full" />
                                )}
                              </Button>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">
                                Step {step.number}: {step.title}
                              </CardTitle>
                            </div>
                          </div>
                          {expandedSteps.includes(step.number) ? (
                            <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>

                      {expandedSteps.includes(step.number) && (
                        <CardContent className="border-t border-slate-700 pt-6 space-y-6">
                          {/* Description */}
                          <div>
                            <h4 className="font-semibold text-slate-200 mb-2">Description</h4>
                            <p className="text-slate-300">{step.description}</p>
                          </div>

                          {/* Tips */}
                          {step.tips.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                Pro Tips
                              </h4>
                              <ul className="space-y-2">
                                {step.tips.map((tip, idx) => (
                                  <li key={idx} className="flex gap-3 text-sm text-slate-300">
                                    <span className="text-yellow-400 font-bold">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Warnings */}
                          {step.warnings.length > 0 && (
                            <Alert className="bg-red-900/30 border-red-700">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <AlertDescription className="text-red-200">
                                <strong>Warnings:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                  {step.warnings.map((warning, idx) => (
                                    <li key={idx}>{warning}</li>
                                  ))}
                                </ul>
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Learning Outcomes Tab */}
              <TabsContent value="outcomes">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Learning Outcomes</CardTitle>
                    <CardDescription>What you'll learn from this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-slate-700/30 rounded">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-200">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Troubleshooting */}
            {project.troubleshooting.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Troubleshooting
                  </CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.troubleshooting.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-amber-600 pl-4">
                        <div className="font-semibold text-amber-300">{item.problem}</div>
                        <div className="text-sm text-slate-400 mt-1">
                          <strong>Cause:</strong> {item.cause}
                        </div>
                        <div className="text-sm text-slate-300 mt-2">
                          <strong>Solution:</strong> {item.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {project.nextSteps.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>What to do after completing this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-blue-900/30 rounded border border-blue-700">
                        <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-200">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* References */}
            {project.references.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>References & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.references.map((ref, idx) => (
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
