export interface CalculatorDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  inputs: {
    name: string;
    label: string;
    unit: string;
    placeholder: string;
    type: 'number' | 'select';
    options?: { value: string; label: string }[];
  }[];
  outputs: {
    name: string;
    label: string;
    unit: string;
    formula: string;
  }[];
  formula: string;
  realWorldScenario: string;
  measurementGuide: {
    title: string;
    steps: string[];
    tools: string[];
    diyAlternatives: string[];
    safetyWarnings: string[];
  };
  examples: {
    scenario: string;
    inputs: Record<string, number>;
    outputs: Record<string, number>;
    explanation: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const powerSupplyCalculators: CalculatorDefinition[] = [
  {
    id: 'lm723-current-limit',
    name: 'LM723 Current Limit Calculator',
    description: 'Calculate the sense resistor value needed for desired current limit',
    category: 'LM723 Regulator',
    inputs: [
      {
        name: 'currentLimit',
        label: 'Desired Current Limit',
        unit: 'Amps',
        placeholder: 'Enter current in Amps (e.g., 5)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'senseResistor',
        label: 'Sense Resistor Value',
        unit: 'Ohms',
        formula: 'R_sc = 0.65V / I_limit'
      },
      {
        name: 'powerDissipation',
        label: 'Power Dissipated in Sense Resistor',
        unit: 'Watts',
        formula: 'P = I² × R'
      }
    ],
    formula: 'R_sc = 0.65V / I_limit\nP_sense = I_limit² × R_sc',
    realWorldScenario: 'You\'re building a lab bench power supply with the LM723 and want to limit output current to 5A to protect your circuits. What sense resistor do you need?',
    measurementGuide: {
      title: 'How to Verify Current Limiting',
      steps: [
        'Build the LM723 circuit with calculated sense resistor',
        'Connect a variable load resistor to the output',
        'Connect multimeter in series with output to measure current',
        'Slowly decrease load resistance to increase current draw',
        'Observe when current stops increasing (this is your limit)',
        'Verify the current limit matches your calculation',
        'Check sense resistor temperature (should be warm, not hot)'
      ],
      tools: [
        'Digital Multimeter (for current measurement)',
        'Variable resistor/rheostat (for load simulation)',
        'Thermometer or thermal camera (for temperature check)',
        'Oscilloscope (optional, to see current limiting action)'
      ],
      diyAlternatives: [
        'Use fixed resistors in parallel to simulate load (e.g., 10Ω + 10Ω = 5Ω)',
        'Use a light bulb as load (brightness indicates current)',
        'Use a motor as load (speed indicates current)',
        'Measure voltage drop across sense resistor with multimeter: V = I × R'
      ],
      safetyWarnings: [
        'Sense resistor will get hot - do not touch during operation',
        'Always start with lowest load and increase gradually',
        'Never exceed power supply input voltage rating',
        'Ensure proper heat sinking on power transistor',
        'Disconnect power before making circuit changes'
      ]
    },
    examples: [
      {
        scenario: 'Building a 5A current limited power supply',
        inputs: { currentLimit: 5 },
        outputs: { senseResistor: 0.13, powerDissipation: 3.25 },
        explanation: 'With 5A limit, you need a 0.13Ω sense resistor. This resistor will dissipate 3.25W, so use at least a 5W resistor for safety margin.'
      },
      {
        scenario: 'Building a 2A current limited power supply',
        inputs: { currentLimit: 2 },
        outputs: { senseResistor: 0.325, powerDissipation: 1.3 },
        explanation: 'With 2A limit, you need a 0.325Ω sense resistor. This dissipates 1.3W, so a 2W resistor is sufficient.'
      },
      {
        scenario: 'Building a 10A high-current power supply',
        inputs: { currentLimit: 10 },
        outputs: { senseResistor: 0.065, powerDissipation: 6.5 },
        explanation: 'With 10A limit, you need a 0.065Ω sense resistor. This dissipates 6.5W, so use a 10W or 15W resistor with good heat sinking.'
      }
    ],
    references: [
      {
        title: 'LM723 Datasheet - Current Limiting',
        url: 'https://www.ti.com/product/LM723'
      }
    ]
  },
  {
    id: 'feedback-divider',
    name: 'LM723 Feedback Divider Calculator',
    description: 'Calculate resistor values for desired output voltage',
    category: 'LM723 Regulator',
    inputs: [
      {
        name: 'desiredVoltage',
        label: 'Desired Output Voltage',
        unit: 'Volts',
        placeholder: 'Enter voltage (e.g., 12)',
        type: 'number'
      },
      {
        name: 'r1Value',
        label: 'R1 (to Ground) Value',
        unit: 'Ohms',
        placeholder: 'Enter R1 (e.g., 1000)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'r2Value',
        label: 'R2 (Feedback) Value',
        unit: 'Ohms',
        formula: 'R2 = R1 × (Vout/Vref - 1)'
      },
      {
        name: 'feedbackRatio',
        label: 'Feedback Ratio',
        unit: 'Ratio',
        formula: '(R1 + R2) / R2'
      }
    ],
    formula: 'Vout = Vref × (1 + R2/R1)\nR2 = R1 × (Vout/Vref - 1)\nVref ≈ 7.15V',
    realWorldScenario: 'You want to build a 12V power supply using LM723. You have 1kΩ resistors available. What value should R2 be to get exactly 12V output?',
    measurementGuide: {
      title: 'How to Calibrate Output Voltage',
      steps: [
        'Build the LM723 circuit with calculated feedback divider',
        'Connect multimeter across output (positive to Vout, negative to GND)',
        'Power on the supply with no load',
        'Measure output voltage',
        'If voltage is too high, increase R2 slightly',
        'If voltage is too low, decrease R2 slightly',
        'Use a potentiometer for R2 to fine-tune the voltage',
        'Once calibrated, measure the actual potentiometer resistance and replace with fixed resistor'
      ],
      tools: [
        'Digital Multimeter (for voltage measurement)',
        'Potentiometer (10kΩ recommended for fine tuning)',
        'Ohmmeter (to measure potentiometer resistance)',
        'Oscilloscope (optional, to check for ripple)'
      ],
      diyAlternatives: [
        'Use a potentiometer as R2 for variable output voltage',
        'Measure voltage drop across R1 and R2 with multimeter',
        'Use a voltage divider calculator app on your phone',
        'Build a test circuit on breadboard first before soldering'
      ],
      safetyWarnings: [
        'Do not adjust potentiometer while power is on (risk of short circuit)',
        'Always use proper grounding for multimeter measurements',
        'Check for short circuits before powering on',
        'Ensure feedback divider resistors are rated for proper power dissipation'
      ]
    },
    examples: [
      {
        scenario: 'Building 12V supply with 1kΩ R1',
        inputs: { desiredVoltage: 12, r1Value: 1000 },
        outputs: { r2Value: 680, feedbackRatio: 1.68 },
        explanation: 'Use 680Ω for R2 to get 12V output. You can use a 10kΩ potentiometer to fine-tune, then measure the exact resistance.'
      },
      {
        scenario: 'Building 5V supply with 1kΩ R1',
        inputs: { desiredVoltage: 5, r1Value: 1000 },
        outputs: { r2Value: 300, feedbackRatio: 1.3 },
        explanation: 'Use 300Ω for R2 to get 5V output. Standard resistor values: 270Ω or 330Ω are close alternatives.'
      },
      {
        scenario: 'Building 24V supply with 2kΩ R1',
        inputs: { desiredVoltage: 24, r1Value: 2000 },
        outputs: { r2Value: 4760, feedbackRatio: 3.38 },
        explanation: 'Use 4.7kΩ for R2 to get approximately 24V output. Fine-tune with a potentiometer if exact voltage is needed.'
      }
    ],
    references: [
      {
        title: 'LM723 Voltage Divider Design',
        url: 'https://www.ti.com/product/LM723'
      }
    ]
  },
  {
    id: 'transformer-turns-ratio',
    name: 'Transformer Turns Ratio Calculator',
    description: 'Calculate transformer secondary voltage from primary voltage and turns ratio',
    category: 'AC Power Supplies',
    inputs: [
      {
        name: 'primaryVoltage',
        label: 'Primary Voltage (Wall Outlet)',
        unit: 'Volts AC',
        placeholder: 'Enter primary voltage (120 or 240)',
        type: 'number'
      },
      {
        name: 'desiredSecondary',
        label: 'Desired Secondary Voltage',
        unit: 'Volts AC',
        placeholder: 'Enter desired secondary voltage',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'turnsRatio',
        label: 'Turns Ratio',
        unit: 'Ratio',
        formula: 'N_primary / N_secondary'
      },
      {
        name: 'secondaryVoltage',
        label: 'Actual Secondary Voltage',
        unit: 'Volts AC',
        formula: 'V_secondary = V_primary × (N_secondary / N_primary)'
      }
    ],
    formula: 'V_secondary / V_primary = N_secondary / N_primary\nTurns Ratio = V_primary / V_secondary',
    realWorldScenario: 'You need a 12V AC transformer to power your power supply. Your wall outlet is 120V AC. What turns ratio transformer do you need?',
    measurementGuide: {
      title: 'How to Verify Transformer Output',
      steps: [
        'Connect transformer to wall outlet (primary side)',
        'Set multimeter to AC voltage mode',
        'Measure voltage across transformer secondary terminals',
        'Compare measured voltage with expected voltage',
        'Verify transformer is not overheating (should be warm, not hot)',
        'Check for any unusual sounds or smells',
        'Measure current draw with clamp meter (optional)',
        'Verify transformer is properly grounded'
      ],
      tools: [
        'Digital Multimeter (AC voltage setting)',
        'Clamp Meter (for current measurement)',
        'Thermometer (to check temperature)',
        'Insulation Tester (to verify safety)'
      ],
      diyAlternatives: [
        'Use a simple AC voltmeter to check secondary voltage',
        'Compare transformer temperature with hand (should be warm, not hot)',
        'Listen for unusual buzzing sounds (indicates potential problems)',
        'Check transformer weight (heavier = better quality)'
      ],
      safetyWarnings: [
        'NEVER touch primary side while powered - high voltage hazard!',
        'Always use proper insulation and safety equipment',
        'Ensure transformer is properly fused on primary side',
        'Keep transformer away from moisture and water',
        'Allow transformer to cool between measurements',
        'Use proper grounding for all measurements'
      ]
    },
    examples: [
      {
        scenario: '120V wall outlet to 12V AC',
        inputs: { primaryVoltage: 120, desiredSecondary: 12 },
        outputs: { turnsRatio: 10, secondaryVoltage: 12 },
        explanation: 'You need a 10:1 transformer (120V ÷ 12V = 10). This is a common transformer size.'
      },
      {
        scenario: '240V wall outlet to 24V AC',
        inputs: { primaryVoltage: 240, desiredSecondary: 24 },
        outputs: { turnsRatio: 10, secondaryVoltage: 24 },
        explanation: 'You need a 10:1 transformer (240V ÷ 24V = 10). Same ratio as above but for 240V input.'
      },
      {
        scenario: '120V wall outlet to 24V AC',
        inputs: { primaryVoltage: 120, desiredSecondary: 24 },
        outputs: { turnsRatio: 5, secondaryVoltage: 24 },
        explanation: 'You need a 5:1 transformer (120V ÷ 24V = 5). Less common but available from specialty suppliers.'
      }
    ],
    references: [
      {
        title: 'Transformer Selection Guide',
        url: 'https://www.electronics-tutorials.ws/transformer/transformer-basics.html'
      }
    ]
  },
  {
    id: 'filter-capacitor',
    name: 'Filter Capacitor & Ripple Voltage Calculator',
    description: 'Calculate filter capacitor value for desired ripple voltage',
    category: 'AC Power Supplies',
    inputs: [
      {
        name: 'loadCurrent',
        label: 'Load Current',
        unit: 'Amps',
        placeholder: 'Enter load current (e.g., 2)',
        type: 'number'
      },
      {
        name: 'frequency',
        label: 'Frequency',
        unit: 'Hz',
        placeholder: 'Enter frequency (50 or 60)',
        type: 'number'
      },
      {
        name: 'desiredRipple',
        label: 'Desired Ripple Voltage',
        unit: 'Volts',
        placeholder: 'Enter ripple voltage (e.g., 0.5)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'capacitance',
        label: 'Required Capacitance',
        unit: 'Farads',
        formula: 'C = I / (2 × f × V_ripple)'
      },
      {
        name: 'ripplePercentage',
        label: 'Ripple as Percentage',
        unit: '%',
        formula: 'Ripple% = (V_ripple / V_dc) × 100'
      }
    ],
    formula: 'V_ripple = I_load / (2 × f × C)\nC = I_load / (2 × f × V_ripple)',
    realWorldScenario: 'You\'re building a 12V power supply with 2A load. You want ripple voltage less than 0.5V. What capacitor value do you need?',
    measurementGuide: {
      title: 'How to Measure Ripple Voltage',
      steps: [
        'Build the power supply with filter capacitor',
        'Connect oscilloscope across filter capacitor output',
        'Set oscilloscope to AC coupling mode',
        'Set vertical scale to measure millivolts',
        'Power on supply with rated load connected',
        'Observe ripple waveform on oscilloscope',
        'Measure peak-to-peak ripple voltage',
        'Compare with calculated value',
        'If ripple is too high, increase capacitor value',
        'If ripple is acceptable, you can reduce capacitor for cost savings'
      ],
      tools: [
        'Oscilloscope (best method for ripple measurement)',
        'AC Voltmeter (can measure RMS ripple)',
        'Digital Multimeter (AC voltage setting)',
        'Load Resistor (to simulate load current)'
      ],
      diyAlternatives: [
        'Use multimeter in AC mode to measure ripple voltage (less accurate but works)',
        'Use a simple AC voltmeter across the capacitor',
        'Build a test circuit with known load resistor',
        'Use smartphone oscilloscope app with external probe (limited bandwidth)',
        'Measure voltage at different times and calculate ripple manually'
      ],
      safetyWarnings: [
        'Ensure oscilloscope probe is properly grounded',
        'Do not exceed oscilloscope voltage rating',
        'Be careful with high voltage measurements',
        'Always discharge capacitor before touching',
        'Use proper safety equipment when testing'
      ]
    },
    examples: [
      {
        scenario: '12V supply with 2A load, 0.5V ripple target',
        inputs: { loadCurrent: 2, frequency: 60, desiredRipple: 0.5 },
        outputs: { capacitance: 0.00333, ripplePercentage: 4.17 },
        explanation: 'You need 3330µF (3.33mF) capacitor. Use 4700µF for safety margin. Ripple will be about 4% of output voltage.'
      },
      {
        scenario: '5V supply with 1A load, 0.1V ripple target',
        inputs: { loadCurrent: 1, frequency: 60, desiredRipple: 0.1 },
        outputs: { capacitance: 0.00833, ripplePercentage: 2 },
        explanation: 'You need 8330µF (8.33mF) capacitor. Use 10000µF for good ripple performance. Ripple will be about 2% of output voltage.'
      },
      {
        scenario: '24V supply with 5A load, 1V ripple target',
        inputs: { loadCurrent: 5, frequency: 60, desiredRipple: 1 },
        outputs: { capacitance: 0.00417, ripplePercentage: 4.17 },
        explanation: 'You need 4170µF capacitor. Use 4700µF. Ripple will be about 4% of output voltage.'
      }
    ],
    references: [
      {
        title: 'Capacitor Filtering in Power Supplies',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'power-dissipation',
    name: 'Power Dissipation Calculator',
    description: 'Calculate heat generated in linear regulators and components',
    category: 'Power Analysis',
    inputs: [
      {
        name: 'inputVoltage',
        label: 'Input Voltage',
        unit: 'Volts',
        placeholder: 'Enter input voltage (e.g., 24)',
        type: 'number'
      },
      {
        name: 'outputVoltage',
        label: 'Output Voltage',
        unit: 'Volts',
        placeholder: 'Enter output voltage (e.g., 12)',
        type: 'number'
      },
      {
        name: 'outputCurrent',
        label: 'Output Current',
        unit: 'Amps',
        placeholder: 'Enter output current (e.g., 2)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'inputPower',
        label: 'Input Power',
        unit: 'Watts',
        formula: 'P_in = V_in × I_out'
      },
      {
        name: 'outputPower',
        label: 'Output Power',
        unit: 'Watts',
        formula: 'P_out = V_out × I_out'
      },
      {
        name: 'heatDissipated',
        label: 'Heat Dissipated',
        unit: 'Watts',
        formula: 'P_heat = (V_in - V_out) × I_out'
      },
      {
        name: 'efficiency',
        label: 'Efficiency',
        unit: '%',
        formula: 'Efficiency = (P_out / P_in) × 100'
      }
    ],
    formula: 'P_heat = (V_in - V_out) × I_out\nEfficiency = (V_out / V_in) × 100',
    realWorldScenario: 'You\'re building a 12V/2A power supply from 24V input. How much heat will the regulator dissipate? Do you need a heat sink?',
    measurementGuide: {
      title: 'How to Measure Actual Power Dissipation',
      steps: [
        'Build the power supply circuit',
        'Connect multimeter to measure input voltage',
        'Connect clamp meter to measure input current',
        'Calculate input power: P_in = V_in × I_in',
        'Connect multimeter to measure output voltage',
        'Connect clamp meter to measure output current',
        'Calculate output power: P_out = V_out × I_out',
        'Calculate heat: P_heat = P_in - P_out',
        'Measure regulator temperature with thermometer',
        'Compare with calculated heat dissipation',
        'Verify heat sink is adequate'
      ],
      tools: [
        'Digital Multimeter (for voltage measurement)',
        'Clamp Meter (for current measurement)',
        'Infrared Thermometer (for temperature measurement)',
        'Thermal Camera (for heat distribution analysis)',
        'Load Resistor (to simulate load current)'
      ],
      diyAlternatives: [
        'Use multimeter to measure voltage drop across regulator and sense resistor',
        'Calculate power from measured voltages: P = V × I',
        'Use hand to feel regulator temperature (rough estimate)',
        'Compare regulator temperature with reference (e.g., boiling water = 100°C)',
        'Use smartphone thermal camera app (limited accuracy)'
      ],
      safetyWarnings: [
        'Regulator will get VERY HOT - do not touch without protection',
        'Use thermal gloves when measuring temperature',
        'Ensure proper heat sinking before running at full power',
        'Monitor temperature continuously during testing',
        'Have fire extinguisher nearby in case of problems',
        'Never exceed regulator temperature rating'
      ]
    },
    examples: [
      {
        scenario: '24V input to 12V output, 2A load',
        inputs: { inputVoltage: 24, outputVoltage: 12, outputCurrent: 2 },
        outputs: { inputPower: 48, outputPower: 24, heatDissipated: 24, efficiency: 50 },
        explanation: 'The regulator dissipates 24W as heat! This requires a substantial heat sink. Efficiency is 50% (typical for linear regulators).'
      },
      {
        scenario: '12V input to 5V output, 1A load',
        inputs: { inputVoltage: 12, outputVoltage: 5, outputCurrent: 1 },
        outputs: { inputPower: 12, outputPower: 5, heatDissipated: 7, efficiency: 41.67 },
        explanation: 'The regulator dissipates 7W as heat. A small heat sink is needed. Efficiency is about 42%.'
      },
      {
        scenario: '12V input to 10V output, 0.5A load',
        inputs: { inputVoltage: 12, outputVoltage: 10, outputCurrent: 0.5 },
        outputs: { inputPower: 6, outputPower: 5, heatDissipated: 1, efficiency: 83.33 },
        explanation: 'The regulator dissipates only 1W as heat. A small heat sink or no heat sink needed. Efficiency is about 83%.'
      }
    ],
    references: [
      {
        title: 'Thermal Management in Power Supplies',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'inductance-calculator',
    name: 'Inductance Calculator with DIY Testing',
    description: 'Calculate inductance values and learn DIY methods to measure inductors',
    category: 'Component Testing',
    inputs: [
      {
        name: 'inductanceValue',
        label: 'Inductance Value',
        unit: 'Henries',
        placeholder: 'Enter inductance (e.g., 0.001 for 1mH)',
        type: 'number'
      },
      {
        name: 'frequency',
        label: 'Test Frequency',
        unit: 'Hz',
        placeholder: 'Enter frequency (e.g., 1000)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'reactance',
        label: 'Inductive Reactance',
        unit: 'Ohms',
        formula: 'XL = 2π × f × L'
      },
      {
        name: 'impedance',
        label: 'Impedance (at 1Ω resistance)',
        unit: 'Ohms',
        formula: 'Z = √(R² + XL²)'
      }
    ],
    formula: 'XL = 2π × f × L\nZ = √(R² + XL²)',
    realWorldScenario: 'You have a 1mH inductor and want to verify its value. How can you test it without an LCR meter?',
    measurementGuide: {
      title: 'DIY Methods to Measure Inductance',
      steps: [
        'METHOD 1: Using Oscilloscope and Function Generator',
        '1. Connect function generator to inductor through known resistor',
        '2. Observe voltage across inductor on oscilloscope',
        '3. Calculate reactance from voltage ratio',
        '4. Calculate inductance: L = XL / (2π × f)',
        '',
        'METHOD 2: Using Multimeter (DC Resistance)',
        '1. Measure DC resistance of inductor with multimeter',
        '2. Build RC circuit with known resistor and capacitor',
        '3. Measure resonant frequency',
        '4. Calculate inductance from resonant frequency',
        '',
        'METHOD 3: Using Audio Frequency Generator',
        '1. Connect audio frequency generator to inductor',
        '2. Measure voltage across inductor at different frequencies',
        '3. Find frequency where reactance equals known resistor value',
        '4. Calculate inductance from that frequency',
        '',
        'METHOD 4: Using LCR App on Smartphone',
        '1. Download LCR measurement app (uses phone audio jack)',
        '2. Connect inductor to phone audio interface',
        '3. App measures inductance automatically',
        '4. Compare with component value'
      ],
      tools: [
        'Oscilloscope (most accurate method)',
        'Function Generator (for AC signal)',
        'Digital Multimeter (for DC resistance)',
        'Audio Frequency Generator (smartphone app)',
        'Known Resistor (for reference)',
        'Known Capacitor (for resonance method)'
      ],
      diyAlternatives: [
        'Use smartphone oscilloscope app with external probe',
        'Use PC sound card as function generator (Audacity software)',
        'Build simple LC resonance circuit and measure frequency',
        'Use Arduino with analog input to measure voltage changes',
        'Compare inductor with known reference inductor',
        'Measure voltage drop at different AC frequencies with multimeter'
      ],
      safetyWarnings: [
        'Do not apply DC voltage to inductors in AC circuits (can damage)',
        'Be careful with high frequency signals (can cause burns)',
        'Ensure proper grounding for all measurements',
        'Do not exceed component voltage ratings',
        'Some inductors may have ferrite cores - handle carefully',
        'High current inductors can store significant energy - discharge carefully'
      ]
    },
    examples: [
      {
        scenario: 'Testing 1mH inductor at 1kHz',
        inputs: { inductanceValue: 0.001, frequency: 1000 },
        outputs: { reactance: 6.28, impedance: 6.28 },
        explanation: 'At 1kHz, a 1mH inductor has 6.28Ω reactance. If you apply 1V AC, current will be about 159mA.'
      },
      {
        scenario: 'Testing 10µH inductor at 100kHz',
        inputs: { inductanceValue: 0.00001, frequency: 100000 },
        outputs: { reactance: 6.28, impedance: 6.28 },
        explanation: 'At 100kHz, a 10µH inductor has 6.28Ω reactance. Same reactance as 1mH at 1kHz!'
      },
      {
        scenario: 'Testing 100mH inductor at 60Hz',
        inputs: { inductanceValue: 0.1, frequency: 60 },
        outputs: { reactance: 37.7, impedance: 37.7 },
        explanation: 'At 60Hz, a 100mH inductor has 37.7Ω reactance. This is typical for power supply filter inductors.'
      }
    ],
    references: [
      {
        title: 'Inductance Measurement Methods',
        url: 'https://www.electronics-tutorials.ws/inductor/inductor-basics.html'
      }
    ]
  },
  {
    id: 'esr-meter-alternative',
    name: 'ESR Meter Alternative - DIY Component Testing',
    description: 'Learn how to test capacitor ESR without an ESR meter using DIY methods',
    category: 'Component Testing',
    inputs: [
      {
        name: 'capacitanceValue',
        label: 'Capacitor Value',
        unit: 'Farads',
        placeholder: 'Enter capacitance (e.g., 0.001 for 1000µF)',
        type: 'number'
      },
      {
        name: 'frequency',
        label: 'Test Frequency',
        unit: 'Hz',
        placeholder: 'Enter frequency (e.g., 1000)',
        type: 'number'
      }
    ],
    outputs: [
      {
        name: 'reactance',
        label: 'Capacitive Reactance',
        unit: 'Ohms',
        formula: 'XC = 1 / (2π × f × C)'
      },
      {
        name: 'impedance',
        label: 'Total Impedance (with 1Ω ESR)',
        unit: 'Ohms',
        formula: 'Z = √(ESR² + XC²)'
      }
    ],
    formula: 'XC = 1 / (2π × f × C)\nZ = √(ESR² + XC²)',
    realWorldScenario: 'Your power supply capacitor is making a buzzing sound and output voltage is unstable. You suspect high ESR (Equivalent Series Resistance). How can you test it without an ESR meter?',
    measurementGuide: {
      title: 'DIY Methods to Test Capacitor ESR',
      steps: [
        'METHOD 1: Using Multimeter and Function Generator',
        '1. Build test circuit: Function Generator → 100Ω resistor → Capacitor → GND',
        '2. Set function generator to 1kHz, 1V output',
        '3. Measure voltage across capacitor with multimeter (AC setting)',
        '4. Calculate current: I = (1V - V_cap) / 100Ω',
        '5. Calculate impedance: Z = V_cap / I',
        '6. Calculate ESR: ESR = √(Z² - XC²)',
        '',
        'METHOD 2: Using Oscilloscope',
        '1. Connect function generator to capacitor through 10Ω resistor',
        '2. Observe voltage across resistor and capacitor on oscilloscope',
        '3. Measure voltage drop across 10Ω resistor',
        '4. Calculate current: I = V_resistor / 10Ω',
        '5. Calculate ESR: ESR = V_capacitor_phase_shift / I',
        '',
        'METHOD 3: Using Audio Frequency Sweep',
        '1. Connect audio frequency generator to capacitor through 100Ω resistor',
        '2. Measure voltage across capacitor at different frequencies',
        '3. At resonant frequency, impedance is minimum',
        '4. ESR ≈ impedance at resonant frequency',
        '',
        'METHOD 4: Visual Inspection and Ripple Measurement',
        '1. Check capacitor for physical damage (bulging, leaking)',
        '2. Measure output ripple voltage on oscilloscope',
        '3. High ripple indicates high ESR',
        '4. Compare with known good capacitor'
      ],
      tools: [
        'Digital Multimeter (AC voltage setting)',
        'Oscilloscope (most accurate)',
        'Function Generator (for AC signal)',
        'Known Resistor (100Ω recommended)',
        'Audio Frequency Generator (smartphone app)',
        'Reference Capacitor (known good capacitor)'
      ],
      diyAlternatives: [
        'Use smartphone oscilloscope app with external probe',
        'Use PC sound card as function generator (Audacity)',
        'Build simple LC resonance circuit and measure Q factor',
        'Use Arduino with analog inputs to measure impedance',
        'Compare capacitor temperature rise (high ESR = more heat)',
        'Listen for buzzing sound (high ESR = more noise)',
        'Measure capacitor voltage under load (high ESR = more voltage drop)'
      ],
      safetyWarnings: [
        'Always discharge capacitor before testing (use 10kΩ resistor)',
        'Do not apply voltage exceeding capacitor rating',
        'Be careful with large capacitors - they store significant energy',
        'Use proper grounding for all measurements',
        'Do not touch capacitor leads while power is on',
        'Some capacitors may be polarized - observe correct polarity'
      ]
    },
    examples: [
      {
        scenario: 'Testing 1000µF capacitor at 1kHz',
        inputs: { capacitanceValue: 0.001, frequency: 1000 },
        outputs: { reactance: 0.159, impedance: 1.0 },
        explanation: 'At 1kHz, a 1000µF capacitor has 0.159Ω reactance. If impedance measures 1Ω, ESR is approximately 0.99Ω (high - capacitor is bad).'
      },
      {
        scenario: 'Testing 100µF capacitor at 10kHz',
        inputs: { capacitanceValue: 0.0001, frequency: 10000 },
        outputs: { reactance: 0.159, impedance: 1.0 },
        explanation: 'At 10kHz, a 100µF capacitor has 0.159Ω reactance. Good capacitor should have ESR < 0.2Ω.'
      },
      {
        scenario: 'Testing 10µF capacitor at 100kHz',
        inputs: { capacitanceValue: 0.00001, frequency: 100000 },
        outputs: { reactance: 0.159, impedance: 1.0 },
        explanation: 'At 100kHz, a 10µF capacitor has 0.159Ω reactance. High frequency testing reveals ESR problems.'
      }
    ],
    references: [
      {
        title: 'Understanding Capacitor ESR',
        url: 'https://www.electronics-tutorials.ws/capacitor/capacitor-basics.html'
      }
    ]
  }
];

export const getCalculatorById = (id: string) => {
  return powerSupplyCalculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category: string) => {
  return powerSupplyCalculators.filter(calc => calc.category === category);
};

export const getCalculatorCategories = () => {
  const categories = new Set(powerSupplyCalculators.map(calc => calc.category));
  return Array.from(categories);
};
