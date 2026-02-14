import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Clock } from 'lucide-react';

export function RCTimeCalculator() {
  const [resistance, setResistance] = useState<number | ''>('');
  const [capacitance, setCapacitance] = useState<number | ''>('');
  const [timeConstant, setTimeConstant] = useState<number | ''>('');
  const [result, setResult] = useState<{ tau: number; time63: number; time95: number; time99: number } | null>(null);

  const calculateTimeConstant = () => {
    const R = resistance === '' ? null : Number(resistance);
    const C = capacitance === '' ? null : Number(capacitance);

    if (R === null || C === null) {
      alert('Please enter both Resistance and Capacitance');
      return;
    }

    // τ (tau) = R × C
    const tau = R * C;
    const time63 = tau;
    const time95 = 3 * tau;
    const time99 = 5 * tau;

    setResult({
      tau,
      time63,
      time95,
      time99
    });
  };

  const reset = () => {
    setResistance('');
    setCapacitance('');
    setTimeConstant('');
    setResult(null);
  };

  const formatTime = (seconds: number) => {
    if (seconds >= 1) return seconds.toFixed(3) + ' s';
    if (seconds >= 0.001) return (seconds * 1000).toFixed(3) + ' ms';
    if (seconds >= 0.000001) return (seconds * 1000000).toFixed(3) + ' µs';
    return (seconds * 1000000000).toFixed(3) + ' ns';
  };

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">You're designing a timer circuit or a sensor debounce circuit. How long will it take for a capacitor to charge or discharge through a resistor?</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> RC time constants are critical for timing circuits, filters, debouncing switches, and power supply circuits. Understanding them helps you design circuits that work reliably.</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> You have a 10kΩ resistor and 100µF capacitor. Using this calculator, you'll find the time constant is 1 second - perfect for a slow LED fade effect!</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            RC Time Constant Calculator
          </CardTitle>
          <CardDescription>Calculate charging/discharging time for RC circuits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Resistance (Ω)</label>
              <Input
                type="number"
                placeholder="e.g., 10000"
                value={resistance}
                onChange={(e) => setResistance(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400">Enter in Ohms (10000 = 10kΩ)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Capacitance (F)</label>
              <Input
                type="number"
                placeholder="e.g., 0.0001"
                value={capacitance}
                onChange={(e) => setCapacitance(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400">Enter in Farads (0.0001 = 100µF)</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={calculateTimeConstant}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white flex-1"
            >
              Calculate Time Constant
            </Button>
            <Button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Reset
            </Button>
          </div>

          {result && (
            <div className="bg-green-900/20 border border-green-500/50 rounded p-4 space-y-2">
              <p className="text-green-400 font-semibold">Time Constant (τ): {formatTime(result.tau)}</p>
              <div className="bg-slate-800 p-3 rounded space-y-1 text-sm">
                <p className="text-slate-300">
                  <strong>63.2% charged:</strong> <span className="text-green-400">{formatTime(result.time63)}</span>
                </p>
                <p className="text-slate-300">
                  <strong>95% charged:</strong> <span className="text-green-400">{formatTime(result.time95)}</span>
                </p>
                <p className="text-slate-300">
                  <strong>99% charged:</strong> <span className="text-green-400">{formatTime(result.time99)}</span>
                </p>
              </div>
              <p className="text-green-300 text-sm">
                💡 Tip: Use 5τ (five time constants) as the practical charging time for most applications.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Tabs */}
      <Tabs defaultValue="formula" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="formula" className="data-[state=active]:bg-indigo-600">Formula</TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-indigo-600">Charging Curve</TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-indigo-600">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="formula" className="p-4 space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded p-3 space-y-3">
            <div>
              <p className="text-purple-300 font-semibold">Time Constant Formula:</p>
              <p className="text-purple-200 text-sm font-mono">τ (tau) = R × C</p>
              <p className="text-purple-200 text-xs mt-1">Where: R = Resistance (Ω), C = Capacitance (F)</p>
            </div>
            <div>
              <p className="text-purple-300 font-semibold">Charging Voltage Formula:</p>
              <p className="text-purple-200 text-sm font-mono">V(t) = Vs × (1 - e^(-t/τ))</p>
              <p className="text-purple-200 text-xs mt-1">Where: Vs = Supply voltage, t = Time, τ = Time constant</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-300 text-xs">
                After 1τ: 63.2% charged<br/>
                After 3τ: 95% charged<br/>
                After 5τ: 99% charged (practically fully charged)
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-3">📊 Charging Curve Percentages</p>
            <div className="space-y-2">
              {[
                { tau: '0.5τ', percent: '39%' },
                { tau: '1τ', percent: '63.2%' },
                { tau: '2τ', percent: '86.5%' },
                { tau: '3τ', percent: '95%' },
                { tau: '4τ', percent: '98.2%' },
                { tau: '5τ', percent: '99.3%' }
              ].map(item => (
                <div key={item.tau} className="flex justify-between text-sm text-blue-200">
                  <span>{item.tau}</span>
                  <span className="font-semibold">{item.percent} charged</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-indigo-400">Power Supply Filtering</p>
              <p className="text-sm text-slate-300 mt-1">Large capacitors smooth voltage ripple. RC time constant determines how quickly the capacitor charges.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-indigo-400">Switch Debouncing</p>
              <p className="text-sm text-slate-300 mt-1">RC circuits filter out switch bounce noise. Time constant = debounce delay.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-indigo-400">LED Fade Effects</p>
              <p className="text-sm text-slate-300 mt-1">Control charging/discharging speed for smooth LED brightness transitions.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-indigo-400">Audio Filters</p>
              <p className="text-sm text-slate-300 mt-1">RC filters determine cutoff frequency for high-pass and low-pass filters.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-indigo-400">Timing Circuits</p>
              <p className="text-sm text-slate-300 mt-1">Create delays and oscillators with precise timing based on RC values.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Safety & Important Notes */}
      <Card className="bg-slate-900 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400">💡 Design Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-300">
          <p>• Use 5τ as the practical charging/discharging time for circuit design</p>
          <p>• Larger R and C values = longer time constant (slower charging)</p>
          <p>• Smaller R and C values = shorter time constant (faster charging)</p>
          <p>• For debouncing switches, use time constant of 10-20ms</p>
          <p>• Verify charging time with oscilloscope for critical applications</p>
        </CardContent>
      </Card>

      {/* Component Links */}
      <Card className="bg-slate-900 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400">🛒 Buy Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold text-center"
          >
            Shop Resistors at Digilog.pk
          </a>
          <a
            href="https://digilog.pk/capacitors"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold text-center"
          >
            Shop Capacitors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
