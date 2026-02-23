import { useRoute } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, Target, Wrench, BookOpen, ChevronRight } from 'lucide-react';
import { getCourseBySlug } from '@/lib/courses';

export default function CourseLanding() {
  const [match, params] = useRoute('/course/:slug');
  const course = params?.slug ? getCourseBySlug(params.slug) : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-slate-400 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

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
      {/* Header Navigation */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/courses">
            <a className="text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-2">
              ← Back to Courses
            </a>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
              {course.category}
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">{course.longDescription}</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-700">
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-2 leading-tight">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Duration</span>
              </div>
              <p className="text-2xl font-bold leading-tight">{course.duration}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2 leading-tight">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Modules</span>
              </div>
              <p className="text-2xl font-bold leading-tight">{course.modules.length}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-2 leading-tight">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Projects</span>
              </div>
              <p className="text-2xl font-bold leading-tight">{Math.ceil(course.modules.length / 2)}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/course/${course.slug}/modules`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                Start Learning <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {course.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-blue-400 text-2xl font-bold flex-shrink-0">✓</div>
              <p className="text-slate-300">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Requirements */}
      <section className="container mx-auto px-4 py-16 bg-slate-800/50 -mx-4 px-4 my-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Wrench className="w-8 h-8 text-yellow-400" />
            Tools & Requirements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hardware */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-400">Hardware</h3>
              <div className="space-y-4">
                {course.tools.filter(t => t.category === 'Hardware').map((tool, idx) => (
                  <Card key={idx} className="bg-slate-700 border-slate-600">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                          <CardDescription className="text-slate-300">{tool.description}</CardDescription>
                        </div>
                        {tool.estimatedCost && (
                          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/50 flex-shrink-0">
                            {tool.estimatedCost}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Software & Infrastructure */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-cyan-400">Software & Infrastructure</h3>
              <div className="space-y-4">
                {course.tools.filter(t => t.category !== 'Hardware').map((tool, idx) => (
                  <Card key={idx} className="bg-slate-700 border-slate-600">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                          <CardDescription className="text-slate-300">{tool.description}</CardDescription>
                        </div>
                        {tool.optional && (
                          <Badge variant="outline" className="bg-slate-600 text-slate-300 border-slate-500 flex-shrink-0">
                            Optional
                          </Badge>
                        )}
                      </div>
                      {tool.link && (
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:text-blue-300 transition mt-2 inline-flex items-center gap-1">
                          Get Started <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-slate-300">
              <strong className="text-blue-400">💡 Tip:</strong> You don't need to buy everything at once. Start with the essentials (breadboard, basic components, multimeter) and add more as you progress through the course.
            </p>
          </div>
        </div>
      </section>

      {/* Course Syllabus */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Course Syllabus</h2>
        
        <div className="space-y-4">
          {course.modules.map((module, idx) => (
            <Link key={module.id} href={`/course/${course.slug}/module/${module.id}`}>
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                          Module {idx + 1}
                        </Badge>
                        <Badge variant="outline" className={`${
                          module.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                          module.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' :
                          'bg-red-500/20 text-red-300 border-red-500/50'
                        }`}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-slate-300">{module.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 ml-4 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{module.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-blue-400 text-sm">
                    View Module <ChevronRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Prerequisites Section */}
      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-slate-800/50 -mx-4 px-4 my-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Prerequisites</h2>
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
              <ul className="space-y-3">
                {course.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-300">
                    <span className="text-blue-400 font-bold">•</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">Begin your learning journey with {course.modules.length} comprehensive modules</p>
          <Link href={`/course/${course.slug}/modules`}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold gap-2">
              Start Course <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
