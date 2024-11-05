import { Scissors } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BookingItem = () => {
  const { theme } = useTheme();

  return (
    <Card className={theme == "light" ? "border-0 rounded bg-gray-200" : ""}>
      <CardContent className="p-5 py-0 flex justify-between">
        <div className="flex flex-col gap-2 py-5">
          <Badge
            className={`ml-[-2px] bg-[#221C3D] hover:bg-[#221C3D] text-primary w-fit ${
              theme == "light"
                ? "bg-[#ab9deb] hover:bg-[#ab9deb] rounded text-white"
                : ""
            }`}
          >
            Confirmado
          </Badge>

          <div className="mt-2">
            <h2 className="font-bold">Corte de Cabelo</h2>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png" />
                <AvatarFallback>
                  <Scissors />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm">Vintage Barber</h3>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-center pl-4 border-l border-solid ${
            theme == "light" ? "border-gray-300" : ""
          }`}
        >
          <p className="text-sm">Novembro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
