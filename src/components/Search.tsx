"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  search: z
    .string({
      required_error: "Digite o Nome da Barbearia a buscar...",
    })
    .trim()
    .min(1, {
      message: "Campo obrigatório.",
    }),
});

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

const Search = ({ defaultValues }: SearchProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSearch = (data: z.infer<typeof formSchema>) => {
    //console.log(data.search);
    navigate(`/barbershops?search=${data.search}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex w-full gap-1"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Busque por uma Barbearia..."
                    className={`${
                      form.formState.errors.search
                        ? "!border-red-500 border-[1.5px]"
                        : "border-gray-200"
                    }
                      ${theme == "light" ? "border-gray-300 rounded" : ""}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            size={"sm"}
            className={`h-[36px] ${
              theme === "light"
                ? "border-[1px] border-gray-300 bg-[#8161ff] hover:bg-[#613cf3] text-white rounded"
                : ""
            }`}
          >
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
