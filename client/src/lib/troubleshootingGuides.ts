export interface TroubleshootingGuide {
  id: string;
  title: string;
  description: string;
  category: string;
  symptoms: string[];
  diagnosticSteps: {
    step: number;
    description: string;
    whatToLookFor: string;
    tools: string[];
  }[];
  possibleCauses: {
    cause: string;
    likelihood: 'high' | 'medium' | 'low';
    howToCheck: string;
  }[];
  solutions: {
    causeId: string;
    solution: string;
    steps: string[];
    estimatedTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  preventionTips: string[];
  safetyWarnings: string[];
  references: {
    title: string;
    url: string;
  }[];
}

export const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: 'no-output-voltage',
    title: 'Power Supply Produces No Output Voltage',
    description: 'Your power supply is completely dead - no voltage at the output terminals. This is the most common problem.',
    category: 'Power Supply Issues',
    symptoms: [
      'No voltage at output terminals',
      'No LED indicator (if present)',
      'No load draws any current',
      'Complete silence from power supply'
    ],
    diagnosticSteps: [
      {
        step: 1,
        description: 'Check AC Input Power',
        whatToLookFor: 'AC voltage at wall outlet',
        tools: ['Multimeter (AC voltage setting)', 'Another device to test outlet']
      },
      {
        step: 2,
        description: 'Check Fuse',
        whatToLookFor: 'Fuse continuity or visual damage',
        tools: ['Multimeter (continuity/resistance setting)', 'Flashlight']
      },
      {
        step: 3,
        description: 'Check Transformer Secondary Voltage',
        whatToLookFor: 'AC voltage at transformer secondary',
        tools: ['Multimeter (AC voltage setting)']
      },
      {
        step: 4,
        description: 'Check Rectifier Output',
        whatToLookFor: 'DC voltage after bridge rectifier',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 5,
        description: 'Check Filter Capacitor',
        whatToLookFor: 'DC voltage across capacitor',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 6,
        description: 'Check Regulator Output',
        whatToLookFor: 'DC voltage at regulator output',
        tools: ['Multimeter (DC voltage setting)']
      }
    ],
    possibleCauses: [
      {
        cause: 'Blown Fuse',
        likelihood: 'high',
        howToCheck: 'Visually inspect fuse or test with multimeter continuity'
      },
      {
        cause: 'Transformer Primary Disconnected',
        likelihood: 'high',
        howToCheck: 'Check AC input connections with multimeter'
      },
      {
        cause: 'Transformer Failure',
        likelihood: 'medium',
        howToCheck: 'Measure AC voltage at transformer secondary'
      },
      {
        cause: 'Rectifier Diodes Failed',
        likelihood: 'medium',
        howToCheck: 'Check DC voltage after rectifier'
      },
      {
        cause: 'Filter Capacitor Discharged/Failed',
        likelihood: 'medium',
        howToCheck: 'Measure voltage across capacitor'
      },
      {
        cause: 'Voltage Regulator Failed',
        likelihood: 'medium',
        howToCheck: 'Check voltage at regulator input vs output'
      },
      {
        cause: 'Loose Connections',
        likelihood: 'high',
        howToCheck: 'Visually inspect all solder joints and connections'
      }
    ],
    solutions: [
      {
        causeId: 'blown-fuse',
        solution: 'Replace the blown fuse with a new one of the same rating',
        steps: [
          'Unplug power supply from wall outlet',
          'Wait 5 minutes for capacitors to discharge',
          'Locate fuse holder',
          'Remove old fuse',
          'Insert new fuse of same rating (e.g., 1A, 2A)',
          'Plug back in and test',
          'If fuse blows again, there is a short circuit - do not use!'
        ],
        estimatedTime: '10 minutes',
        difficulty: 'easy'
      },
      {
        causeId: 'transformer-disconnected',
        solution: 'Reconnect transformer primary to AC input',
        steps: [
          'Unplug power supply',
          'Check AC power cord connections',
          'Check connections inside power supply',
          'Look for loose or corroded connections',
          'Resolder if necessary',
          'Test with multimeter before powering on'
        ],
        estimatedTime: '20 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'transformer-failure',
        solution: 'Replace transformer with new one of same specifications',
        steps: [
          'Unplug power supply',
          'Wait for capacitors to discharge',
          'Desolder transformer from circuit',
          'Install new transformer with same voltage and current rating',
          'Test AC voltage at secondary before connecting rectifier',
          'Reconnect rectifier and test full circuit'
        ],
        estimatedTime: '1-2 hours',
        difficulty: 'hard'
      },
      {
        causeId: 'rectifier-failure',
        solution: 'Replace failed diodes in bridge rectifier',
        steps: [
          'Unplug and wait for discharge',
          'Test each diode individually with multimeter',
          'Replace any diodes that fail continuity test',
          'If using bridge rectifier module, replace entire module',
          'Test rectifier output voltage after replacement'
        ],
        estimatedTime: '45 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'capacitor-failure',
        solution: 'Replace filter capacitor with new one',
        steps: [
          'Unplug power supply',
          'Discharge capacitor with 10kΩ resistor',
          'Desolder old capacitor',
          'Install new capacitor with same or higher capacitance and voltage rating',
          'Observe polarity (+ to +)',
          'Test voltage across new capacitor'
        ],
        estimatedTime: '30 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'regulator-failure',
        solution: 'Replace voltage regulator IC',
        steps: [
          'Unplug and discharge capacitors',
          'Test regulator with multimeter (input vs output voltage)',
          'If output is 0V with good input, regulator is likely failed',
          'Desolder old regulator',
          'Install new regulator of same type',
          'Ensure proper heat sinking',
          'Test output voltage'
        ],
        estimatedTime: '45 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'loose-connections',
        solution: 'Inspect and repair loose connections',
        steps: [
          'Unplug power supply',
          'Visually inspect all solder joints',
          'Look for cold solder joints (dull, grainy appearance)',
          'Resolder any suspicious connections',
          'Check all wire connections are tight',
          'Test with multimeter at each stage'
        ],
        estimatedTime: '1 hour',
        difficulty: 'medium'
      }
    ],
    preventionTips: [
      'Always use proper fuse rating for your power supply',
      'Keep power supply away from moisture and dust',
      'Ensure proper ventilation to prevent overheating',
      'Do not exceed maximum input voltage',
      'Use quality components from reputable suppliers',
      'Perform regular maintenance and inspection',
      'Keep detailed records of modifications'
    ],
    safetyWarnings: [
      'ALWAYS unplug before working on power supply',
      'Wait at least 5 minutes for capacitors to discharge',
      'Use 10kΩ resistor to safely discharge large capacitors',
      'Do not work on live circuits',
      'Use proper grounding techniques',
      'Wear safety glasses when testing'
    ],
    references: [
      {
        title: 'Power Supply Troubleshooting Guide',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'voltage-drops-under-load',
    title: 'Output Voltage Drops When Load is Connected',
    description: 'Power supply works with no load, but voltage drops significantly when you connect a device. This indicates poor regulation or current limiting.',
    category: 'Voltage Regulation Issues',
    symptoms: [
      'Voltage is normal with no load',
      'Voltage drops significantly when load is connected',
      'Voltage recovers when load is removed',
      'Connected devices work poorly or not at all'
    ],
    diagnosticSteps: [
      {
        step: 1,
        description: 'Measure No-Load Voltage',
        whatToLookFor: 'Voltage at output with no load connected',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 2,
        description: 'Measure Loaded Voltage',
        whatToLookFor: 'Voltage at output with small load (LED or resistor)',
        tools: ['Multimeter (DC voltage setting)', 'Load resistor or LED']
      },
      {
        step: 3,
        description: 'Measure Load Current',
        whatToLookFor: 'Current drawn by load',
        tools: ['Multimeter (DC current setting)', 'Clamp meter']
      },
      {
        step: 4,
        description: 'Check Transformer Secondary Voltage',
        whatToLookFor: 'AC voltage at transformer secondary under load',
        tools: ['Multimeter (AC voltage setting)']
      },
      {
        step: 5,
        description: 'Check Filter Capacitor Voltage',
        whatToLookFor: 'DC voltage across filter capacitor under load',
        tools: ['Multimeter (DC voltage setting)']
      }
    ],
    possibleCauses: [
      {
        cause: 'Transformer Too Small',
        likelihood: 'high',
        howToCheck: 'Check transformer secondary voltage drops under load'
      },
      {
        cause: 'Filter Capacitor Too Small',
        likelihood: 'high',
        howToCheck: 'Measure ripple voltage - should be less than 1V'
      },
      {
        cause: 'Poor Regulation (Regulator Failing)',
        likelihood: 'medium',
        howToCheck: 'Compare voltage drop with expected regulation'
      },
      {
        cause: 'Loose Connections/High Resistance',
        likelihood: 'medium',
        howToCheck: 'Check for voltage drop across wires and connections'
      },
      {
        cause: 'Load Current Exceeds Regulator Rating',
        likelihood: 'high',
        howToCheck: 'Measure actual load current and compare with regulator rating'
      }
    ],
    solutions: [
      {
        causeId: 'transformer-too-small',
        solution: 'Replace transformer with larger one',
        steps: [
          'Determine required transformer VA rating: VA = V × I',
          'Example: 12V × 2A = 24VA minimum',
          'Buy transformer with at least 1.5× the required VA',
          'Unplug and replace transformer',
          'Test secondary voltage under load'
        ],
        estimatedTime: '1-2 hours',
        difficulty: 'hard'
      },
      {
        causeId: 'capacitor-too-small',
        solution: 'Increase filter capacitor value',
        steps: [
          'Calculate required capacitance: C = I / (2 × f × V_ripple)',
          'Current transformer with larger capacitor (2× to 3× current value)',
          'Unplug and discharge old capacitor',
          'Replace with new capacitor of higher value',
          'Measure ripple voltage - should be less than 1V'
        ],
        estimatedTime: '30 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'poor-regulation',
        solution: 'Check and possibly replace voltage regulator',
        steps: [
          'Measure regulator input voltage under load',
          'Measure regulator output voltage under load',
          'Calculate regulation: (V_no_load - V_load) / V_load × 100%',
          'If regulation is poor, regulator may be failing',
          'Replace regulator and test'
        ],
        estimatedTime: '45 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'loose-connections',
        solution: 'Reduce wire resistance and improve connections',
        steps: [
          'Measure voltage drop across output wires',
          'Use thicker wire gauge to reduce resistance',
          'Ensure all solder joints are solid',
          'Check for corroded connections',
          'Resolder any weak connections'
        ],
        estimatedTime: '1 hour',
        difficulty: 'medium'
      },
      {
        causeId: 'load-exceeds-rating',
        solution: 'Use external transistor for higher current',
        steps: [
          'Calculate required current: I = P / V',
          'If current exceeds regulator rating, use external pass transistor',
          'Install 2N3055 or similar power transistor',
          'Ensure proper heat sinking',
          'Test with rated load'
        ],
        estimatedTime: '2-3 hours',
        difficulty: 'hard'
      }
    ],
    preventionTips: [
      'Always choose transformer with adequate VA rating',
      'Use large filter capacitors for stable output',
      'Use thick wires to minimize voltage drop',
      'Ensure all connections are soldered properly',
      'Do not exceed regulator current rating',
      'Use external transistor for high currents',
      'Test with expected load during design phase'
    ],
    safetyWarnings: [
      'High currents can cause wires to overheat',
      'Ensure proper fusing for protection',
      'Monitor temperature during operation',
      'Do not exceed component ratings',
      'Use proper heat sinking for high-current circuits'
    ],
    references: [
      {
        title: 'Power Supply Regulation',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'regulator-overheating',
    title: 'Voltage Regulator Gets Very Hot',
    description: 'Regulator is generating excessive heat. This can damage the regulator and connected circuits.',
    category: 'Thermal Issues',
    symptoms: [
      'Regulator is too hot to touch',
      'Smoke or burning smell',
      'Regulator shuts down or becomes unreliable',
      'Heat sink is very hot'
    ],
    diagnosticSteps: [
      {
        step: 1,
        description: 'Measure Input Voltage',
        whatToLookFor: 'Voltage at regulator input',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 2,
        description: 'Measure Output Voltage',
        whatToLookFor: 'Voltage at regulator output',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 3,
        description: 'Measure Load Current',
        whatToLookFor: 'Current drawn by load',
        tools: ['Multimeter (DC current setting)', 'Clamp meter']
      },
      {
        step: 4,
        description: 'Calculate Power Dissipation',
        whatToLookFor: 'P = (V_in - V_out) × I_out',
        tools: ['Calculator']
      },
      {
        step: 5,
        description: 'Check Heat Sink Contact',
        whatToLookFor: 'Thermal paste and mechanical contact',
        tools: ['Visual inspection', 'Thermal camera (optional)']
      }
    ],
    possibleCauses: [
      {
        cause: 'Input Voltage Too High',
        likelihood: 'high',
        howToCheck: 'Measure input voltage - should be 2-3V above output'
      },
      {
        cause: 'Load Current Too High',
        likelihood: 'high',
        howToCheck: 'Measure load current - compare with regulator rating'
      },
      {
        cause: 'Insufficient Heat Sinking',
        likelihood: 'high',
        howToCheck: 'Check if heat sink is properly attached with thermal paste'
      },
      {
        cause: 'Short Circuit in Load',
        likelihood: 'medium',
        howToCheck: 'Disconnect load and measure output voltage'
      },
      {
        cause: 'Regulator Failure',
        likelihood: 'low',
        howToCheck: 'Check if regulator is functioning normally'
      }
    ],
    solutions: [
      {
        causeId: 'input-voltage-too-high',
        solution: 'Reduce input voltage to regulator',
        steps: [
          'Check transformer secondary voltage',
          'If too high, use different transformer',
          'Or add series resistor to reduce voltage',
          'Measure new input voltage',
          'Verify regulator cools down'
        ],
        estimatedTime: '1-2 hours',
        difficulty: 'hard'
      },
      {
        causeId: 'load-current-too-high',
        solution: 'Reduce load current or use higher-rated regulator',
        steps: [
          'Measure actual load current',
          'If exceeds regulator rating, use external transistor',
          'Install 2N3055 or similar power transistor',
          'Ensure proper heat sinking on transistor',
          'Test with rated load'
        ],
        estimatedTime: '2-3 hours',
        difficulty: 'hard'
      },
      {
        causeId: 'insufficient-heat-sinking',
        solution: 'Improve heat sinking',
        steps: [
          'Unplug power supply',
          'Remove regulator from heat sink',
          'Clean old thermal paste with alcohol',
          'Apply fresh thermal paste',
          'Reattach regulator to heat sink',
          'Use larger heat sink if necessary',
          'Ensure good air circulation'
        ],
        estimatedTime: '30 minutes',
        difficulty: 'easy'
      },
      {
        causeId: 'short-circuit-in-load',
        solution: 'Find and fix short circuit',
        steps: [
          'Disconnect load from power supply',
          'Measure output voltage - should return to normal',
          'Inspect load circuit for damage',
          'Check for loose wires or components',
          'Repair or replace damaged components',
          'Reconnect and test'
        ],
        estimatedTime: '1-2 hours',
        difficulty: 'medium'
      },
      {
        causeId: 'regulator-failure',
        solution: 'Replace voltage regulator',
        steps: [
          'Unplug and discharge capacitors',
          'Desolder failed regulator',
          'Install new regulator of same type',
          'Ensure proper heat sinking',
          'Test output voltage and temperature'
        ],
        estimatedTime: '45 minutes',
        difficulty: 'medium'
      }
    ],
    preventionTips: [
      'Always use adequate heat sink for expected power dissipation',
      'Apply thermal paste between regulator and heat sink',
      'Ensure good air circulation around heat sink',
      'Do not exceed regulator current rating',
      'Keep input voltage as low as practical',
      'Use external transistor for high power applications',
      'Monitor temperature during operation'
    ],
    safetyWarnings: [
      'NEVER touch regulator during operation - it can cause burns',
      'Use thermal gloves when handling hot components',
      'Ensure proper ventilation to prevent fire hazard',
      'Do not block heat sink airflow',
      'Disconnect power if regulator gets excessively hot',
      'Use fire extinguisher nearby as precaution'
    ],
    references: [
      {
        title: 'Thermal Management in Power Supplies',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'high-ripple-voltage',
    title: 'High Ripple Voltage (Unstable Output)',
    description: 'Output voltage is unstable with visible ripple. Devices connected may malfunction or display incorrect readings.',
    category: 'Filtering Issues',
    symptoms: [
      'Output voltage fluctuates',
      'Connected devices work intermittently',
      'Oscilloscope shows large AC component',
      'Multimeter shows varying voltage readings'
    ],
    diagnosticSteps: [
      {
        step: 1,
        description: 'Measure DC Output Voltage',
        whatToLookFor: 'Average output voltage',
        tools: ['Multimeter (DC voltage setting)']
      },
      {
        step: 2,
        description: 'Measure AC Ripple with Multimeter',
        whatToLookFor: 'AC voltage component',
        tools: ['Multimeter (AC voltage setting)']
      },
      {
        step: 3,
        description: 'Observe Ripple with Oscilloscope',
        whatToLookFor: 'Ripple waveform and peak-to-peak voltage',
        tools: ['Oscilloscope']
      },
      {
        step: 4,
        description: 'Check Filter Capacitor',
        whatToLookFor: 'Capacitor condition and voltage',
        tools: ['Visual inspection', 'Multimeter']
      },
      {
        step: 5,
        description: 'Measure Load Current',
        whatToLookFor: 'Current drawn by load',
        tools: ['Multimeter (DC current setting)']
      }
    ],
    possibleCauses: [
      {
        cause: 'Filter Capacitor Too Small',
        likelihood: 'high',
        howToCheck: 'Calculate required capacitance and compare'
      },
      {
        cause: 'Filter Capacitor Defective (High ESR)',
        likelihood: 'high',
        howToCheck: 'Measure ripple voltage - should be less than 1V'
      },
      {
        cause: 'Load Current Too High',
        likelihood: 'medium',
        howToCheck: 'Measure load current and compare with capacitor rating'
      },
      {
        cause: 'Poor Connections',
        likelihood: 'medium',
        howToCheck: 'Check for loose connections and cold solder joints'
      }
    ],
    solutions: [
      {
        causeId: 'capacitor-too-small',
        solution: 'Increase filter capacitor value',
        steps: [
          'Calculate required capacitance: C = I / (2 × f × V_ripple)',
          'Example: For 2A load at 60Hz with 0.5V ripple: C = 2 / (2 × 60 × 0.5) = 3330µF',
          'Use capacitor 2-3× larger than calculated',
          'Unplug and discharge old capacitor',
          'Replace with new capacitor of higher value',
          'Measure ripple voltage - should be less than 1V'
        ],
        estimatedTime: '30 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'capacitor-defective',
        solution: 'Replace filter capacitor',
        steps: [
          'Unplug power supply',
          'Discharge old capacitor with 10kΩ resistor',
          'Desolder defective capacitor',
          'Install new capacitor with same or higher value',
          'Observe polarity (+ to +)',
          'Measure ripple voltage - should improve significantly'
        ],
        estimatedTime: '30 minutes',
        difficulty: 'medium'
      },
      {
        causeId: 'load-current-too-high',
        solution: 'Reduce load current or increase capacitor',
        steps: [
          'Measure actual load current',
          'If load is excessive, reduce it',
          'Or increase filter capacitor value',
          'Or use multiple capacitors in parallel',
          'Measure ripple voltage after changes'
        ],
        estimatedTime: '1 hour',
        difficulty: 'medium'
      },
      {
        causeId: 'poor-connections',
        solution: 'Improve connections and solder joints',
        steps: [
          'Inspect all connections visually',
          'Look for cold solder joints (dull appearance)',
          'Resolder any suspicious connections',
          'Use thick wires to minimize resistance',
          'Measure ripple voltage after repairs'
        ],
        estimatedTime: '1 hour',
        difficulty: 'medium'
      }
    ],
    preventionTips: [
      'Always use adequate filter capacitor for expected load',
      'Use quality capacitors from reputable suppliers',
      'Check capacitor ESR specifications',
      'Use multiple capacitors in parallel for better filtering',
      'Add additional filtering stages if needed',
      'Test ripple voltage during design phase',
      'Replace capacitors periodically (they age over time)'
    ],
    safetyWarnings: [
      'Capacitors store dangerous charge - always discharge before handling',
      'Use 10kΩ resistor to safely discharge large capacitors',
      'Do not exceed capacitor voltage rating',
      'Observe polarity - reversed polarity causes explosion'
    ],
    references: [
      {
        title: 'Power Supply Filtering',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  }
];

export const getGuideById = (id: string) => {
  return troubleshootingGuides.find(guide => guide.id === id);
};

export const getGuidesByCategory = (category: string) => {
  return troubleshootingGuides.filter(guide => guide.category === category);
};

export const getGuideCategories = () => {
  const categories = new Set(troubleshootingGuides.map(guide => guide.category));
  return Array.from(categories);
};
