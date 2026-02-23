import { useRoute } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, BookOpen, Code, FileText, ExternalLink, Clock, Video, Zap } from 'lucide-react';
import { getCourseBySlug, getModuleById } from '@/lib/courses';
import { VideoTutorials } from '@/components/VideoTutorials';
import { PracticeProblems } from '@/components/PracticeProblems';

export default function ModuleDetail() {
  const [match, params] = useRoute('/course/:slug/module/:moduleId');
  
  if (!params?.slug || !params?.moduleId) {
    return <div>Loading...</div>;
  }

  const course = getCourseBySlug(params.slug);
  const module = getModuleById(params.slug, params.moduleId);

  if (!course || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Module Not Found</h1>
          <p className="text-slate-400 mb-8">The module you're looking for doesn't exist.</p>
          <Link href={`/course/${params.slug}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  const moduleIndex = course.modules.findIndex(m => m.id === module.id);
  const previousModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;

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
              Back to {course.title}
            </a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Module Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.duration}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">{module.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed">{module.description}</p>
            </div>

            {/* Module Content */}
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="leading-relaxed">
                <div 
                  className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: module.content }}
                />
              </CardContent>
            </Card>

            {/* Code Examples */}
            {module.codeExamples && module.codeExamples.length > 0 && (
              <Card className="bg-slate-800 border-slate-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {module.codeExamples.map((example, idx) => (
                      <div key={idx} className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                        <pre className="text-sm text-green-400 font-mono">
                          <code>{example}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Practice Problems */}
            {module.practiceProblems && module.practiceProblems.length > 0 && (
              <Card className="bg-slate-800 border-slate-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white">Practice Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {module.practiceProblems.map((problem, idx) => (
                      <div key={idx} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                        <p className="font-semibold text-blue-400 mb-2 leading-tight">Problem {idx + 1}</p>
                        <p className="text-slate-300 leading-relaxed">{problem}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video Tutorials */}
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Video tutorials for this module coming soon. Check back soon!</p>
              </CardContent>
            </Card>

            {/* Practice Problems */}
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Practice Problems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Interactive practice problems coming soon. Check back soon!</p>
              </CardContent>
            </Card>

            {/* References */}
            {module.references && module.references.length > 0 && (
              <Card className="bg-slate-800 border-slate-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    References & Further Reading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition border border-slate-600"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-white hover:text-blue-400 transition flex items-center gap-2">
                            {ref.title}
                            <ExternalLink className="w-4 h-4" />
                          </p>
                          <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-600 text-sm mt-1">
                            {ref.type}
                          </Badge>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-12">
              {previousModule ? (
                <Link href={`/course/${course.slug}/module/${previousModule.id}`}>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Previous Module
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextModule ? (
                <Link href={`/course/${course.slug}/module/${nextModule.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 ml-auto">
                    Next Module
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/course/${course.slug}`}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 ml-auto">
                    Course Complete
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Info */}
            <Card className="bg-slate-800 border-slate-700 mb-6 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">
                    Module {moduleIndex + 1} of {course.modules.length}
                  </p>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${((moduleIndex + 1) / course.modules.length) * 100}%` }}
                    />
                  </div>
                </div>
                <Link href={`/course/${course.slug}`}>
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                    View Syllabus
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Module List */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {course.modules.map((m, idx) => (
                    <Link key={m.id} href={`/course/${course.slug}/module/${m.id}`}>
                      <a
                        className={`block p-3 rounded-lg transition ${
                          m.id === module.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <p className="text-sm font-semibold">Module {idx + 1}</p>
                        <p className="text-sm opacity-75 line-clamp-2">{m.title}</p>
                      </a>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
