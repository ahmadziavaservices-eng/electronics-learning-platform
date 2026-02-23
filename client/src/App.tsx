import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import NewHome from "./pages/NewHome";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import CourseLanding from "./pages/CourseLanding";
import CourseModules from "./pages/CourseModules";
import ModuleDetail from "./pages/ModuleDetail";
import Marketplace from "./pages/Marketplace";
import AdminDashboard from "./pages/AdminDashboard";
import Calculators from "./pages/Calculators";


function Router() {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white"
      >
        Skip to main content
      </a>
      <main id="main-content" role="main">
        <Switch>
          <Route path="/" component={NewHome} />
          <Route path="/courses" component={Courses} />
        <Route path="/blog" component={Blog} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/calculators" component={Calculators} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/course/:slug" component={CourseLanding} />
          <Route path="/course/:slug/modules" component={CourseModules} />
          <Route path="/course/:slug/module/:moduleId" component={ModuleDetail} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

// NOTE: About Theme
// - Dark theme selected for this learning platform (slate-900 background)
// - Color palette in index.css is configured for dark mode
// - Theme is not switchable to maintain consistent dark aesthetic

function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <ThemeProvider
          defaultTheme="light"
        >
          <TooltipProvider>
            <Toaster />
            <AccessibilityPanel />
            <div role="application" aria-label="Electronics Learning Platform">
              <Router />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;
