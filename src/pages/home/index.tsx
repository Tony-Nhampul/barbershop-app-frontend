import { format } from "date-fns";
import Header from "../../components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./Search";
import BookingItem from "@/components/Booking-item";

const Home = () => {
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

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-8">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-2">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
    </div>
  );
};

export default Home;
