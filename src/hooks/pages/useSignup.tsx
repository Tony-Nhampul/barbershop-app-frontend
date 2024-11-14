"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../helpers";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message: string;
}

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "Nome é obrigatório.",
    }),
    email: z.string().min(5, {
      message: "Email é obrigatório.",
    }),
    password: z.string().min(5, {
      message: "Senha é obrigatória e deve ter no minimo 5 caracteres.",
    }),
    confirmPassword: z.string().min(5, {
      message: "Confirmação de senha é obrigatória.",
    }),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas não coincidem.",
      });
    }
  });

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //2. Define onSubmit function
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await sleep(1000);

      const response = await api.post("/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      const message = response.data.message;

      setTimeout(() => {
        navigate("/login");
      }, 300);

      toast({
        variant: "success",
        title: "Sucesso",
        //description: axioError.message,
        description: message,
      });
    } catch (error) {
      console.log(error);
      //alert("Credentials invalid");
      const axioError = error as AxiosError<APIErrorResponse>;
      const message =
        axioError.response?.data?.message ||
        "Ocorreu um Erro durante a criação da Conta.";

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
