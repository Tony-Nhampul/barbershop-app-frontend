"use client";

import { useLogin } from "@/hooks/pages/useLogin";
import Loader from "@/components/Loader";
import { LogIn } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/components/theme-provider";

export function Login() {
  const { loading, form, onSubmit } = useLogin();
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center absolute right-0 top-0 w-full h-full">
      <div
        className={`py-8 px-5 min-w-[450px]  max-w-[450px]  mx-auto space-y-6 border rounded-lg shadow-lg shadow-gray-500/40 ${
          theme == "light" ? "border-gray-300 rounded" : ""
        }`}
      >
        <div className="text-center">
          <h5 className="text-xl font-bold">Inicie a Sessão no Sistema.</h5>
          <p className="text-sm">
            Utilize seu Email e sua Senha para Iniciar a Sessão.
          </p>
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 flex flex-col items-center gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      className={`${
                        theme == "light" ? "text-black" : "text-white"
                      }`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite o seu Email."
                        className={`${
                          form.formState.errors.email
                            ? "border-red-500 border-[1.5px]"
                            : "border-gray-200"
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      className={`${
                        theme == "light" ? "text-black" : "text-white"
                      }`}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite a sua Senha."
                        className={`${
                          form.formState.errors.password
                            ? "border-red-500 border-[1.5px]"
                            : "border-gray-200"
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className={`${
                  theme === "light"
                    ? "border-[1px] border-gray-300 bg-[#8161ff] text-white rounded hover:bg-[#613cf3]"
                    : ""
                }`}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>{<LogIn className="w-4 h-4" />} Iniciar Sessão</>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-[12px]">
          Ainda não tem uma Conta? Crie a sua Conta grátis
          <Button className="p-0 ml-1.5 h-0 text-[12px]" variant={"link"}>
            <a href="/signup">aqui.</a>
          </Button>
        </p>

        <div>
          <p className="text-[12px]">
            Ao Iniciar a Sessão no nosso Sistema, você concorda com os nossos
            <Button className="p-0 mr-1.5 h-0 text-[12px]" variant={"link"}>
              <a href="#">Termos de Uso</a>
            </Button>
            e
            <Button className="p-0 ml-1.5 h-0 text-[12px]" variant={"link"}>
              <a href="#">Política de Privacidade.</a>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
