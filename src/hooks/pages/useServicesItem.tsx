import { useState, useEffect } from "react";
import { api } from "@/services/api";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function useServicesItem() {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getServicesItem = async () => {
      try {
        setLoading(true);

        //await sleep(1000);

        const response = await api.get("/services");

        setService(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getServicesItem();
  }, []);

  return { service, loading };
}
