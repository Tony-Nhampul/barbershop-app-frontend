import { format } from "date-fns";
import Header from "../../components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./Search";
import BookingItem from "@/components/Booking-item";
import { useBarbershop } from "@/hooks/pages/useBarbershops";
import BarbershopItem from "./Barbershop-item";
import { useEffect, useRef } from "react";
import { useLogin } from "@/hooks/pages/useLogin";
import ChevronLeft from "@/components/Chevron-left";
import ChevronRight from "@/components/Chevron-right";
import { useBookingInfo } from "@/hooks/pages/useBookingInfo";
import Footer from "@/components/Footer";

const Home = () => {
  const { barbershops } = useBarbershop();
  const recomendadosRef = useRef<HTMLDivElement>(null);
  const popularesRef = useRef<HTMLDivElement>(null);
  const { logedIn, logedUser } = useLogin();
  const { getBookings, bookings } = useBookingInfo();

  useEffect(() => {
    getBookings(logedUser.id);
  }, [logedUser.id]);

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto">
        <div className="px-5 pt-5 space-y-1">
          <h2 className="text-xl font-bold">
            Olá, {logedIn && logedUser.name.split(" ")[0]}
          </h2>
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

        {logedIn && (
          <div className="px-5 mt-8">
            {bookings.length > 0 && (
              <>
                <h2 className="text-xs uppercase text-gray-400 font-bold mb-2">
                  Agendamentos
                </h2>

                <div className="flex gap-3 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden ">
                  {bookings.map((booking, index) => (
                    <BookingItem key={index} bookingInfo={booking} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {/* Agendamentos */}

        <div className="px-5 mt-8">
          <h2 className=" text-xs mb-2 uppercase text-gray-400 font-bold">
            Recomendados
          </h2>

          <div className="relative flex items-center">
            <ChevronLeft
              scrollRef={recomendadosRef}
              leftPosition={-15}
              scrollSpeed={350}
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
              scrollRef={recomendadosRef}
              rightPosition={-15}
              scrollSpeed={350}
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
              scrollRef={popularesRef}
              leftPosition={-15}
              scrollSpeed={350}
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
              scrollRef={popularesRef}
              rightPosition={-15}
              scrollSpeed={350}
            />
          </div>
        </div>
        {/* Populares */}
      </div>

      <Footer />
    </>
  );
};

export default Home;
