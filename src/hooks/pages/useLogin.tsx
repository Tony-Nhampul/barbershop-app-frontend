"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { namePersistAuth } from "@/config/constants";
// import { sleep } from "../../helpers";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message: string;
}

const formSchema = z.object({
  email: z.string().min(5, {
    message: "Email é obrigatório.",
  }),
  password: z.string().min(5, {
    message: "Senha é obrigatória e deve ter no minimo 5 caracteres.",
  }),
});

export function useLogin() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // await sleep(1000);

      const response = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      sessionStorage.setItem(namePersistAuth, JSON.stringify(response.data));

      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (error) {
      console.log(error);
      //alert("Credentials invalid");
      const axioError = error as AxiosError<APIErrorResponse>;
      const message =
        axioError.response?.data?.message || "An unexpected error occurred.";

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

  return { loading, form, onSubmit };
}
