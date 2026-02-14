import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { unitConverterScenario, internationalStandards } from '@/lib/calculatorData';

export function UnitConverter() {
  const [activeConverter, setActiveConverter] = useState('resistance');
  const [inputValue, setInputValue] = useState<number | ''>('');
  const [inputUnit, setInputUnit] = useState('Ω');
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  const converters: { [key: string]: { units: { [key: string]: number }; name: string } } = {
    resistance: {
      name: 'Resistance',
      units: {
        'Ω (Ohm)': 1,
        'kΩ (Kilo-ohm)': 0.001,
        'MΩ (Mega-ohm)': 0.000001,
        'GΩ (Giga-ohm)': 0.000000001
      }
    },
    capacitance: {
      name: 'Capacitance',
      units: {
        'F (Farad)': 1,
        'mF (Milli-farad)': 1000,
        'µF (Micro-farad)': 1000000,
        'nF (Nano-farad)': 1000000000,
        'pF (Pico-farad)': 1000000000000
      }
    },
    inductance: {
      name: 'Inductance',
      units: {
        'H (Henry)': 1,
        'mH (Milli-henry)': 1000,
        'µH (Micro-henry)': 1000000,
        'nH (Nano-henry)': 1000000000
      }
    },
    voltage: {
      name: 'Voltage',
      units: {
        'V (Volt)': 1,
        'mV (Milli-volt)': 1000,
        'µV (Micro-volt)': 1000000,
        'kV (Kilo-volt)': 0.001
      }
    },
    current: {
      name: 'Current',
      units: {
        'A (Ampere)': 1,
        'mA (Milli-ampere)': 1000,
        'µA (Micro-ampere)': 1000000,
        'nA (Nano-ampere)': 1000000000
      }
    },
    power: {
      name: 'Power',
      units: {
        'W (Watt)': 1,
        'mW (Milli-watt)': 1000,
        'µW (Micro-watt)': 1000000,
        'kW (Kilo-watt)': 0.001,
        'MW (Mega-watt)': 0.000001
      }
    },
    frequency: {
      name: 'Frequency',
      units: {
        'Hz (Hertz)': 1,
        'kHz (Kilo-hertz)': 0.001,
        'MHz (Mega-hertz)': 0.000001,
        'GHz (Giga-hertz)': 0.000000001
      }
    }
  };

  const convert = () => {
    if (inputValue === '' || !inputUnit) {
      alert('Please enter a value and select a unit');
      return;
    }

    const converter = converters[activeConverter];
    const baseValue = Number(inputValue) / converter.units[inputUnit];

    const converted: { [key: string]: number } = {};
    for (const [unit, factor] of Object.entries(converter.units)) {
      converted[unit] = baseValue * factor;
    }

    setResults(converted);
  };

  const reset = () => {
    setInputValue('');
    setInputUnit(Object.keys(converters[activeConverter].units)[0]);
    setResults(null);
  };

  const currentConverter = converters[activeConverter];

  return (
    <div className="space-y-6">
      {/* Real-World Scenario */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-slate-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Real-World Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p className="font-semibold">{unitConverterScenario.problem}</p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Why It Matters:</strong> {unitConverterScenario.whyItMatters}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
            <p className="text-sm"><strong>Real Example:</strong> {unitConverterScenario.realWorldExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Converter Selection */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-300">Select Converter Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(converters).map(([key, converter]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveConverter(key);
                  setInputUnit(Object.keys(converter.units)[0]);
                  setInputValue('');
                  setResults(null);
                }}
                className={`p-3 rounded font-semibold text-sm transition ${
                  activeConverter === key
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {converter.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Converter */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">{currentConverter.name} Converter</CardTitle>
          <CardDescription>Convert between different units</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Enter Value</label>
              <Input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">From Unit</label>
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 text-white p-2 rounded"
              >
                {Object.keys(currentConverter.units).map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={convert}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white flex-1"
            >
              Convert
            </Button>
            <Button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Reset
            </Button>
          </div>

          {results && (
            <div className="bg-green-900/20 border border-green-500/50 rounded p-4">
              <p className="text-green-400 font-semibold mb-3">Conversion Results:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(results).map(([unit, value]) => (
                  <div key={unit} className="bg-slate-800 p-2 rounded">
                    <p className="text-slate-300 text-sm">
                      <span className="font-semibold text-green-400">{formatNumber(value)}</span>
                      <span className="text-slate-400 ml-1">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SI Prefixes Guide */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">📊 SI Prefixes (International Standard)</CardTitle>
          <CardDescription>Understanding metric prefixes used in electronics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(internationalStandards.si_prefixes).map(([prefix, value]) => (
              <div key={prefix} className="bg-slate-800 p-3 rounded border border-slate-700">
                <p className="font-semibold text-cyan-400">{prefix}</p>
                <p className="text-sm text-slate-400">{value.toExponential(0)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blue-900/20 border border-blue-500/50 rounded p-3">
            <p className="text-blue-300 text-sm">
              💡 <strong>Tip:</strong> The SI system is used worldwide. Understanding these prefixes helps you read datasheets and communicate with engineers globally.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common Conversions */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">🔄 Common Conversions in Electronics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• <strong>500mV</strong> = 0.5V (sensor output)</p>
            <p>• <strong>20mA</strong> = 0.02A (LED current)</p>
            <p>• <strong>100µF</strong> = 0.0001F (capacitor value)</p>
            <p>• <strong>1kΩ</strong> = 1000Ω (resistor value)</p>
            <p>• <strong>2.2nF</strong> = 0.0000000022F (small capacitor)</p>
            <p>• <strong>10MHz</strong> = 10,000,000Hz (clock frequency)</p>
            <p>• <strong>500mW</strong> = 0.5W (power dissipation)</p>
          </div>
        </CardContent>
      </Card>

      {/* Component Links */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">📚 Learn More</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="https://digilog.pk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded font-semibold"
          >
            Check Component Datasheets at Digilog.pk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) >= 1000000) return (num / 1000000).toFixed(6).replace(/\.?0+$/, '') + 'M';
  if (Math.abs(num) >= 1000) return (num / 1000).toFixed(6).replace(/\.?0+$/, '') + 'k';
  if (Math.abs(num) < 0.001) return num.toExponential(2);
  return num.toFixed(6).replace(/\.?0+$/, '');
}
