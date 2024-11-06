import { useEffect, useState } from "react";
import { sleep } from "@/helpers";
import { api } from "@/services/api";

export function useBarbershop() {
  const [barbershops, setBarbershops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBarbershops();
  }, []);

  const getBarbershops = async () => {
    try {
      setLoading(true);

      //await sleep(1000);

      const response = await api.get("/barbershops");

      setBarbershops(response.data);

      /*setBarbershops([
        {
          id: 1,
          name: "Product 1",
          price: 100,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
        },
        {
          id: 3,
          name: "Product 3",
          price: 300,
        },
      ]);*/
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    barbershops,
    loading,
  };
}
