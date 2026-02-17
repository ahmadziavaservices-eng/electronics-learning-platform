export interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: {
    key: string;
    value: string;
  }[];
  applications: string[];
  sourcing: {
    vendor: string;
    url: string;
    estimatedPrice: string;
  }[];
  datasheet?: string;
  alternatives: string[];
  tips: string[];
  safetyWarnings: string[];
}

export const componentDatabase: Component[] = [
  {
    id: 'lm723',
    name: 'LM723 Voltage Regulator IC',
    category: 'Voltage Regulators',
    description: 'Versatile adjustable voltage regulator IC with built-in current limiting. Perfect for building lab bench power supplies with adjustable voltage and current control.',
    specifications: [
      { key: 'Package', value: '14-pin DIP' },
      { key: 'Output Voltage Range', value: '2V to 37V (adjustable)' },
      { key: 'Output Current (on-chip)', value: 'Up to 150mA' },
      { key: 'Reference Voltage', value: '7.15V (typical)' },
      { key: 'Current Limit Range', value: '0.65V to 2.5V' },
      { key: 'Operating Temperature', value: '-55°C to +150°C' },
      { key: 'Supply Voltage', value: '9V to 40V' }
    ],
    applications: [
      'Adjustable power supplies',
      'Lab bench power supplies',
      'Current-limited power supplies',
      'Battery chargers',
      'Regulated DC power sources',
      'Educational projects'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=LM723',
        estimatedPrice: '50-150 PKR'
      },
      {
        vendor: 'Local Electronics Shop',
        url: 'Check your local supplier',
        estimatedPrice: '50-150 PKR'
      }
    ],
    datasheet: 'https://www.ti.com/product/LM723',
    alternatives: ['LM317 (1.5A max)', 'LM338 (5A max)', 'LM350 (3A max)'],
    tips: [
      'Use a heat sink for currents above 500mA',
      'Add 0.1µF capacitor on Pin 13 for frequency compensation',
      'Keep feedback divider resistors between 1kΩ and 10kΩ for best performance',
      'Use a potentiometer for R2 to make output voltage adjustable',
      'Sense resistor should be 1/4W or higher for current limiting'
    ],
    safetyWarnings: [
      'Regulator can get very hot - ensure proper heat sinking',
      'Do not exceed maximum input voltage (40V)',
      'Ensure proper grounding for safety',
      'Discharge capacitors before handling',
      'Do not touch regulator during operation'
    ]
  },
  {
    id: 'lm317',
    name: 'LM317 Adjustable Voltage Regulator',
    category: 'Voltage Regulators',
    description: 'Popular adjustable voltage regulator with 1.5A output current. Simpler than LM723 but less flexible. Great for beginners.',
    specifications: [
      { key: 'Package', value: 'TO-220 (3-pin)' },
      { key: 'Output Voltage Range', value: '1.25V to 37V' },
      { key: 'Output Current', value: 'Up to 1.5A' },
      { key: 'Reference Voltage', value: '1.25V' },
      { key: 'Operating Temperature', value: '-55°C to +150°C' },
      { key: 'Supply Voltage', value: '3V to 40V' }
    ],
    applications: [
      'Simple adjustable power supplies',
      'Battery chargers',
      'LED drivers',
      'Audio amplifier power supplies',
      'Regulated DC power sources'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=LM317',
        estimatedPrice: '30-80 PKR'
      }
    ],
    datasheet: 'https://www.ti.com/product/LM317',
    alternatives: ['LM723 (more features)', 'LM338 (5A)', 'LM350 (3A)'],
    tips: [
      'Always use a heat sink for currents above 500mA',
      'Output voltage = 1.25V × (1 + R2/R1)',
      'Use 10µF capacitors at input and output for stability',
      'Minimum load current is typically 5mA',
      'Can be used with external pass transistor for higher currents'
    ],
    safetyWarnings: [
      'TO-220 package pin 2 is connected to output - can be at high voltage',
      'Heat sink may be at high voltage - use insulating washer',
      'Do not exceed 40V input voltage',
      'Ensure proper grounding'
    ]
  },
  {
    id: 'lm7805',
    name: 'LM7805 Fixed 5V Voltage Regulator',
    category: 'Voltage Regulators',
    description: 'Fixed 5V output voltage regulator. Simple, reliable, and perfect for powering microcontrollers and digital circuits.',
    specifications: [
      { key: 'Package', value: 'TO-220 (3-pin)' },
      { key: 'Output Voltage', value: '5V (fixed)' },
      { key: 'Output Current', value: 'Up to 1.5A' },
      { key: 'Input Voltage Range', value: '7V to 35V' },
      { key: 'Operating Temperature', value: '-40°C to +125°C' },
      { key: 'Dropout Voltage', value: '2V (typical)' }
    ],
    applications: [
      'Microcontroller power supplies',
      'Digital circuit power supplies',
      'USB power supplies',
      'LED driver circuits',
      'General purpose 5V power'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=LM7805',
        estimatedPrice: '20-50 PKR'
      }
    ],
    datasheet: 'https://www.ti.com/product/LM7805',
    alternatives: ['LM7812 (12V)', 'LM7815 (15V)', 'LM317 (adjustable)'],
    tips: [
      'Use 0.1µF ceramic capacitor at input for noise filtering',
      'Use 1µF ceramic capacitor at output for stability',
      'Heat sink required for currents above 500mA',
      'Minimum input voltage should be at least 7V for proper regulation',
      'Very reliable - excellent for beginners'
    ],
    safetyWarnings: [
      'Regulator gets hot at high currents - use heat sink',
      'Do not exceed 35V input voltage',
      'Ensure proper grounding',
      'Keep away from moisture'
    ]
  },
  {
    id: '1n4007-diode',
    name: '1N4007 Rectifier Diode',
    category: 'Diodes',
    description: 'General-purpose rectifier diode. Most common diode for power supply applications. 1A current rating, 1000V PIV.',
    specifications: [
      { key: 'Package', value: 'DO-41' },
      { key: 'Forward Current (Average)', value: '1A' },
      { key: 'Peak Inverse Voltage (PIV)', value: '1000V' },
      { key: 'Forward Voltage Drop', value: '1.1V (typical at 1A)' },
      { key: 'Operating Temperature', value: '-65°C to +175°C' },
      { key: 'Reverse Recovery Time', value: '30ns' }
    ],
    applications: [
      'Bridge rectifiers',
      'Power supply rectification',
      'Flyback protection',
      'General purpose rectification',
      'Reverse polarity protection'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=1N4007',
        estimatedPrice: '2-5 PKR'
      }
    ],
    datasheet: 'https://www.ti.com/product/1N4007',
    alternatives: ['1N4148 (fast switching)', '1N5408 (3A)', '1N5407 (3A)'],
    tips: [
      'Always use in pairs for bridge rectifier (4 diodes total)',
      'Observe polarity - cathode (black band) should face positive output',
      'Can handle brief reverse voltage spikes',
      'Very reliable and inexpensive',
      'Excellent for learning'
    ],
    safetyWarnings: [
      'Diode can get hot at high currents - monitor temperature',
      'Do not exceed 1A continuous current',
      'Reverse polarity will cause immediate failure',
      'Do not exceed 1000V PIV'
    ]
  },
  {
    id: 'capacitor-1000uf',
    name: 'Electrolytic Capacitor 1000µF 50V',
    category: 'Capacitors',
    description: 'Large electrolytic capacitor for power supply filtering. Reduces ripple voltage in rectified DC output.',
    specifications: [
      { key: 'Capacitance', value: '1000µF' },
      { key: 'Voltage Rating', value: '50V' },
      { key: 'Package', value: 'Radial lead' },
      { key: 'ESR (Equivalent Series Resistance)', value: '0.5Ω to 1Ω' },
      { key: 'Operating Temperature', value: '-40°C to +85°C' },
      { key: 'Lifetime', value: '2000 hours (at 85°C)' }
    ],
    applications: [
      'Power supply filtering',
      'Ripple voltage reduction',
      'Bulk energy storage',
      'Voltage smoothing',
      'AC to DC conversion'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=1000uf+capacitor',
        estimatedPrice: '30-80 PKR'
      }
    ],
    datasheet: 'Check manufacturer datasheet',
    alternatives: ['2200µF (lower ripple)', '4700µF (even lower ripple)', '470µF (smaller)'],
    tips: [
      'Larger capacitance = lower ripple voltage',
      'Always use voltage rating at least 1.5× the peak voltage',
      'Electrolytic capacitors have polarity - observe correct orientation',
      'ESR affects ripple voltage - lower ESR is better',
      'Replace if bulging or leaking'
    ],
    safetyWarnings: [
      'Capacitor stores dangerous charge - discharge before handling',
      'Do not exceed voltage rating',
      'Observe polarity - reversed polarity causes explosion',
      'Can rupture if overheated',
      'Use discharge resistor (10kΩ) to safely discharge'
    ]
  },
  {
    id: 'transformer-12v',
    name: 'Step-Down Transformer 12V 2A',
    category: 'Transformers',
    description: 'Converts 120V/240V AC mains to 12V AC. Essential for building AC-powered power supplies.',
    specifications: [
      { key: 'Primary Voltage', value: '120V/240V AC' },
      { key: 'Secondary Voltage', value: '12V AC' },
      { key: 'Secondary Current', value: '2A' },
      { key: 'Power Rating', value: '24VA' },
      { key: 'Turns Ratio', value: '10:1 (120V) or 20:1 (240V)' },
      { key: 'Frequency', value: '50/60Hz' }
    ],
    applications: [
      'Power supply primary stage',
      'AC to DC conversion',
      'Voltage step-down',
      'Electrical isolation',
      'Educational projects'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=transformer+12v',
        estimatedPrice: '500-1500 PKR'
      }
    ],
    datasheet: 'Check manufacturer specifications',
    alternatives: ['24V transformer', '9V transformer', 'Custom transformer'],
    tips: [
      'Check primary voltage matches your wall outlet (120V or 240V)',
      'Use transformer with fuse on primary side for safety',
      'Keep transformer away from moisture',
      'Monitor temperature - should be warm, not hot',
      'Larger transformer = more current capacity'
    ],
    safetyWarnings: [
      'NEVER touch primary side while powered - high voltage hazard!',
      'Always use proper insulation and safety equipment',
      'Ensure transformer is properly fused',
      'Keep away from water and moisture',
      'Use proper grounding'
    ]
  },
  {
    id: 'resistor-1k',
    name: 'Carbon Film Resistor 1kΩ 1/4W',
    category: 'Resistors',
    description: 'General-purpose resistor for feedback dividers, biasing, and current limiting. 1kΩ value is very common.',
    specifications: [
      { key: 'Resistance', value: '1kΩ (1000Ω)' },
      { key: 'Power Rating', value: '1/4W (0.25W)' },
      { key: 'Tolerance', value: '±5% (typical)' },
      { key: 'Temperature Coefficient', value: '±100 ppm/°C' },
      { key: 'Package', value: 'Axial lead' }
    ],
    applications: [
      'Feedback divider networks',
      'Voltage dividers',
      'Biasing circuits',
      'Current limiting',
      'Pull-up/pull-down resistors'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=1k+resistor',
        estimatedPrice: '1-3 PKR'
      }
    ],
    datasheet: 'Standard component - no specific datasheet needed',
    alternatives: ['10kΩ', '100kΩ', '470Ω'],
    tips: [
      'Color code: Brown-Black-Red-Gold (1-0-3-5%)',
      'Use multimeter to verify resistance value',
      'Very cheap - buy in bulk',
      'Excellent for learning',
      'Can be used in voltage dividers for feedback networks'
    ],
    safetyWarnings: [
      'Do not exceed power rating (1/4W)',
      'Resistor can get hot - monitor temperature',
      'Do not use in high-voltage circuits without proper insulation'
    ]
  },
  {
    id: 'potentiometer-10k',
    name: 'Potentiometer 10kΩ Linear',
    category: 'Variable Resistors',
    description: 'Variable resistor for adjustable voltage and current control. Perfect for making power supplies with adjustable output.',
    specifications: [
      { key: 'Resistance Range', value: '0Ω to 10kΩ' },
      { key: 'Type', value: 'Linear taper' },
      { key: 'Power Rating', value: '0.5W' },
      { key: 'Package', value: '3-pin (input, wiper, output)' },
      { key: 'Rotation', value: '300° (typical)' }
    ],
    applications: [
      'Adjustable voltage control',
      'Adjustable current control',
      'Volume control',
      'Brightness control',
      'Feedback divider adjustment'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=potentiometer+10k',
        estimatedPrice: '30-80 PKR'
      }
    ],
    datasheet: 'Check manufacturer specifications',
    alternatives: ['5kΩ', '50kΩ', 'Digital potentiometer'],
    tips: [
      'Use as voltage divider for feedback networks',
      'Can be replaced with fixed resistor after calibration',
      'Measure actual resistance with multimeter before finalizing design',
      'Use quality potentiometer for smooth adjustment',
      'Logarithmic taper available for audio applications'
    ],
    safetyWarnings: [
      'Do not exceed power rating',
      'Potentiometer can get warm during operation',
      'Ensure proper contact between wiper and resistive element'
    ]
  },
  {
    id: '2n3055-transistor',
    name: '2N3055 Power Transistor',
    category: 'Transistors',
    description: 'High-power NPN transistor for use as external pass transistor in power supplies. Allows currents up to 15A.',
    specifications: [
      { key: 'Type', value: 'NPN Power Transistor' },
      { key: 'Package', value: 'TO-3 (metal case)' },
      { key: 'Maximum Collector Current', value: '15A' },
      { key: 'Maximum Voltage (Vce)', value: '60V' },
      { key: 'Power Dissipation', value: '115W (with heat sink)' },
      { key: 'Current Gain (hFE)', value: '20 to 70' }
    ],
    applications: [
      'External pass transistor for power supplies',
      'High-current voltage regulators',
      'Power amplifiers',
      'Motor drivers',
      'High-current switching circuits'
    ],
    sourcing: [
      {
        vendor: 'Digilog.pk',
        url: 'https://digilog.pk/search?q=2N3055',
        estimatedPrice: '100-300 PKR'
      }
    ],
    datasheet: 'https://www.onsemi.com/products/discrete/2N3055',
    alternatives: ['TIP3055 (modern replacement)', 'MJ2955 (complementary PNP)', 'IRF540 (MOSFET)'],
    tips: [
      'Always use with large heat sink - generates significant heat',
      'Use thermal paste between transistor and heat sink',
      'Requires base current of about 1A for full 15A collector current',
      'Very reliable and inexpensive',
      'Perfect for learning about power supplies'
    ],
    safetyWarnings: [
      'Heat sink gets VERY HOT - do not touch during operation',
      'Use thermal gloves when handling',
      'Ensure proper heat sinking - transistor will fail without it',
      'Do not exceed 60V or 15A ratings',
      'Ensure proper grounding'
    ]
  }
];

export const getComponentById = (id: string) => {
  return componentDatabase.find(comp => comp.id === id);
};

export const getComponentsByCategory = (category: string) => {
  return componentDatabase.filter(comp => comp.category === category);
};

export const getComponentCategories = () => {
  const categories = new Set(componentDatabase.map(comp => comp.category));
  return Array.from(categories);
};

export const searchComponents = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return componentDatabase.filter(comp =>
    comp.name.toLowerCase().includes(lowerQuery) ||
    comp.description.toLowerCase().includes(lowerQuery) ||
    comp.applications.some(app => app.toLowerCase().includes(lowerQuery))
  );
};
