import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Cpu } from 'lucide-react';

export function SMDResistorCalculator() {
  const [codeType, setCodeType] = useState('3-digit');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);

  const smdCodes3Digit: { [key: string]: number } = {
    '100': 10, '101': 100, '102': 1000, '103': 10000, '104': 100000, '105': 1000000,
    '106': 10000000, '110': 12, '111': 120, '112': 1200, '113': 12000, '114': 120000,
    '115': 1200000, '120': 15, '121': 150, '122': 1500, '123': 15000, '124': 150000,
    '125': 1500000, '150': 15, '151': 150, '152': 1500, '153': 15000, '154': 150000,
    '155': 1500000, '160': 16, '161': 160, '162': 1600, '163': 16000, '164': 160000,
    '165': 1600000, '180': 18, '181': 180, '182': 1800, '183': 18000, '184': 180000,
    '185': 1800000, '200': 20, '201': 200, '202': 2000, '203': 20000, '204': 200000,
    '205': 2000000, '220': 22, '221': 220, '222': 2200, '223': 22000, '224': 220000,
    '225': 2200000, '240': 24, '241': 240, '242': 2400, '243': 24000, '244': 240000,
    '245': 2400000, '270': 27, '271': 270, '272': 2700, '273': 27000, '274': 270000,
    '275': 2700000, '300': 30, '301': 300, '302': 3000, '303': 30000, '304': 300000,
    '305': 3000000, '330': 33, '331': 330, '332': 3300, '333': 33000, '334': 330000,
    '335': 3300000, '360': 36, '361': 360, '362': 3600, '363': 36000, '364': 360000,
    '365': 3600000, '390': 39, '391': 390, '392': 3900, '393': 39000, '394': 390000,
    '395': 3900000, '430': 43, '431': 430, '432': 4300, '433': 43000, '434': 430000,
    '435': 4300000, '470': 47, '471': 470, '472': 4700, '473': 47000, '474': 470000,
    '475': 4700000, '510': 51, '511': 510, '512': 5100, '513': 51000, '514': 510000,
    '515': 5100000, '560': 56, '561': 560, '562': 5600, '563': 56000, '564': 560000,
    '565': 5600000, '620': 62, '621': 620, '622': 6200, '623': 62000, '624': 620000,
    '625': 6200000, '680': 68, '681': 680, '682': 6800, '683': 68000, '684': 680000,
    '685': 6800000, '750': 75, '751': 750, '752': 7500, '753': 75000, '754': 750000,
    '755': 7500000, '820': 82, '821': 820, '822': 8200, '823': 82000, '824': 820000,
    '825': 8200000, '910': 91, '911': 910, '912': 9100, '913': 91000, '914': 910000,
    '915': 9100000
  };

  const smdCodes4Digit: { [key: string]: number } = {
    '1000': 100, '1001': 101, '1002': 102, '1003': 103, '1004': 104, '1005': 105,
    '1006': 106, '1007': 107, '1008': 108, '1009': 109, '1010': 110, '1100': 110,
    '1101': 111, '1102': 112, '1103': 113, '1104': 114, '1105': 115, '1106': 116,
    '1107': 117, '1108': 118, '1109': 119, '1200': 120, '1210': 121, '1220': 122,
    '1230': 123, '1240': 124, '1250': 125, '1260': 126, '1270': 127, '1280': 128,
    '1290': 129, '1300': 130, '1500': 150, '1600': 160, '1800': 180, '2000': 200,
    '2200': 220, '2400': 240, '2700': 270, '3000': 300, '3300': 330, '3600': 360,
    '3900': 390, '4300': 430, '4700': 470, '5100': 510, '5600': 560, '6200': 620,
    '6800': 680, '7500': 750, '8200': 820, '9100': 910
  };

  const calculate = () => {
    if (!code) {
      alert('Please enter a code');
      return;
    }

    let baseValue = 0;
    let multiplier = 1;

    if (codeType === '3-digit') {
      if (code.length !== 3) {
        alert('3-digit code must be exactly 3 digits');
        return;
      }
      const firstDigit = parseInt(code[0]);
      const secondDigit = parseInt(code[1]);
      const multiplierDigit = parseInt(code[2]);

      baseValue = firstDigit * 10 + secondDigit;
      multiplier = Math.pow(10, multiplierDigit);
    } else {
      if (code.length !== 4) {
        alert('4-digit code must be exactly 4 digits');
        return;
      }
      const firstDigit = parseInt(code[0]);
      const secondDigit = parseInt(code[1]);
      const thirdDigit = parseInt(code[2]);
      const multiplierDigit = parseInt(code[3]);

      baseValue = firstDigit * 100 + secondDigit * 10 + thirdDigit;
      multiplier = Math.pow(10, multiplierDigit);
    }

    const resistance = baseValue * multiplier;

    setResult({
      value: resistance,
      unit: resistance >= 1000000 ? 'MΩ' : resistance >= 1000 ? 'kΩ' : 'Ω'
    });
  };

  const reset = () => {
    setCode('');
    setResult(null);
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(2) + ' MΩ';
    if (value >= 1000) return (value / 1000).toFixed(2) + ' kΩ';
    return value + ' Ω';
  };

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">You're working with surface-mount (SMD) resistors on a circuit board, but the markings are tiny numbers instead of colored bands. How do you know what resistance value it is?</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> SMD resistors are used in modern electronics (phones, computers, IoT devices). Understanding their codes helps you repair, modify, or design circuits.</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> You see a tiny resistor marked "472" on a circuit board. Using this calculator, you'll discover it's 4700Ω (4.7kΩ) - perfect for an LED circuit!</p>
          </div>
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="bg-slate-900 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            SMD Resistor Code Decoder
          </CardTitle>
          <CardDescription>Decode 3-digit or 4-digit SMD resistor codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code Type Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCodeType('3-digit');
                setCode('');
                setResult(null);
              }}
              className={`flex-1 p-3 rounded font-semibold transition ${
                codeType === '3-digit'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              3-Digit Code
            </button>
            <button
              onClick={() => {
                setCodeType('4-digit');
                setCode('');
                setResult(null);
              }}
              className={`flex-1 p-3 rounded font-semibold transition ${
                codeType === '4-digit'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              4-Digit Code
            </button>
          </div>

          {/* Code Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              Enter {codeType} Code
            </label>
            <Input
              type="text"
              placeholder={codeType === '3-digit' ? 'e.g., 472' : 'e.g., 4701'}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={codeType === '3-digit' ? 3 : 4}
              className="bg-slate-800 border-slate-600 text-white text-center text-2xl font-bold tracking-widest"
            />
            <p className="text-xs text-slate-400">
              {codeType === '3-digit'
                ? 'Format: XYZ (X=1st digit, Y=2nd digit, Z=multiplier)'
                : 'Format: XYZM (X=1st digit, Y=2nd digit, Z=3rd digit, M=multiplier)'}
            </p>
          </div>

          {/* Calculate Button */}
          <div className="flex gap-2">
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1"
            >
              Decode
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
                Resistance: {formatValue(result.value)}
              </p>
              <p className="text-green-300 text-sm mt-2">
                💡 This resistor is commonly used in: power supply circuits, signal conditioning, and protection circuits.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Tabs */}
      <Tabs defaultValue="guide" className="bg-slate-900 border border-slate-700 rounded-lg">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none">
          <TabsTrigger value="guide" className="data-[state=active]:bg-purple-600">Guide</TabsTrigger>
          <TabsTrigger value="codes" className="data-[state=active]:bg-purple-600">Common Codes</TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-purple-600">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="p-4 space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 font-semibold mb-2">📖 How to Read SMD Codes</p>
            <div className="text-blue-200 text-sm space-y-2">
              <p><strong>3-Digit Format (XYZ):</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• X = 1st digit</li>
                <li>• Y = 2nd digit</li>
                <li>• Z = Multiplier (power of 10)</li>
                <li>• Example: 472 = 47 × 10² = 4700Ω</li>
              </ul>
              <p className="mt-3"><strong>4-Digit Format (XYZM):</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• X = 1st digit</li>
                <li>• Y = 2nd digit</li>
                <li>• Z = 3rd digit</li>
                <li>• M = Multiplier (power of 10)</li>
                <li>• Example: 4701 = 470 × 10¹ = 4700Ω</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="codes" className="p-4 space-y-3">
          <div className="space-y-2">
            <p className="text-slate-300 font-semibold mb-3">Common SMD Resistor Codes:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['100', '101', '102', '103', '104', '105', '220', '470', '472', '680', '820'].map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setCode(c);
                    const baseValue = parseInt(c[0]) * 10 + parseInt(c[1]);
                    const multiplier = Math.pow(10, parseInt(c[2]));
                    const resistance = baseValue * multiplier;
                    setResult({
                      value: resistance,
                      unit: resistance >= 1000000 ? 'MΩ' : resistance >= 1000 ? 'kΩ' : 'Ω'
                    });
                  }}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-center text-sm font-semibold text-purple-400"
                >
                  {c}
                  <div className="text-xs text-slate-400 mt-1">{formatValue(parseInt(c[0]) * 10 + parseInt(c[1]) * Math.pow(10, parseInt(c[2])))}</div>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="p-4 space-y-3">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded p-3">
            <p className="text-purple-300 font-semibold mb-2">✓ Verify with Multimeter</p>
            <ol className="text-purple-200 text-sm space-y-2">
              <li>1. Set multimeter to <strong>Resistance mode (Ω)</strong></li>
              <li>2. Carefully desolder or remove the SMD resistor</li>
              <li>3. Touch multimeter probes to resistor leads</li>
              <li>4. Compare reading to decoded value</li>
              <li>5. Should match (or be very close)</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>

      {/* Component Links */}
      <Card className="bg-slate-900 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">🛒 Buy SMD Resistors</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://digilog.pk/resistors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold"
          >
            Shop SMD Resistors at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
