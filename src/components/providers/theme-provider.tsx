import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export interface ColorScheme {
   primary: string;
   secondary: string;
   tertiary: string;
   textDark: string;
   textLight: string;
   textGray: string;
   primaryBg: string;
   secondaryBg: string;
   tertiaryBg: string;
   muted: string;
   border: string
}

const lightColors: ColorScheme = {
   primary: "#155dfc",
   secondary: "#8ec5ff",
   tertiary: "#27272a",
   textDark: "#18181b",
   textLight: "#fff",
   textGray: "#4a5565",
   primaryBg: "#fff",
   secondaryBg: "#f3f4f6",
   tertiaryBg: "#dbeafe",
   muted: '#99a1af',
   border: '#e2e8f0'
};

const darkColors: ColorScheme = {
   primary: "#60a5fa",
   secondary: "#93c5fd",
   tertiary: "#1e293b",
   textDark: "#f1f5f9",
   textLight: "#e2e8f0",
   textGray: "#94a3b8",
   primaryBg: "#0f172a",
   secondaryBg: "#1e293b",
   tertiaryBg: "#1c398e",
   muted: '#364153',
   border: '#e2e8f0'
};

interface ThemeContextType {
   isDarkMode: boolean;
   toggleDarkMode: () => void;
   colors: ColorScheme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

   // Get the user choice
   useEffect(() => {
      AsyncStorage.getItem("darkMode").then((value) => {
         if (value) setIsDarkMode(JSON.parse(value))
      });
   }, []);

   // Toggle mode
   const toggleDarkMode = async () => {
      const newMode = !isDarkMode;

      setIsDarkMode(newMode);

      await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
   };

   const colors = isDarkMode ? darkColors : lightColors;

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
         {children}
      </ThemeContext.Provider>
   )
}