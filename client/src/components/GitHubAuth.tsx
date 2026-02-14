import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';

interface GitHubAuthProps {
  onAuthSuccess: (user: GitHubUser) => void;
  requiredUsername?: string;
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export function GitHubAuth({ onAuthSuccess, requiredUsername }: GitHubAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('github_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        onAuthSuccess(userData);
      } catch (err) {
        localStorage.removeItem('github_user');
      }
    }
  }, [onAuthSuccess]);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would use OAuth flow
      // For now, we'll use a simpler approach with GitHub's public API
      
      // Get GitHub username from user input
      const username = prompt('Enter your GitHub username:');
      
      if (!username) {
        setIsLoading(false);
        return;
      }

      // Fetch user data from GitHub API
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error('GitHub user not found');
      }

      const userData: GitHubUser = await response.json();

      // Check if this is the required user (if specified)
      if (requiredUsername && userData.login !== requiredUsername) {
        throw new Error(`Only ${requiredUsername} can access this page`);
      }

      // Store user in localStorage
      localStorage.setItem('github_user', JSON.stringify(userData));
      setUser(userData);
      onAuthSuccess(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_user');
    setUser(null);
    setError(null);
  };

  if (user) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="bg-slate-900 border-cyan-500/50 w-64">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={user.avatar_url} 
                alt={user.login}
                className="w-10 h-10 rounded-full border border-cyan-400"
              />
              <div>
                <p className="text-sm font-semibold text-white">{user.name || user.login}</p>
                <p className="text-xs text-slate-400">@{user.login}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-cyan-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Admin Access Required
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign in with your GitHub account to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <Button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white gap-2 py-6"
          >
            <Github className="w-5 h-5" />
            {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
          </Button>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              This page is protected. Only authorized GitHub users can access the admin panel.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProtectedAdminPage({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('github_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('github_user');
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <GitHubAuth onAuthSuccess={setUser} />;
  }

  return <>{children}</>;
}
