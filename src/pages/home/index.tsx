import { format } from "date-fns";
import Header from "../../components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./Search";
import BookingItem from "@/components/Booking-item";
import { useBarbershop } from "@/hooks/pages/useBarbershops";
import BarbershopItem from "./Barbershop-item";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Home = () => {
  const { barbershops, loading } = useBarbershop();
  const recomendadosRef = useRef<HTMLDivElement>(null);
  const popularesRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  return (
    <div>
      <Header />

      <div className="px-5 pt-5 space-y-1">
        <h2 className="text-xl font-bold">Olá Miguel</h2>
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
          <ChevronLeft
            className={`absolute left-[-15px] z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
              theme == "light" ? "bg-slate-400 text-white" : "bg-black"
            }`}
            onClick={() => {
              if (recomendadosRef.current) {
                recomendadosRef.current.scrollLeft -= 300;
              }
            }}
          />

          <div
            ref={recomendadosRef}
            className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden "
          >
            {barbershops.map((barbershop, index) => (
              <BarbershopItem key={index} barbershop={barbershop} />
            ))}
          </div>

          <ChevronRight
            className={`absolute right-[-15px] z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
              theme == "light" ? "bg-slate-400 text-white" : "bg-black"
            }`}
            onClick={() => {
              if (recomendadosRef.current) {
                recomendadosRef.current.scrollLeft += 300;
              }
            }}
          />
        </div>
      </div>
      {/* Recomendados */}

      <div className="px-5 mt-8">
        <h2 className=" text-xs mb-2 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="relative flex items-center">
          <ChevronLeft
            className={`absolute left-[-15px] z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
              theme == "light" ? "bg-slate-400 text-white" : "bg-black"
            }`}
            onClick={() => {
              if (popularesRef.current) {
                popularesRef.current.scrollLeft -= 300;
              }
            }}
          />

          <div
            ref={popularesRef}
            className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden "
          >
            {barbershops.map((barbershop, index) => (
              <BarbershopItem key={index} barbershop={barbershop} />
            ))}
          </div>

          <ChevronRight
            className={`absolute right-[-15px] z-10 bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer ${
              theme == "light" ? "bg-slate-400 text-white" : "bg-black"
            }`}
            onClick={() => {
              if (popularesRef.current) {
                popularesRef.current.scrollLeft += 300;
              }
            }}
          />
        </div>
      </div>
      {/* Populares */}
    </div>
  );
};

export default Home;
