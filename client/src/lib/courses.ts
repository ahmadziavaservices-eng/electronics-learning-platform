export interface Tool {
  name: string;
  category: string;
  description: string;
  why: string;
  howToUse: string;
  optional?: boolean;
  link?: string;
  estimatedCost?: string;
  alternatives?: string[];
  safetyTips?: string[];
}

export interface DIYProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  materials: string[];
  steps: string[];
  whatYouLearn: string[];
  troubleshooting: { problem: string; solution: string }[];
  realWorldUse: string;
}

export interface Reference {
  title: string;
  url: string;
  type: 'article' | 'documentation' | 'video' | 'book' | 'tool';
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnail?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ModuleContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  codeExamples?: string[];
  practiceProblems?: string[];
  references?: Reference[];
  prerequisites?: string[];
  diyProjects?: DIYProject[];
  videoTutorials?: VideoTutorial[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  image?: string;
  tools: Tool[];
  modules: ModuleContent[];
  learningOutcomes: string[];
  diyProjects?: DIYProject[];
  prerequisites?: string[];
  references?: Reference[];
}

import { powerSupplyCourse } from './powerSupplyCourse';

export const courses: Course[] = [
  powerSupplyCourse,
  {
    id: 'electronics-101',
    title: 'Electronics 101',
    slug: 'electronics-101',
    description: 'Learn the basics of electricity and how circuits work',
    longDescription: 'A fun introduction to electronics for beginners! Learn what electricity is, how it flows through circuits, and why we need different parts. Perfect for anyone curious about how electronic devices work.',
    category: 'Electronics',
    difficulty: 'beginner',
    duration: '4 weeks',
    tools: [
      {
        name: 'Breadboard',
        category: 'Hardware',
        description: 'A board with holes where you can plug in wires and parts without soldering',
        why: 'Breadboards let you build circuits quickly and test ideas without permanently connecting parts. You can take apart and rebuild circuits as many times as you want!',
        howToUse: 'Push wires and component legs gently into the holes. The holes are connected in rows, so parts in the same row are electrically connected.',
        estimatedCost: '$5-15',
        safetyTips: ['Don\'t force parts into holes - if they don\'t fit easily, try a different hole', 'Keep the breadboard away from water and moisture']
      },
      {
        name: 'Jumper Wires',
        category: 'Hardware',
        description: 'Flexible wires that connect parts on the breadboard',
        why: 'These wires carry electricity between different parts of your circuit. They come in different colors to help you organize your circuits.',
        howToUse: 'Strip about 5mm of plastic from each end, then push into breadboard holes. Use different colors for positive (red), negative (black), and signals (other colors).',
        estimatedCost: '$5-10',
        safetyTips: ['Don\'t bend wires too many times - they can break', 'Keep wire ends clean and free of plastic coating']
      },
      {
        name: 'Digital Multimeter',
        category: 'Hardware',
        description: 'A tool that measures voltage, current, and resistance',
        why: 'This is like a doctor\'s thermometer for circuits! It tells you if electricity is flowing correctly and helps you find problems.',
        howToUse: 'Set the dial to what you want to measure (voltage, current, or resistance). Touch the red and black probes to the parts you\'re testing.',
        estimatedCost: '$15-50',
        alternatives: ['Analog multimeter (older style but still works)', 'Clamp meter (for measuring current without breaking the circuit)'],
        safetyTips: ['Never measure voltage or current without setting the dial correctly first', 'Start with the highest setting if you\'re not sure what the voltage is']
      },
      {
        name: 'Resistor Kit',
        category: 'Hardware',
        description: 'Different resistors that slow down electricity flow',
        why: 'Resistors protect delicate parts like LEDs from too much electricity. Different resistors slow electricity by different amounts.',
        howToUse: 'Read the colored bands on the resistor to find its value. Use a resistor color code chart or app to decode them.',
        estimatedCost: '$5-15',
        safetyTips: ['Resistors are small - keep them organized in a box', 'Don\'t lose them - they\'re cheap but easy to misplace']
      },
      {
        name: 'LED Kit',
        category: 'Hardware',
        description: 'Colorful lights that glow when electricity flows through them',
        why: 'LEDs show you when your circuit is working! They\'re fun, safe, and use very little electricity.',
        howToUse: 'LEDs have a long leg (positive) and short leg (negative). Connect the long leg to positive and short leg to negative through a resistor.',
        estimatedCost: '$5-10',
        safetyTips: ['Always use a resistor with an LED - without it, the LED will burn out', 'Don\'t look directly into a bright LED for too long']
      },
      {
        name: 'Battery Holder',
        category: 'Hardware',
        description: 'A case that holds batteries and connects them to your circuit',
        why: 'This safely holds batteries and gives you two wires (positive and negative) to connect to your circuit.',
        howToUse: 'Put batteries in the holder, then connect the red wire (positive) and black wire (negative) to your circuit.',
        estimatedCost: '$3-8',
        safetyTips: ['Check that batteries are installed correctly before using', 'Remove batteries if you won\'t use the circuit for a while']
      }
    ],
    modules: [
      {
        id: 'e101-m1',
        title: '1: What is Electricity?',
        description: 'Understanding voltage, current, and resistance in simple terms',
        duration: '20 minutes',
        difficulty: 'beginner',
        content: `
          <h2>What is Electricity?</h2>
          <p>Electricity is moving electrons (tiny particles) flowing through wires and parts. Think of it like water flowing through a pipe!</p>
          
          <h3>Three Important Ideas:</h3>
          
          <h4>Voltage (V) - The Push</h4>
          <p>Voltage is like the pressure that pushes electricity through a circuit. A bigger push means more power.</p>
          <ul>
            <li><strong>Analogy:</strong> Water pressure in a hose - higher pressure pushes water faster</li>
            <li><strong>Unit:</strong> Volts (V)</li>
            <li><strong>Example:</strong> A battery is usually 1.5V, 9V, or 12V</li>
          </ul>
          
          <h4>Current (I) - The Flow</h4>
          <p>Current is how much electricity is flowing. It's like measuring how much water comes out of a faucet.</p>
          <ul>
            <li><strong>Analogy:</strong> The amount of water flowing through a pipe</li>
            <li><strong>Unit:</strong> Amperes or Amps (A)</li>
            <li><strong>Example:</strong> An LED uses about 0.02 Amps (20 milliamps)</li>
          </ul>
          
          <h4>Resistance (R) - The Obstacle</h4>
          <p>Resistance slows down electricity, just like a narrow pipe slows down water.</p>
          <ul>
            <li><strong>Analogy:</strong> A narrow pipe is harder for water to flow through</li>
            <li><strong>Unit:</strong> Ohms (Ω)</li>
            <li><strong>Example:</strong> An LED needs about 220 Ohms of resistance to be safe</li>
          </ul>
          
          <h2>The Golden Rule: Ohm's Law</h2>
          <p>There's a simple rule that connects voltage, current, and resistance:</p>
          <p><strong>Voltage = Current × Resistance</strong></p>
          <p>Or: <strong>V = I × R</strong></p>
          
          <p>This means: If you know two of these numbers, you can calculate the third!</p>
          
          <h2>Power - How Much Energy is Used</h2>
          <p>Power tells us how much energy a device uses. A brighter LED uses more power than a dim one.</p>
          <p><strong>Power = Voltage × Current</strong></p>
          <p>Or: <strong>P = V × I</strong></p>
          <p><strong>Unit:</strong> Watts (W)</p>
        `,
        practiceProblems: [
          'If a battery gives 9V and an LED uses 0.02A, how much power is the LED using? (Answer: 0.18W)',
          'A resistor has 220 Ohms. If 0.02A flows through it, what voltage is across it? (Answer: 4.4V)',
          'A toy motor uses 6V and 0.5A. How much power does it use? (Answer: 3W)'
        ],
        references: [
          {
            title: 'Khan Academy - Electricity Basics',
            url: 'https://www.khanacademy.org/science/physics/circuits-topic',
            type: 'video'
          }
        ]
      },
      {
        id: 'e101-m2',
        title: '2: Parts of a Circuit',
        description: 'Learn about resistors, capacitors, LEDs, and other important parts',
        duration: '25 minutes',
        difficulty: 'beginner',
        content: `
          <h2>Important Circuit Parts</h2>
          <p>Just like a car needs an engine, wheels, and steering wheel, circuits need different parts to work. Let's learn about the most important ones!</p>
          
          <h3>Resistors - The Speed Bumps</h3>
          <p>Resistors slow down electricity. They're like speed bumps on a road!</p>
          <ul>
            <li><strong>Color Code:</strong> Resistors have colored bands that tell you their value</li>
            <li><strong>Why use them:</strong> To protect delicate parts like LEDs from too much current</li>
            <li><strong>How to read them:</strong> Use a resistor color code chart (available online)</li>
          </ul>
          
          <h3>LEDs - The Lights</h3>
          <p>LEDs (Light Emitting Diodes) are special lights that glow when electricity flows through them.</p>
          <ul>
            <li><strong>Important:</strong> LEDs have a direction - the long leg must connect to positive!</li>
            <li><strong>Always use a resistor:</strong> Without a resistor, an LED burns out immediately</li>
            <li><strong>Colors:</strong> Red, green, blue, yellow, and white LEDs are available</li>
          </ul>
          
          <h3>Switches - The On/Off Button</h3>
          <p>Switches let you turn electricity on and off, just like a light switch in your house.</p>
          <ul>
            <li><strong>Types:</strong> Push buttons, toggle switches, slide switches</li>
            <li><strong>How they work:</strong> They break or complete the circuit</li>
          </ul>
          
          <h3>Capacitors - The Energy Tanks</h3>
          <p>Capacitors store electrical energy temporarily, like a tiny battery.</p>
          <ul>
            <li><strong>Electrolytic:</strong> Can store more energy, but have a direction (positive and negative legs)</li>
            <li><strong>Ceramic:</strong> Smaller, no direction needed</li>
          </ul>
          
          <h3>Diodes - The One-Way Valves</h3>
          <p>Diodes let electricity flow in only one direction, like a one-way street.</p>
          <ul>
            <li><strong>Use:</strong> Protecting circuits from reversed batteries</li>
            <li><strong>Direction:</strong> Important! The black band shows the direction</li>
          </ul>
        `,
        practiceProblems: [
          'What color resistor band means the number 2?',
          'Why do LEDs need resistors?',
          'What\'s the difference between a capacitor and a battery?'
        ]
      }
    ],
    learningOutcomes: [
      'Understand what electricity is and how it flows',
      'Learn voltage, current, and resistance',
      'Use a breadboard to build circuits',
      'Read resistor color codes',
      'Build simple circuits with LEDs',
      'Use a multimeter to test circuits'
    ]
  },
  {
    id: 'arduino-basics',
    title: 'Arduino Programming Basics',
    slug: 'arduino-basics',
    description: 'Learn to program Arduino boards and control electronics',
    longDescription: 'Arduino is a simple computer that lets you control electronics with code! Learn to write programs that make LEDs blink, read sensors, and control motors.',
    category: 'Microcontrollers',
    difficulty: 'beginner',
    duration: '5 weeks',
    tools: [
      {
        name: 'Arduino UNO',
        category: 'Hardware',
        description: 'A beginner-friendly microcontroller board',
        why: 'Arduino is easy to learn and has lots of tutorials and community support. Perfect for beginners!',
        howToUse: 'Connect via USB to your computer. Write code in the Arduino IDE and upload it to the board.',
        estimatedCost: '$20-30',
        link: 'https://digilog.pk/',
        safetyTips: ['Don\'t connect more than 5V to the pins', 'Be careful with the USB port - don\'t force the cable']
      },
      {
        name: 'Arduino IDE',
        category: 'Software',
        description: 'Free software to write and upload code to Arduino',
        why: 'The Arduino IDE is simple and designed for beginners. It has built-in examples to learn from.',
        howToUse: 'Download from arduino.cc, install, and connect your Arduino board. Write code and click Upload!',
        optional: false,
        link: 'https://www.arduino.cc/en/software'
      },
      {
        name: 'USB Cable (Type A to Type B)',
        category: 'Hardware',
        description: 'Connects Arduino to your computer',
        why: 'This cable powers the Arduino and lets you upload code from your computer.',
        howToUse: 'Plug into the USB port on the Arduino board and your computer.',
        estimatedCost: '$5-10'
      }
    ],
    modules: [
      {
        id: 'ard-m1',
        title: '1: What is Arduino?',
        description: 'Introduction to microcontrollers and Arduino',
        duration: '20 minutes',
        difficulty: 'beginner',
        content: `
          <h2>What is a Microcontroller?</h2>
          <p>A microcontroller is a tiny computer that can control electronics. It's like giving a robot a brain!</p>
          
          <h3>Arduino Basics</h3>
          <p>Arduino is a platform that makes it easy to program microcontrollers. Instead of complicated code, you write simple instructions.</p>
          
          <h3>What Can Arduino Do?</h3>
          <ul>
            <li>Turn LEDs on and off</li>
            <li>Read sensors (temperature, light, distance)</li>
            <li>Control motors</li>
            <li>Make sounds</li>
            <li>Connect to the internet (with WiFi shield)</li>
          </ul>
          
          <h3>Arduino UNO Pins</h3>
          <ul>
            <li><strong>Digital pins (0-13):</strong> On/off signals (like a light switch)</li>
            <li><strong>Analog pins (A0-A5):</strong> Read varying voltages (like a dimmer)</li>
            <li><strong>Power pins:</strong> 5V and Ground (GND)</li>
          </ul>
        `,
        codeExamples: [
          'pinMode(13, OUTPUT);  // Set pin 13 as output',
          'digitalWrite(13, HIGH);  // Turn pin 13 on',
          'digitalWrite(13, LOW);   // Turn pin 13 off'
        ]
      },
      {
        id: 'ard-m2',
        title: '2: Reading Sensors',
        description: 'Use Arduino to read sensor values',
        duration: '25 minutes',
        difficulty: 'beginner',
        content: `
          <h2>Reading Analog Values</h2>
          <p>Arduino can read sensors that give different voltage levels. This is called analog input.</p>
          
          <h3>Analog vs Digital</h3>
          <ul>
            <li><strong>Digital:</strong> Only on (1) or off (0)</li>
            <li><strong>Analog:</strong> Can be any value from 0 to 1023</li>
          </ul>
          
          <h3>Reading a Sensor</h3>
          <p>Use analogRead() to read a sensor value:</p>
          <pre><code>int sensorValue = analogRead(A0);  // Read pin A0</code></pre>
          
          <p>The value will be between 0 and 1023, where:</p>
          <ul>
            <li>0 = 0 Volts</li>
            <li>1023 = 5 Volts</li>
          </ul>
        `,
        codeExamples: [
          'int value = analogRead(A0);  // Read analog pin A0',
          'Serial.println(value);  // Print the value to the computer',
          'if (value > 500) { digitalWrite(13, HIGH); }  // Turn on LED if value is high'
        ]
      }
    ],
    learningOutcomes: [
      'Understand how microcontrollers work',
      'Write simple Arduino programs',
      'Control digital outputs (LEDs, motors)',
      'Read analog inputs (sensors)',
      'Build interactive electronics projects',
      'Debug and troubleshoot code'
    ]
  },
  {
    id: 'esp32-iot',
    title: 'ESP32 IoT Development',
    slug: 'esp32-iot',
    description: 'Build connected IoT devices with WiFi and Bluetooth',
    longDescription: 'The ESP32 is like Arduino\'s powerful cousin! It has WiFi and Bluetooth built-in, so you can build devices that connect to the internet and talk to your phone.',
    category: 'IoT & Connectivity',
    difficulty: 'intermediate',
    duration: '6 weeks',
    tools: [
      {
        name: 'ESP32 Development Board',
        category: 'Hardware',
        description: 'A powerful microcontroller with WiFi and Bluetooth',
        why: 'ESP32 is more powerful than Arduino and has wireless built-in. Perfect for IoT projects!',
        howToUse: 'Connect via USB. Use Arduino IDE or PlatformIO to write and upload code.',
        estimatedCost: '$10-20',
        link: 'https://digilog.pk/',
        safetyTips: ['Don\'t connect more than 3.3V to the pins (different from Arduino!)', 'Be careful with the antenna - don\'t bend it']
      },
      {
        name: 'Arduino IDE or PlatformIO',
        category: 'Software',
        description: 'Software to program ESP32',
        why: 'Both work with ESP32. Arduino IDE is simpler, PlatformIO is more powerful.',
        howToUse: 'Install ESP32 board support in Arduino IDE, or install PlatformIO extension in VS Code.',
        optional: false,
        link: 'https://platformio.org/'
      },
      {
        name: 'USB Cable (Micro USB)',
        category: 'Hardware',
        description: 'Connects ESP32 to your computer',
        why: 'Powers the ESP32 and lets you upload code.',
        howToUse: 'Plug into the Micro USB port on the ESP32 board.',
        estimatedCost: '$5-10'
      },
      {
        name: 'WiFi Network',
        category: 'Infrastructure',
        description: 'A WiFi network for your ESP32 to connect to',
        why: 'ESP32 needs WiFi to connect to the internet and send/receive data.',
        howToUse: 'Connect to any WiFi network using your SSID and password in the code.',
        optional: false
      }
    ],
    modules: [
      {
        id: 'esp-m1',
        title: '1: ESP32 Basics',
        description: 'Introduction to ESP32 and its features',
        duration: '20 minutes',
        difficulty: 'intermediate',
        content: `
          <h2>What is ESP32?</h2>
          <p>ESP32 is a powerful microcontroller with WiFi and Bluetooth built-in. It's like Arduino on steroids!</p>
          
          <h3>ESP32 vs Arduino</h3>
          <ul>
            <li><strong>Speed:</strong> ESP32 is 15x faster than Arduino</li>
            <li><strong>Memory:</strong> ESP32 has 100x more memory</li>
            <li><strong>WiFi:</strong> ESP32 has WiFi built-in (Arduino needs a shield)</li>
            <li><strong>Bluetooth:</strong> ESP32 has Bluetooth (Arduino doesn't)</li>
            <li><strong>Voltage:</strong> ESP32 uses 3.3V (Arduino uses 5V) - IMPORTANT!</li>
          </ul>
          
          <h3>What Can You Build?</h3>
          <ul>
            <li>Weather stations that send data to the cloud</li>
            <li>Smart home devices that you control from your phone</li>
            <li>Robots that connect to the internet</li>
            <li>IoT sensors that monitor your room</li>
          </ul>
        `
      },
      {
        id: 'esp-m2',
        title: '2: Building a Web Server',
        description: 'Create a web server on your ESP32',
        duration: '25 minutes',
        difficulty: 'intermediate',
        content: `
          <h2>Web Servers on ESP32</h2>
          <p>Your ESP32 can act like a tiny web server! You can access it from any device on your WiFi network.</p>
          
          <h3>How It Works</h3>
          <ul>
            <li>ESP32 connects to WiFi and gets an IP address</li>
            <li>You type the IP address in your browser</li>
            <li>ESP32 sends a web page to your browser</li>
            <li>You can click buttons to control the ESP32!</li>
          </ul>
          
          <h3>Basic Web Server Code</h3>
          <pre><code>
#include &lt;WiFi.h&gt;
#include &lt;WebServer.h&gt;

WebServer server(80);

void handleRoot() {
  server.send(200, "text/html", "&lt;h1&gt;Hello from ESP32!&lt;/h1&gt;");
}

void setup() {
  WiFi.begin("SSID", "password");
  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}
          </code></pre>
        `
      }
    ],
    learningOutcomes: [
      'Understand ESP32 capabilities and differences from Arduino',
      'Set up ESP32 development environment',
      'Connect ESP32 to WiFi networks',
      'Create web servers on ESP32',
      'Build IoT applications',
      'Control devices from a web browser',
      'Build smart home projects'
    ]
  }
];

export const courseCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Learn the fundamentals of electricity and circuits',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'microcontrollers',
    name: 'Microcontrollers',
    description: 'Master Arduino and embedded systems programming',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'iot',
    name: 'IoT & Connectivity',
    description: 'Build connected devices with WiFi and Bluetooth',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'power-electronics',
    name: 'Power Electronics',
    description: 'Master power supply design and high-power applications',
    color: 'from-yellow-500 to-orange-600'
  }
];

export const getCoursesByCategory = (categoryId: string) => {
  return courses.filter(course => course.category === courseCategories.find(cat => cat.id === categoryId)?.name);
};

export const getCourseBySlug = (slug: string) => {
  return courses.find(course => course.slug === slug);
};

export const getModuleById = (courseId: string, moduleId: string) => {
  const course = courses.find(c => c.id === courseId);
  return course?.modules.find(m => m.id === moduleId);
};
