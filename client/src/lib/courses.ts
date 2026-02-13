export interface Tool {
  name: string;
  category: string;
  description: string;
  optional?: boolean;
  link?: string;
  estimatedCost?: string;
}

export interface Reference {
  title: string;
  url: string;
  type: 'article' | 'documentation' | 'video' | 'book' | 'tool';
}

export interface ModuleContent {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "45 minutes"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string; // HTML content
  codeExamples?: string[];
  practiceProblems?: string[];
  references?: Reference[];
  prerequisites?: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "8 weeks"
  image?: string;
  tools: Tool[];
  modules: ModuleContent[];
  learningOutcomes: string[];
  prerequisites?: string[];
  references?: Reference[];
}

export const courses: Course[] = [
  {
    id: 'electronics-101',
    title: 'Electronics 101',
    slug: 'electronics-101',
    description: 'Master the fundamentals of electricity and electronic circuits',
    longDescription: 'A comprehensive introduction to electronics covering voltage, current, resistance, and basic circuit analysis. This course builds a solid foundation for all advanced electronics topics.',
    category: 'Electronics',
    difficulty: 'beginner',
    duration: '6 weeks',
    tools: [
      {
        name: 'Breadboard',
        category: 'Hardware',
        description: 'Solderless prototyping board for building circuits',
        estimatedCost: '$5-15'
      },
      {
        name: 'Digital Multimeter',
        category: 'Hardware',
        description: 'Measures voltage, current, and resistance',
        estimatedCost: '$15-50'
      },
      {
        name: 'Jumper Wires',
        category: 'Hardware',
        description: 'Connects components on breadboard',
        estimatedCost: '$5-10'
      },
      {
        name: 'Resistor Kit',
        category: 'Hardware',
        description: 'Assorted resistors for circuits',
        estimatedCost: '$5-15'
      },
      {
        name: 'LED Kit',
        category: 'Hardware',
        description: 'Various colored LEDs for testing',
        estimatedCost: '$5-10'
      }
    ],
    modules: [
      {
        id: 'e101-m1',
        title: '1.1: Introduction to Electricity',
        description: 'Voltage, Current, Resistance (Ohm\'s Law), Power (Joule\'s Law)',
        duration: '45 minutes',
        difficulty: 'beginner',
        content: `
          <h2>Introduction to Electricity</h2>
          <p>Electricity is the movement of electrons through a conductor. To understand electronics, we must define the three fundamental properties of a circuit.</p>
          
          <h3>Voltage (V)</h3>
          <p>Voltage is the electrical potential difference between two points. It is the "pressure" that pushes electrons through a loop.</p>
          <ul>
            <li><strong>Unit:</strong> Volts (V)</li>
            <li><strong>Analogy:</strong> Water pressure in a pipe</li>
          </ul>
          
          <h3>Current (I)</h3>
          <p>Current is the rate at which charge flows past a point in a circuit.</p>
          <ul>
            <li><strong>Unit:</strong> Amperes (A)</li>
            <li><strong>Analogy:</strong> The volume of water flowing through the pipe</li>
          </ul>
          
          <h3>Resistance (R)</h3>
          <p>Resistance is the opposition to the flow of current. Every material (except superconductors) has some level of resistance.</p>
          <ul>
            <li><strong>Unit:</strong> Ohms (Ω)</li>
            <li><strong>Analogy:</strong> The size of the pipe (narrower pipe = higher resistance)</li>
          </ul>
          
          <h2>Ohm's Law</h2>
          <p>Ohm's Law defines the linear relationship between Voltage, Current, and Resistance:</p>
          <p><strong>V = I × R</strong></p>
          
          <h3>Derived Formulas:</h3>
          <ul>
            <li>To find Current: <strong>I = V / R</strong></li>
            <li>To find Resistance: <strong>R = V / I</strong></li>
          </ul>
          
          <h2>Power (Joule's Law)</h2>
          <p>Power is the rate at which electrical energy is consumed or converted into another form (like heat).</p>
          <p><strong>P = V × I</strong></p>
          <p>Or substituting Ohm's Law: <strong>P = I² × R</strong></p>
        `,
        codeExamples: [],
        practiceProblems: [
          'A circuit has a 12V battery and a measured current of 2A. What is the total resistance?',
          'An LED draws 20mA (0.02A) at 3V. How much power is it consuming?'
        ],
        references: [
          {
            title: 'Ohm\'s Law - Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Ohm%27s_law',
            type: 'article'
          },
          {
            title: 'Joule heating - Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Joule_heating',
            type: 'article'
          }
        ]
      },
      {
        id: 'e101-m2',
        title: '1.2: Essential Passive Components',
        description: 'Resistors, Capacitors, and Inductors',
        duration: '50 minutes',
        difficulty: 'beginner',
        content: `
          <h2>Essential Passive Components</h2>
          <p>Passive components are electronic elements that do not require an external power source to operate.</p>
          
          <h3>Resistors</h3>
          <p>Resistors limit the flow of electric current and are one of the most fundamental components in electronics.</p>
          <p><strong>Color Code:</strong> Resistors use color bands to indicate their resistance value.</p>
          <ul>
            <li>First band: First digit</li>
            <li>Second band: Second digit</li>
            <li>Third band: Multiplier (power of 10)</li>
            <li>Fourth band: Tolerance</li>
          </ul>
          
          <h3>Capacitors</h3>
          <p>Capacitors store electrical energy in an electric field. They are used for filtering, coupling, and energy storage.</p>
          <ul>
            <li><strong>Electrolytic:</strong> Polarized, high capacitance</li>
            <li><strong>Ceramic:</strong> Non-polarized, small capacitance</li>
            <li><strong>Film:</strong> Non-polarized, stable</li>
          </ul>
          
          <h3>Inductors</h3>
          <p>Inductors store energy in a magnetic field. They oppose changes in current flow.</p>
          <ul>
            <li>Used in filters and power supplies</li>
            <li>Measured in Henries (H)</li>
          </ul>
        `,
        codeExamples: [],
        practiceProblems: [
          'Decode a resistor with color bands: Brown, Black, Red, Gold',
          'What is the capacitance of a capacitor marked as 100µF?'
        ],
        references: [
          {
            title: 'Resistor Color Code - Electronics Tutorials',
            url: 'https://www.electronics-tutorials.ws/resistor/res_2.html',
            type: 'article'
          }
        ]
      }
    ],
    learningOutcomes: [
      'Understand voltage, current, and resistance',
      'Apply Ohm\'s Law to solve circuit problems',
      'Identify and use passive components',
      'Analyze basic circuits',
      'Measure electrical properties with a multimeter'
    ]
  },
  {
    id: 'arduino-basics',
    title: 'Arduino Programming Basics',
    slug: 'arduino-basics',
    description: 'Learn to program Arduino microcontrollers from scratch',
    longDescription: 'This course teaches you how to program Arduino boards using the Arduino IDE. You\'ll learn digital I/O, analog I/O, and how to control real-world devices.',
    category: 'Microcontrollers',
    difficulty: 'beginner',
    duration: '5 weeks',
    tools: [
      {
        name: 'Arduino UNO',
        category: 'Hardware',
        description: 'Popular microcontroller board',
        estimatedCost: '$20-30'
      },
      {
        name: 'Arduino IDE',
        category: 'Software',
        description: 'Free development environment',
        optional: false,
        link: 'https://www.arduino.cc/en/software'
      },
      {
        name: 'USB Cable',
        category: 'Hardware',
        description: 'Type A to Type B for Arduino UNO',
        estimatedCost: '$5-10'
      },
      {
        name: 'Breadboard',
        category: 'Hardware',
        description: 'For prototyping circuits',
        estimatedCost: '$5-15'
      },
      {
        name: 'Jumper Wires',
        category: 'Hardware',
        description: 'For connecting components',
        estimatedCost: '$5-10'
      }
    ],
    modules: [
      {
        id: 'ard-m1',
        title: '3.1: What is a Microcontroller?',
        description: 'Understanding microcontroller architecture and basics',
        duration: '40 minutes',
        difficulty: 'beginner',
        content: `
          <h2>What is a Microcontroller?</h2>
          <p>A microcontroller is a small computer on a single integrated circuit (IC) containing a processor, memory, and input/output (I/O) peripherals.</p>
          
          <h3>Key Components:</h3>
          <ul>
            <li><strong>CPU:</strong> Executes instructions</li>
            <li><strong>RAM:</strong> Temporary memory for running programs</li>
            <li><strong>ROM/Flash:</strong> Permanent memory for storing programs</li>
            <li><strong>I/O Ports:</strong> Digital and analog pins for interfacing with external devices</li>
          </ul>
          
          <h3>Microcontroller vs Microprocessor:</h3>
          <p>Microcontrollers are designed for specific tasks and include memory and I/O on the same chip. Microprocessors are more powerful but require external components.</p>
          
          <h3>Arduino Platform:</h3>
          <p>Arduino is an open-source electronics platform based on easy-to-use hardware and software. The Arduino UNO is the most popular beginner board.</p>
        `,
        codeExamples: [],
        practiceProblems: [
          'What is the difference between RAM and Flash memory?',
          'How many I/O pins does an Arduino UNO have?'
        ],
        references: [
          {
            title: 'Arduino Official Website',
            url: 'https://www.arduino.cc/',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'ard-m2',
        title: '3.2: Getting Started with Arduino',
        description: 'Setting up Arduino IDE and writing your first program',
        duration: '60 minutes',
        difficulty: 'beginner',
        content: `
          <h2>Getting Started with Arduino</h2>
          
          <h3>Installing Arduino IDE:</h3>
          <ol>
            <li>Go to https://www.arduino.cc/en/software</li>
            <li>Download the installer for your operating system</li>
            <li>Run the installer and follow the instructions</li>
            <li>Open Arduino IDE</li>
          </ol>
          
          <h3>Arduino Program Structure:</h3>
          <p>Every Arduino program has two main functions:</p>
          
          <h4>setup():</h4>
          <p>Runs once when the board is powered on or reset. Used for initialization.</p>
          
          <h4>loop():</h4>
          <p>Runs repeatedly after setup(). Contains the main program logic.</p>
          
          <h3>Your First Program:</h3>
          <p>The classic "Blink" program flashes an LED:</p>
          <pre><code>
void setup() {
  pinMode(13, OUTPUT);  // Set pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH);  // Turn LED on
  delay(1000);             // Wait 1 second
  digitalWrite(13, LOW);   // Turn LED off
  delay(1000);             // Wait 1 second
}
          </code></pre>
        `,
        codeExamples: [
          'void setup() { pinMode(13, OUTPUT); }',
          'void loop() { digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000); }'
        ],
        practiceProblems: [
          'Modify the blink program to blink 3 times per second instead of 1 time per second',
          'Write a program that blinks an LED on pin 9'
        ],
        references: [
          {
            title: 'Arduino Language Reference',
            url: 'https://www.arduino.cc/reference/en/',
            type: 'documentation'
          }
        ]
      }
    ],
    learningOutcomes: [
      'Understand microcontroller basics',
      'Set up Arduino IDE',
      'Write and upload Arduino sketches',
      'Control digital pins',
      'Read analog inputs',
      'Create interactive projects'
    ]
  },
  {
    id: 'esp32-iot',
    title: 'ESP32 IoT Development',
    slug: 'esp32-iot',
    description: 'Build connected IoT devices with ESP32 and WiFi',
    longDescription: 'Learn to develop Internet of Things (IoT) applications using the ESP32 microcontroller with built-in WiFi and Bluetooth capabilities.',
    category: 'IoT & Connectivity',
    difficulty: 'intermediate',
    duration: '7 weeks',
    tools: [
      {
        name: 'ESP32 Development Board',
        category: 'Hardware',
        description: 'Microcontroller with WiFi and Bluetooth',
        estimatedCost: '$10-20'
      },
      {
        name: 'Arduino IDE or PlatformIO',
        category: 'Software',
        description: 'Development environment',
        optional: false,
        link: 'https://platformio.org/'
      },
      {
        name: 'USB Cable',
        category: 'Hardware',
        description: 'Micro USB for ESP32',
        estimatedCost: '$5-10'
      },
      {
        name: 'WiFi Network',
        category: 'Infrastructure',
        description: 'For connecting ESP32 to internet',
        optional: false
      }
    ],
    modules: [
      {
        id: 'esp-m1',
        title: '4.1: Introduction to the ESP32',
        description: 'ESP32 architecture, features, and setup',
        duration: '45 minutes',
        difficulty: 'intermediate',
        content: `
          <h2>Introduction to the ESP32</h2>
          <p>The ESP32 is a powerful microcontroller with integrated WiFi and Bluetooth, making it ideal for IoT applications.</p>
          
          <h3>Key Features:</h3>
          <ul>
            <li><strong>Dual-core processor:</strong> Run multiple tasks simultaneously</li>
            <li><strong>WiFi:</strong> 802.11 b/g/n connectivity</li>
            <li><strong>Bluetooth:</strong> Classic and BLE support</li>
            <li><strong>30+ GPIO pins:</strong> More I/O than Arduino</li>
            <li><strong>Built-in sensors:</strong> Temperature, touch, ADC</li>
            <li><strong>Low power modes:</strong> Sleep and deep sleep</li>
          </ul>
          
          <h3>Comparison with Arduino:</h3>
          <table>
            <tr>
              <th>Feature</th>
              <th>Arduino UNO</th>
              <th>ESP32</th>
            </tr>
            <tr>
              <td>Processor Speed</td>
              <td>16 MHz</td>
              <td>240 MHz (dual-core)</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>2 KB</td>
              <td>520 KB</td>
            </tr>
            <tr>
              <td>WiFi</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Bluetooth</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>GPIO Pins</td>
              <td>14</td>
              <td>30+</td>
            </tr>
          </table>
          
          <h3>Setting Up ESP32:</h3>
          <ol>
            <li>Install Arduino IDE or PlatformIO</li>
            <li>Add ESP32 board support</li>
            <li>Connect ESP32 via USB</li>
            <li>Select board and port in IDE</li>
            <li>Upload your first sketch</li>
          </ol>
        `,
        codeExamples: [],
        practiceProblems: [
          'What are the main advantages of ESP32 over Arduino UNO?',
          'How many GPIO pins does ESP32 have?'
        ],
        references: [
          {
            title: 'ESP32 Official Documentation',
            url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'esp-m2',
        title: '4.3: Connecting to the Internet',
        description: 'WiFi connectivity and web server basics',
        duration: '55 minutes',
        difficulty: 'intermediate',
        content: `
          <h2>Connecting ESP32 to the Internet</h2>
          <p>The ESP32 can connect to WiFi networks and act as both a client and server.</p>
          
          <h3>WiFi Modes:</h3>
          <ul>
            <li><strong>Station (STA):</strong> Connects to existing WiFi network</li>
            <li><strong>Access Point (AP):</strong> Creates its own WiFi network</li>
            <li><strong>Both:</strong> Can do both simultaneously</li>
          </ul>
          
          <h3>Connecting to WiFi:</h3>
          <pre><code>
#include &lt;WiFi.h&gt;

const char* ssid = "Your_SSID";
const char* password = "Your_Password";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("WiFi connected!");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Your code here
}
          </code></pre>
          
          <h3>Creating a Web Server:</h3>
          <p>The ESP32 can host a web server and serve web pages to clients on your network.</p>
          <pre><code>
#include &lt;WebServer.h&gt;

WebServer server(80);

void handleRoot() {
  server.send(200, "text/html", "&lt;h1&gt;Hello from ESP32!&lt;/h1&gt;");
}

void setup() {
  WiFi.begin(ssid, password);
  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}
          </code></pre>
        `,
        codeExamples: [
          '#include <WiFi.h>',
          'WiFi.begin(ssid, password);',
          'server.send(200, "text/html", "<h1>Hello</h1>");'
        ],
        practiceProblems: [
          'Write code to connect ESP32 to your home WiFi network',
          'Create a simple web server that displays "Hello World"'
        ],
        references: [
          {
            title: 'ESP32 WiFi Library',
            url: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html',
            type: 'documentation'
          }
        ]
      }
    ],
    learningOutcomes: [
      'Understand ESP32 architecture and capabilities',
      'Set up ESP32 development environment',
      'Connect ESP32 to WiFi networks',
      'Create web servers on ESP32',
      'Build IoT applications',
      'Implement remote control systems'
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
