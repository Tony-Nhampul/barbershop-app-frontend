import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const { theme } = useTheme();
  return (
    <>
      <Card className="rounded-none border-0">
        <CardContent className="p-3 flex justify-between items-center flex-row">
          <img
            src="src/assets/logo.png"
            alt="FSW Barber"
            height={22}
            width={120}
          />
          <div className="flex gap-2">
            <ModeToggle />
            <Button
              variant={"outline"}
              size={"icon"}
              className={theme == "light" ? "border-gray-300 rounded" : ""}
            >
              <MenuIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
