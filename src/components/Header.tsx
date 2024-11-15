import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { useLogin } from "@/hooks/pages/useLogin";
import Logout from "./Logout";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { logedIn } = useLogin();

  //console.log(loading);
  return (
    <>
      <Card className="rounded-none border-0 ">
        <CardContent className="p-3 flex justify-between items-center flex-row max-w-6xl mx-auto">
          <Link to="/">
            <img
              src="src/assets/logo.png"
              alt="FSW Barber"
              height={22}
              width={120}
            />
          </Link>
          <div className="flex gap-2">
            {logedIn && (
              <div className="mt-0.5">
                <Logout />
              </div>
            )}

            <ModeToggle />

            <SideMenu />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
