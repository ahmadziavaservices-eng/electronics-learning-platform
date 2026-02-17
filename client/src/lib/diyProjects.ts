export interface DIYProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  category: string;
  materials: {
    name: string;
    quantity: number;
    unit: string;
    estimatedCost: string;
    source?: string;
  }[];
  tools: string[];
  steps: {
    number: number;
    title: string;
    description: string;
    tips: string[];
    warnings: string[];
  }[];
  learningOutcomes: string[];
  troubleshooting: {
    problem: string;
    cause: string;
    solution: string;
  }[];
  nextSteps: string[];
  references: {
    title: string;
    url: string;
  }[];
}

export const diyProjects: DIYProject[] = [
  {
    id: 'simple-5v-usb',
    title: 'Simple 5V USB Power Supply',
    description: 'Build a basic 5V power supply suitable for charging USB devices and powering microcontrollers. Perfect beginner project!',
    difficulty: 'easy',
    duration: '2-3 hours',
    category: 'Power Supplies',
    materials: [
      { name: '12V Transformer', quantity: 1, unit: 'piece', estimatedCost: '500-1500 PKR', source: 'Digilog.pk' },
      { name: 'Bridge Rectifier (1A)', quantity: 1, unit: 'piece', estimatedCost: '50-100 PKR', source: 'Digilog.pk' },
      { name: 'Electrolytic Capacitor 2200µF 25V', quantity: 1, unit: 'piece', estimatedCost: '50-100 PKR', source: 'Digilog.pk' },
      { name: 'LM7805 Voltage Regulator', quantity: 1, unit: 'piece', estimatedCost: '20-50 PKR', source: 'Digilog.pk' },
      { name: 'Ceramic Capacitor 0.1µF', quantity: 2, unit: 'pieces', estimatedCost: '5-10 PKR', source: 'Digilog.pk' },
      { name: 'USB Connector or Cable', quantity: 1, unit: 'piece', estimatedCost: '50-150 PKR', source: 'Digilog.pk' },
      { name: 'Heat Sink for Regulator', quantity: 1, unit: 'piece', estimatedCost: '30-80 PKR', source: 'Digilog.pk' },
      { name: 'Fuse Holder and 1A Fuse', quantity: 1, unit: 'piece', estimatedCost: '30-80 PKR', source: 'Digilog.pk' },
      { name: 'AC Power Cord', quantity: 1, unit: 'piece', estimatedCost: '100-300 PKR', source: 'Local shop' }
    ],
    tools: [
      'Soldering iron and solder',
      'Multimeter',
      'Wire strippers',
      'Screwdriver',
      'Heat sink compound (thermal paste)',
      'Safety glasses'
    ],
    steps: [
      {
        number: 1,
        title: 'Prepare the AC Input Stage',
        description: 'Connect the AC power cord to the fuse holder and transformer primary. This stage provides electrical isolation and safety.',
        tips: [
          'Always use a fuse on the primary side for protection',
          'Ensure power cord is properly grounded',
          'Use proper wire gauges for safety'
        ],
        warnings: [
          'DANGER: High voltage on primary side!',
          'Never touch primary side while powered',
          'Ensure proper insulation on all connections'
        ]
      },
      {
        number: 2,
        title: 'Build the Rectifier Stage',
        description: 'Connect the transformer secondary to the bridge rectifier. This converts AC to DC (though still with ripple).',
        tips: [
          'Verify transformer secondary voltage with multimeter before connecting',
          'Check diode orientation - cathode (black band) faces positive output',
          'Use quality diodes for reliability'
        ],
        warnings: [
          'Diodes can get hot - monitor temperature',
          'Do not reverse diode polarity',
          'Ensure proper heat dissipation'
        ]
      },
      {
        number: 3,
        title: 'Add the Filter Capacitor',
        description: 'Connect the large electrolytic capacitor across the rectifier output. This smooths the DC voltage and reduces ripple.',
        tips: [
          'Observe capacitor polarity - positive to positive output',
          'Use capacitor rated for at least 1.5× the peak voltage',
          'Larger capacitor = lower ripple voltage'
        ],
        warnings: [
          'DANGER: Capacitor stores dangerous charge!',
          'Always discharge before handling',
          'Reversed polarity causes capacitor explosion',
          'Do not exceed voltage rating'
        ]
      },
      {
        number: 4,
        title: 'Install the Voltage Regulator',
        description: 'Connect the LM7805 regulator to convert the filtered DC to stable 5V output.',
        tips: [
          'Pin 1: Input (from capacitor)',
          'Pin 2: Ground',
          'Pin 3: Output (5V)',
          'Use heat sink for reliable operation'
        ],
        warnings: [
          'Regulator gets hot - ensure proper heat sinking',
          'Do not exceed input voltage (35V)',
          'Ensure proper grounding'
        ]
      },
      {
        number: 5,
        title: 'Add Ceramic Capacitors',
        description: 'Connect 0.1µF ceramic capacitors at input and output of the regulator for stability and noise filtering.',
        tips: [
          'Input capacitor: Between regulator input and ground',
          'Output capacitor: Between regulator output and ground',
          'Use quality ceramic capacitors',
          'Keep leads short to minimize noise'
        ],
        warnings: [
          'Incorrect capacitor placement causes instability',
          'Do not use electrolytic capacitors here'
        ]
      },
      {
        number: 6,
        title: 'Connect the Output',
        description: 'Connect the USB connector or cable to the regulator output. This provides power to your devices.',
        tips: [
          'USB Standard: Red = +5V, Black = GND, Green/White = Data (not used here)',
          'Ensure solid connections',
          'Use proper wire gauges',
          'Test with multimeter before connecting load'
        ],
        warnings: [
          'Reversed polarity damages USB devices',
          'Ensure proper grounding',
          'Do not exceed 1.5A output current'
        ]
      },
      {
        number: 7,
        title: 'Test the Power Supply',
        description: 'Verify the output voltage and current before connecting any devices.',
        tips: [
          'Set multimeter to DC voltage mode',
          'Measure voltage between output and ground',
          'Should read approximately 5.0V',
          'Test with no load first, then with small load'
        ],
        warnings: [
          'Always use proper safety equipment',
          'Do not touch high-voltage areas',
          'Ensure proper grounding'
        ]
      },
      {
        number: 8,
        title: 'Connect Your First Device',
        description: 'Connect a USB device (phone charger, LED, etc.) and verify it works correctly.',
        tips: [
          'Start with low-power device (LED)',
          'Monitor for unusual heat or smells',
          'Check voltage stability under load',
          'Celebrate your success! 🎉'
        ],
        warnings: [
          'Do not exceed 1.5A total current',
          'Monitor temperature during operation',
          'Disconnect if anything seems wrong'
        ]
      }
    ],
    learningOutcomes: [
      'Understand AC to DC conversion',
      'Learn how transformers work',
      'Understand rectification and filtering',
      'Learn voltage regulation basics',
      'Build and test a working power supply',
      'Understand safety in electronics'
    ],
    troubleshooting: [
      {
        problem: 'No output voltage',
        cause: 'Fuse blown, transformer not connected, or regulator failed',
        solution: 'Check fuse, verify transformer connections, test regulator with multimeter'
      },
      {
        problem: 'Output voltage too low',
        cause: 'Transformer secondary voltage too low, filter capacitor discharged',
        solution: 'Verify transformer secondary voltage, check capacitor with multimeter'
      },
      {
        problem: 'Regulator getting very hot',
        cause: 'Insufficient heat sinking, high input voltage, or short circuit',
        solution: 'Add larger heat sink, check input voltage, verify no short circuits'
      },
      {
        problem: 'High ripple voltage',
        cause: 'Filter capacitor too small or defective',
        solution: 'Increase capacitor value or replace with new capacitor'
      }
    ],
    nextSteps: [
      'Add current limiting for protection',
      'Make output voltage adjustable with potentiometer',
      'Add LED indicator for power on',
      'Build a variable bench power supply with LM317',
      'Upgrade to higher current with external transistor'
    ],
    references: [
      {
        title: 'LM7805 Datasheet',
        url: 'https://www.ti.com/product/LM7805'
      },
      {
        title: 'Power Supply Design Guide',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  },
  {
    id: 'variable-bench-supply',
    title: 'Variable Bench Power Supply (LM317)',
    description: 'Build an adjustable power supply with voltage and current control. Perfect for lab work and testing circuits.',
    difficulty: 'medium',
    duration: '4-5 hours',
    category: 'Power Supplies',
    materials: [
      { name: '24V Transformer', quantity: 1, unit: 'piece', estimatedCost: '800-2000 PKR', source: 'Digilog.pk' },
      { name: 'Bridge Rectifier (2A)', quantity: 1, unit: 'piece', estimatedCost: '80-150 PKR', source: 'Digilog.pk' },
      { name: 'Electrolytic Capacitor 4700µF 50V', quantity: 1, unit: 'piece', estimatedCost: '100-200 PKR', source: 'Digilog.pk' },
      { name: 'LM317 Voltage Regulator', quantity: 1, unit: 'piece', estimatedCost: '30-80 PKR', source: 'Digilog.pk' },
      { name: 'Potentiometer 10kΩ (Voltage)', quantity: 1, unit: 'piece', estimatedCost: '30-80 PKR', source: 'Digilog.pk' },
      { name: 'Potentiometer 10kΩ (Current)', quantity: 1, unit: 'piece', estimatedCost: '30-80 PKR', source: 'Digilog.pk' },
      { name: 'Resistor 240Ω 1/2W', quantity: 1, unit: 'piece', estimatedCost: '5-10 PKR', source: 'Digilog.pk' },
      { name: 'Resistor 1kΩ 1/4W', quantity: 2, unit: 'pieces', estimatedCost: '3-5 PKR', source: 'Digilog.pk' },
      { name: 'Sense Resistor 0.1Ω 2W', quantity: 1, unit: 'piece', estimatedCost: '50-100 PKR', source: 'Digilog.pk' },
      { name: 'Ceramic Capacitor 0.1µF', quantity: 2, unit: 'pieces', estimatedCost: '5-10 PKR', source: 'Digilog.pk' },
      { name: 'Electrolytic Capacitor 10µF', quantity: 2, unit: 'pieces', estimatedCost: '10-20 PKR', source: 'Digilog.pk' },
      { name: 'Binding Posts (Output)', quantity: 2, unit: 'pieces', estimatedCost: '100-200 PKR', source: 'Digilog.pk' },
      { name: 'Large Heat Sink', quantity: 1, unit: 'piece', estimatedCost: '100-300 PKR', source: 'Digilog.pk' },
      { name: 'Fuse Holder and 2A Fuse', quantity: 1, unit: 'piece', estimatedCost: '40-100 PKR', source: 'Digilog.pk' }
    ],
    tools: [
      'Soldering iron and solder',
      'Multimeter',
      'Wire strippers',
      'Screwdriver',
      'Heat sink compound',
      'Oscilloscope (optional)',
      'Safety glasses'
    ],
    steps: [
      {
        number: 1,
        title: 'Build AC Input and Rectifier Stages',
        description: 'Connect transformer and bridge rectifier as in the simple 5V supply project.',
        tips: [
          'Use 24V transformer for higher voltage range',
          'Verify connections before powering on',
          'Use 2A rectifier for higher current capacity'
        ],
        warnings: [
          'High voltage hazard on primary side',
          'Ensure proper fusing and grounding'
        ]
      },
      {
        number: 2,
        title: 'Install Large Filter Capacitor',
        description: 'Connect 4700µF capacitor for better filtering and lower ripple voltage.',
        tips: [
          'Larger capacitor provides better performance',
          'Observe polarity carefully',
          'Use capacitor rated for at least 50V'
        ],
        warnings: [
          'Capacitor stores dangerous charge',
          'Always discharge before handling',
          'Reversed polarity causes explosion'
        ]
      },
      {
        number: 3,
        title: 'Design Voltage Adjustment Network',
        description: 'Create feedback divider with potentiometer for voltage adjustment.',
        tips: [
          'Output voltage = 1.25V × (1 + R2/R1)',
          'Use 10kΩ potentiometer for R2',
          'Use 240Ω resistor for R1',
          'This gives voltage range from ~1.5V to ~20V'
        ],
        warnings: [
          'Incorrect resistor values cause wrong voltage range',
          'Verify calculations before building'
        ]
      },
      {
        number: 4,
        title: 'Install Current Limiting Circuit',
        description: 'Add sense resistor and current limit potentiometer for current control.',
        tips: [
          'Use 0.1Ω sense resistor (2W rated)',
          'Current limit = 0.65V / R_sense = 6.5A',
          'Use second potentiometer for fine adjustment',
          'Sense resistor will get warm - monitor temperature'
        ],
        warnings: [
          'Sense resistor gets hot - do not touch',
          'Ensure proper power rating',
          'Monitor temperature during operation'
        ]
      },
      {
        number: 5,
        title: 'Connect Regulator and Capacitors',
        description: 'Install LM317 with proper input/output capacitors.',
        tips: [
          'Add 10µF capacitor at input',
          'Add 10µF capacitor at output',
          'Add 0.1µF ceramic at output for high-frequency noise',
          'Use large heat sink for reliable operation'
        ],
        warnings: [
          'Regulator gets very hot at high currents',
          'Ensure proper heat sinking',
          'Do not touch during operation'
        ]
      },
      {
        number: 6,
        title: 'Add Output Binding Posts',
        description: 'Install binding posts for easy connection of test loads.',
        tips: [
          'Red post for positive output',
          'Black post for ground',
          'Ensure solid connections',
          'Label clearly'
        ],
        warnings: [
          'Ensure posts are insulated from chassis',
          'Do not allow short circuits'
        ]
      },
      {
        number: 7,
        title: 'Calibrate Voltage Control',
        description: 'Adjust potentiometer and verify voltage range.',
        tips: [
          'Start with potentiometer at minimum',
          'Slowly adjust and measure voltage',
          'Verify full range (1.5V to 20V)',
          'Mark potentiometer positions for reference'
        ],
        warnings: [
          'Do not apply excessive load during calibration',
          'Monitor for unusual heat or smells'
        ]
      },
      {
        number: 8,
        title: 'Calibrate Current Limiting',
        description: 'Test current limiting with known load resistors.',
        tips: [
          'Use variable resistor load for testing',
          'Slowly decrease load resistance',
          'Observe when current stops increasing',
          'Verify limit matches calculation'
        ],
        warnings: [
          'Start with highest load resistance',
          'Monitor temperature during testing',
          'Do not exceed rated current'
        ]
      },
      {
        number: 9,
        title: 'Final Testing and Verification',
        description: 'Test the complete power supply with various loads.',
        tips: [
          'Test voltage stability under load',
          'Verify current limiting works',
          'Check for ripple with oscilloscope if available',
          'Test with real circuits'
        ],
        warnings: [
          'Always start with small loads',
          'Monitor temperature throughout',
          'Disconnect if anything seems wrong'
        ]
      }
    ],
    learningOutcomes: [
      'Design adjustable voltage regulators',
      'Understand feedback networks',
      'Implement current limiting circuits',
      'Build professional-grade power supplies',
      'Calibrate and test power supplies',
      'Understand thermal management'
    ],
    troubleshooting: [
      {
        problem: 'Voltage does not adjust smoothly',
        cause: 'Potentiometer defective or connections loose',
        solution: 'Check potentiometer with multimeter, verify connections'
      },
      {
        problem: 'Current limiting does not work',
        cause: 'Sense resistor value wrong or connections loose',
        solution: 'Verify sense resistor value, check all connections'
      },
      {
        problem: 'Regulator oscillates or becomes unstable',
        cause: 'Missing or incorrect capacitors',
        solution: 'Add capacitors at input and output, verify values'
      },
      {
        problem: 'Output voltage drifts with temperature',
        cause: 'Poor heat sinking or component aging',
        solution: 'Improve heat sinking, replace regulator if necessary'
      }
    ],
    nextSteps: [
      'Add digital display for voltage and current readout',
      'Implement remote control via WiFi',
      'Add multiple output channels',
      'Upgrade to higher current with external transistor',
      'Add protection circuits for overcurrent and overvoltage'
    ],
    references: [
      {
        title: 'LM317 Datasheet',
        url: 'https://www.ti.com/product/LM317'
      },
      {
        title: 'Adjustable Power Supply Design',
        url: 'https://www.electronics-tutorials.ws/power/power-supply.html'
      }
    ]
  }
];

export const getProjectById = (id: string) => {
  return diyProjects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string) => {
  return diyProjects.filter(project => project.category === category);
};

export const getProjectCategories = () => {
  const categories = new Set(diyProjects.map(project => project.category));
  return Array.from(categories);
};

export const getProjectsByDifficulty = (difficulty: string) => {
  return diyProjects.filter(project => project.difficulty === difficulty);
};
