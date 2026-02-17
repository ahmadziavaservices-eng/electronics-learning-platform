import { useRoute } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { getCourseBySlug } from '@/lib/courses';

export default function CourseModules() {
  const [match, params] = useRoute('/course/:slug/modules');
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
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/course/${course.slug}`}>
            <a className="text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Course Overview
            </a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
          <p className="text-xl text-slate-300 mb-6 leading-relaxed">{course.longDescription}</p>
          <div className="flex items-center gap-4 leading-tight">
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
            <span className="text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="text-slate-400">
              {course.modules.length} modules
            </span>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-6">
          {course.modules.map((module, idx) => (
            <Link key={module.id} href={`/course/${course.slug}/module/${module.id}`}>
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg font-bold text-sm">
                          {idx + 1}
                        </div>
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl group-hover:text-blue-400 transition leading-tight">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-base leading-relaxed">
                        {module.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm whitespace-nowrap">{module.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {module.practiceProblems && module.practiceProblems.length > 0 && (
                      <div className="text-sm text-slate-400">
                        {module.practiceProblems.length} practice problems
                      </div>
                    )}
                    {module.codeExamples && module.codeExamples.length > 0 && (
                      <div className="text-sm text-slate-400">
                        {module.codeExamples.length} code examples
                      </div>
                    )}
                    {module.references && module.references.length > 0 && (
                      <div className="text-sm text-slate-400">
                        {module.references.length} references
                      </div>
                    )}
                    <div className="ml-auto text-blue-400 group-hover:translate-x-1 transition">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Start Button */}
        <div className="mt-12 text-center">
          <Link href={`/course/${course.slug}/module/${course.modules[0].id}`}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              Start Learning <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
