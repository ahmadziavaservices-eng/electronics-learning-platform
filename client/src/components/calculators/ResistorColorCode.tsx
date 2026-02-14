import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Info } from 'lucide-react';
import { resistorColorCodeScenario, internationalStandards } from '@/lib/calculatorData';

export function ResistorColorCode() {
  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [result, setResult] = useState<{ value: number; tolerance: string } | null>(null);

  const colorValues: { [key: string]: number } = {
    'Black': 0, 'Brown': 1, 'Red': 2, 'Orange': 3, 'Yellow': 4,
    'Green': 5, 'Blue': 6, 'Violet': 7, 'Grey': 8, 'White': 9
  };

  const colorCodes = Object.keys(colorValues);

  const multiplierValues: { [key: string]: number } = {
    'Black': 1, 'Brown': 10, 'Red': 100, 'Orange': 1000, 'Yellow': 10000,
    'Green': 100000, 'Blue': 1000000, 'Violet': 10000000, 'Grey': 100000000, 'White': 1000000000,
    'Gold': 0.1, 'Silver': 0.01
  };

  const toleranceValues: { [key: string]: string } = {
    'Brown': '±1%', 'Red': '±2%', 'Gold': '±5%', 'Silver': '±10%'
  };

  const calculate = () => {
    if (!band1 || !band2 || !multiplier) {
      alert('Please select Band 1, Band 2, and Multiplier');
      return;
    }

    const firstDigit = colorValues[band1];
    const secondDigit = colorValues[band2];
    const mult = multiplierValues[multiplier];
    const baseValue = (firstDigit * 10 + secondDigit) * mult;

    setResult({
      value: baseValue,
      tolerance: tolerance ? toleranceValues[tolerance] || 'Unknown' : 'No tolerance band'
    });
  };

  const reset = () => {
    setBand1('');
    setBand2('');
    setMultiplier('');
    setTolerance('');
    setResult(null);
  };

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Black': 'bg-black',
      'Brown': 'bg-amber-900',
      'Red': 'bg-red-600',
      'Orange': 'bg-orange-500',
      'Yellow': 'bg-yellow-400 text-black',
      'Green': 'bg-green-600',
      'Blue': 'bg-blue-600',
      'Violet': 'bg-violet-600',
      'Grey': 'bg-gray-400 text-black',
      'White': 'bg-white text-black',
      'Gold': 'bg-yellow-500 text-black',
      'Silver': 'bg-gray-300 text-black'
    };
    return colorMap[color] || '';
  };

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">{resistorColorCodeScenario.problem}</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> {resistorColorCodeScenario.whyItMatters}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> {resistorColorCodeScenario.realWorldExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">Resistor Color Code Decoder</CardTitle>
          <CardDescription>Select color bands to calculate resistor value</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Band Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Band 1 (First Digit)</label>
              <div className="grid grid-cols-5 gap-2">
                {colorCodes.map(color => (
                  <button
                    key={color}
                    onClick={() => setBand1(color)}
                    className={`p-3 rounded font-semibold text-sm transition ${
                      band1 === color
                        ? 'ring-2 ring-green-400'
                        : ''
                    } ${getColorStyle(color)}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Band 2 (Second Digit)</label>
              <div className="grid grid-cols-5 gap-2">
                {colorCodes.map(color => (
                  <button
                    key={color}
                    onClick={() => setBand2(color)}
                    className={`p-3 rounded font-semibold text-sm transition ${
                      band2 === color
                        ? 'ring-2 ring-green-400'
                        : ''
                    } ${getColorStyle(color)}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Multiplier (×)</label>
              <div className="grid grid-cols-5 gap-2">
                {Object.keys(multiplierValues).map(color => (
                  <button
                    key={color}
                    onClick={() => setMultiplier(color)}
                    className={`p-3 rounded font-semibold text-sm transition ${
                      multiplier === color
                        ? 'ring-2 ring-green-400'
                        : ''
                    } ${getColorStyle(color)}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 block mb-2">Tolerance (Optional)</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(toleranceValues).map(color => (
                  <button
                    key={color}
                    onClick={() => setTolerance(color)}
                    className={`p-3 rounded font-semibold text-sm transition ${
                      tolerance === color
                        ? 'ring-2 ring-green-400'
                        : ''
                    } ${getColorStyle(color)}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex gap-2">
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex-1"
            >
              Calculate Resistance
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
                Resistance: {result.value >= 1000000 ? (result.value / 1000000).toFixed(2) + ' MΩ' : 
                           result.value >= 1000 ? (result.value / 1000).toFixed(2) + ' kΩ' : 
                           result.value.toFixed(2) + ' Ω'}
              </p>
              <p className="text-green-300 text-sm mt-1">Tolerance: {result.tolerance}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Tabs */}
      <Tabs defaultValue="standards" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="standards" className="data-[state=active]:bg-green-600">Standards</TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-green-600">Quick Guide</TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-green-600">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="p-4 space-y-3">
          <div className="space-y-3">
            <div>
              <p className="text-green-400 font-semibold mb-2">📊 Standard Resistor Series</p>
              <div className="bg-slate-800 p-3 rounded text-sm text-slate-300 space-y-1">
                <p><strong>E12 Series:</strong> 12 values per decade (most common)</p>
                <p><strong>E24 Series:</strong> 24 values per decade (more precise)</p>
                <p><strong>E96 Series:</strong> 96 values per decade (high precision)</p>
              </div>
            </div>
            <div>
              <p className="text-green-400 font-semibold mb-2">🎨 Color Code Rules</p>
              <div className="bg-slate-800 p-3 rounded text-sm text-slate-300 space-y-1">
                <p>• Black = 0, Brown = 1, Red = 2, Orange = 3, Yellow = 4</p>
                <p>• Green = 5, Blue = 6, Violet = 7, Grey = 8, White = 9</p>
                <p>• Gold multiplier = ×0.1, Silver = ×0.01</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-2">📖 How to Read Color Bands</p>
            <ol className="text-blue-200 text-sm space-y-2">
              <li>1. <strong>Hold resistor</strong> with tolerance band on right</li>
              <li>2. <strong>Read left to right:</strong> First color = 1st digit</li>
              <li>3. <strong>Second color</strong> = 2nd digit</li>
              <li>4. <strong>Third color</strong> = Multiplier (how many zeros)</li>
              <li>5. <strong>Fourth color</strong> = Tolerance (accuracy)</li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="p-4 space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded p-3">
            <p className="text-purple-300 font-semibold mb-2">✓ Verify with Multimeter</p>
            <ol className="text-purple-200 text-sm space-y-2">
              <li>1. Set multimeter to <strong>Resistance mode (Ω)</strong></li>
              <li>2. Disconnect resistor from circuit</li>
              <li>3. Touch probes to resistor leads</li>
              <li>4. Compare reading to color code value</li>
              <li>5. Should be within tolerance range</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>

      {/* Component Links */}
      <Card className="bg-slate-900 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🛒 Buy Resistors</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
          >
            Shop Resistors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
