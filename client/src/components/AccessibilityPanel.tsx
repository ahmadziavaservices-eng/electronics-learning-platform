import React, { useState } from 'react';
import { useAccessibility, type ColorCorrectionMode, type ThemeMode } from '@/contexts/AccessibilityContext';
import { X, ChevronLeft, Eye, Palette, Type, Settings } from 'lucide-react';

export function AccessibilityPanel() {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'color' | 'theme' | 'text' | 'other'>('color');

  const colorModes: { value: ColorCorrectionMode; label: string; description: string }[] = [
    { value: 'normal', label: 'Normal', description: 'Standard colors' },
    { value: 'deuteranopia', label: 'Red-Green (Type 1)', description: 'For deuteranopia' },
    { value: 'protanopia', label: 'Red-Green (Type 2)', description: 'For protanopia' },
    { value: 'tritanopia', label: 'Blue-Yellow', description: 'For tritanopia' },
    { value: 'grayscale', label: 'Grayscale', description: 'Black & white only' },
    { value: 'high-contrast', label: 'High Contrast', description: 'Maximum contrast' },
  ];

  const themes: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'high-contrast', label: 'High Contrast', icon: '⚡' },
  ];

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Eye className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      <div
        className={`fixed left-0 top-0 h-screen w-80 bg-slate-900 border-r border-slate-700 shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-label="Accessibility Settings"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Accessibility
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300"
            aria-label="Close accessibility panel"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-800 sticky top-16">
          {[
            { id: 'color', label: 'Color', icon: Palette },
            { id: 'theme', label: 'Theme', icon: Eye },
            { id: 'text', label: 'Text', icon: Type },
            { id: 'other', label: 'Other', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Color Correction Tab */}
          {activeTab === 'color' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Color Correction</h3>
              {colorModes.map(mode => (
                <button
                  key={mode.value}
                  onClick={() => updateSettings({ colorCorrectionMode: mode.value })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                    settings.colorCorrectionMode === mode.value
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-slate-200">{mode.label}</div>
                  <div className="text-xs text-slate-400">{mode.description}</div>
                </button>
              ))}
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => updateSettings({ theme: theme.value })}
                    className={`p-3 rounded-lg border-2 transition-all text-center focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                      settings.theme === theme.value
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{theme.icon}</div>
                    <div className="text-xs font-medium text-slate-300">{theme.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Text Settings</h3>

              {/* Font Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Font Size</label>
                  <span className="text-sm font-medium text-cyan-400">{settings.fontSize}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={settings.fontSize}
                  onChange={e => updateSettings({ fontSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  aria-label="Font size adjustment"
                />
              </div>

              {/* Line Spacing */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Line Spacing</label>
                  <span className="text-sm font-medium text-cyan-400">{settings.lineSpacing.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={settings.lineSpacing}
                  onChange={e => updateSettings({ lineSpacing: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  aria-label="Line spacing adjustment"
                />
              </div>

              {/* Letter Spacing */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Letter Spacing</label>
                  <span className="text-sm font-medium text-cyan-400">{settings.letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={settings.letterSpacing}
                  onChange={e => updateSettings({ letterSpacing: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  aria-label="Letter spacing adjustment"
                />
              </div>
            </div>
          )}

          {/* Other Tab */}
          {activeTab === 'other' && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Other Settings</h3>

              {/* Reduce Motion */}
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={e => updateSettings({ reduceMotion: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  aria-label="Reduce motion"
                />
                <span className="text-sm text-slate-300">Reduce Motion</span>
              </label>

              {/* Enhanced Focus */}
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.enhancedFocus}
                  onChange={e => updateSettings({ enhancedFocus: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  aria-label="Enhanced focus indicators"
                />
                <span className="text-sm text-slate-300">Enhanced Focus</span>
              </label>

              {/* Screen Reader Mode */}
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.screenReaderMode}
                  onChange={e => updateSettings({ screenReaderMode: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  aria-label="Screen reader mode"
                />
                <span className="text-sm text-slate-300">Screen Reader Mode</span>
              </label>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full mt-6 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300"
            aria-label="Reset accessibility settings to default"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SVG Filters for Color Correction */}
      <svg style={{ display: 'none' }}>
        <defs>
          {/* Deuteranopia Filter (Red-Green Colorblind Type 1) */}
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0     0 0
                      0.7   0.3   0     0 0
                      0     0.3   0.7   0 0
                      0     0     0     1 0"
            />
          </filter>

          {/* Protanopia Filter (Red-Green Colorblind Type 2) */}
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0     0 0
                      0.558 0.442 0     0 0
                      0     0.242 0.758 0 0
                      0     0     0     1 0"
            />
          </filter>

          {/* Tritanopia Filter (Blue-Yellow Colorblind) */}
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95  0.05  0     0 0
                      0     0.433 0.567 0 0
                      0     0.475 0.525 0 0
                      0     0     0     1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
