"use client";
// theme toggle button for dark & light
import React from "react";

import { useTheme } from "next-themes"
import { Moon, Sun, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThemeToggle({expanded}: {expanded: boolean}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, []);

    if (!mounted) return <Button size="icon" variant="secondary" />;
    type Theme = "dark" | "light"
    let cls = (theme: any, pref: Theme) => cn(theme === pref ? "bg-secondary": "", "justify-start hover:bg-background duration-700 hover:text-secondary-color"); 
    return (
        <div className={cn(" flex flex-col gap-1 my-12")}>
            <Button 
                size={"sm"} 
                variant={theme === "light" ? "secondary": "ghost"} 
                className={cls(theme || "light", "light")}
                onClick={() => setTheme("light")}
            >
                <SunMedium size={18} />
                {expanded && <span>Light</span>}
            </Button>
            <Button 
                size="sm" 
                variant={theme === "dark" ? "secondary": "ghost"} 
                className={cls(theme || "light", "dark")}
                    // cn(theme === "dark" ? "bg-secondary": "", "hover:bg-background duration-700 hover:text-main-color")}
                onClick={() => setTheme("dark")}
            >
                <Moon size={18} />
                {expanded && <span>Dark</span>}
            </Button>
        </div>
    )
}
 