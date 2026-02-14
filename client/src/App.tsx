import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseLanding from "./pages/CourseLanding";
import CourseModules from "./pages/CourseModules";
import ModuleDetail from "./pages/ModuleDetail";
import Marketplace from "./pages/Marketplace";
import AdminDashboard from "./pages/AdminDashboard";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/courses"} component={Courses} />
      <Route path={"/marketplace"} component={Marketplace} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/course/:slug"} component={CourseLanding} />
      <Route path={"/course/:slug/modules"} component={CourseModules} />
      <Route path={"/course/:slug/module/:moduleId"} component={ModuleDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - Dark theme selected for this learning platform (slate-900 background)
// - Color palette in index.css is configured for dark mode
// - Theme is not switchable to maintain consistent dark aesthetic

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
