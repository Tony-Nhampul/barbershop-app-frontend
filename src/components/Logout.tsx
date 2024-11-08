import { LogOut } from "lucide-react";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/pages/useLogout";

const Logout = () => {
  const { logoutLoading, handleLogout } = useLogout();

  return (
    <>
      <Button variant={"destructive"} size={"sm"} onClick={handleLogout}>
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
