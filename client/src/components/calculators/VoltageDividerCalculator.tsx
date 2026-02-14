import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, GitBranch } from 'lucide-react';

export function VoltageDividerCalculator() {
  const [inputVoltage, setInputVoltage] = useState<number | ''>('');
  const [r1, setR1] = useState<number | ''>('');
  const [r2, setR2] = useState<number | ''>('');
  const [outputVoltage, setOutputVoltage] = useState<number | ''>('');
  const [result, setResult] = useState<{ type: string; value: number } | null>(null);

  const calculateOutput = () => {
    const Vin = inputVoltage === '' ? null : Number(inputVoltage);
    const R1 = r1 === '' ? null : Number(r1);
    const R2 = r2 === '' ? null : Number(r2);

    if (Vin === null || R1 === null || R2 === null) {
      alert('Please enter all values to calculate output voltage');
      return;
    }

    // Vout = Vin × (R2 / (R1 + R2))
    const vout = Vin * (R2 / (R1 + R2));
    setResult({ type: 'Output Voltage', value: vout });
  };

  const calculateR2 = () => {
    const Vin = inputVoltage === '' ? null : Number(inputVoltage);
    const R1 = r1 === '' ? null : Number(r1);
    const Vout = outputVoltage === '' ? null : Number(outputVoltage);

    if (Vin === null || R1 === null || Vout === null) {
      alert('Please enter Vin, R1, and Vout to calculate R2');
      return;
    }

    // R2 = R1 × (Vout / (Vin - Vout))
    const r2Calc = R1 * (Vout / (Vin - Vout));
    setResult({ type: 'R2 Value', value: r2Calc });
  };

  const reset = () => {
    setInputVoltage('');
    setR1('');
    setR2('');
    setOutputVoltage('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">You have a 12V power supply, but your Arduino analog input only accepts 0-5V. How do you safely reduce the voltage so you can measure a sensor?</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> Voltage dividers are used everywhere - from sensor interfaces to audio circuits to battery monitoring. Understanding them helps you protect your circuits and read sensor values correctly.</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> You need to convert 12V to 5V for an Arduino. Using a voltage divider with two resistors, you can safely step down the voltage without damaging your microcontroller.</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Voltage Divider Calculator
          </CardTitle>
          <CardDescription>Calculate output voltage or required resistor values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mode Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Input Voltage (Vin)</label>
              <Input
                type="number"
                placeholder="e.g., 12"
                value={inputVoltage}
                onChange={(e) => setInputVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">R1 (Ω)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10000"
                  value={r1}
                  onChange={(e) => setR1(e.target.value === '' ? '' : Number(e.target.value))}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">R2 (Ω)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10000"
                  value={r2}
                  onChange={(e) => setR2(e.target.value === '' ? '' : Number(e.target.value))}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Output Voltage (Vout) - Optional</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                value={outputVoltage}
                onChange={(e) => setOutputVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Calculate Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={calculateOutput}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1"
            >
              Calculate Vout
            </Button>
            <Button
              onClick={calculateR2}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1"
            >
              Calculate R2
            </Button>
            <Button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Reset
            </Button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-green-900/20 border border-green-500/50 rounded p-4">
              <p className="text-green-400 font-semibold text-lg">
                {result.type}: {result.value.toFixed(2)}
                {result.type === 'Output Voltage' ? 'V' : 'Ω'}
              </p>
              <p className="text-green-300 text-sm mt-2">
                💡 Tip: Use standard resistor values from the E12 or E24 series for best results.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Tabs */}
      <Tabs defaultValue="formula" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="formula" className="data-[state=active]:bg-blue-600">Formula</TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-blue-600">Build Guide</TabsTrigger>
          <TabsTrigger value="examples" className="data-[state=active]:bg-blue-600">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="formula" className="p-4 space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded p-3 space-y-3">
            <div>
              <p className="text-purple-300 font-semibold">Basic Formula:</p>
              <p className="text-purple-200 text-sm font-mono">Vout = Vin × (R2 / (R1 + R2))</p>
            </div>
            <div>
              <p className="text-purple-300 font-semibold">To Calculate R2:</p>
              <p className="text-purple-200 text-sm font-mono">R2 = R1 × (Vout / (Vin - Vout))</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-300 text-xs">
                Where: Vin = Input voltage, Vout = Output voltage, R1 = Top resistor, R2 = Bottom resistor
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-2">🔧 How to Build</p>
            <ol className="text-blue-200 text-sm space-y-2">
              <li>1. Calculate R1 and R2 using this calculator</li>
              <li>2. Buy resistors from Digilog (use nearest standard values)</li>
              <li>3. Connect: Vin → R1 → Junction → R2 → Ground</li>
              <li>4. Take output from Junction (between R1 and R2)</li>
              <li>5. Connect output to your circuit (Arduino input, etc.)</li>
              <li>6. Verify: Measure output voltage with multimeter</li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="p-4 space-y-3">
          <div className="space-y-3">
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-blue-400">Example 1: 12V to 5V</p>
              <p className="text-sm text-slate-300 mt-1">Vin = 12V, R1 = 10kΩ, R2 = 5.6kΩ</p>
              <p className="text-sm text-slate-400">Vout = 12 × (5.6 / (10 + 5.6)) = 4.7V ≈ 5V</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-blue-400">Example 2: 5V to 3.3V</p>
              <p className="text-sm text-slate-300 mt-1">Vin = 5V, R1 = 10kΩ, R2 = 6.8kΩ</p>
              <p className="text-sm text-slate-400">Vout = 5 × (6.8 / (10 + 6.8)) = 2.9V ≈ 3.3V</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
              <p className="font-semibold text-blue-400">Example 3: 9V Battery to 4.5V</p>
              <p className="text-sm text-slate-300 mt-1">Vin = 9V, R1 = 10kΩ, R2 = 10kΩ</p>
              <p className="text-sm text-slate-400">Vout = 9 × (10 / (10 + 10)) = 4.5V</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Safety & Important Notes */}
      <Card className="bg-slate-900 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">⚠️ Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-red-200">
          <p>• Voltage dividers draw current from the input source (use high resistor values to minimize current draw)</p>
          <p>• Output impedance is high - don't draw too much current from the output</p>
          <p>• For sensitive measurements, use a buffer amplifier after the divider</p>
          <p>• Always verify output voltage with a multimeter before connecting to sensitive circuits</p>
          <p>• Use standard resistor values (E12/E24 series) for reliable results</p>
        </CardContent>
      </Card>

      {/* Component Links */}
      <Card className="bg-slate-900 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">🛒 Buy Components</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
          >
            Shop Resistors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
