/**
 * Calculator Data & Utilities
 * Real-world problem scenarios, measurement guides, and safety warnings
 */

export interface CalculatorScenario {
  title: string;
  problem: string;
  whyItMatters: string;
  realWorldExample: string;
  toolsNeeded: string[];
  safetyWarnings: string[];
  verificationMethod: string;
  relatedCourse?: string;
  componentLink?: string;
}

export interface MeasurementGuide {
  tool: string;
  mode: string;
  steps: string[];
  safetyTips: string[];
  commonMistakes: string[];
}

// ============================================
// PHASE 1: BASIC ELECTRICAL CALCULATORS
// ============================================

export const ohmsLawScenario: CalculatorScenario = {
  title: "Ohm's Law Calculator",
  problem: "You're troubleshooting a circuit. A resistor is getting very hot. You measure 5V across it and 100mA through it. Is this resistor correct or damaged?",
  whyItMatters: "A hot resistor means wrong value or damaged component. This can cause fire, damage other parts, or create safety hazards. You need to identify the problem before the circuit fails.",
  realWorldExample: "Building a simple LED circuit: You have a 12V power supply, an LED that needs 2V and 20mA. What resistor do you need? Answer: R = (12-2)/0.02 = 500Ω. Buy a 470Ω or 560Ω resistor from Digilog.",
  toolsNeeded: ["Multimeter (DC Voltage mode)", "Multimeter (DC Current mode)", "Power Supply"],
  safetyWarnings: [
    "Never measure current in a live circuit without breaking it",
    "Always disconnect power before measuring resistance",
    "Don't touch components while measuring - they may be hot",
    "Never measure AC voltage with DC mode selected"
  ],
  verificationMethod: "After calculating, measure the actual voltage and current with a multimeter. If they match your calculation, the resistor is correct.",
  relatedCourse: "Electronics 101 - Ohm's Law",
  componentLink: "https://digilog.pk/resistors"
};

export const powerCalculatorScenario: CalculatorScenario = {
  title: "Power Calculator",
  problem: "You're designing an LED circuit. The resistor you chose gets very hot. You measure 5V across it and 100mA through it. How much power is it dissipating? Is it safe?",
  whyItMatters: "Every resistor has a power rating (1/4W, 1/2W, 1W, etc.). If you use a resistor with too low power rating, it will burn out or catch fire. You need to calculate power to choose the right resistor.",
  realWorldExample: "LED circuit: 12V supply, 2V LED, 20mA current. Resistor: R = (12-2)/0.02 = 500Ω. Power: P = 5V × 0.02A = 0.1W. Use a 1/4W resistor (safe). If you used 1/8W resistor, it would burn out!",
  toolsNeeded: ["Multimeter (DC Voltage mode)", "Multimeter (DC Current mode)", "Resistor with power rating label"],
  safetyWarnings: [
    "Resistors dissipate power as heat - they get hot!",
    "Never touch a hot resistor - you can get burned",
    "Always use resistor with power rating higher than calculated",
    "If resistor is smoking or burning, disconnect immediately"
  ],
  verificationMethod: "Calculate power, then buy a resistor with higher power rating. Measure temperature - it should be warm but not too hot to touch.",
  relatedCourse: "Electronics 101 - Power and Energy",
  componentLink: "https://digilog.pk/resistors"
};

export const resistorColorCodeScenario: CalculatorScenario = {
  title: "Resistor Color Code Calculator",
  problem: "You have a bag of resistors with no labels. You need a 470Ω resistor for your LED circuit. How do you identify which one it is?",
  whyItMatters: "Resistors use color bands to show their value. If you pick the wrong resistor, your circuit won't work correctly. The LED might be too dim or burn out.",
  realWorldExample: "470Ω resistor: Yellow (4), Purple (7), Brown (×10) = 47 × 10 = 470Ω. 4-band resistor adds tolerance: Gold = ±5%.",
  toolsNeeded: ["Resistor color code chart", "Magnifying glass (optional)", "Multimeter (to verify)"],
  safetyWarnings: [
    "Always verify color code with multimeter before using",
    "Don't guess - wrong resistor can damage circuit",
    "Keep resistors organized by value to avoid confusion"
  ],
  verificationMethod: "Use multimeter in resistance mode to verify the resistor value matches the color code.",
  relatedCourse: "Electronics 101 - Components",
  componentLink: "https://digilog.pk/resistors"
};

export const smdResistorCodeScenario: CalculatorScenario = {
  title: "SMD Resistor Code Calculator",
  problem: "You're working with modern electronics boards that use tiny SMD resistors. You see '470' printed on a resistor. What's its value?",
  whyItMatters: "SMD (Surface Mount Device) resistors use 3 or 4-digit codes instead of color bands. If you misread the code, you'll use the wrong resistor and the circuit won't work.",
  realWorldExample: "Code '470' = 47 × 10¹ = 470Ω. Code '4700' = 470 × 10⁰ = 470Ω. Code '47E' = 47 × 10⁰ = 47Ω.",
  toolsNeeded: ["Magnifying glass", "SMD resistor code chart", "Multimeter"],
  safetyWarnings: [
    "SMD components are very small - don't lose them!",
    "Use tweezers, not fingers, to handle SMD parts",
    "Always verify code before soldering to board"
  ],
  verificationMethod: "Use multimeter to measure the actual resistance value.",
  relatedCourse: "Arduino Basics - Modern Components",
  componentLink: "https://digilog.pk/smd-resistors"
};

// ============================================
// PHASE 2: COMPONENT CALCULATORS
// ============================================

export const ledResistorScenario: CalculatorScenario = {
  title: "LED Resistor Calculator",
  problem: "You want to light up an LED with a 9V battery. The LED's datasheet says it needs 2V forward voltage and 20mA maximum current. What resistor do you need to protect the LED?",
  whyItMatters: "Without the correct resistor, the LED will burn out immediately (too much current) or not light up (too little current). The resistor limits current to safe levels.",
  realWorldExample: "9V battery, LED needs 2V and 20mA max. R = (9-2)/0.02 = 350Ω. Buy 330Ω or 390Ω from Digilog. Use 1/4W resistor (safe for 0.1W power dissipation).",
  toolsNeeded: ["Multimeter (DC Voltage mode)", "Multimeter (DC Current mode)", "LED datasheet", "Power supply"],
  safetyWarnings: [
    "Never connect LED directly to power supply - it will burn out instantly",
    "Always use current-limiting resistor",
    "Check LED polarity - longer leg is positive (anode)",
    "Don't exceed LED maximum current rating"
  ],
  verificationMethod: "Build circuit and measure current with multimeter. Should be close to calculated value (±10%). LED should light up brightly without getting hot.",
  relatedCourse: "Electronics 101 - LEDs and Light",
  componentLink: "https://digilog.pk/leds"
};

export const voltageDividerScenario: CalculatorScenario = {
  title: "Voltage Divider Calculator",
  problem: "You have a 12V power supply but your Arduino only accepts 5V input. You need to reduce the voltage. How do you use two resistors to divide the voltage?",
  whyItMatters: "Voltage dividers are used everywhere: sensors, audio circuits, power supplies. If you calculate wrong, you'll damage your Arduino or get wrong sensor readings.",
  realWorldExample: "12V supply to 5V: Use R1=1.5kΩ and R2=1kΩ. Output = 12V × (1k/(1.5k+1k)) = 12V × (1/2.5) = 4.8V ≈ 5V.",
  toolsNeeded: ["Multimeter (DC Voltage mode)", "Resistors", "Power supply"],
  safetyWarnings: [
    "Voltage divider draws current - choose resistors carefully",
    "Output voltage depends on load - may vary under load",
    "Don't use for high-current applications"
  ],
  verificationMethod: "Measure output voltage with multimeter. Should match calculated value.",
  relatedCourse: "Intermediate Electronics - Circuits",
  componentLink: "https://digilog.pk/resistors"
};

export const rcTimeConstantScenario: CalculatorScenario = {
  title: "RC Time Constant Calculator",
  problem: "You're building a timer circuit with a capacitor and resistor. You want the LED to stay on for exactly 2 seconds after pressing a button. What capacitor and resistor values do you need?",
  whyItMatters: "RC circuits are used in timing, filtering, and sensor circuits. Wrong values mean wrong timing - your circuit won't work as intended.",
  realWorldExample: "Want 2 second delay: τ = R × C = 2 seconds. Use R=1MΩ and C=2µF. Time constant = 1,000,000 × 0.000002 = 2 seconds.",
  toolsNeeded: ["Capacitor", "Resistor", "Oscilloscope (to verify)", "Multimeter"],
  safetyWarnings: [
    "Capacitors store charge - discharge before touching",
    "High voltage capacitors can give electric shock",
    "Always use correct capacitor voltage rating"
  ],
  verificationMethod: "Use oscilloscope to measure charging/discharging time. Should match calculated time constant.",
  relatedCourse: "Intermediate Electronics - Capacitors",
  componentLink: "https://digilog.pk/capacitors"
};

// ============================================
// PHASE 3: UNIT CONVERTERS
// ============================================

export const unitConverterScenario: CalculatorScenario = {
  title: "Unit Converter",
  problem: "Your sensor datasheet says the output is 500mV, but your Arduino reads values in volts. How do you convert between different units?",
  whyItMatters: "Electronics uses different units (V, mV, µV, etc.). If you don't convert correctly, you'll misinterpret sensor readings and your circuit won't work.",
  realWorldExample: "Sensor output: 500mV = 0.5V. Arduino reads 0.5V. If you thought it was 500V, you'd think the sensor is broken!",
  toolsNeeded: ["Unit conversion chart", "Calculator"],
  safetyWarnings: [
    "Always check units when reading datasheets",
    "Different countries use different standards",
    "SI units (metric) are international standard"
  ],
  verificationMethod: "Double-check conversion by converting back to original unit.",
  relatedCourse: "Electronics 101 - Units and Measurements",
  componentLink: "https://digilog.pk/"
};

// ============================================
// MEASUREMENT GUIDES
// ============================================

export const multimeterVoltageGuide: MeasurementGuide = {
  tool: "Multimeter",
  mode: "DC Voltage (V with straight line)",
  steps: [
    "1. Set multimeter dial to DC Voltage (usually marked as 'V' with a straight line)",
    "2. Choose voltage range (10V for most circuits, 200V for higher)",
    "3. Connect RED probe to positive side, BLACK probe to negative side",
    "4. Touch probes across the component (parallel connection)",
    "5. Read the display - this is the voltage",
    "6. Don't reverse probes - you'll get negative reading"
  ],
  safetyTips: [
    "Never measure AC voltage in DC mode - you'll get wrong reading",
    "Don't measure voltage while holding both probes - use one hand",
    "Always start with highest voltage range, then go lower",
    "Never touch the metal probe tips while measuring"
  ],
  commonMistakes: [
    "Measuring in series instead of parallel (wrong connection)",
    "Using AC mode for DC voltage (wrong reading)",
    "Range too low - display shows '1' or 'OL' (overload)",
    "Probes reversed - negative reading"
  ]
};

export const multimeterCurrentGuide: MeasurementGuide = {
  tool: "Multimeter",
  mode: "DC Current (A with straight line)",
  steps: [
    "1. Set multimeter dial to DC Current (usually marked as 'A' with straight line)",
    "2. Choose current range (mA for most circuits)",
    "3. BREAK the circuit - disconnect one wire",
    "4. Connect RED probe to positive side, BLACK probe to negative side",
    "5. The current flows through the multimeter",
    "6. Read the display - this is the current",
    "7. Reconnect the circuit when done"
  ],
  safetyTips: [
    "ALWAYS break the circuit before measuring current",
    "Never measure current in parallel - it will short circuit",
    "Start with highest current range",
    "Be careful with high currents - can damage multimeter"
  ],
  commonMistakes: [
    "Measuring in parallel instead of series (shorts circuit)",
    "Not breaking circuit (shorts power supply)",
    "Range too low - display shows 'OL' (overload)",
    "Forgetting to reconnect circuit after measurement"
  ]
};

export const multimeterResistanceGuide: MeasurementGuide = {
  tool: "Multimeter",
  mode: "Resistance (Ω - Ohm symbol)",
  steps: [
    "1. Set multimeter dial to Resistance (marked as 'Ω')",
    "2. Choose resistance range (usually auto-range works)",
    "3. DISCONNECT power - remove battery or unplug",
    "4. DISCONNECT the component from circuit",
    "5. Connect RED and BLACK probes across the component",
    "6. Read the display - this is the resistance",
    "7. Reconnect component when done"
  ],
  safetyTips: [
    "ALWAYS disconnect power before measuring resistance",
    "ALWAYS remove component from circuit",
    "Never measure resistance in a powered circuit",
    "Don't touch the probe tips - your body resistance affects reading"
  ],
  commonMistakes: [
    "Measuring resistance in powered circuit (wrong reading)",
    "Not removing component from circuit (wrong reading)",
    "Touching probe tips (your body resistance affects reading)",
    "Range too low - display shows 'OL' (overload)"
  ]
};

// ============================================
// INTERNATIONAL STANDARDS
// ============================================

export const internationalStandards = {
  si_prefixes: {
    "T (Tera)": 1e12,
    "G (Giga)": 1e9,
    "M (Mega)": 1e6,
    "k (Kilo)": 1e3,
    " (Unit)": 1,
    "m (Milli)": 1e-3,
    "µ (Micro)": 1e-6,
    "n (Nano)": 1e-9,
    "p (Pico)": 1e-12
  },
  resistor_standards: {
    "E12 Series": [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82],
    "E24 Series": [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91],
    "E96 Series": "96 standard values (IEC 60063)"
  },
  color_code_bands: {
    "0": "Black",
    "1": "Brown",
    "2": "Red",
    "3": "Orange",
    "4": "Yellow",
    "5": "Green",
    "6": "Blue",
    "7": "Violet",
    "8": "Grey",
    "9": "White"
  },
  tolerance_bands: {
    "Brown": "±1%",
    "Red": "±2%",
    "Gold": "±5%",
    "Silver": "±10%"
  }
};

// ============================================
// COMPONENT SOURCING
// ============================================

export const componentSources = {
  resistors: "https://digilog.pk/resistors",
  capacitors: "https://digilog.pk/capacitors",
  inductors: "https://digilog.pk/inductors",
  leds: "https://digilog.pk/leds",
  diodes: "https://digilog.pk/diodes",
  transistors: "https://digilog.pk/transistors",
  ics: "https://digilog.pk/integrated-circuits",
  multimeters: "https://digilog.pk/multimeters",
  power_supplies: "https://digilog.pk/power-supplies",
  breadboards: "https://digilog.pk/breadboards"
};
