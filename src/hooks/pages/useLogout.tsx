import { useNavigate } from "react-router-dom";
import { namePersistAuth } from "../../config/constants.tsx";
import { sleep } from "@/helpers/index.tsx";
import { useState } from "react";

export function useLogout() {
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await sleep(1000);

      sessionStorage.removeItem(namePersistAuth);
      sessionStorage.removeItem("logedIn");

      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      //setLogoutLoading(false);
    }
  };

  return { handleLogout, logoutLoading };
}
