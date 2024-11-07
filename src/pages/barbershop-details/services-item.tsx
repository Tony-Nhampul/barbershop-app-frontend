import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface servicesItemProps {
  service: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

const ServicesItem = (service: servicesItemProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-4">
          {/*<div className="relative h-[110px] w-[110px]">
             <img
              src={service.service.image_url}
              alt={service.service.name}
              style={{ objectFit: "contain" }}
              className="rounded-xl"
            />
          </div>*/}
          <div
            className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${service.service.image_url})`,
              objectFit: "contain",
            }}
          ></div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.service.name}</h2>
            <p className="text-sm text-gray-400">
              {service.service.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-MZ", {
                  style: "currency",
                  currency: "MZN",
                }).format(service.service.price)}
              </p>
              <Button variant={"secondary"}>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesItem;
