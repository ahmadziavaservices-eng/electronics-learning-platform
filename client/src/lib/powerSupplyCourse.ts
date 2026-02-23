import { Course, Tool, DIYProject, Reference, ModuleContent } from './courses';

export const powerSupplyCourse: Course = {
  id: 'power-electronics',
  title: 'Power Electronics',
  slug: 'power-electronics',
  description: 'Master power supply design, from simple linear regulators to complex switching topologies',
  longDescription: 'A comprehensive guide to understanding, building, and repairing power supplies! Learn about linear regulators like the LM723 and LM317, explore switching-mode power supplies, and master the art of creating stable, reliable power for your electronics projects. Perfect for hobbyists and professionals alike.',
  category: 'Electronics',
  difficulty: 'intermediate',
  duration: '8 weeks',
  tools: [
    {
      name: 'Digital Multimeter',
      category: 'Measurement',
      description: 'Essential tool for measuring voltage, current, and resistance in power supplies',
      why: 'Power supplies need precise measurements to verify they\'re working correctly. A multimeter lets you check voltage output, current draw, and component health.',
      howToUse: 'Set dial to appropriate setting (V for voltage, A for current, Ω for resistance). Use probes to measure across components. Always start with highest setting if unsure.',
      estimatedCost: '$20-100',
      alternatives: ['Analog multimeter (older style)', 'Digital clamp meter (for measuring current without breaking circuit)'],
      safetyTips: [
        'Never measure voltage without setting dial correctly first',
        'Start with highest voltage setting to avoid damaging the meter',
        'Disconnect power before measuring resistance',
        'Never measure current directly across a voltage source (it will short circuit)'
      ]
    },
    {
      name: 'Soldering Iron',
      category: 'Assembly',
      description: 'Tool for permanently connecting components to circuit boards',
      why: 'Power supply circuits need reliable connections. Soldering creates permanent, low-resistance connections that won\'t fail under load.',
      howToUse: 'Heat both the component and pad for 2-3 seconds, then apply solder. Remove iron and let cool. Good solder joints look shiny and cone-shaped.',
      estimatedCost: '$20-50',
      safetyTips: [
        'Always use a soldering iron stand - never put a hot iron on your workbench',
        'Wear safety glasses to protect from solder splatter',
        'Use lead-free solder if possible',
        'Wash hands after soldering (solder contains metals)',
        'Ensure good ventilation - solder fumes can be harmful'
      ]
    },
    {
      name: 'Power Supply Tester',
      category: 'Measurement',
      description: 'Specialized tool for testing power supply outputs and load conditions',
      why: 'Power supplies must deliver stable voltage under different load conditions. A tester simulates real-world loads and verifies performance.',
      howToUse: 'Connect to power supply output, set desired load current, and monitor voltage stability. Check for ripple and regulation.',
      estimatedCost: '$50-200',
      alternatives: ['Use resistor loads with multimeter for DIY testing', 'Electronic load modules'],
      safetyTips: [
        'Start with lowest load setting and increase gradually',
        'Monitor temperature - some loads generate heat',
        'Never exceed power supply rated current'
      ]
    },
    {
      name: 'Oscilloscope',
      category: 'Measurement',
      description: 'Advanced tool for viewing voltage waveforms and detecting problems',
      why: 'Oscilloscopes show you exactly what\'s happening with voltage over time. They reveal ripple, noise, and instability that multimeters can\'t detect.',
      howToUse: 'Connect probe to test point, set timebase and voltage scale, and observe waveform on screen. Look for clean, stable signals.',
      estimatedCost: '$100-500+',
      alternatives: ['USB oscilloscope (cheaper, lower bandwidth)', 'Smartphone oscilloscope app with external probe'],
      safetyTips: [
        'Use proper probe grounding to avoid measurement errors',
        'Never exceed probe voltage rating',
        'Be careful with high-voltage measurements'
      ]
    },
    {
      name: 'Breadboard & Jumper Wires',
      category: 'Assembly',
      description: 'For prototyping and testing power supply circuits without soldering',
      why: 'Breadboards let you quickly test circuit ideas and make changes without permanent connections. Perfect for experimenting with different configurations.',
      howToUse: 'Push component leads and wires into holes. Holes in same row are connected. Use different wire colors for organization.',
      estimatedCost: '$10-20',
      safetyTips: [
        'Don\'t force components - if they don\'t fit, try another hole',
        'Keep breadboard away from moisture',
        'Use appropriate wire gauges for current levels'
      ]
    },
    {
      name: 'Heat Sink & Thermal Paste',
      category: 'Assembly',
      description: 'Keeps power supply components cool during operation',
      why: 'Power supply regulators and transistors generate heat. Heat sinks dissipate this heat to prevent damage and ensure reliable operation.',
      howToUse: 'Apply thin layer of thermal paste to component, attach heat sink, and secure with clip or screw. Ensure good contact.',
      estimatedCost: '$5-30',
      safetyTips: [
        'Don\'t use too much thermal paste - it reduces efficiency',
        'Ensure heat sink is securely attached before power on',
        'Allow time for cooling between tests',
        'Be careful - heat sinks get very hot during operation'
      ]
    },
    {
      name: 'Component Kit (Resistors, Capacitors, Diodes)',
      category: 'Components',
      description: 'Essential passive components for power supply circuits',
      why: 'Power supplies need quality components for stable, reliable operation. Different values are needed for different designs.',
      howToUse: 'Select appropriate values based on circuit design. Use resistor color code chart for identification. Check capacitor voltage ratings.',
      estimatedCost: '$15-40',
      safetyTips: [
        'Always check capacitor voltage ratings - use higher rated capacitors for safety margin',
        'Use quality components from reputable suppliers',
        'Store components in dry environment',
        'Keep organized - small components are easy to lose'
      ]
    },
    {
      name: 'Power Supply (for testing)',
      category: 'Equipment',
      description: 'A working power supply to use as reference or for testing components',
      why: 'You need a reliable power source to test your circuits and verify they work correctly.',
      howToUse: 'Connect to circuit under test. Monitor output with multimeter. Gradually increase load to verify stability.',
      estimatedCost: '$50-200',
      safetyTips: [
        'Start with lowest voltage setting',
        'Never exceed current rating',
        'Always have a way to quickly disconnect power in case of problems',
        'Keep flammable materials away from power supply'
      ]
    }
  ],
  modules: [
    {
      id: 'ps-m1',
      title: '1: Linear Power Supplies Fundamentals',
      description: 'Understanding voltage regulation and the LM723 voltage regulator',
      duration: '45 minutes',
      difficulty: 'intermediate',
      content: `
        <h2>Linear Power Supplies: The Foundation</h2>
        <p>Linear power supplies are the fundamental building block of electronics. They're known for their simplicity, low noise output, and excellent regulation. While not as efficient as switching supplies, they're ideal for laboratory and audio equipment where clean power is critical.</p>
        
        <h3>Basic Components</h3>
        <p>A linear power supply consists of four main stages:</p>
        <ol>
          <li><strong>Transformer:</strong> Steps down AC voltage from the wall to a lower, safer level</li>
          <li><strong>Rectifier:</strong> Converts AC to DC using diodes</li>
          <li><strong>Filter:</strong> Smooths the DC using capacitors</li>
          <li><strong>Regulator:</strong> Maintains constant output voltage despite load changes</li>
        </ol>
        
        <h2>The LM723 Voltage Regulator</h2>
        <p>The LM723 is one of the most versatile and widely-used voltage regulator ICs. It's been a favorite of hobbyists and professionals for decades because of its flexibility and robustness.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Adjustable output voltage (typically 2V to 37V)</li>
          <li>Built-in current limiting for protection</li>
          <li>Low output impedance for stable regulation</li>
          <li>Can source up to 150mA on its own, or drive external transistors for higher currents</li>
          <li>Available in 14-pin DIP package (easy to use)</li>
        </ul>
        
        <h3>How Voltage Regulation Works</h3>
        <p>The LM723 maintains constant output voltage using a feedback loop:</p>
        <ol>
          <li><strong>Reference Voltage:</strong> The IC generates a stable internal reference of about 7.15V</li>
          <li><strong>Feedback:</strong> A portion of the output voltage is fed back through a voltage divider</li>
          <li><strong>Comparison:</strong> An internal error amplifier compares the feedback voltage with the reference</li>
          <li><strong>Correction:</strong> If output voltage rises, the error amplifier reduces the drive to the output transistor, lowering the voltage back to the set point</li>
        </ol>
        
        <h2>Current Limiting - The Key Feature</h2>
        <p>This is the most important part for your needs! The LM723 has a dedicated circuit for current limiting.</p>
        
        <h3>How Current Limiting Works</h3>
        <p>The LM723 monitors output current using a sense resistor:</p>
        <ol>
          <li>All output current passes through a low-value sense resistor (R_sc)</li>
          <li>This creates a small voltage drop proportional to the current: V = I × R</li>
          <li>Two pins (CURRENT LIMIT and CURRENT SENSE) monitor this voltage drop</li>
          <li>When the voltage drop reaches 0.65V, an internal transistor turns on</li>
          <li>This "steals" drive from the main output transistor, automatically reducing output voltage</li>
          <li>The output voltage drops just enough to prevent current from exceeding the limit</li>
        </ol>
        
        <h3>The Current Limit Formula</h3>
        <p>The maximum current is determined by the sense resistor value:</p>
        <p><strong>I_limit = 0.65V / R_sc</strong></p>
        <p>Example: With a 0.1Ω sense resistor: I_limit = 0.65V / 0.1Ω = 6.5 Amps</p>
        
        <h2>Advantages of Linear Regulators</h2>
        <ul>
          <li><strong>Simple:</strong> Fewer components than switching supplies</li>
          <li><strong>Clean:</strong> Very low noise output - perfect for audio and sensitive circuits</li>
          <li><strong>Reliable:</strong> Proven design with decades of use</li>
          <li><strong>Easy to fix:</strong> Problems are usually obvious and easy to diagnose</li>
        </ul>
        
        <h2>Disadvantages</h2>
        <ul>
          <li><strong>Heat:</strong> Generates significant heat at high currents or large voltage drops</li>
          <li><strong>Efficiency:</strong> Not as efficient as switching supplies - wasted energy becomes heat</li>
          <li><strong>Size:</strong> Heat sinks can be large for high-power applications</li>
        </ul>
      `,
      practiceProblems: [
        'If you want 5A current limit with an LM723, what sense resistor value do you need? (Answer: 0.13Ω)',
        'A linear supply has 12V input and 5V output with 2A load. How much power is wasted as heat? (Answer: 14W)',
        'If the LM723 reference voltage is 7.15V and you want 12V output, what should be the ratio of your feedback divider? (Answer: 12/7.15 ≈ 1.68)',
        'Why is current limiting important in a power supply? (Answer: It protects both the supply and the load from damage if something goes wrong)'
      ],
      references: [
        {
          title: 'LM723 Datasheet',
          url: 'https://www.ti.com/product/LM723',
          type: 'documentation'
        },
        {
          title: 'Understanding Voltage Regulation',
          url: 'https://www.electronics-tutorials.ws/power/power-supply.html',
          type: 'article'
        }
      ]
    },
    {
      id: 'ps-m2',
      title: '2: LM723 Pin Functions & Circuit Design',
      description: 'Detailed breakdown of all 14 pins and how to design circuits with the LM723',
      duration: '50 minutes',
      difficulty: 'intermediate',
      content: `
        <h2>LM723 Pin Functions (14-Pin DIP Package)</h2>
        <p>Understanding each pin is the first step to mastering the LM723. Here's a detailed breakdown:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f0f0f0;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Pin</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Name</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Function</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">1</td>
            <td style="border: 1px solid #ddd; padding: 10px;">NC</td>
            <td style="border: 1px solid #ddd; padding: 10px;">No Connection - not used</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">2</td>
            <td style="border: 1px solid #ddd; padding: 10px;">CURRENT LIMIT</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Base of internal current limit transistor; used with Pin 3 to set maximum output current</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">3</td>
            <td style="border: 1px solid #ddd; padding: 10px;">CURRENT SENSE</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Emitter of internal current limit transistor; voltage drop across sense resistor determines when current limit engages</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">4</td>
            <td style="border: 1px solid #ddd; padding: 10px;">INVERTING INPUT</td>
            <td style="border: 1px solid #ddd; padding: 10px;">One of two inputs to internal error amplifier; core of voltage regulation feedback loop</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">5</td>
            <td style="border: 1px solid #ddd; padding: 10px;">NON-INVERTING INPUT</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Other input to error amplifier; output voltage fed back to this pin through voltage divider</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">6</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Vref</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Reference Voltage Output (~7.15V); stable reference used by error amplifier</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">7</td>
            <td style="border: 1px solid #ddd; padding: 10px;">V-</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Negative Supply Voltage (GND); connected to ground of circuit</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">8</td>
            <td style="border: 1px solid #ddd; padding: 10px;">NC</td>
            <td style="border: 1px solid #ddd; padding: 10px;">No Connection - not used</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">9</td>
            <td style="border: 1px solid #ddd; padding: 10px;">NC</td>
            <td style="border: 1px solid #ddd; padding: 10px;">No Connection - not used</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">10</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Vout</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Output Voltage; output of internal series pass transistor, can source up to 150mA on its own</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">11</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Vc</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Collector of internal series pass transistor; connected to unregulated DC input when no external pass transistor is used</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">12</td>
            <td style="border: 1px solid #ddd; padding: 10px;">V+</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Positive Supply Voltage; main power input for the IC from transformer and rectifier</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">13</td>
            <td style="border: 1px solid #ddd; padding: 10px;">FREQ COMP</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Frequency Compensation; small capacitor (typically 100pF) connected to prevent oscillations</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">14</td>
            <td style="border: 1px solid #ddd; padding: 10px;">NC</td>
            <td style="border: 1px solid #ddd; padding: 10px;">No Connection - not used</td>
          </tr>
        </table>
        
        <h2>Basic Circuit Configuration</h2>
        <p>Here's how to connect the LM723 for a simple adjustable power supply:</p>
        <ol>
          <li><strong>Power Supply:</strong> Connect unregulated DC to Pin 12 (V+) and Pin 7 (V-/GND)</li>
          <li><strong>Reference:</strong> Pin 6 (Vref) provides 7.15V reference - use this for your feedback divider</li>
          <li><strong>Feedback Divider:</strong> Connect output voltage through two resistors to create feedback voltage</li>
          <li><strong>Feedback Path:</strong> Connect feedback voltage to Pin 4 (Inverting Input)</li>
          <li><strong>Reference Input:</strong> Connect Pin 6 (Vref) to Pin 5 (Non-Inverting Input)</li>
          <li><strong>Output:</strong> Pin 10 (Vout) is your regulated output (up to 150mA)</li>
          <li><strong>Current Limiting:</strong> Connect sense resistor between Pins 2 and 3</li>
          <li><strong>Frequency Compensation:</strong> Connect 100pF capacitor to Pin 13</li>
        </ol>
        
        <h2>Designing the Feedback Divider</h2>
        <p>The feedback divider sets your output voltage. Here's how:</p>
        <p>Output voltage = Vref × (1 + R2/R1)</p>
        <p>Where R1 is to ground and R2 is the feedback resistor.</p>
        <p>Typical values: R1 = 1kΩ, R2 = variable resistor (potentiometer) for adjustment</p>
        
        <h2>Choosing the Sense Resistor</h2>
        <p>Remember: I_limit = 0.65V / R_sc</p>
        <p>For different current limits:</p>
        <ul>
          <li>1A limit: Use 0.65Ω resistor</li>
          <li>2A limit: Use 0.33Ω resistor</li>
          <li>5A limit: Use 0.13Ω resistor</li>
          <li>10A limit: Use 0.065Ω resistor</li>
        </ul>
        <p>Always use a high-power resistor rated for the expected current!</p>
      `,
      practiceProblems: [
        'Design a feedback divider for 12V output with Vref = 7.15V. If R1 = 1kΩ, what should R2 be? (Answer: 0.68kΩ or 680Ω)',
        'You want 3A current limit. What sense resistor do you need? (Answer: 0.22Ω)',
        'What\'s the purpose of the 100pF capacitor on Pin 13? (Answer: Frequency compensation to prevent oscillations)',
        'Why is Pin 11 (Vc) important? (Answer: It connects to the unregulated DC input to provide voltage for the internal pass transistor)'
      ]
    },
    {
      id: 'ps-m3',
      title: '3: Switching Mode Power Supplies (SMPS)',
      description: 'Understanding Buck, Boost, and other switching topologies',
      duration: '60 minutes',
      difficulty: 'intermediate',
      content: `
        <h2>Switching Mode Power Supplies (SMPS)</h2>
        <p>While linear supplies are simple and clean, switching supplies are more efficient and generate less heat. They work by rapidly switching a transistor on and off, controlling the average voltage delivered to the load.</p>
        
        <h3>Why Use SMPS?</h3>
        <ul>
          <li><strong>Efficiency:</strong> 80-95% efficient compared to 50-70% for linear supplies</li>
          <li><strong>Heat:</strong> Generates much less heat, so smaller heat sinks needed</li>
          <li><strong>Size:</strong> Smaller and lighter than linear supplies</li>
          <li><strong>Flexibility:</strong> Can step up or step down voltage</li>
        </ul>
        
        <h3>Main SMPS Topologies</h3>
        
        <h4>Buck Converter (Step-Down)</h4>
        <p>Converts higher voltage to lower voltage efficiently.</p>
        <ul>
          <li><strong>Use Case:</strong> Converting 12V to 5V, 24V to 12V, etc.</li>
          <li><strong>How it works:</strong> Rapidly switches a transistor on and off. When on, energy is stored in an inductor. When off, the inductor releases energy to the load.</li>
          <li><strong>Key Components:</strong> Transistor, diode, inductor, capacitor, controller IC</li>
          <li><strong>Efficiency:</strong> Very high (90%+)</li>
        </ul>
        
        <h4>Boost Converter (Step-Up)</h4>
        <p>Converts lower voltage to higher voltage.</p>
        <ul>
          <li><strong>Use Case:</strong> Converting 5V to 12V, 12V to 24V, etc.</li>
          <li><strong>How it works:</strong> Similar to buck, but the inductor and transistor arrangement creates a step-up effect</li>
          <li><strong>Key Components:</strong> Transistor, diode, inductor, capacitor, controller IC</li>
          <li><strong>Efficiency:</strong> Very high (90%+)</li>
        </ul>
        
        <h4>Buck-Boost Converter</h4>
        <p>Can both step up and step down voltage.</p>
        <ul>
          <li><strong>Use Case:</strong> When input voltage varies above and below desired output</li>
          <li><strong>How it works:</strong> Combination of buck and boost topologies</li>
          <li><strong>Complexity:</strong> More complex than buck or boost alone</li>
        </ul>
        
        <h4>Flyback Converter</h4>
        <p>Provides isolation between input and output.</p>
        <ul>
          <li><strong>Use Case:</strong> AC mains powered supplies where isolation is required</li>
          <li><strong>Key Feature:</strong> Uses transformer for isolation and energy transfer</li>
          <li><strong>Advantage:</strong> Can generate multiple output voltages</li>
        </ul>
        
        <h2>SMPS vs Linear - When to Use Each</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f0f0f0;">
            <th style="border: 1px solid #ddd; padding: 10px;">Feature</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Linear</th>
            <th style="border: 1px solid #ddd; padding: 10px;">SMPS</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Efficiency</td>
            <td style="border: 1px solid #ddd; padding: 10px;">50-70%</td>
            <td style="border: 1px solid #ddd; padding: 10px;">80-95%</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Noise</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Very clean</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Some switching noise</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Heat</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Significant</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Minimal</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Size</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Larger</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Smaller</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Complexity</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Simple</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Complex</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Cost</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Lower</td>
            <td style="border: 1px solid #ddd; padding: 10px;">Higher</td>
          </tr>
        </table>
        
        <h2>When to Use Each Type</h2>
        <p><strong>Use Linear when:</strong></p>
        <ul>
          <li>You need very clean, low-noise power (audio, precision measurements)</li>
          <li>You're working with low currents (under 1A)</li>
          <li>Simplicity is important</li>
          <li>You want easy troubleshooting</li>
        </ul>
        
        <p><strong>Use SMPS when:</strong></p>
        <ul>
          <li>You need high efficiency (battery powered, high power)</li>
          <li>You want to minimize heat generation</li>
          <li>You need to step up voltage (boost)</li>
          <li>Size and weight are important</li>
        </ul>
      `,
      practiceProblems: [
        'Why is SMPS more efficient than linear regulators? (Answer: Linear regulators waste excess voltage as heat; SMPS stores energy in inductors and capacitors, minimizing waste)',
        'What\'s the main disadvantage of SMPS compared to linear? (Answer: More complex, generates switching noise, harder to troubleshoot)',
        'When would you use a boost converter instead of a buck converter? (Answer: When you need to step up voltage, like converting 5V to 12V)',
        'Why is isolation important in some power supplies? (Answer: To protect users from high voltage and prevent ground loops)'
      ]
    },
    {
      id: 'ps-m4',
      title: '4: AC Power Supplies & Component Selection',
      description: 'Transformers, rectifiers, filtering, and choosing the right components',
      duration: '50 minutes',
      difficulty: 'intermediate',
      content: `
        <h2>AC Power Supplies: The Starting Point</h2>
        <p>Most power supplies start with AC power from the wall outlet. Understanding how to safely convert this to DC is crucial.</p>
        
        <h3>The Four Stages</h3>
        
        <h4>1. Transformer</h4>
        <p>Steps down the high AC voltage to a safer, usable level.</p>
        <ul>
          <li><strong>Primary:</strong> Connected to wall outlet (120V or 240V AC)</li>
          <li><strong>Secondary:</strong> Provides lower voltage (typically 12V, 24V, etc. AC)</li>
          <li><strong>Isolation:</strong> Provides electrical isolation for safety</li>
          <li><strong>Turns Ratio:</strong> Determines voltage step-down ratio</li>
        </ul>
        <p><strong>Transformer Formula:</strong> V_secondary / V_primary = N_secondary / N_primary</p>
        
        <h4>2. Rectifier</h4>
        <p>Converts AC to DC using diodes.</p>
        <ul>
          <li><strong>Half-Wave:</strong> Uses 1 diode, rectifies only half the AC wave (inefficient)</li>
          <li><strong>Full-Wave:</strong> Uses 2 diodes with center-tapped transformer, rectifies both halves</li>
          <li><strong>Bridge Rectifier:</strong> Uses 4 diodes, rectifies both halves without center tap (most common)</li>
        </ul>
        
        <h4>3. Filter</h4>
        <p>Smooths the rectified DC using capacitors.</p>
        <ul>
          <li><strong>Capacitor:</strong> Charges when voltage is high, discharges when voltage drops</li>
          <li><strong>Ripple Voltage:</strong> The remaining AC component after filtering</li>
          <li><strong>Larger Capacitor:</strong> Lower ripple voltage</li>
          <li><strong>Ripple Formula:</strong> V_ripple = I_load / (2 × f × C)</li>
        </ul>
        
        <h4>4. Regulator</h4>
        <p>Maintains constant output voltage (linear or switching regulator).</p>
        
        <h2>Choosing Components</h2>
        
        <h3>Transformer Selection</h3>
        <ul>
          <li><strong>Voltage Rating:</strong> Must match your wall outlet (120V or 240V) and desired output</li>
          <li><strong>Current Rating:</strong> Must handle maximum load current</li>
          <li><strong>Power Rating:</strong> VA = V × I (Volt-Amperes)</li>
          <li><strong>Safety:</strong> Always use transformer with primary fuse for protection</li>
        </ul>
        <p><strong>Example:</strong> For a 12V, 2A supply: Secondary current = 2A, so transformer needs at least 2A secondary rating</p>
        
        <h3>Rectifier Diode Selection</h3>
        <ul>
          <li><strong>Forward Voltage:</strong> Typically 0.6-0.7V for silicon diodes</li>
          <li><strong>Current Rating:</strong> Must handle peak rectified current (higher than average load current)</li>
          <li><strong>Peak Inverse Voltage (PIV):</strong> Must exceed peak transformer secondary voltage</li>
          <li><strong>Common Types:</strong> 1N4007 (1A, 1000V), 1N5408 (3A, 1000V)</li>
        </ul>
        <p><strong>Safety Factor:</strong> Always choose diodes rated for at least 2× the expected current</p>
        
        <h3>Filter Capacitor Selection</h3>
        <ul>
          <li><strong>Voltage Rating:</strong> Must exceed peak DC voltage (V_peak = V_RMS × 1.414)</li>
          <li><strong>Capacitance:</strong> Larger = lower ripple, but more expensive and bulkier</li>
          <li><strong>Typical Values:</strong> 1000-10000µF for power supplies</li>
          <li><strong>Type:</strong> Electrolytic capacitors are standard for power supplies</li>
        </ul>
        <p><strong>Safety Factor:</strong> Always use capacitors rated for at least 1.5-2× the peak voltage</p>
        
        <h2>Safety Considerations</h2>
        <ul>
          <li><strong>Primary Fuse:</strong> Always include a fuse on the AC input for protection</li>
          <li><strong>Grounding:</strong> Ensure proper grounding for safety</li>
          <li><strong>Isolation:</strong> Transformer provides isolation from mains voltage</li>
          <li><strong>Capacitor Discharge:</strong> Large filter capacitors can hold dangerous charge - discharge before touching</li>
          <li><strong>Testing:</strong> Always use a multimeter to verify voltages before connecting load</li>
        </ul>
      `,
      practiceProblems: [
        'You need 12V AC from a 120V wall outlet. What turns ratio do you need? (Answer: 10:1 or 120/12 = 10)',
        'For a 12V, 3A power supply, what peak inverse voltage (PIV) should your rectifier diodes have? (Answer: At least 17V (12 × 1.414 = 16.97V), so 25V or higher)',
        'Calculate the ripple voltage for a 1000µF filter capacitor with 2A load at 60Hz. (Answer: V_ripple = 2A / (2 × 60Hz × 1000µF) = 0.0167V or 16.7mV)',
        'Why must filter capacitors be rated higher than the peak voltage? (Answer: Safety margin to prevent capacitor failure and explosion)'
      ]
    }
  ],
  diyProjects: [
    {
      id: 'ps-diy-1',
      title: 'Simple 5V USB Power Supply',
      description: 'Build a basic 5V power supply suitable for charging USB devices',
      difficulty: 'easy',
      duration: '2-3 hours',
      materials: [
        '12V transformer (1A minimum)',
        'Bridge rectifier (1A minimum)',
        '2200µF filter capacitor (25V)',
        'LM7805 voltage regulator',
        '0.1µF ceramic capacitor (input)',
        '0.1µF ceramic capacitor (output)',
        'USB connector or cable',
        'Heat sink for regulator',
        'Fuse holder and 1A fuse',
        'AC power cord'
      ],
      steps: [
        'Connect AC power cord to fuse holder and transformer primary',
        'Connect transformer secondary to bridge rectifier input',
        'Connect rectifier output to filter capacitor (positive to positive)',
        'Connect LM7805 regulator: input from filter capacitor, output to USB connector',
        'Add ceramic capacitors at input and output of regulator',
        'Attach heat sink to regulator with thermal paste',
        'Test with multimeter before connecting load',
        'Connect USB device and verify 5V output'
      ],
      whatYouLearn: [
        'How transformers step down AC voltage',
        'Bridge rectifier operation',
        'Filter capacitor function',
        'Linear voltage regulation',
        'PCB layout and soldering',
        'Safety with AC power'
      ],
      troubleshooting: [
        {
          problem: 'No output voltage',
          solution: 'Check fuse, transformer connections, and diode orientation. Use multimeter to trace voltage through each stage.'
        },
        {
          problem: 'Output voltage too low',
          solution: 'Check filter capacitor value and condition. Verify transformer secondary voltage with multimeter.'
        },
        {
          problem: 'Regulator getting very hot',
          solution: 'Ensure heat sink is properly attached. Check for short circuit in output. Verify input voltage is not too high.'
        }
      ],
      realWorldUse: 'This circuit is the basis for many USB chargers and phone power supplies. Understanding it helps you design reliable power supplies for any project.'
    },
    {
      id: 'ps-diy-2',
      title: 'Variable Bench Power Supply (LM317)',
      description: 'Build an adjustable power supply with voltage and current control',
      difficulty: 'medium',
      duration: '4-5 hours',
      materials: [
        '24V transformer (2A minimum)',
        'Bridge rectifier (2A minimum)',
        '4700µF filter capacitor (50V)',
        'LM317 adjustable regulator',
        '10kΩ potentiometer (for voltage adjustment)',
        '0.1Ω sense resistor (2W, for current limiting)',
        '10kΩ potentiometer (for current adjustment)',
        'Various capacitors (0.1µF, 10µF)',
        'Resistors (240Ω, 1kΩ, 10kΩ)',
        'Heat sink for regulator',
        'Binding posts for output',
        'Fuse holder and 2A fuse',
        'AC power cord'
      ],
      steps: [
        'Build AC input stage: transformer, fuse, and power cord',
        'Build rectifier stage: bridge rectifier and filter capacitor',
        'Install LM317 regulator with heat sink',
        'Connect voltage adjustment potentiometer to feedback divider',
        'Connect current limit sense resistor in output path',
        'Connect current adjustment potentiometer to current limit pins',
        'Add output capacitors for stability',
        'Test voltage adjustment (should vary from ~1.5V to ~20V)',
        'Test current limiting (should limit at set point)',
        'Calibrate with multimeter and load'
      ],
      whatYouLearn: [
        'Adjustable voltage regulation',
        'Current limiting circuits',
        'Potentiometer feedback networks',
        'Load testing and calibration',
        'Thermal management',
        'Practical power supply design'
      ],
      troubleshooting: [
        {
          problem: 'Voltage doesn\'t adjust smoothly',
          solution: 'Check potentiometer connections and resistance values. Verify feedback divider calculations.'
        },
        {
          problem: 'Current limiting doesn\'t work',
          solution: 'Check sense resistor value and connections. Verify current limit potentiometer is connected correctly.'
        },
        {
          problem: 'Regulator oscillates or becomes unstable',
          solution: 'Add capacitors at input and output. Check for loose connections. Verify heat sink is secure.'
        }
      ],
      realWorldUse: 'A variable bench power supply is one of the most useful tools in an electronics lab. This project teaches you how to build one and understand every component.'
    },
    {
      id: 'ps-diy-3',
      title: 'Your LM723 Power Supply - Repair & Upgrade Case Study',
      description: 'Complete guide to repairing and upgrading your lab bench power supply with LM723',
      difficulty: 'hard',
      duration: '6-8 hours',
      materials: [
        'Your existing power supply or components',
        'LM723 voltage regulator IC',
        '2N3055 or similar power transistor (if upgrading)',
        'Sense resistor (value depends on desired current)',
        'Feedback divider resistors (1kΩ, 10kΩ potentiometer)',
        'Filter capacitors (4700µF, 10µF)',
        'Ceramic capacitors (0.1µF, 100pF)',
        'Heat sink compound',
        'Large heat sink for power transistor',
        'Diodes (1N4007 or similar)',
        'Test equipment (multimeter, oscilloscope if available)'
      ],
      steps: [
        'Diagnose current power supply: test all voltages and identify problems',
        'Plan upgrade: determine desired voltage and current ratings',
        'Design feedback divider for desired output voltage',
        'Calculate sense resistor for desired current limit',
        'Design external pass transistor circuit if needed for higher current',
        'Build new circuit on breadboard and test',
        'Transfer to PCB or perfboard',
        'Install heat sinks and thermal management',
        'Calibrate voltage and current controls',
        'Test under various loads',
        'Document modifications for future reference'
      ],
      whatYouLearn: [
        'Complete power supply design from scratch',
        'Troubleshooting and diagnosis',
        'LM723 advanced features',
        'High-current power supply design',
        'Thermal management for high power',
        'Professional power supply techniques'
      ],
      troubleshooting: [
        {
          problem: 'Output voltage drifts with temperature',
          solution: 'Check reference voltage stability. Verify thermal compensation in feedback network.'
        },
        {
          problem: 'High ripple voltage',
          solution: 'Increase filter capacitor value. Check for poor connections. Verify transformer secondary voltage.'
        },
        {
          problem: 'Current limiting engages too early',
          solution: 'Check sense resistor value. Verify current limit potentiometer connections. Look for voltage drops in wiring.'
        }
      ],
      realWorldUse: 'This is the ultimate power supply project! You\'ll learn professional techniques used in commercial power supplies and be able to design and build supplies for any application.'
    }
  ],
  learningOutcomes: [
    'Understand linear voltage regulation and feedback loops',
    'Master the LM723 voltage regulator IC',
    'Design current limiting circuits for protection',
    'Compare linear and switching power supplies',
    'Select appropriate transformers and rectifiers',
    'Design filter circuits for low ripple voltage',
    'Build and troubleshoot power supplies',
    'Implement thermal management for high-power supplies',
    'Calibrate and test power supplies professionally',
    'Repair and upgrade existing power supplies'
  ]
};
