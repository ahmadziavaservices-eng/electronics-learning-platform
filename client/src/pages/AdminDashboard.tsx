import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    content: ''
  });

  const handleAddNew = () => {
    setEditingItem('new');
    setFormData({ title: '', description: '', difficulty: 'beginner', content: '' });
  };

  const handleSave = () => {
    console.log('Saving:', formData);
    setEditingItem(null);
    // In a real app, this would send data to a backend
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/courses">
                <a className="text-cyan-400 hover:text-cyan-300 transition inline-flex items-center gap-2 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Courses
                </a>
              </Link>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Admin Dashboard
              </h1>
            </div>
            <Badge className="bg-purple-600 text-white">Admin Mode</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
            <TabsTrigger value="courses" className="data-[state=active]:bg-cyan-600">
              Courses
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="data-[state=active]:bg-purple-600">
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-green-600">
              Marketplace
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-400">Manage Courses</h2>
              <Button
                onClick={handleAddNew}
                className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Course Cards */}
              <Card className="bg-slate-800 border-cyan-500/30 hover:border-cyan-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Electronics 101</CardTitle>
                      <CardDescription className="text-slate-400">
                        Beginner • 4 modules
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-cyan-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Learn the fundamentals of electricity, voltage, current, and resistance.
                  </p>
                  <Badge className="bg-slate-700 text-cyan-300">4 Modules</Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-cyan-500/30 hover:border-cyan-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Arduino Basics</CardTitle>
                      <CardDescription className="text-slate-400">
                        Intermediate • 5 modules
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-cyan-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Learn to program Arduino boards and build interactive projects.
                  </p>
                  <Badge className="bg-slate-700 text-purple-300">5 Modules</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-400">Manage Quizzes</h2>
              <Button
                onClick={handleAddNew}
                className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Quiz
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-800 border-purple-500/30 hover:border-purple-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Voltage Basics Quiz</CardTitle>
                      <CardDescription className="text-slate-400">
                        5 questions • Beginner
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-purple-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Test your understanding of voltage and electrical potential.
                  </p>
                  <Badge className="bg-slate-700 text-green-300">Active</Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-purple-500/30 hover:border-purple-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Ohm's Law Quiz</CardTitle>
                      <CardDescription className="text-slate-400">
                        8 questions • Intermediate
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-purple-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Master the relationship between voltage, current, and resistance.
                  </p>
                  <Badge className="bg-slate-700 text-green-300">Active</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-400">Manage Marketplace</h2>
              <Button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-800 border-green-500/30 hover:border-green-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Breadboard (830 Points)</CardTitle>
                      <CardDescription className="text-slate-400">
                        $8.99 • In Stock
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-green-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Solderless breadboard for circuit prototyping.
                  </p>
                  <Badge className="bg-slate-700 text-green-300">Available</Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-green-500/30 hover:border-green-500/50 transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Jumper Wire Set</CardTitle>
                      <CardDescription className="text-slate-400">
                        $5.99 • In Stock
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit2 className="w-4 h-4 text-green-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 mb-4">
                    Pre-cut and pre-stripped jumper wires in multiple colors.
                  </p>
                  <Badge className="bg-slate-700 text-green-300">Available</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Form Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl bg-slate-900 border-cyan-500/50">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingItem === 'new' ? 'Add New Item' : 'Edit Item'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    onClick={handleCancel}
                    className="bg-slate-700 hover:bg-slate-600 text-white gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
