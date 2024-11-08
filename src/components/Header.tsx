import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import { useLogin } from "@/hooks/pages/useLogin";
import Logout from "./logout";

const Header = () => {
  const { theme } = useTheme();
  const { logedIn } = useLogin();

  //console.log(loading);
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
            {logedIn && (
              <div className="mt-0.5">
                <Logout />
              </div>
            )}

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
