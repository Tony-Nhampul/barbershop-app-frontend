import { useNavigate, useParams } from "react-router-dom";
import { useBarbershopDetails } from "@/hooks/pages/useBarbershoDetails";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import ServicesItem from "./services-item";
import SideMenu from "@/components/SideMenu";

const BarbershopDetails = () => {
  const { id } = useParams<{ id: string }>(); //Garante que o TypeScript conhece o tipo exato do parâmetro, reduzindo o risco de erros de tipo de dado.
  const { barbershopDetails, loading } = useBarbershopDetails({
    id: Number(id), //Convertendo `id` de string para number
  });
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <div className="pt-4">
          <Loader />
        </div>
      ) : (
        //barbershopDetails && ( // Conditional rendering to check if barbershopDetails is not null
        <>
          <div
            //className="w-full h-[260px] bg-cover bg-center relative opacity-75"
            //style={{ backgroundImage: `url(${barbershopDetails?.image_url})` }}
            className="relative"
          >
            <img
              src={barbershopDetails?.image_url}
              sizes="100vw"
              className="h-[260px] w-full"
            />

            <Button
              size={"icon"}
              variant={"outline"}
              className={`z-10 absolute top-4 left-4 ${
                theme == "light"
                  ? "bg-gray-100 hover:bg-gray-100 border-gray-300 rounded"
                  : ""
              }`}
              onClick={handleBackClick}
            >
              <ChevronLeftIcon />
            </Button>

            <div className="z-10 absolute top-4 right-4">
              <SideMenu />
            </div>
          </div>

          <div
            className={`px-5 pt-3 pb-6  ${
              theme == "light"
                ? "border-b border-gray-300"
                : "border-b border-solid border-secondary"
            }`}
          >
            <h1 className="text-xl font-bold">{barbershopDetails?.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <MapPinIcon
                size={18}
                className={`${
                  theme == "light" ? "text-[#8161ff]" : "text-primary "
                }`}
              />
              <p className="text-sm">{barbershopDetails?.address}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <StarIcon
                size={18}
                className={`${
                  theme == "light"
                    ? "fill-[#8161ff] text-[#8161ff]"
                    : "fill-primary text-primary"
                }`}
              />
              <p className="text-sm">5,0 (889 Avalações) </p>
            </div>
          </div>
        </>
        //)
      )}

      <div className={"px-4 flex flex-col gap-4 py-6"}>
        {barbershopDetails?.services.map((service, index) => (
          <ServicesItem
            key={index}
            service={service}
            barbershop_id={Number(id)}
            barbershopName={barbershopDetails.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetails;
