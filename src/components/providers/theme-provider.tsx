import { hexToRgb } from '@/utils/hext-to-rgb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vars } from 'nativewind';
import { createContext, useEffect, useState } from 'react';
import { View } from 'react-native';

export interface ColorScheme {
   brand: {
      primary: string;
      secondary: string;
   };
   surface: {
      primary: string;
      secondary: string;
      tertiary: string;
      muted: string;
   };
   text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
   };
   border: {
      primary: string;
      secondary: string;
   };
}

const lightColors: ColorScheme = {
   brand: {
      primary: "#155dfc",
      secondary: "#8ec5ff"
   },
   surface: {
      primary: "#ffffff",
      secondary: "#f3f4f6",
      tertiary: "#dbeafe",
      muted: "#99a1af"
   },
   text: {
      primary: "#18181b",
      secondary: "#4a5565",
      muted: "#99a1af",
      inverse: "#ffffff"
   },
   border: {
      primary: "#99a1af",
      secondary: '#f3f4f6'
   }
};

const darkColors: ColorScheme = {
   brand: {
      primary: "#6897fd",
      secondary: "#93c5fd"
   },
   surface: {
      primary: "#121721",
      secondary: "#1c2331",
      tertiary: "#1c398e",
      muted: "#18181b"
   },
   text: {
      primary: "#d1d5dc",
      secondary: "#94a3b8",
      muted: "#636d7e",
      inverse: "#0f172a"
   },
   border: {
      primary: "#4a5565",
      secondary: '#1e293b'
   }
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

   const themeVariables = vars({
      "--brand-primary": hexToRgb(colors.brand.primary),
      "--brand-secondary": hexToRgb(colors.brand.secondary),

      "--surface-primary": hexToRgb(colors.surface.primary),
      "--surface-secondary": hexToRgb(colors.surface.secondary),
      "--surface-tertiary": hexToRgb(colors.surface.tertiary),
      "--surface-muted": hexToRgb(colors.surface.muted),

      "--text-primary": hexToRgb(colors.text.primary),
      "--text-secondary": hexToRgb(colors.text.secondary),
      "--text-muted": hexToRgb(colors.text.muted),
      "--text-inverse": hexToRgb(colors.text.inverse),

      "--border-primary": hexToRgb(colors.border.primary),
      "--border-secondary": hexToRgb(colors.border.secondary),
   });

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
         <View
            style={themeVariables}
            className={isDarkMode ? "dark flex-1" : "flex-1"}
         >
            {children}
         </View>
      </ThemeContext.Provider>
   )
}