import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={theme == "light" ? "border-gray-300 rounded" : ""}
      >
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={theme == "light" ? "border-gray-300 rounded bg-white" : ""}
      >
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${theme == "light" ? "" : "bg-zinc-700"}`}
        >
          Tema Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${theme == "light" ? "bg-slate-300" : ""}`}
        >
          Tema Claro
        </DropdownMenuItem>
        {/*<DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          Tema do Sistema
        </DropdownMenuItem>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
