import { useEffect, useState } from "react";
import { sleep } from "@/helpers";
import { api } from "@/services/api";
import { useSearchParams } from "react-router-dom";

export function useBarbershop() {
  const [barbershops, setBarbershops] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchedBarbershops, setSearchedBarbershops] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    getBarbershops();
  }, []);

  useEffect(() => {
    getSearchedBarbershops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getBarbershops = async () => {
    try {
      setLoading(true);

      //await sleep(1000);

      const response = await api.get("/barbershops");

      setBarbershops(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchedBarbershops = async () => {
    try {
      setLoading(true);

      // await sleep(1000);

      const response = await api.get("/searchbarbershops", {
        params: { search },
      });

      setSearchedBarbershops(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    barbershops,
    loading,
    searchedBarbershops,
  };
}
