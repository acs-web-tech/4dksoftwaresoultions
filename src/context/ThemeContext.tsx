import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first, then system preference
        const stored = localStorage.getItem("4dk-theme") as Theme;
        if (stored) return stored;

        // Check for system dark mode preference, otherwise default to light
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light"; // Default to light theme
    });

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    }, []);

    useEffect(() => {
        localStorage.setItem("4dk-theme", theme);

        // Apply theme class to document
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(theme);

        // Update meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute("content", theme === "dark" ? "#0a0a1a" : "#f8fafc");
        }
    }, [theme]);

    const isDark = theme === "dark";

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
