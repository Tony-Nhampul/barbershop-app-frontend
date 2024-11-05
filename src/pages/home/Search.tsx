"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Search = () => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Busque por uma Barbearia..."
        className={theme == "light" ? "border-gray-300 rounded" : ""}
      />

      <Button
        variant={"default"}
        size={"sm"}
        className={`h-[36px] ${
          theme === "light"
            ? "border-[1px] border-gray-300 bg-[#8161ff] text-white rounded"
            : ""
        }`}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
