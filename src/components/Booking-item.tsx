import { Scissors, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bookingItemProps, useBookingInfo } from "@/hooks/pages/useBookingInfo";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BookingItem = ({ bookingInfo }: bookingItemProps) => {
  const { theme } = useTheme();
  const pastBooking = isPast(bookingInfo.date);
  const { handleDelete, loading } = useBookingInfo();
  const [bookingInfoSheet, setBookingInfoSheet] = useState(false);
  const [bookingDeleteDialog, setBookingDeleteDialog] = useState(false);

  const onDeleteBookingSuccess = () => {
    setBookingInfoSheet(false);
  };

  const beforeDelete = () => {
    setBookingDeleteDialog(false);
  };

  return (
    <Sheet open={bookingInfoSheet} onOpenChange={setBookingInfoSheet}>
      <SheetTrigger asChild>
        <Card
          className={`min-w-full cursor-pointer ${
            theme == "light" ? "border-0 rounded bg-gray-200" : ""
          }`}
        >
          <CardContent className="p-0 flex">
            <div className="flex flex-col gap-2 py-5 pl-5 flex-[4]">
              <Badge
                variant={pastBooking ? "secondary" : "default"}
                className={`ml-[-2px] w-fit ${
                  theme == "light"
                    ? "bg-[#ab9deb] hover:bg-[#ab9deb] rounded text-white"
                    : ""
                }
                ${
                  theme == "light" && pastBooking
                    ? "bg-[#848191] hover:bg-[#848191] rounded text-gray-200"
                    : ""
                }`}
              >
                {pastBooking ? "Finalizado" : "Confirmado"}
              </Badge>

              <div className="mt-2">
                <h2 className="font-bold mb-1">{bookingInfo.service.name}</h2>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={bookingInfo.barbershop.image_url} />
                    <AvatarFallback>
                      <Scissors />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm">{bookingInfo.barbershop.name}</h3>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col items-center justify-center flex-[1] border-l border-solid ${
                theme == "light" ? "border-gray-300" : ""
              }`}
            >
              <p className="text-sm capitalize">
                {format(bookingInfo.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(bookingInfo.date, "dd")}</p>
              <p className="text-sm">{format(bookingInfo.date, "HH:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent
        className={`p-0 ${theme == "light" ? "bg-white border-gray-300" : ""}`}
      >
        <SheetHeader className=" px-5 py-3">
          <SheetTitle
            className={`text-left text-primary font-bold ${
              theme == "light" ? "text-[#8161ff]" : ""
            }`}
          >
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>

        <div
          className="relative h-[180px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url("./src/assets/address-image.png")` }}
        >
          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card
              className={`min-w-full ${
                theme == "light" ? "border-0 rounded bg-gray-200" : ""
              }`}
            >
              <CardContent className="p-3 flex gap-3">
                <Avatar>
                  <AvatarImage src={bookingInfo.barbershop.image_url} />
                  <AvatarFallback>
                    <Scissors />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-bold">{bookingInfo.barbershop.name}</h2>
                  <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                    {bookingInfo.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-5 py-4">
          <Card
            className={`${
              theme === "light"
                ? "border-[1px] border-gray-300 rounded-xl bg-gray-100"
                : ""
            }`}
          >
            <CardHeader className="p-0">
              <Badge
                variant={pastBooking ? "secondary" : "default"}
                className={`mt-2 mx-2 w-fit ${
                  theme == "light"
                    ? "bg-[#ab9deb] hover:bg-[#ab9deb] rounded text-white"
                    : ""
                }
                ${
                  theme == "light" && pastBooking
                    ? "bg-[#848191] hover:bg-[#848191] rounded text-gray-200"
                    : ""
                }`}
              >
                {pastBooking ? "Reserva Finalizada" : "Reserva Confirmada"}
              </Badge>
            </CardHeader>

            <CardContent className="p-3 gap-2 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">{bookingInfo.service.name}</h2>

                <h3 className="font-bold">
                  {Intl.NumberFormat("pt-MZ", {
                    style: "currency",
                    currency: "MZN",
                  }).format(bookingInfo.service.price)}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Barbearia</h3>
                <h4 className="text-gray-400 text-sm">
                  {bookingInfo.barbershop.name}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Data</h3>
                <h4 className="text-gray-400 text-sm">
                  {format(bookingInfo.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Horário</h3>
                <h4 className="text-gray-400 text-sm">
                  {format(bookingInfo.date, "HH:mm")}
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <CardFooter className="flex gap-3 mt-3">
          <SheetClose asChild>
            <Button
              className={`w-full ${
                theme == "light" ? "bg-gray-300 rounded hover:bg-gray-400" : ""
              }`}
              variant={"secondary"}
            >
              Fechar
            </Button>
          </SheetClose>

          <Dialog
            open={bookingDeleteDialog}
            onOpenChange={setBookingDeleteDialog}
          >
            <DialogTrigger asChild>
              <Button
                className={`w-full ${
                  theme == "light"
                    ? "bg-[#ef4343] hover:bg-[#ad2f2f] rounded text-white"
                    : ""
                }`}
                variant={"destructive"}
                disabled={pastBooking || loading}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>{<Trash2 className="w-4 h-4" />} Cancelar Reserva</>
                )}
              </Button>
            </DialogTrigger>

            <DialogContent
              className={`sm:max-w-[425px] w-[90%] ${
                theme == "light" ? "bg-white border-gray-300 rounded" : ""
              }`}
            >
              <DialogHeader>
                <DialogTitle>Cancelando Reserva</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja cancelar a Reserva?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex flex-row gap-3">
                <DialogClose className="w-full">
                  <Button
                    className={`w-full ${
                      theme == "light"
                        ? "bg-gray-300 rounded hover:bg-gray-400"
                        : ""
                    }`}
                    variant="secondary"
                  >
                    Fechar
                  </Button>
                </DialogClose>

                <Button
                  className={`w-full ${
                    theme == "light"
                      ? "bg-[#ef4343] hover:bg-[#ad2f2f] rounded text-white"
                      : ""
                  }`}
                  variant={"destructive"}
                  onClick={() =>
                    handleDelete(
                      bookingInfo.id,
                      beforeDelete,
                      onDeleteBookingSuccess
                    )
                  }
                >
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
