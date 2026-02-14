import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Info } from 'lucide-react';
import { ohmsLawScenario, multimeterVoltageGuide, multimeterCurrentGuide } from '@/lib/calculatorData';

export function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState<number | ''>('');
  const [current, setCurrent] = useState<number | ''>('');
  const [resistance, setResistance] = useState<number | ''>('');
  const [result, setResult] = useState<{ type: string; value: number } | null>(null);

  const calculate = () => {
    const V = voltage === '' ? null : Number(voltage);
    const I = current === '' ? null : Number(current);
    const R = resistance === '' ? null : Number(resistance);

    // Count how many values are provided
    const providedCount = [V, I, R].filter(v => v !== null).length;

    if (providedCount !== 2) {
      alert('Please enter exactly 2 values to calculate the third');
      return;
    }

    if (V !== null && I !== null && R === null) {
      setResult({ type: 'Resistance', value: V / I });
    } else if (V !== null && R !== null && I === null) {
      setResult({ type: 'Current', value: V / R });
    } else if (I !== null && R !== null && V === null) {
      setResult({ type: 'Voltage', value: I * R });
    }
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">{ohmsLawScenario.problem}</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> {ohmsLawScenario.whyItMatters}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> {ohmsLawScenario.realWorldExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Calculate Ohm's Law: V = I × R</CardTitle>
          <CardDescription>Enter any 2 values to calculate the third</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Voltage (V)</label>
              <Input
                type="number"
                placeholder="Enter voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Current (A)</label>
              <Input
                type="number"
                placeholder="Enter current"
                value={current}
                onChange={(e) => setCurrent(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Resistance (Ω)</label>
              <Input
                type="number"
                placeholder="Enter resistance"
                value={resistance}
                onChange={(e) => setResistance(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white flex-1"
            >
              <Zap className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Reset
            </Button>
          </div>

          {result && (
            <div className="bg-green-900/20 border border-green-500/50 rounded p-4">
              <p className="text-green-400 font-semibold text-lg">
                {result.type}: {result.value.toFixed(4)} {result.type === 'Voltage' ? 'V' : result.type === 'Current' ? 'A' : 'Ω'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Measurement Guides */}
      <Tabs defaultValue="voltage" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="voltage" className="data-[state=active]:bg-cyan-600">How to Measure Voltage</TabsTrigger>
          <TabsTrigger value="current" className="data-[state=active]:bg-cyan-600">How to Measure Current</TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:bg-cyan-600">Safety Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="voltage" className="p-4 space-y-3">
          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">📏 {multimeterVoltageGuide.tool} - {multimeterVoltageGuide.mode}</h4>
            <ol className="space-y-2 text-sm text-slate-300">
              {multimeterVoltageGuide.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cyan-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-3">
            <p className="text-yellow-300 text-sm font-semibold mb-2">⚠️ Common Mistakes:</p>
            <ul className="text-sm text-yellow-200 space-y-1">
              {multimeterVoltageGuide.commonMistakes.map((mistake, i) => (
                <li key={i}>• {mistake}</li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="current" className="p-4 space-y-3">
          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">📏 {multimeterCurrentGuide.tool} - {multimeterCurrentGuide.mode}</h4>
            <ol className="space-y-2 text-sm text-slate-300">
              {multimeterCurrentGuide.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cyan-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
            <p className="text-red-300 text-sm font-semibold mb-2">⚠️ Critical: BREAK THE CIRCUIT</p>
            <p className="text-red-200 text-sm">Never measure current in parallel - it will short circuit your power supply!</p>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="p-4 space-y-3">
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
              <p className="text-red-300 font-semibold mb-2">🚨 Safety Warnings</p>
              <ul className="text-sm text-red-200 space-y-1">
                {ohmsLawScenario.safetyWarnings.map((warning, i) => (
                  <li key={i}>• {warning}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
              <p className="text-blue-300 font-semibold mb-2">✓ Verification Method</p>
              <p className="text-blue-200 text-sm">{ohmsLawScenario.verificationMethod}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Tools Needed */}
      <Card className="bg-slate-900 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Tools You'll Need
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-slate-300">
            {ohmsLawScenario.toolsNeeded.map((tool, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {tool}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Component Links */}
      <Card className="bg-slate-900 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">🛒 Buy Components</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href={ohmsLawScenario.componentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-semibold"
          >
            Shop at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
