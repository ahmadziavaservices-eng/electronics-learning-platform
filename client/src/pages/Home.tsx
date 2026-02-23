import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Zap, Wifi, Users, Award, Clock } from 'lucide-react';
import { courses, courseCategories } from '@/lib/courses';
import SocialMediaLinks from '@/components/SocialMediaLinks';

export default function Home() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">ElectroLearn</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#courses" className="text-slate-300 hover:text-white transition">Courses</a>
            <a href="/calculators" className="text-slate-300 hover:text-white transition">Calculators</a>
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#tools" className="text-slate-300 hover:text-white transition">Tools</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/50">Welcome to ElectroLearn</Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent leading-tight">
            Master Electronics & IoT
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            From fundamental circuits to advanced IoT applications. Learn at your own pace with comprehensive, hands-on courses designed for beginners and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 py-12 border-y border-slate-700">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 leading-tight">3</div>
              <p className="text-slate-400 mt-2 leading-relaxed">Comprehensive Courses</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 leading-tight">15+</div>
              <p className="text-slate-400 mt-2 leading-relaxed">Learning Modules</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 leading-tight">100%</div>
              <p className="text-slate-400 mt-2 leading-relaxed">Free & Open</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 leading-tight">Why Choose ElectroLearn?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Structured Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">Carefully designed curriculum that builds from fundamentals to advanced topics, ensuring you understand each concept before moving forward.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Hands-On Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">Learn by doing. Each course includes practical projects and exercises using real hardware and components.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-green-500 transition">
            <CardHeader>
              <Wifi className="w-12 h-12 text-green-400 mb-4" />
              <CardTitle className="text-white">IoT Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">Progress from basic electronics to connected IoT devices. Build real-world applications with WiFi and Bluetooth.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="container mx-auto px-4 py-20 bg-slate-800/50 -mx-4 px-4 my-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 leading-tight">Featured Courses</h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
            Choose your learning path and start mastering electronics today
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <Link key={course.id} href={`/course/${course.slug}`}>
                <Card className="bg-slate-700 border-slate-600 hover:border-blue-500 transition cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                        {course.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    <CardTitle className="text-white text-xl leading-tight">{course.title}</CardTitle>
                    <CardDescription className="text-slate-300 leading-relaxed">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-400 mb-2 leading-tight">Learning Outcomes:</p>
                        <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                          {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-400">✓</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        View Course <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                View All Courses <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 leading-tight">Learning Paths</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {courseCategories.map((category) => {
            const categoryColor = category.color;
            return (
              <Link key={category.id} href={`/courses?category=${category.id}`}>
                <div className={`bg-gradient-to-br ${categoryColor} p-8 rounded-lg cursor-pointer hover:shadow-lg transition transform hover:scale-105`}>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{category.name}</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">{category.description}</p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    Explore <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tools & Requirements Section */}
      <section id="tools" className="container mx-auto px-4 py-20 bg-slate-800/50 -mx-4 px-4 my-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 leading-tight">What You'll Need</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 leading-tight">
                <Zap className="w-6 h-6 text-yellow-400" />
                Hardware
              </h3>
              <ul className="space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold leading-tight">Breadboard</p>
                    <p className="text-sm text-slate-400 leading-relaxed">For prototyping circuits without soldering</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Microcontroller Boards</p>
                    <p className="text-sm text-slate-400">Arduino UNO, ESP32, or similar</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Components Kit</p>
                    <p className="text-sm text-slate-400">Resistors, LEDs, capacitors, sensors</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Multimeter</p>
                    <p className="text-sm text-slate-400">For measuring voltage, current, resistance</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                Software
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Arduino IDE</p>
                    <p className="text-sm text-slate-400">Free development environment (arduino.cc)</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">PlatformIO</p>
                    <p className="text-sm text-slate-400">Advanced IDE for professional development</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Web Browser</p>
                    <p className="text-sm text-slate-400">For accessing course materials</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <div>
                    <p className="font-semibold">Text Editor</p>
                    <p className="text-sm text-slate-400">VS Code recommended (free)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className="bg-slate-800/50 border-y border-slate-700 py-12">
        <SocialMediaLinks />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners building amazing electronics and IoT projects. Start with the basics and progress at your own pace.
          </p>
          <Link href="/courses">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold gap-2">
              Explore All Courses <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg">ElectroLearn</span>
              </div>
              <p className="text-slate-400 text-sm">Learn electronics and IoT at your own pace.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Electronics 101</a></li>
                <li><a href="#" className="hover:text-white transition">Arduino Basics</a></li>
                <li><a href="#" className="hover:text-white transition">ESP32 IoT</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 ElectroLearn. All rights reserved. | Empowering the next generation of makers and engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
