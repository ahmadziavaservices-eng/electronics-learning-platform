import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Package, ExternalLink, AlertCircle, DollarSign, Link as LinkIcon } from 'lucide-react';
import { componentDatabase, getComponentCategories, searchComponents } from '@/lib/componentDatabase';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ComponentDatabaseViewer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  const categories = useMemo(() => getComponentCategories(), []);

  const filteredComponents = useMemo(() => {
    let results = componentDatabase;

    if (searchQuery) {
      results = searchComponents(searchQuery);
    }

    if (selectedCategory) {
      results = results.filter(comp => comp.category === selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
            <Package className="w-10 h-10 text-blue-400" />
            Component Database
          </h1>
          <p className="text-slate-300 text-lg">Professional-grade components with sourcing links and detailed specifications</p>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search components by name, category, or application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              All Components
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-slate-400">
            Showing {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid gap-4">
            {filteredComponents.map(component => (
              <Card
                key={component.id}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                onClick={() => setExpandedComponent(expandedComponent === component.id ? null : component.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-blue-300">{component.name}</CardTitle>
                      <CardDescription className="text-slate-400">{component.description}</CardDescription>
                    </div>
                    <Badge className="bg-blue-900 text-blue-200 border-blue-700">{component.category}</Badge>
                  </div>
                </CardHeader>

                {/* Expanded Content */}
                {expandedComponent === component.id && (
                  <CardContent className="space-y-6 border-t border-slate-700 pt-6">
                    {/* Specifications */}
                    <div>
                      <h3 className="font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Specifications
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {component.specifications.map((spec, idx) => (
                          <div key={idx} className="bg-slate-700/30 rounded p-3">
                            <div className="text-xs text-slate-400 uppercase tracking-wide">{spec.key}</div>
                            <div className="text-sm font-semibold text-slate-200 mt-1">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div>
                      <h3 className="font-bold text-slate-200 mb-3">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {component.applications.map((app, idx) => (
                          <Badge key={idx} className="bg-green-900/50 text-green-300 border-green-700">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sourcing */}
                    <div>
                      <h3 className="font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Sourcing & Pricing
                      </h3>
                      <div className="space-y-2">
                        {component.sourcing.map((source, idx) => (
                          <div key={idx} className="bg-slate-700/30 rounded p-3 flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold text-slate-200">{source.vendor}</div>
                              <div className="text-sm text-slate-400">Estimated: {source.estimatedPrice}</div>
                            </div>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              View
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alternatives */}
                    {component.alternatives.length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-200 mb-3">Alternative Components</h3>
                        <div className="flex flex-wrap gap-2">
                          {component.alternatives.map((alt, idx) => (
                            <Badge key={idx} className="bg-purple-900/50 text-purple-300 border-purple-700">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    <div>
                      <h3 className="font-bold text-slate-200 mb-3">Pro Tips</h3>
                      <ul className="space-y-2">
                        {component.tips.map((tip, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-300">
                            <span className="text-green-400 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Safety Warnings */}
                    {component.safetyWarnings.length > 0 && (
                      <Alert className="bg-red-900/30 border-red-700">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-200">
                          <strong>Safety Warnings:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            {component.safetyWarnings.map((warning, idx) => (
                              <li key={idx}>{warning}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Datasheet Link */}
                    {component.datasheet && (
                      <a
                        href={component.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkIcon className="w-4 h-4" />
                        View Datasheet
                      </a>
                    )}
                  </CardContent>
                )}

                {/* Collapsed Preview */}
                {expandedComponent !== component.id && (
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-2">
                        {component.applications.slice(0, 2).map((app, idx) => (
                          <Badge key={idx} className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                            {app}
                          </Badge>
                        ))}
                        {component.applications.length > 2 && (
                          <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                            +{component.applications.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <span className="text-slate-400">Click to expand</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-300 text-lg">No components found matching your search.</p>
              <p className="text-slate-400 text-sm mt-2">Try adjusting your search terms or category filter.</p>
            </CardContent>
          </Card>
        )}

        {/* Component Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-400">{componentDatabase.length}</div>
              <div className="text-sm text-slate-400 mt-2">Total Components</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-400">{categories.length}</div>
              <div className="text-sm text-slate-400 mt-2">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-400">{componentDatabase.reduce((sum, c) => sum + c.applications.length, 0)}</div>
              <div className="text-sm text-slate-400 mt-2">Applications</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-cyan-400">{componentDatabase.reduce((sum, c) => sum + c.sourcing.length, 0)}</div>
              <div className="text-sm text-slate-400 mt-2">Sourcing Links</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
