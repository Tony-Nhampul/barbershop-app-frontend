import { sleep } from "@/helpers";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "../use-toast";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

interface APIErrorResponse {
  message: string;
}

interface useBookingProps {
  barbershopId: number;
  serviceId: number;
  userId: number;
  date: Date | string;
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBooking = async (
    { barbershopId, serviceId, userId, date }: useBookingProps,
    onSuccess: () => void //Callback for the function
  ) => {
    try {
      setLoading(true);

      await sleep(1000);

      const response = await api.post("/booking", {
        barbershop_id: barbershopId,
        service_id: serviceId,
        user_id: userId,
        date: date,
      });
      const message = response.data.message;

      onSuccess(); //Callback of the function when it is successfully completed

      toast({
        variant: "success",
        title: "Sucesso",
        description:
          message +
          format(date, "' para ' dd 'de' MMMM 'às' HH':'mm'", { locale: ptBR }),
        action: (
          <ToastAction
            altText="Visualizar Reserva"
            className="border border-green-900 bg-green-800"
            onClick={() => {
              navigate("/bookings");
            }}
          >
            Visualizar
          </ToastAction>
        ),
      });
    } catch (error) {
      console.log(error);
      ///alert("Error on create product");
      const axioError = error as AxiosError<APIErrorResponse>;
      const message =
        axioError.response?.data?.message ||
        "Ocorreu um Erro durante a execução da operação.";

      toast({
        variant: "destructive",
        title: "Error.",
        //description: axioError.message,
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSaveBooking };
}
