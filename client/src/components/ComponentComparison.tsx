import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, AlertCircle, Download, RotateCw } from 'lucide-react';
import { componentDatabase } from '@/lib/componentDatabase';

interface ComparisonSpec {
  key: string;
  value: string;
}

export default function ComponentComparison() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['lm723', 'lm317']);
  const [comparisonView, setComparisonView] = useState<'table' | 'cards'>('table');

  const regulators = componentDatabase.filter(c => c.category === 'Voltage Regulators');

  const getSelectedComponents = () => {
    return selectedComponents
      .map(id => regulators.find(c => c.id === id))
      .filter(Boolean) as typeof componentDatabase;
  };

  const getAllSpecKeys = () => {
    const keys = new Set<string>();
    getSelectedComponents().forEach(comp => {
      comp.specifications.forEach(spec => keys.add(spec.key));
    });
    return Array.from(keys);
  };

  const getSpecValue = (component: typeof componentDatabase[0], key: string) => {
    const spec = component.specifications.find(s => s.key === key);
    return spec?.value || 'N/A';
  };

  const handleAddComponent = (componentId: string) => {
    if (!selectedComponents.includes(componentId) && selectedComponents.length < 4) {
      setSelectedComponents([...selectedComponents, componentId]);
    }
  };

  const handleRemoveComponent = (componentId: string) => {
    setSelectedComponents(selectedComponents.filter(id => id !== componentId));
  };

  const handleReset = () => {
    setSelectedComponents(['lm723', 'lm317']);
  };

  const selectedComps = getSelectedComponents();
  const specKeys = getAllSpecKeys();

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
            <RotateCw className="w-10 h-10 text-blue-400" />
            Component Comparison Tool
          </h1>
          <p className="text-slate-300 text-lg">Compare voltage regulators and power supply components side-by-side</p>
        </div>

        {/* Component Selection */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle>Select Components to Compare</CardTitle>
            <CardDescription>Choose up to 4 components for comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Components */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedComps.map((comp, idx) => (
                <div key={comp.id} className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                  <div className="font-bold text-blue-300 mb-2">{comp.name}</div>
                  <div className="text-sm text-slate-400 mb-3">{comp.description}</div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveComponent(comp.id)}
                    className="w-full"
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Add Component Slot */}
              {selectedComps.length < 4 && (
                <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <Select onValueChange={handleAddComponent}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Add component..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {regulators
                          .filter(c => !selectedComponents.includes(c.id))
                          .map(comp => (
                            <SelectItem key={comp.id} value={comp.id} className="text-white">
                              {comp.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                onClick={() => setComparisonView(comparisonView === 'table' ? 'cards' : 'table')}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 ml-auto"
              >
                {comparisonView === 'table' ? 'Card View' : 'Table View'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Content */}
        {selectedComps.length > 0 && (
          <>
            {/* Table View */}
            {comparisonView === 'table' && (
              <Card className="bg-slate-800/50 border-slate-700 mb-8 overflow-x-auto">
                <CardHeader>
                  <CardTitle>Detailed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 font-bold text-slate-200 bg-slate-700/50">Specification</th>
                          {selectedComps.map(comp => (
                            <th key={comp.id} className="text-left py-3 px-4 font-bold text-blue-300 bg-slate-700/30">
                              {comp.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {specKeys.map((key, idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-slate-700/20' : ''}>
                            <td className="py-3 px-4 font-semibold text-slate-300 border-r border-slate-700">
                              {key}
                            </td>
                            {selectedComps.map(comp => (
                              <td key={`${comp.id}-${key}`} className="py-3 px-4 text-slate-300 border-r border-slate-700">
                                {getSpecValue(comp, key)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Card View */}
            {comparisonView === 'cards' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {selectedComps.map(comp => (
                  <Card key={comp.id} className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-300">{comp.name}</CardTitle>
                      <CardDescription>{comp.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {comp.specifications.map((spec, idx) => (
                        <div key={idx} className="bg-slate-700/30 rounded p-3">
                          <div className="text-sm text-slate-400 uppercase tracking-wide">{spec.key}</div>
                          <div className="text-sm font-semibold text-slate-200 mt-1">{spec.value}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Comparison Insights */}
            <Card className="bg-slate-800/50 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  Comparison Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Best For Applications */}
                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Best For Applications:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedComps.map(comp => (
                      <div key={comp.id} className="bg-slate-700/30 rounded p-4">
                        <div className="font-semibold text-blue-300 mb-2">{comp.name}</div>
                        <ul className="space-y-1">
                          {comp.applications.map((app, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sourcing Comparison */}
                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Sourcing & Availability:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedComps.map(comp => (
                      <div key={comp.id} className="bg-slate-700/30 rounded p-4">
                        <div className="font-semibold text-blue-300 mb-2">{comp.name}</div>
                        <div className="space-y-2">
                          {comp.sourcing.map((source, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="text-slate-300">{source.vendor}</div>
                              <div className="text-slate-400">{source.estimatedPrice}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternatives */}
                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Alternative Components:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedComps.map(comp => (
                      <div key={comp.id} className="bg-slate-700/30 rounded p-4">
                        <div className="font-semibold text-blue-300 mb-2">{comp.name}</div>
                        <div className="flex flex-wrap gap-2">
                          {comp.alternatives.length > 0 ? (
                            comp.alternatives.map((alt, idx) => (
                              <Badge key={idx} className="bg-purple-900/50 text-purple-300 border-purple-700">
                                {alt}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-slate-400">No alternatives listed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tips */}
                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Pro Tips:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedComps.map(comp => (
                      <div key={comp.id} className="bg-slate-700/30 rounded p-4">
                        <div className="font-semibold text-blue-300 mb-2">{comp.name}</div>
                        <ul className="space-y-2">
                          {comp.tips.map((tip, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-slate-300">
                              <span className="text-yellow-400 font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            {selectedComps.length >= 2 && (
              <Card className="bg-green-900/30 border-green-700">
                <CardHeader>
                  <CardTitle className="text-green-300">Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="text-green-200">
                  <p>
                    Choose based on your application requirements:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2">
                    {selectedComps.map(comp => (
                      <li key={comp.id}>
                        <strong>{comp.name}:</strong> Best for {comp.applications[0] || 'general applications'}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedComps.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400 text-lg">Select components to compare</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
