import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "ライト", icon: <Sun className="h-4 w-4" /> },
  { value: "dark", label: "ダーク", icon: <Moon className="h-4 w-4" /> },
  { value: "system", label: "システム", icon: <Monitor className="h-4 w-4" /> },
];

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) ?? "system";
    setTheme(stored);
  }, []);

  function handleSelect(value: Theme) {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  }

  const current = themes.find((t) => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="テーマを切り替える"
        className="flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      >
        {current?.icon}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, label, icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleSelect(value)}
            className="flex items-center gap-2"
          >
            {icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
