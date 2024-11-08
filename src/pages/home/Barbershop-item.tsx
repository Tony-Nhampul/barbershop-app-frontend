import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BarbershopItemProps {
  barbershop: {
    id: number;
    name: string;
    address: string;
    image_url: string;
  };
}

const BarbershopItem = (barbershop: BarbershopItemProps) => {
  const { theme } = useTheme();

  return (
    <Card
      className={`min-w-[167px] max-w-[167px] rounded-2xl ${
        theme == "light" ? "bg-gray-100 border-gray-300 rounded" : ""
      }`}
    >
      <CardContent className="p-1">
        {/*<img
          src={barbershop.barbershop.image_url}
          alt={barbershop.barbershop.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-[160px] w-full rounded-xl"
        />*/}

        <div
          className="px-1 w-full h-[160px] rounded-xl bg-cover bg-center relative"
          style={{ backgroundImage: `url(${barbershop.barbershop.image_url})` }}
        >
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant={"secondary"}
              className={`flex items-center gap-1 opacity-90 ${
                theme == "light" ? "bg-gray-300 rounded" : ""
              }`}
            >
              <StarIcon
                size={12}
                className={`fill-primary text-primary ${
                  theme == "light" ? "fill-[#8161ff] text-[#8161ff]" : ""
                }`}
              />
              <span>5,0</span>
            </Badge>
          </div>
        </div>

        <div className="p-2">
          <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap">
            {barbershop.barbershop.name}
          </h2>
          <p className="font-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.barbershop.address}
          </p>

          <Button
            variant={"secondary"}
            className={`w-full mt-3 ${
              theme == "light" ? "bg-gray-300 rounded hover:bg-gray-400" : ""
            }`}
            asChild
          >
            <Link to={`/barbershop/${barbershop.barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
