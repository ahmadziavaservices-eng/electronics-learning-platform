import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CalculatorState {
  [key: string]: number | string;
}

export default function PowerSupplyCalculators() {
  const [activeTab, setActiveTab] = useState('lm723-current');
  const [calculations, setCalculations] = useState<CalculatorState>({});

  // LM723 Current Limit Calculator
  const calculateLM723Current = (senseVoltage: number) => {
    const currentLimit = 0.65 / senseVoltage;
    return currentLimit.toFixed(3);
  };

  // Feedback Divider Calculator
  const calculateFeedbackDivider = (vout: number, vref: number = 1.25) => {
    const ratio = (vout - vref) / vref;
    return ratio.toFixed(2);
  };

  // Transformer Turns Ratio Calculator
  const calculateTurnsRatio = (vPrimary: number, vSecondary: number) => {
    const ratio = vPrimary / vSecondary;
    return ratio.toFixed(2);
  };

  // Filter Capacitor Calculator
  const calculateFilterCapacitor = (current: number, frequency: number = 60, rippleVoltage: number = 0.5) => {
    const capacitance = current / (2 * frequency * rippleVoltage);
    return capacitance.toFixed(0);
  };

  // Ripple Voltage Calculator
  const calculateRippleVoltage = (current: number, capacitance: number, frequency: number = 60) => {
    const ripple = current / (2 * frequency * capacitance);
    return ripple.toFixed(3);
  };

  // Power Dissipation Calculator
  const calculatePowerDissipation = (vinput: number, voutput: number, current: number) => {
    const power = (vinput - voutput) * current;
    return power.toFixed(2);
  };

  // Inductance Calculator (DIY method using multimeter)
  const calculateInductance = (frequency: number, resistance: number, impedance: number) => {
    const reactance = Math.sqrt(impedance * impedance - resistance * resistance);
    const inductance = reactance / (2 * Math.PI * frequency);
    return inductance.toFixed(6);
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
            <Calculator className="w-10 h-10 text-blue-400" />
            Power Supply Calculators
          </h1>
          <p className="text-slate-300 text-lg">Professional-grade calculations with real-world measurement guides</p>
        </div>

        {/* Main Calculator Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-slate-800/50 p-2 rounded-lg">
            <TabsTrigger value="lm723-current" className="text-sm md:text-sm">LM723 Current</TabsTrigger>
            <TabsTrigger value="feedback-divider" className="text-sm md:text-sm">Feedback Divider</TabsTrigger>
            <TabsTrigger value="transformer" className="text-sm md:text-sm">Transformer Ratio</TabsTrigger>
            <TabsTrigger value="filter-cap" className="text-sm md:text-sm">Filter Capacitor</TabsTrigger>
            <TabsTrigger value="ripple" className="text-sm md:text-sm">Ripple Voltage</TabsTrigger>
            <TabsTrigger value="power-dissipation" className="text-sm md:text-sm">Power Dissipation</TabsTrigger>
            <TabsTrigger value="inductance" className="text-sm md:text-sm">Inductance</TabsTrigger>
            <TabsTrigger value="esr" className="text-sm md:text-sm">ESR Testing</TabsTrigger>
          </TabsList>

          {/* LM723 Current Limit Calculator */}
          <TabsContent value="lm723-current">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>LM723 Current Limit Calculator</CardTitle>
                <CardDescription>Calculate sense resistor for desired current limit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Current Limit (A)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2.5"
                      step="0.1"
                      onChange={(e) => {
                        const current = parseFloat(e.target.value);
                        if (current > 0) {
                          const senseVoltage = 0.65 / current;
                          setCalculations({
                            ...calculations,
                            'lm723-current': current,
                            'lm723-sense-voltage': senseVoltage.toFixed(3),
                            'lm723-sense-resistor': (senseVoltage / current).toFixed(3)
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sense Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="0.65V typical"
                      value={calculations['lm723-sense-voltage'] || ''}
                      disabled
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                  <div className="font-bold text-blue-300 mb-2">Sense Resistor Value:</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {calculations['lm723-sense-resistor'] || '0'} Ω
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: R_sense = 0.65V / I_limit
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Measurement Guide:</strong> Use a precision resistor (1% tolerance). Verify with multimeter before installation. Sense resistor dissipates heat - use appropriate power rating.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Divider Calculator */}
          <TabsContent value="feedback-divider">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Feedback Divider Calculator</CardTitle>
                <CardDescription>Design voltage divider for LM317/LM723 output voltage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Output Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 12"
                      step="0.1"
                      onChange={(e) => {
                        const vout = parseFloat(e.target.value);
                        if (vout > 0) {
                          const ratio = calculateFeedbackDivider(vout);
                          setCalculations({
                            ...calculations,
                            'feedback-vout': vout,
                            'feedback-ratio': ratio
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">R2/R1 Ratio</label>
                    <Input
                      type="number"
                      placeholder="Calculated ratio"
                      value={calculations['feedback-ratio'] || ''}
                      disabled
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 space-y-3">
                  <div className="font-bold text-green-300">Recommended Resistor Values:</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-300">R1 (to Ground):</div>
                      <div className="text-lg font-bold text-green-400">240Ω - 1kΩ</div>
                    </div>
                    <div>
                      <div className="text-slate-300">R2 (Feedback):</div>
                      <div className="text-lg font-bold text-green-400">
                        {calculations['feedback-ratio'] ? `${(parseFloat(calculations['feedback-ratio'] as string) * 1000).toFixed(0)}Ω` : '0Ω'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    Formula: V_out = 1.25V × (1 + R2/R1)
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Measurement Guide:</strong> Use 1% tolerance resistors. Measure actual values with multimeter. Verify output voltage under load before final installation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transformer Turns Ratio Calculator */}
          <TabsContent value="transformer">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Transformer Turns Ratio Calculator</CardTitle>
                <CardDescription>Calculate transformer specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 120 or 240"
                      onChange={(e) => {
                        const vPrimary = parseFloat(e.target.value);
                        const vSecondary = calculations['transformer-vsec'] as number;
                        if (vPrimary > 0 && vSecondary) {
                          const ratio = calculateTurnsRatio(vPrimary, vSecondary);
                          setCalculations({
                            ...calculations,
                            'transformer-vpri': vPrimary,
                            'transformer-ratio': ratio
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 12 or 24"
                      onChange={(e) => {
                        const vSecondary = parseFloat(e.target.value);
                        const vPrimary = calculations['transformer-vpri'] as number;
                        if (vSecondary > 0 && vPrimary) {
                          const ratio = calculateTurnsRatio(vPrimary, vSecondary);
                          setCalculations({
                            ...calculations,
                            'transformer-vsec': vSecondary,
                            'transformer-ratio': ratio
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                  <div className="font-bold text-purple-300 mb-2">Turns Ratio (N1:N2):</div>
                  <div className="text-2xl font-bold text-purple-400">
                    1 : {calculations['transformer-ratio'] || '0'}
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: Ratio = V_primary / V_secondary
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Measurement Guide:</strong> Measure AC voltage on both primary and secondary with multimeter in AC mode. Verify transformer is not loaded during measurement.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Filter Capacitor Calculator */}
          <TabsContent value="filter-cap">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Filter Capacitor Calculator</CardTitle>
                <CardDescription>Calculate capacitor value for desired ripple voltage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Load Current (A)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      step="0.1"
                      onChange={(e) => {
                        const current = parseFloat(e.target.value);
                        const frequency = (calculations['filter-freq'] as number) || 60;
                        const ripple = (calculations['filter-ripple'] as number) || 0.5;
                        if (current > 0) {
                          const cap = calculateFilterCapacitor(current, frequency, ripple);
                          setCalculations({
                            ...calculations,
                            'filter-current': current,
                            'filter-capacitance': cap
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency (Hz)</label>
                    <Input
                      type="number"
                      placeholder="60 or 50"
                      defaultValue="60"
                      onChange={(e) => {
                        const frequency = parseFloat(e.target.value);
                        const current = (calculations['filter-current'] as number) || 2;
                        const ripple = (calculations['filter-ripple'] as number) || 0.5;
                        if (frequency > 0 && current > 0) {
                          const cap = calculateFilterCapacitor(current, frequency, ripple);
                          setCalculations({
                            ...calculations,
                            'filter-freq': frequency,
                            'filter-capacitance': cap
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Ripple (V)</label>
                    <Input
                      type="number"
                      placeholder="0.5"
                      defaultValue="0.5"
                      step="0.1"
                      onChange={(e) => {
                        const ripple = parseFloat(e.target.value);
                        const current = (calculations['filter-current'] as number) || 2;
                        const frequency = (calculations['filter-freq'] as number) || 60;
                        if (ripple > 0 && current > 0) {
                          const cap = calculateFilterCapacitor(current, frequency, ripple);
                          setCalculations({
                            ...calculations,
                            'filter-ripple': ripple,
                            'filter-capacitance': cap
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                  <div className="font-bold text-orange-300 mb-2">Required Capacitance:</div>
                  <div className="text-2xl font-bold text-orange-400">
                    {calculations['filter-capacitance'] || '0'} µF
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: C = I / (2 × f × V_ripple)
                  </div>
                  <div className="text-sm text-slate-400 mt-3">
                    <strong>Recommendation:</strong> Use 2-3× calculated value for better filtering
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Measurement Guide:</strong> Use oscilloscope to measure ripple voltage across capacitor. Measure DC voltage with multimeter. Higher capacitance = lower ripple.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ripple Voltage Calculator */}
          <TabsContent value="ripple">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Ripple Voltage Calculator</CardTitle>
                <CardDescription>Calculate ripple voltage from capacitor specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Load Current (A)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      step="0.1"
                      onChange={(e) => {
                        const current = parseFloat(e.target.value);
                        const capacitance = (calculations['ripple-cap'] as number) || 2200;
                        const frequency = (calculations['ripple-freq'] as number) || 60;
                        if (current > 0) {
                          const ripple = calculateRippleVoltage(current, capacitance, frequency);
                          setCalculations({
                            ...calculations,
                            'ripple-current': current,
                            'ripple-voltage': ripple
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Capacitance (µF)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2200"
                      defaultValue="2200"
                      onChange={(e) => {
                        const capacitance = parseFloat(e.target.value);
                        const current = (calculations['ripple-current'] as number) || 2;
                        const frequency = (calculations['ripple-freq'] as number) || 60;
                        if (capacitance > 0 && current > 0) {
                          const ripple = calculateRippleVoltage(current, capacitance, frequency);
                          setCalculations({
                            ...calculations,
                            'ripple-cap': capacitance,
                            'ripple-voltage': ripple
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency (Hz)</label>
                    <Input
                      type="number"
                      placeholder="60 or 50"
                      defaultValue="60"
                      onChange={(e) => {
                        const frequency = parseFloat(e.target.value);
                        const current = (calculations['ripple-current'] as number) || 2;
                        const capacitance = (calculations['ripple-cap'] as number) || 2200;
                        if (frequency > 0 && current > 0) {
                          const ripple = calculateRippleVoltage(current, capacitance, frequency);
                          setCalculations({
                            ...calculations,
                            'ripple-freq': frequency,
                            'ripple-voltage': ripple
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                  <div className="font-bold text-red-300 mb-2">Ripple Voltage (Peak-to-Peak):</div>
                  <div className="text-2xl font-bold text-red-400">
                    {calculations['ripple-voltage'] || '0'} V
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: V_ripple = I / (2 × f × C)
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Measurement Guide:</strong> Use oscilloscope AC coupling mode. Measure peak-to-peak voltage across capacitor. Typical acceptable ripple: 0.5V or less.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Power Dissipation Calculator */}
          <TabsContent value="power-dissipation">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Power Dissipation Calculator</CardTitle>
                <CardDescription>Calculate heat generation in voltage regulator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Input Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 24"
                      step="0.1"
                      onChange={(e) => {
                        const vinput = parseFloat(e.target.value);
                        const voutput = (calculations['power-vout'] as number) || 12;
                        const current = (calculations['power-current'] as number) || 1;
                        if (vinput > 0) {
                          const power = calculatePowerDissipation(vinput, voutput, current);
                          setCalculations({
                            ...calculations,
                            'power-vinput': vinput,
                            'power-dissipation': power
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Voltage (V)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 12"
                      step="0.1"
                      onChange={(e) => {
                        const voutput = parseFloat(e.target.value);
                        const vinput = (calculations['power-vinput'] as number) || 24;
                        const current = (calculations['power-current'] as number) || 1;
                        if (voutput > 0 && vinput > voutput) {
                          const power = calculatePowerDissipation(vinput, voutput, current);
                          setCalculations({
                            ...calculations,
                            'power-vout': voutput,
                            'power-dissipation': power
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Current (A)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 1"
                      step="0.1"
                      onChange={(e) => {
                        const current = parseFloat(e.target.value);
                        const vinput = (calculations['power-vinput'] as number) || 24;
                        const voutput = (calculations['power-vout'] as number) || 12;
                        if (current > 0) {
                          const power = calculatePowerDissipation(vinput, voutput, current);
                          setCalculations({
                            ...calculations,
                            'power-current': current,
                            'power-dissipation': power
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                  <div className="font-bold text-red-300 mb-2">Power Dissipation (Heat):</div>
                  <div className="text-2xl font-bold text-red-400">
                    {calculations['power-dissipation'] || '0'} W
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: P = (V_in - V_out) × I_out
                  </div>
                  <div className="text-sm text-slate-400 mt-3">
                    <strong>Heat Sink Recommendation:</strong> For every 1W, use ~10°C/W heat sink
                  </div>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Safety Warning:</strong> High power dissipation requires proper heat sinking. Monitor regulator temperature during operation. Use thermal paste between regulator and heat sink.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inductance Calculator */}
          <TabsContent value="inductance">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Inductance Calculator (DIY Method)</CardTitle>
                <CardDescription>Calculate inductance using multimeter and function generator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Test Frequency (Hz)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 1000"
                      step="100"
                      onChange={(e) => {
                        const frequency = parseFloat(e.target.value);
                        const resistance = (calculations['inductance-r'] as number) || 10;
                        const impedance = (calculations['inductance-z'] as number) || 50;
                        if (frequency > 0) {
                          const inductance = calculateInductance(frequency, resistance, impedance);
                          setCalculations({
                            ...calculations,
                            'inductance-freq': frequency,
                            'inductance-value': inductance
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">DC Resistance (Ω)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 10"
                      step="0.1"
                      onChange={(e) => {
                        const resistance = parseFloat(e.target.value);
                        const frequency = (calculations['inductance-freq'] as number) || 1000;
                        const impedance = (calculations['inductance-z'] as number) || 50;
                        if (resistance >= 0) {
                          const inductance = calculateInductance(frequency, resistance, impedance);
                          setCalculations({
                            ...calculations,
                            'inductance-r': resistance,
                            'inductance-value': inductance
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Impedance (Ω)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 50"
                      step="0.1"
                      onChange={(e) => {
                        const impedance = parseFloat(e.target.value);
                        const frequency = (calculations['inductance-freq'] as number) || 1000;
                        const resistance = (calculations['inductance-r'] as number) || 10;
                        if (impedance > 0) {
                          const inductance = calculateInductance(frequency, resistance, impedance);
                          setCalculations({
                            ...calculations,
                            'inductance-z': impedance,
                            'inductance-value': inductance
                          });
                        }
                      }}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4">
                  <div className="font-bold text-cyan-300 mb-2">Calculated Inductance:</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {calculations['inductance-value'] || '0'} H
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Formula: L = √(Z² - R²) / (2πf)
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                  <div className="font-bold text-slate-200">DIY Measurement Steps:</div>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                    <li>Set function generator to desired frequency (1kHz typical)</li>
                    <li>Connect inductor in series with known resistor</li>
                    <li>Measure AC voltage across inductor with multimeter</li>
                    <li>Calculate impedance: Z = V_L × (R + Z_L) / V_R</li>
                    <li>Use calculator above to find inductance</li>
                  </ol>
                </div>

                <Alert className="bg-amber-900/30 border-amber-700">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-200">
                    <strong>Alternative DIY Method:</strong> Use LCR meter app on smartphone or Arduino-based LCR meter for direct measurement.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESR Testing */}
          <TabsContent value="esr">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>ESR Meter Alternative</CardTitle>
                <CardDescription>Test capacitor ESR without specialized equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-4">
                  <div className="font-bold text-slate-200">DIY ESR Testing Methods:</div>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="font-semibold text-blue-300">Method 1: Multimeter AC Voltage</div>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li>Discharge capacitor completely</li>
                        <li>Set multimeter to AC voltage mode</li>
                        <li>Connect capacitor in series with 1kΩ resistor</li>
                        <li>Apply 1V AC signal at 1kHz</li>
                        <li>Measure voltage across capacitor</li>
                        <li>ESR ≈ (1V - V_cap) × 1000 / I</li>
                      </ol>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="font-semibold text-green-300">Method 2: LCR Meter App</div>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li>Download LCR meter app on smartphone</li>
                        <li>Place capacitor on phone audio jack</li>
                        <li>App measures capacitance and ESR</li>
                        <li>Results show immediately</li>
                        <li>Typical good ESR: &lt; 1Ω</li>
                      </ol>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="font-semibold text-purple-300">Method 3: Arduino ESR Meter</div>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li>Build simple Arduino circuit</li>
                        <li>Use PWM output to generate AC signal</li>
                        <li>Measure voltage with analog input</li>
                        <li>Calculate ESR from measurements</li>
                        <li>Display on serial monitor</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
                  <div className="font-bold text-amber-300 mb-2">ESR Reference Values:</div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-amber-200">Good Capacitor:</div>
                      <div className="text-lg font-bold text-green-400">&lt; 1Ω</div>
                    </div>
                    <div>
                      <div className="text-amber-200">Marginal:</div>
                      <div className="text-lg font-bold text-yellow-400">1-5Ω</div>
                    </div>
                    <div>
                      <div className="text-amber-200">Failed:</div>
                      <div className="text-lg font-bold text-red-400">&gt; 5Ω</div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-blue-900/30 border-blue-700">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-200">
                    <strong>Pro Tip:</strong> High ESR capacitors cause power supply instability and excessive ripple voltage. Replace capacitors showing ESR &gt; 2Ω for reliable operation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
