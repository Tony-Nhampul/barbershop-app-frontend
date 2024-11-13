import { Scissors } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bookingItemProps } from "@/hooks/pages/useBookingInfo";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

const BookingItem = ({ bookingInfo }: bookingItemProps) => {
  const { theme } = useTheme();
  const pastBooking = isPast(bookingInfo.date);

  return (
    <Card className={theme == "light" ? "border-0 rounded bg-gray-200" : ""}>
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
  );
};

export default BookingItem;
