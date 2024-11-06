import { useEffect, useState } from "react";
import { sleep } from "@/helpers";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
//import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message: string;
}

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Nome do Produto é obrigatório.",
  }),
  price: z
    .string()
    .min(1, "Preço do Produto é obrigatório.")
    .default("")
    .refine((val) => !isNaN(Number(val)), { message: "Preço inválido." }),
});

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prodSaveLoading, setProdSaveLoading] = useState(false);
  const [prodDialogOpen, setProdDialogOpen] = useState(false);
  const { toast } = useToast();
  //const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);

      await sleep(1000);

      // setProducts([
      //   {
      //     id: 1,
      //     name: "Product 1",
      //     price: 100
      //   },
      //   {
      //     id: 2,
      //     name: "Product 2",
      //     price: 200
      //   },
      //   {
      //     id: 3,
      //     name: "Product 3",
      //     price: 300
      //   }
      // ]);

      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      //await api.delete(`/products/${id}`);

      const response = await api.delete(`/products/${id}`);
      const message = response.data.message;
      getProducts();

      await sleep(1500);
      toast({
        variant: "success",
        title: "Success.",
        description: message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 1. Define your form default values.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  // 2. Define onSubmit function.
  const onSubmit = async (values: z.infer<typeof formSchema>, id?: number) => {
    try {
      setProdSaveLoading(true);

      await sleep(1000);

      const method = id ? "put" : "post";
      const url = id ? `/products/${id}` : "/products";

      await api[method](url, {
        name: values.name,
        price: values.price,
      });

      setProdDialogOpen(false);
      form.reset();

      getProducts();

      toast({
        variant: "success",
        title: "Success.",
        description: id
          ? "Product edited successfuly"
          : "Product added successfuly",
      });
    } catch (error) {
      console.log(error);
      ///alert("Error on create product");
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
      setProdSaveLoading(false);
    }
  };

  return {
    products,
    loading,
    handleDelete,
    form,
    onSubmit,
    prodSaveLoading,
    prodDialogOpen,
    setProdDialogOpen,
  };
}
