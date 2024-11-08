import { LogOut } from "lucide-react";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/pages/useLogout";
import { useTheme } from "./theme-provider";

const Logout = () => {
  const { logoutLoading, handleLogout } = useLogout();
  const { theme } = useTheme();

  return (
    <>
      <Button
        variant={"destructive"}
        size={"sm"}
        onClick={handleLogout}
        className={`${
          theme == "light"
            ? "bg-[#EF4343] rounded text-white hover:bg-[#c53232]"
            : ""
        }`}
      >
        {logoutLoading ? (
          <Loader />
        ) : (
          <>{<LogOut className="w-4 h-4" />} Terminar Sessão</>
        )}
      </Button>
    </>
  );
};

export default Logout;
