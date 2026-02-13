export interface Module {
  id: string;
  volume: number;
  section: string;
  title: string;
  description: string;
  pdfPath: string;
  dependencies: string[];
}

export const modules: Module[] = [
  {
    id: "1.1",
    volume: 1,
    section: "1.1",
    title: "Introduction to Electricity",
    description: "Voltage, Current, Resistance (Ohm's Law), Power (Joule's Law)",
    pdfPath: "/modules/0_OcC7iQMGM5zj9prmnu5HqL_1771015515878_na1fn_L2hvbWUvdWJ1bnR1L21vZHVsZQ.pdf",
    dependencies: []
  },
  {
    id: "1.2",
    volume: 1,
    section: "1.2",
    title: "Essential Passive Components",
    description: "Resistors (color codes, series/parallel), Capacitors (types, behavior), Inductors",
    pdfPath: "/modules/1_eB8qmaci0YIYTlrtyZ5KiT_1771015278979_na1fn_L2hvbWUvdWJ1bnR1L2Vzc2VudGlhbF9wYXNzaXZlX2NvbXBvbmVudHM.pdf",
    dependencies: ["1.1"]
  },
  {
    id: "1.3",
    volume: 1,
    section: "1.3",
    title: "Essential Active Components",
    description: "Diodes (rectification), Transistors (BJT/MOSFET as switches and amplifiers)",
    pdfPath: "/modules/2_jncIFxuvKD50s02D1cWpJB_1771015274008_na1fn_L2hvbWUvdWJ1bnR1L2Vzc2VudGlhbF9hY3RpdmVfY29tcG9uZW50cw.pdf",
    dependencies: ["1.1", "1.2"]
  },
  {
    id: "1.4",
    volume: 1,
    section: "1.4",
    title: "Fundamental Circuit Analysis",
    description: "Kirchhoff's Current Law (KCL) and Voltage Law (KVL), advanced series/parallel analysis",
    pdfPath: "/modules/3_OEJqjzA3ZYApQxuoBqglSP_1771015279158_na1fn_L2hvbWUvdWJ1bnR1L3RjbF9rdmxfbW9kdWxl.pdf",
    dependencies: ["1.1", "1.2"]
  },
  {
    id: "1.5",
    volume: 1,
    section: "1.5",
    title: "Introduction to Digital Logic",
    description: "Logic levels, AND, OR, NOT, XOR gates, Boolean algebra, truth tables",
    pdfPath: "/modules/4_XNLTSBWRECiveoweZsmBtS_1771015279108_na1fn_L2hvbWUvdWJ1bnR1L2RpZ2l0YWxfbG9naWNfbW9kdWxl.pdf",
    dependencies: ["1.3"]
  },
  {
    id: "2.1",
    volume: 2,
    section: "2.1",
    title: "Power Supplies and Voltage Regulation",
    description: "AC/DC conversion, transformers, rectifiers, filter capacitors, linear regulators (78xx series)",
    pdfPath: "/modules/5_AHZJIoah4oojw4Ps1XnZtZ_1771015422658_na1fn_L2hvbWUvdWJ1bnR1L2ludGVybWVkaWF0ZV9lbGVjdHJvbmljc19tb2R1bGU.pdf",
    dependencies: ["1.3", "1.4"]
  },
  {
    id: "2.2",
    volume: 2,
    section: "2.2",
    title: "Operational Amplifiers (Op-Amps)",
    description: "Ideal op-amp, common configurations (inverting, non-inverting, comparator, buffer)",
    pdfPath: "/modules/6_e3wX9KuU8uCEhKQvOmPOfu_1771015397548_na1fn_L2hvbWUvdWJ1bnR1L29wX2FtcF9tb2R1bGU.pdf",
    dependencies: ["1.4"]
  },
  {
    id: "2.3",
    volume: 2,
    section: "2.3",
    title: "Introduction to Sensors and Actuators",
    description: "Overview of common sensors (light, temperature, distance) and actuators (motors, servos, solenoids)",
    pdfPath: "/modules/7_YdwpDx6f7fEsyKIhrNEyOk_1771015282021_na1fn_L2hvbWUvdWJ1bnR1L3NlbnNvcnNfYWN0dWF0b3JzX21vZHVsZQ.pdf",
    dependencies: ["1.1"]
  },
  {
    id: "2.4",
    volume: 2,
    section: "2.4",
    title: "Prototyping and Construction Techniques",
    description: "Using a breadboard, schematic diagrams, soldering basics, safety precautions",
    pdfPath: "/modules/8_nrXeErpt5pdxQADE6ow7YO_1771015279516_na1fn_L2hvbWUvdWJ1bnR1L3Byb3RvdHlwaW5nX21vZHVsZQ.pdf",
    dependencies: ["1.2"]
  },
  {
    id: "3.1",
    volume: 3,
    section: "3.1",
    title: "What is a Microcontroller?",
    description: "CPU, memory (RAM/ROM), I/O ports, comparison with microprocessors",
    pdfPath: "/modules/9_i2Aae98wDXJIxUk7dS63vm_1771015350482_na1fn_L2hvbWUvdWJ1bnR1L21pY3JvY29udHJvbGxlcl9tb2R1bGU.pdf",
    dependencies: ["1.5"]
  },
  {
    id: "3.2",
    volume: 3,
    section: "3.2",
    title: "Getting Started with Arduino",
    description: "Arduino platform overview (UNO board), installing the IDE, basic C/C++ syntax",
    pdfPath: "/modules/10_qx8g15BVSdP7V1NfqyqRw9_1771015496552_na1fn_L2hvbWUvdWJ1bnR1L2dldHRpbmdfc3RhcnRlZF93aXRoX2FyZHVpbm8.pdf",
    dependencies: ["2.4", "3.1"]
  },
  {
    id: "3.3",
    volume: 3,
    section: "3.3",
    title: "Digital Input and Output (I/O)",
    description: "pinMode(), digitalWrite() (controlling LEDs), digitalRead() (reading buttons, debouncing)",
    pdfPath: "/modules/11_SVdAWTLT2yhRDtGqNDvxZ4_1771015450165_na1fn_L2hvbWUvdWJ1bnR1L2RpZ2l0YWxfaW9fbW9kdWxl.pdf",
    dependencies: ["3.2"]
  },
  {
    id: "3.4",
    volume: 3,
    section: "3.4",
    title: "Analog Input and Output (I/O)",
    description: "analogRead() (reading potentiometers, photoresistors), analogWrite() (PWM for dimming LEDs, motor speed control)",
    pdfPath: "/modules/12_csysWzUvCmrSaDwksuaLg8_1771015496501_na1fn_L2hvbWUvdWJ1bnR1L2FuYWxvZ19pb19tb2R1bGU.pdf",
    dependencies: ["3.2"]
  },
  {
    id: "4.1",
    volume: 4,
    section: "4.1",
    title: "Introduction to the ESP32",
    description: "ESP32 architecture, dual-core processing, integrated Wi-Fi and Bluetooth, setting up the environment",
    pdfPath: "/modules/13_BqQO2w5mPiBCBIihXY80ae_1771015318133_na1fn_L2hvbWUvdWJ1bnR1L2VzcDMyX21vZHVsZQ.pdf",
    dependencies: ["3.2"]
  },
  {
    id: "4.2",
    volume: 4,
    section: "4.2",
    title: "Communication Protocols",
    description: "Serial (UART) for debugging, I2C for connecting sensors, SPI for high-speed peripherals",
    pdfPath: "/modules/14_TiJjOEg0X066VzZX6idGd6_1771015332139_na1fn_L2hvbWUvdWJ1bnR1L2NvbW11bmljYXRpb25fcHJvdG9jb2xzX2VzcDMy.pdf",
    dependencies: ["3.2"]
  },
  {
    id: "4.3",
    volume: 4,
    section: "4.3",
    title: "Connecting to the Internet",
    description: "Creating a Wi-Fi access point (AP) and connecting to a network (STA), simple web server for remote control",
    pdfPath: "/modules/15_20eXgktiJqGgk2OAFGVmXQ_1771015517239_na1fn_L2hvbWUvdWJ1bnR1L2VzcDMyX3dpZmlfbW9kdWxl.pdf",
    dependencies: ["4.1"]
  }
];

export const volumes = [
  {
    id: 1,
    title: "Volume 1: Foundations of Electronics",
    description: "Master the fundamental concepts of electricity, components, and circuit analysis"
  },
  {
    id: 2,
    title: "Volume 2: Intermediate Electronics & Prototyping",
    description: "Explore advanced topics like power supplies, op-amps, sensors, and practical construction"
  },
  {
    id: 3,
    title: "Volume 3: Introduction to Microcontrollers with Arduino",
    description: "Learn microcontroller fundamentals and Arduino programming"
  },
  {
    id: 4,
    title: "Volume 4: Advanced Microcontrollers & IoT with ESP32",
    description: "Master ESP32 programming and IoT applications"
  }
];
