import { useEffect, useState } from "react";
//import { sleep } from "@/helpers";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface useBarbershopDetailsProps {
  id: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}
interface BarbershopDetails {
  name: string;
  address: string;
  image_url: string;
  services: Service[];
}

export function useBarbershopDetails(props: useBarbershopDetailsProps) {
  const [barbershopDetails, setBarbershopDetails] =
    useState<BarbershopDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.id) {
      getBarbershopDetails(props.id);
    }
  }, [props?.id]);

  const getBarbershopDetails = async (id: number) => {
    try {
      setLoading(true);

      //await sleep(1000);

      const response = await api.get("/barbershop/" + id);

      setBarbershopDetails(response.data);
    } catch (error) {
      console.error(error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return {
    barbershopDetails,
    loading,
  };
}
