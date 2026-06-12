import React, { createContext, useContext, useState } from 'react';
import { PaletteMode } from '@mui/material';

interface SettingsContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem('themeMode') as PaletteMode) || 'light'
  );
  const [language, setLanguageState] = useState(localStorage.getItem('language') || 'en');

  const toggleColorMode = () => {
    setMode((prev) => {
      const nm = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', nm);
      return nm;
    });
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <SettingsContext.Provider value={{ mode, toggleColorMode, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
