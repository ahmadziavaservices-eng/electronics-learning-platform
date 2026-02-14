import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Zap, Info } from 'lucide-react';
import { powerCalculatorScenario } from '@/lib/calculatorData';

export function PowerCalculator() {
  const [voltage, setVoltage] = useState<number | ''>('');
  const [current, setCurrent] = useState<number | ''>('');
  const [resistance, setResistance] = useState<number | ''>('');
  const [power, setPower] = useState<number | ''>('');
  const [result, setResult] = useState<{ type: string; value: number; unit: string } | null>(null);

  const calculate = () => {
    const V = voltage === '' ? null : Number(voltage);
    const I = current === '' ? null : Number(current);
    const R = resistance === '' ? null : Number(resistance);
    const P = power === '' ? null : Number(power);

    const providedCount = [V, I, R, P].filter(v => v !== null).length;

    if (providedCount < 2) {
      alert('Please enter at least 2 values to calculate');
      return;
    }

    // P = V × I
    if (V !== null && I !== null) {
      const calculatedPower = V * I;
      setResult({ type: 'Power', value: calculatedPower, unit: 'W' });
    }
    // P = V² / R
    else if (V !== null && R !== null) {
      const calculatedPower = (V * V) / R;
      setResult({ type: 'Power', value: calculatedPower, unit: 'W' });
    }
    // P = I² × R
    else if (I !== null && R !== null) {
      const calculatedPower = (I * I) * R;
      setResult({ type: 'Power', value: calculatedPower, unit: 'W' });
    }
    // V = P / I
    else if (P !== null && I !== null && V === null) {
      const calculatedVoltage = P / I;
      setResult({ type: 'Voltage', value: calculatedVoltage, unit: 'V' });
    }
    // I = P / V
    else if (P !== null && V !== null && I === null) {
      const calculatedCurrent = P / V;
      setResult({ type: 'Current', value: calculatedCurrent, unit: 'A' });
    }
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResult(null);
  };

  const resistorWattageGuide = [
    { power: '0.1W (1/10W)', maxPower: '0.1W', use: 'Very small circuits, signal processing' },
    { power: '0.25W (1/4W)', maxPower: '0.25W', use: 'Most common, LED circuits, general use' },
    { power: '0.5W (1/2W)', maxPower: '0.5W', use: 'Power circuits, higher currents' },
    { power: '1W', maxPower: '1W', use: 'High power circuits, heating elements' },
    { power: '2W', maxPower: '2W', use: 'Very high power, industrial use' }
  ];

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">{powerCalculatorScenario.problem}</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> {powerCalculatorScenario.whyItMatters}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> {powerCalculatorScenario.realWorldExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Power Calculator: P = V × I</CardTitle>
          <CardDescription>Enter any 2 values to calculate power or missing values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Power (W)</label>
              <Input
                type="number"
                placeholder="Enter power"
                value={power}
                onChange={(e) => setPower(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white flex-1"
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
                {result.type}: {result.value.toFixed(4)} {result.unit}
              </p>
              {result.type === 'Power' && (
                <p className="text-green-300 text-sm mt-2">
                  💡 Tip: Use a resistor with power rating higher than {result.value.toFixed(2)}W
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resistor Wattage Guide */}
      <Card className="bg-slate-900 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">📊 Resistor Wattage Guide</CardTitle>
          <CardDescription>Choose the right resistor power rating for your circuit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {resistorWattageGuide.map((guide, i) => (
              <div key={i} className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-orange-400">{guide.power}</p>
                    <p className="text-sm text-slate-400">{guide.use}</p>
                  </div>
                  <span className="text-slate-300 text-sm">Max: {guide.maxPower}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-red-900/20 border border-red-500/50 rounded p-3">
            <p className="text-red-300 text-sm font-semibold">⚠️ Important:</p>
            <p className="text-red-200 text-sm">Always use a resistor with power rating HIGHER than calculated. Example: If calculated power is 0.15W, use a 1/4W (0.25W) resistor.</p>
          </div>
        </CardContent>
      </Card>

      {/* Safety & Verification */}
      <Tabs defaultValue="safety" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="safety" className="data-[state=active]:bg-yellow-600">Safety Tips</TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-yellow-600">Verification</TabsTrigger>
          <TabsTrigger value="formulas" className="data-[state=active]:bg-yellow-600">Formulas</TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="p-4 space-y-3">
          <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
            <p className="text-red-300 font-semibold mb-2">🚨 Safety Warnings</p>
            <ul className="text-sm text-red-200 space-y-1">
              {powerCalculatorScenario.safetyWarnings.map((warning, i) => (
                <li key={i}>• {warning}</li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-2">✓ How to Verify</p>
            <ol className="text-blue-200 text-sm space-y-2">
              <li>1. Calculate power using this calculator</li>
              <li>2. Measure voltage across resistor with multimeter</li>
              <li>3. Measure current through resistor with multimeter</li>
              <li>4. Multiply V × I - should match calculated power</li>
              <li>5. Feel resistor - should be warm but not too hot</li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="formulas" className="p-4 space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded p-3 space-y-3">
            <div>
              <p className="text-purple-300 font-semibold">P = V × I</p>
              <p className="text-purple-200 text-sm">Power = Voltage × Current (most common)</p>
            </div>
            <div>
              <p className="text-purple-300 font-semibold">P = V² / R</p>
              <p className="text-purple-200 text-sm">Power = Voltage squared ÷ Resistance</p>
            </div>
            <div>
              <p className="text-purple-300 font-semibold">P = I² × R</p>
              <p className="text-purple-200 text-sm">Power = Current squared × Resistance</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Component Links */}
      <Card className="bg-slate-900 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">🛒 Buy Components</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-semibold"
          >
            Shop Resistors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
