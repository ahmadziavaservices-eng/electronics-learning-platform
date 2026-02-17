import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { courses, courseCategories } from '@/lib/courses';

export default function Courses() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const selectedCategory = params.get('category');
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredCourses = courses.filter(course => {
    if (selectedCategory) {
      const category = courseCategories.find(cat => cat.id === selectedCategory);
      if (category && course.category !== category.name) return false;
    }
    if (selectedDifficulty && course.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <a className="text-blue-400 hover:text-blue-300 transition mb-4 inline-flex items-center gap-2 leading-tight">
              ← Back to Home
            </a>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">All Courses</h1>
          <p className="text-slate-300 leading-relaxed">Choose from our comprehensive collection of electronics and IoT courses</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Filters */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 sticky top-24">
              <h3 className="text-lg font-bold mb-4 leading-tight">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-slate-300 mb-3 leading-tight">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => window.location.href = '/courses'}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      !selectedCategory
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    All Categories
                  </button>
                  {courseCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => window.location.href = `/courses?category=${category.id}`}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-3 leading-tight">Difficulty</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedDifficulty(null)}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      !selectedDifficulty
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    All Levels
                  </button>
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === level ? null : level)}
                      className={`block w-full text-left px-3 py-2 rounded transition capitalize ${
                        selectedDifficulty === level
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Course Cards */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No courses found matching your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredCourses.map(course => (
                  <Link key={course.id} href={`/course/${course.slug}`}>
                    <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                              </Badge>
                              <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                                {course.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-2xl">{course.title}</CardTitle>
                            <CardDescription className="text-slate-300 text-base">{course.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 flex-shrink-0 ml-4">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-slate-400 mb-3 font-semibold">Learning Outcomes:</p>
                            <ul className="space-y-2 leading-relaxed">
                              {course.learningOutcomes.slice(0, 4).map((outcome, idx) => (
                                <li key={idx} className="text-sm text-slate-300 flex gap-2">
                                  <span className="text-blue-400 flex-shrink-0">✓</span>
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400 mb-3 font-semibold">What You'll Need:</p>
                            <div className="flex flex-wrap gap-2 leading-relaxed">
                              {course.tools.slice(0, 4).map((tool, idx) => (
                                <Badge key={idx} variant="outline" className="bg-slate-700 text-slate-300 border-slate-600 text-sm">
                                  {tool.name}
                                </Badge>
                              ))}
                              {course.tools.length > 4 && (
                                <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600 text-sm">
                                  +{course.tools.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-blue-400 font-semibold group">
                          View Course <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
