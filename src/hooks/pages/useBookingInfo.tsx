//import { sleep } from "@/helpers";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "../use-toast";
import { sleep } from "@/helpers";

interface Service {
  //id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface BarbershopDetails {
  name: string;
  address: string;
  image_url: string;
  //services: Service[];
}

export interface bookingItemProps {
  bookingInfo: {
    id: number;
    barbershop_id: number;
    service_id: number;
    user_id: number;
    date: Date | string;
    service: Service;
    barbershop: BarbershopDetails;
  };
}

export function useBookingInfo() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const getBookings = async (user_id: number) => {
    try {
      setLoading(true);
      //await sleep(1000);

      const response = await api.get(`/bookings/${user_id}`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    booking_id: number,
    onSuccess: () => void //Callback for the function
  ) => {
    try {
      setLoading(true);
      await sleep(1000);

      const response = await api.delete(`/bookings/${booking_id}`);
      const message = response.data.message;

      onSuccess();

      toast({
        variant: "success",
        title: "Success.",
        description: message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getBookings, bookings, handleDelete };
}
