import { format } from "date-fns";
import Header from "../../components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./Search";
import BookingItem from "@/components/Booking-item";
import { useBarbershop } from "@/hooks/pages/useBarbershops";
import BarbershopItem from "./Barbershop-item";
import { useRef } from "react";
import { useLogin } from "@/hooks/pages/useLogin";
import ChevronLeft from "@/components/Chevron-left";
import ChevronRight from "@/components/Chevron-right";

const Home = () => {
  const { barbershops } = useBarbershop();
  const recomendadosRef = useRef<HTMLDivElement>(null);
  const popularesRef = useRef<HTMLDivElement>(null);
  const { logedUser } = useLogin();

  return (
    <div>
      <Header />

      <div className="px-5 pt-5 space-y-1">
        <h2 className="text-xl font-bold">Olá {logedUser.name}</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      {/* Welcome */}

      <div className="px-5 mt-6">
        <Search />
      </div>
      {/* Search */}

      <div className="px-5 mt-8">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-2">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
      {/* Agendamentos */}

      <div className="px-5 mt-8">
        <h2 className=" text-xs mb-2 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="relative flex items-center">
          <ChevronLeft scrollRef={recomendadosRef} leftPosition={-15} />

          <div
            ref={recomendadosRef}
            className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden "
          >
            {barbershops.map((barbershop, index) => (
              <BarbershopItem key={index} barbershop={barbershop} />
            ))}
          </div>

          <ChevronRight scrollRef={recomendadosRef} rightPosition={-15} />
        </div>
      </div>
      {/* Recomendados */}

      <div className="px-5 mt-8">
        <h2 className=" text-xs mb-2 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="relative flex items-center">
          <ChevronLeft scrollRef={popularesRef} leftPosition={-15} />

          <div
            ref={popularesRef}
            className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden "
          >
            {barbershops.map((barbershop, index) => (
              <BarbershopItem key={index} barbershop={barbershop} />
            ))}
          </div>

          <ChevronRight scrollRef={popularesRef} rightPosition={-15} />
        </div>
      </div>
      {/* Populares */}
    </div>
  );
};

export default Home;
