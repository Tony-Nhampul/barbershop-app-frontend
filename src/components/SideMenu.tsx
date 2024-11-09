import {
  CalendarDays,
  HomeIcon,
  LogIn,
  LogOut,
  MenuIcon,
  User2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/pages/useLogin";
import { useLogout } from "@/hooks/pages/useLogout";
import { useTheme } from "./theme-provider";
import { ModeToggle } from "./mode-toggle";

const SideMenu = () => {
  const { logedIn, logedUser } = useLogin();
  const { handleLogout } = useLogout();
  const { theme } = useTheme();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className={
              theme == "light"
                ? "bg-gray-100 hover:bg-gray-100 border-gray-300 rounded"
                : ""
            }
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent
          className={`p-0 ${
            theme == "light" ? "bg-white border-gray-300" : ""
          }`}
        >
          <SheetHeader
            className={`border-b border-solid border-secondary px-5 py-3 ${
              theme == "light" ? "border-gray-300" : ""
            }`}
          >
            <SheetTitle
              className={`text-left text-primary font-bold ${
                theme == "light" ? "text-[#8161ff]" : ""
              }`}
            >
              Menu
            </SheetTitle>
          </SheetHeader>

          {logedIn ? (
            <div className="flex items-center justify-between px-5 py-6">
              <div className="flex items-center gap-3">
                <Avatar className={`${theme == "light" ? "bg-gray-300" : ""}`}>
                  <AvatarImage src={logedUser.image} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-bold">{logedUser.name}</h2>
              </div>

              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={handleLogout}
                className={`${
                  theme == "light"
                    ? "bg-[#EF4343] rounded text-white hover:bg-[#c53232]"
                    : ""
                }`}
              >
                <LogOut />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col px-5 py-6 gap-3">
                <div className="flex items-center gap-2">
                  <Avatar
                    className={`${theme == "light" ? "bg-gray-300" : ""}`}
                  >
                    <AvatarFallback>
                      <User2 />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-sm">Olá</h1>
                    <p className="text-xs">Inicie a Sessão no Sistema</p>
                  </div>
                </div>

                <Button
                  variant={"secondary"}
                  className={`w-full mt-2 ${
                    theme == "light"
                      ? "bg-gray-300 rounded hover:bg-gray-400"
                      : ""
                  }`}
                  asChild
                >
                  <Link to="/login">
                    <LogIn />
                    Iniciar a Sessão
                  </Link>
                </Button>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 px-5">
            <Button
              className={`justify-start ${
                theme == "light" ? "bg-gray-300 rounded hover:bg-gray-400" : ""
              }`}
              variant={"secondary"}
              asChild
            >
              <Link to="/a">
                <HomeIcon className="mr-2" />
                Página Inicial
              </Link>
            </Button>

            {logedIn && (
              <Button
                variant={"secondary"}
                className={`justify-start ${
                  theme == "light"
                    ? "bg-gray-300 rounded hover:bg-gray-400"
                    : ""
                }`}
                asChild
              >
                <Link to="/bookings">
                  <CalendarDays className="mr-2" />
                  Agendamentos
                </Link>
              </Button>
            )}

            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideMenu;
