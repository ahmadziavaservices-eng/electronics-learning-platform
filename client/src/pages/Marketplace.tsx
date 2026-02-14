import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import MarketplaceComponent from '@/components/Marketplace';
import { MarketplaceProduct } from '@/components/Marketplace';

const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'breadboard-1',
    name: 'Breadboard (Large 830 Points)',
    description: 'Solderless breadboard with 830 connection points. Perfect for building circuits without permanent connections.',
    price: 8.99,
    currency: 'USD',
    category: 'Hardware',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Circuit Building', 'Prototyping', 'Essential']
  },
  {
    id: 'jumper-wires-1',
    name: 'Jumper Wire Set (65 Pieces)',
    description: 'Pre-cut and pre-stripped jumper wires in multiple colors. Great for organizing circuits.',
    price: 5.99,
    currency: 'USD',
    category: 'Hardware',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Wiring', 'Prototyping', 'Essential']
  },
  {
    id: 'resistor-kit-1',
    name: 'Resistor Assortment Kit (500 Pieces)',
    description: 'Complete resistor set with various values from 10Ω to 1MΩ. Includes color code chart.',
    price: 9.99,
    currency: 'USD',
    category: 'Hardware',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Protection', 'Essential', 'Learning']
  },
  {
    id: 'led-kit-1',
    name: 'LED Assortment Kit (200 Pieces)',
    description: 'Colorful LEDs in red, green, blue, yellow, and white. Perfect for learning and projects.',
    price: 7.99,
    currency: 'USD',
    category: 'Hardware',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Lighting', 'Learning', 'Fun']
  },
  {
    id: 'multimeter-1',
    name: 'Digital Multimeter (DT830B)',
    description: 'Compact digital multimeter for measuring voltage, current, and resistance. Essential for troubleshooting.',
    price: 24.99,
    currency: 'USD',
    category: 'Tools',
    rating: 4.7,
    reviews: 428,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Testing', 'Measurement', 'Essential']
  },
  {
    id: 'arduino-uno-1',
    name: 'Arduino UNO R3 Compatible Board',
    description: 'Beginner-friendly microcontroller board. Perfect for learning programming and electronics.',
    price: 22.99,
    currency: 'USD',
    category: 'Microcontrollers',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Programming', 'Microcontroller', 'Learning']
  },
  {
    id: 'esp32-1',
    name: 'ESP32 Development Board',
    description: 'Powerful microcontroller with WiFi and Bluetooth. Perfect for IoT projects.',
    price: 15.99,
    currency: 'USD',
    category: 'Microcontrollers',
    rating: 4.9,
    reviews: 634,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'intermediate',
    tags: ['WiFi', 'IoT', 'Advanced']
  },
  {
    id: 'capacitor-kit-1',
    name: 'Capacitor Assortment Kit (120 Pieces)',
    description: 'Various capacitor values including electrolytic and ceramic. Essential for circuit design.',
    price: 8.99,
    currency: 'USD',
    category: 'Hardware',
    rating: 4.5,
    reviews: 98,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'intermediate',
    tags: ['Energy Storage', 'Filtering', 'Advanced']
  },
  {
    id: 'sensor-kit-1',
    name: 'Sensor Starter Kit (10 Sensors)',
    description: 'Includes temperature, light, distance, and motion sensors. Perfect for learning sensor integration.',
    price: 34.99,
    currency: 'USD',
    category: 'Sensors',
    rating: 4.7,
    reviews: 245,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'intermediate',
    tags: ['Sensors', 'IoT', 'Learning']
  },
  {
    id: 'motor-driver-1',
    name: 'L298N Motor Driver Module',
    description: 'Dual motor driver for controlling DC motors. Perfect for robotics projects.',
    price: 5.99,
    currency: 'USD',
    category: 'Modules',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'intermediate',
    tags: ['Motors', 'Robotics', 'Control']
  },
  {
    id: 'servo-motor-1',
    name: 'Servo Motor SG90 (180°)',
    description: 'Micro servo motor for precise angle control. Great for robotics and automation.',
    price: 3.99,
    currency: 'USD',
    category: 'Motors',
    rating: 4.8,
    reviews: 312,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'intermediate',
    tags: ['Servo', 'Robotics', 'Control']
  },
  {
    id: 'usb-cable-1',
    name: 'USB Cable Set (Type A, Micro, Mini)',
    description: 'Essential USB cables for connecting Arduino and ESP32 to your computer.',
    price: 9.99,
    currency: 'USD',
    category: 'Accessories',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    vendor: 'Digilog',
    vendorUrl: 'https://digilog.pk/',
    difficulty: 'beginner',
    tags: ['Connectivity', 'Essential', 'Accessories']
  }
];

export default function Marketplace() {
  const [cartItems, setCartItems] = useState<MarketplaceProduct[]>([]);

  const handleAddToCart = (product: MarketplaceProduct) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/courses">
            <a className="text-cyan-400 hover:text-cyan-300 transition inline-flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <MarketplaceComponent
          products={MARKETPLACE_PRODUCTS}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
