import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Zap, Grid3x3, Cpu, Lightbulb, Waves, ArrowRightLeft, X } from 'lucide-react';
import { CalculatorModal } from '@/components/CalculatorModal';
import { ReportPreviewModal } from '@/components/ReportPreviewModal';
import { OhmsLawCalculator } from '@/components/calculators/OhmsLawCalculator';
import { PowerCalculator } from '@/components/calculators/PowerCalculator';
import { ResistorColorCode } from '@/components/calculators/ResistorColorCode';
import { SMDResistorCalculator } from '@/components/calculators/SMDResistorCalculator';
import { LEDResistorCalculator } from '@/components/calculators/LEDResistorCalculator';
import { VoltageDividerCalculator } from '@/components/calculators/VoltageDividerCalculator';
import { RCTimeCalculator } from '@/components/calculators/RCTimeCalculator';
import { UnitConverter } from '@/components/calculators/UnitConverter';
import { CalculationReport } from '@/lib/reportGenerator';

interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  component: React.ReactNode;
}

const calculators: Calculator[] = [
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    description: 'Calculate voltage, current, or resistance',
    icon: <Zap className="w-6 h-6" />,
    category: 'Basic',
    component: <OhmsLawCalculator />
  },
  {
    id: 'power',
    title: 'Power Calculator',
    description: 'Calculate power dissipation and wattage',
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Basic',
    component: <PowerCalculator />
  },
  {
    id: 'resistor-color',
    title: 'Resistor Color Code',
    description: 'Decode resistor color bands',
    icon: <Grid3x3 className="w-6 h-6" />,
    category: 'Components',
    component: <ResistorColorCode />
  },
  {
    id: 'smd-code',
    title: 'SMD Resistor Code',
    description: 'Decode SMD resistor values',
    icon: <Cpu className="w-6 h-6" />,
    category: 'Components',
    component: <SMDResistorCalculator />
  },
  {
    id: 'led-resistor',
    title: 'LED Resistor',
    description: 'Calculate LED current-limiting resistor',
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Components',
    component: <LEDResistorCalculator />
  },
  {
    id: 'voltage-divider',
    title: 'Voltage Divider',
    description: 'Calculate output voltage from divider',
    icon: <ArrowRightLeft className="w-6 h-6" />,
    category: 'Advanced',
    component: <VoltageDividerCalculator />
  },
  {
    id: 'rc-time',
    title: 'RC Time Constant',
    description: 'Calculate charging/discharging time',
    icon: <Waves className="w-6 h-6" />,
    category: 'Advanced',
    component: <RCTimeCalculator />
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert electrical units',
    icon: <ArrowRightLeft className="w-6 h-6" />,
    category: 'Utilities',
    component: <UnitConverter />
  }
];

export default function Calculators() {
  const [openCalculators, setOpenCalculators] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<CalculationReport | null>(null);
  const [showReport, setShowReport] = useState(false);

  const openCalculator = (id: string) => {
    if (openCalculators.length < 2 && !openCalculators.includes(id)) {
      setOpenCalculators([...openCalculators, id]);
    }
  };

  const closeCalculator = (id: string) => {
    setOpenCalculators(openCalculators.filter(c => c !== id));
  };

  const handleGenerateReport = (report: CalculationReport) => {
    setSelectedReport(report);
    setShowReport(true);
  };

  const categories = ['All', ...Array.from(new Set(calculators.map(c => c.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 p-4 sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-cyan-400">Electronics Calculators</h1>
          </div>
          <p className="text-slate-400">Professional tools for solving real-world electronics problems</p>
          
          {openCalculators.length > 0 && (
            <div className="mt-3 p-3 bg-blue-900/20 border border-blue-500/50 rounded">
              <p className="text-sm text-blue-300">
                💡 {openCalculators.length}/2 calculators open. You can open up to 2 calculators simultaneously for comparison.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 py-8">
        <Tabs defaultValue="All" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700 w-full justify-start rounded-lg p-1 overflow-x-auto">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-cyan-600">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators
                  .filter(c => category === 'All' || c.category === category)
                  .map(calc => (
                    <Card
                      key={calc.id}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/30 hover:border-cyan-500/60 transition cursor-pointer group"
                      onClick={() => openCalculator(calc.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-cyan-400 group-hover:scale-110 transition">
                            {calc.icon}
                          </div>
                          <span className="text-sm font-semibold px-2 py-1 rounded bg-slate-700 text-slate-300">
                            {calc.category}
                          </span>
                        </div>
                        <CardTitle className="text-slate-200 group-hover:text-cyan-400 transition">
                          {calc.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCalculator(calc.id);
                          }}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                          disabled={openCalculators.length >= 2 && !openCalculators.includes(calc.id)}
                        >
                          {openCalculators.includes(calc.id) ? 'Open' : 'Launch Calculator'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Open Calculators */}
      <div className="fixed bottom-4 right-4 space-y-2 z-40">
        {openCalculators.map(id => {
          const calc = calculators.find(c => c.id === id);
          if (!calc) return null;

          return (
            <div key={id} className="flex items-center gap-2 bg-slate-800 border border-cyan-500/50 rounded-lg p-2">
              <span className="text-sm font-semibold text-slate-300">{calc.title}</span>
              <button
                onClick={() => closeCalculator(id)}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Calculator Modals */}
      {openCalculators.map(id => {
        const calc = calculators.find(c => c.id === id);
        if (!calc) return null;

        return (
          <CalculatorModal
            key={id}
            isOpen={true}
            onClose={() => closeCalculator(id)}
            title={calc.title}
            onGenerateReport={() => {}}
          >
            {calc.component}
          </CalculatorModal>
        );
      })}

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        report={selectedReport}
        isComparison={false}
      />
    </div>
  );
}
