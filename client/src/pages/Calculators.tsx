import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calculator, Zap, Lightbulb, Gauge, Wrench } from 'lucide-react';
import { OhmsLawCalculator } from '@/components/calculators/OhmsLawCalculator';
import { PowerCalculator } from '@/components/calculators/PowerCalculator';
import { ResistorColorCode } from '@/components/calculators/ResistorColorCode';
import { LEDResistorCalculator } from '@/components/calculators/LEDResistorCalculator';
import { UnitConverter } from '@/components/calculators/UnitConverter';
import { SMDResistorCalculator } from '@/components/calculators/SMDResistorCalculator';
import { VoltageDividerCalculator } from '@/components/calculators/VoltageDividerCalculator';
import { RCTimeCalculator } from '@/components/calculators/RCTimeCalculator';

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState('ohms-law');

  const calculators = [
    {
      id: 'ohms-law',
      name: "Ohm's Law",
      icon: Zap,
      category: 'Basic',
      description: 'Calculate voltage, current, or resistance',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      id: 'power',
      name: 'Power Calculator',
      icon: Lightbulb,
      category: 'Basic',
      description: 'Calculate power consumption and dissipation',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'resistor-color',
      name: 'Resistor Color Code',
      icon: Gauge,
      category: 'Basic',
      description: 'Decode resistor color bands',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'smd-code',
      name: 'SMD Resistor Code',
      icon: Wrench,
      category: 'Basic',
      description: 'Decode SMD resistor markings',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'led-resistor',
      name: 'LED Resistor',
      icon: Lightbulb,
      category: 'Components',
      description: 'Calculate current-limiting resistor for LEDs',
      color: 'from-red-600 to-pink-600'
    },
    {
      id: 'voltage-divider',
      name: 'Voltage Divider',
      icon: Zap,
      category: 'Components',
      description: 'Calculate voltage divider output',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 'rc-time',
      name: 'RC Time Constant',
      icon: Gauge,
      category: 'Components',
      description: 'Calculate charging/discharging time',
      color: 'from-teal-600 to-cyan-600'
    },
    {
      id: 'unit-converter',
      name: 'Unit Converter',
      icon: Calculator,
      category: 'Converters',
      description: 'Convert between electrical units',
      color: 'from-slate-600 to-gray-600'
    }
  ];

  const categories = ['All', 'Basic', 'Components', 'Converters'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCalculators = selectedCategory === 'All'
    ? calculators
    : calculators.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Electronics Calculators
              </h1>
              <p className="text-slate-400">Real-world problem solving tools for electronics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-slate-300">Filter by Category</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {filteredCalculators.map(calc => {
            const Icon = calc.icon;
            return (
              <Card
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`cursor-pointer transition-all border-2 ${
                  activeCalculator === calc.id
                    ? `border-cyan-500 bg-gradient-to-br ${calc.color} bg-opacity-20`
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                      {calc.category}
                    </span>
                  </div>
                  <CardTitle className="text-base">{calc.name}</CardTitle>
                  <CardDescription className="text-xs">{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Active Calculator */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {calculators.find(c => c.id === activeCalculator)?.name}
          </h2>

          {activeCalculator === 'ohms-law' && <OhmsLawCalculator />}
          {activeCalculator === 'power' && <PowerCalculator />}
          {activeCalculator === 'resistor-color' && <ResistorColorCode />}
          {activeCalculator === 'smd-code' && <SMDResistorCalculator />}
          {activeCalculator === 'led-resistor' && <LEDResistorCalculator />}
          {activeCalculator === 'voltage-divider' && <VoltageDividerCalculator />}
          {activeCalculator === 'rc-time' && <RCTimeCalculator />}
          {activeCalculator === 'unit-converter' && <UnitConverter />}
        </div>

        {/* Educational Note */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">💡 About These Calculators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <p>
              These calculators are designed to teach <strong>real-world problem solving</strong>. Each calculator includes:
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ Real-world problem scenarios you'll actually face</li>
              <li>✓ Step-by-step measurement guides with multimeter instructions</li>
              <li>✓ Safety warnings and common mistakes to avoid</li>
              <li>✓ Practical examples with components from Digilog</li>
              <li>✓ Verification methods to check your work</li>
              <li>✓ Links to related course modules for deeper learning</li>
            </ul>
            <p className="text-sm pt-2">
              Use these calculators not just to get answers, but to understand <strong>why</strong> the calculation matters and <strong>how</strong> to apply it in real circuits.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
