import Header from "@/components/Header";
import { useBarbershop } from "@/hooks/pages/useBarbershops";
import { Navigate, useSearchParams } from "react-router-dom";
import BarbershopItem from "../home/Barbershop-item";
import Loader from "@/components/Loader";
import Search from "../../components/Search";

/*interface BarbershopsProps {
  searchParams: {
    search?: string;
  };
}*/

const Barbershops = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { searchedBarbershops, loading } = useBarbershop();

  return (
    <>
      {search ? (
        <>
          <Header />

          <div className="px-5 py-6 flex flex-col gap-6">
            <Search defaultValues={{ search: search }} />

            <h1 className="text-gray-400 font-bold text-xs uppercase">
              Resultados para "{search}"
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {searchedBarbershops.map((barbershop, index) => (
                    <div className="w-full" key={index}>
                      <BarbershopItem barbershop={barbershop} />
                    </div>
                  ))}

                  {searchedBarbershops.length == 0 && (
                    <p>Nenhum resultado encontrado.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Barbershops;
