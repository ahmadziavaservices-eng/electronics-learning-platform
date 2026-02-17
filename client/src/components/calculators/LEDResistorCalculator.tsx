import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { ledResistorScenario } from '@/lib/calculatorData';

export function LEDResistorCalculator() {
  const [supplyVoltage, setSupplyVoltage] = useState<number | ''>('');
  const [ledVoltage, setLedVoltage] = useState<number | ''>('');
  const [ledCurrent, setLedCurrent] = useState<number | ''>('');
  const [result, setResult] = useState<{ resistance: number; power: number; wattage: string } | null>(null);

  const calculate = () => {
    const Vs = supplyVoltage === '' ? null : Number(supplyVoltage);
    const Vf = ledVoltage === '' ? null : Number(ledVoltage);
    const If = ledCurrent === '' ? null : Number(ledCurrent);

    if (Vs === null || Vf === null || If === null) {
      alert('Please enter all three values');
      return;
    }

    // R = (Vs - Vf) / If
    const resistance = (Vs - Vf) / If;
    // P = (Vs - Vf) × If
    const power = (Vs - Vf) * If;

    // Determine wattage
    let wattage = '1/8W';
    if (power > 0.25) wattage = '1/2W';
    if (power > 0.5) wattage = '1W';
    if (power > 1) wattage = '2W';

    setResult({ resistance, power, wattage });
  };

  const reset = () => {
    setSupplyVoltage('');
    setLedVoltage('');
    setLedCurrent('');
    setResult(null);
  };

  const ledTypes = [
    { color: 'Red', voltage: '1.8-2.2V', current: '10-20mA' },
    { color: 'Green', voltage: '2.0-3.5V', current: '10-20mA' },
    { color: 'Blue', voltage: '3.0-3.5V', current: '10-20mA' },
    { color: 'White', voltage: '3.0-3.5V', current: '10-20mA' },
    { color: 'Yellow', voltage: '1.8-2.2V', current: '10-20mA' },
    { color: 'RGB', voltage: '2.0-3.5V', current: '10-20mA each' }
  ];

  const commonPowerSupplies = [
    { name: '5V USB', voltage: 5 },
    { name: '9V Battery', voltage: 9 },
    { name: '12V Power Supply', voltage: 12 },
    { name: '3.3V Arduino', voltage: 3.3 }
  ];

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">{ledResistorScenario.problem}</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> {ledResistorScenario.whyItMatters}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> {ledResistorScenario.realWorldExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">LED Resistor Calculator</CardTitle>
          <CardDescription>Calculate the current-limiting resistor for your LED</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Supply Voltage (V)</label>
              <Input
                type="number"
                placeholder="e.g., 5, 9, 12"
                value={supplyVoltage}
                onChange={(e) => setSupplyVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <div className="flex gap-1 flex-wrap mt-2">
                {commonPowerSupplies.map(ps => (
                  <button
                    key={ps.name}
                    onClick={() => setSupplyVoltage(ps.voltage)}
                    className="text-sm bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300"
                  >
                    {ps.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">LED Forward Voltage (V)</label>
              <Input
                type="number"
                placeholder="e.g., 2, 3.3"
                value={ledVoltage}
                onChange={(e) => setLedVoltage(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <div className="text-sm text-slate-400 mt-2">
                <p className="font-semibold mb-1">LED Types:</p>
                {ledTypes.slice(0, 3).map(led => (
                  <button
                    key={led.color}
                    onClick={() => setLedVoltage(Number(led.voltage.split('-')[0]))}
                    className="block text-left w-full hover:text-slate-300 text-sm"
                  >
                    {led.color}: {led.voltage}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">LED Current (A)</label>
              <Input
                type="number"
                placeholder="e.g., 0.02 (20mA)"
                value={ledCurrent}
                onChange={(e) => setLedCurrent(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <div className="text-sm text-slate-400 mt-2">
                <p className="font-semibold mb-1">Quick Select:</p>
                <button
                  onClick={() => setLedCurrent(0.01)}
                  className="block hover:text-slate-300 text-sm"
                >
                  10mA (0.01A)
                </button>
                <button
                  onClick={() => setLedCurrent(0.02)}
                  className="block hover:text-slate-300 text-sm"
                >
                  20mA (0.02A)
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white flex-1"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Calculate Resistor
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
              <p className="text-green-400 font-semibold">
                Resistance: {result.resistance.toFixed(1)}Ω
              </p>
              <p className="text-green-300 text-sm">
                Power Dissipation: {result.power.toFixed(3)}W ({(result.power * 1000).toFixed(0)}mW)
              </p>
              <p className="text-green-300 text-sm font-semibold">
                Use a {result.wattage} resistor (minimum)
              </p>
              <div className="bg-green-900/30 p-2 rounded mt-2">
                <p className="text-green-200 text-sm">
                  💡 Nearest standard resistor: {getNearestStandardResistor(result.resistance)}Ω
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Tabs */}
      <Tabs defaultValue="safety" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="safety" className="data-[state=active]:bg-red-600">Safety</TabsTrigger>
          <TabsTrigger value="leds" className="data-[state=active]:bg-red-600">LED Types</TabsTrigger>
          <TabsTrigger value="build" className="data-[state=active]:bg-red-600">Build Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="p-4 space-y-3">
          <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
            <p className="text-red-300 font-semibold mb-2">🚨 Safety Warnings</p>
            <ul className="text-sm text-red-200 space-y-1">
              {ledResistorScenario.safetyWarnings.map((warning, i) => (
                <li key={i}>• {warning}</li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="leds" className="p-4 space-y-3">
          <div className="space-y-2">
            {ledTypes.map(led => (
              <div key={led.color} className="bg-slate-800 p-3 rounded border border-slate-700">
                <p className="font-semibold text-slate-300">{led.color} LED</p>
                <p className="text-sm text-slate-400">Voltage: {led.voltage}</p>
                <p className="text-sm text-slate-400">Current: {led.current}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="build" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-2">🔧 How to Build</p>
            <ol className="text-blue-200 text-sm space-y-2">
              <li>1. Calculate resistor value using this calculator</li>
              <li>2. Buy resistor from Digilog (nearest standard value)</li>
              <li>3. Connect: Power → Resistor → LED Anode (long leg)</li>
              <li>4. Connect: LED Cathode (short leg) → Ground</li>
              <li>5. Test: LED should light up brightly</li>
              <li>6. Verify: Measure current with multimeter (should match target)</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>

      {/* Component Links */}
      <Card className="bg-slate-900 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">🛒 Buy Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="https://digilog.pk/leds"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold text-center"
          >
            Shop LEDs at Digilog.pk
          </a>
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold text-center"
          >
            Shop Resistors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

function getNearestStandardResistor(value: number): number {
  const e12Series = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
  let nearest = e12Series[0];
  let minDiff = Math.abs(value - nearest);

  for (const resistor of e12Series) {
    const diff = Math.abs(value - resistor);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = resistor;
    }
  }

  // Scale to appropriate range
  if (value < 100) return nearest;
  if (value < 1000) return nearest * 10;
  if (value < 10000) return nearest * 100;
  return nearest * 1000;
}
