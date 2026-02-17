import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorCorrectionMode = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'grayscale' | 'high-contrast';
export type ThemeMode = 'dark' | 'light' | 'high-contrast';

interface AccessibilitySettings {
  colorCorrectionMode: ColorCorrectionMode;
  theme: ThemeMode;
  fontSize: number; // 100 = normal, 120 = 20% larger, etc.
  lineSpacing: number; // 1.5 = normal, 2 = double spacing
  letterSpacing: number; // 0 = normal, 1 = increased
  reduceMotion: boolean;
  enhancedFocus: boolean;
  screenReaderMode: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  colorCorrectionMode: 'normal',
  theme: 'dark',
  fontSize: 100,
  lineSpacing: 1.5,
  letterSpacing: 0,
  reduceMotion: false,
  enhancedFocus: false,
  screenReaderMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load accessibility settings:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('a11y-settings', JSON.stringify(settings));
      applySettings(settings);
    }
  }, [settings, isLoaded]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

// Apply accessibility settings to the document
function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;

  // Apply color correction filter
  const filterMap: Record<ColorCorrectionMode, string> = {
    normal: 'none',
    deuteranopia: 'url(#deuteranopia-filter)',
    protanopia: 'url(#protanopia-filter)',
    tritanopia: 'url(#tritanopia-filter)',
    grayscale: 'grayscale(100%)',
    'high-contrast': 'contrast(1.5) brightness(1.1)',
  };
  root.style.filter = filterMap[settings.colorCorrectionMode];

  // Apply theme
  root.classList.remove('light', 'dark', 'high-contrast');
  root.classList.add(settings.theme);

  // Apply font size
  root.style.fontSize = `${settings.fontSize}%`;

  // Apply line spacing
  root.style.lineHeight = `${settings.lineSpacing}`;

  // Apply letter spacing
  root.style.letterSpacing = settings.letterSpacing > 0 ? `${settings.letterSpacing}px` : 'normal';

  // Apply reduce motion
  if (settings.reduceMotion) {
    root.style.setProperty('--animation-duration', '0.01ms');
    root.classList.add('reduce-motion');
  } else {
    root.style.removeProperty('--animation-duration');
    root.classList.remove('reduce-motion');
  }

  // Apply enhanced focus
  if (settings.enhancedFocus) {
    root.classList.add('enhanced-focus');
  } else {
    root.classList.remove('enhanced-focus');
  }

  // Apply screen reader mode
  if (settings.screenReaderMode) {
    root.classList.add('screen-reader-mode');
  } else {
    root.classList.remove('screen-reader-mode');
  }
}
