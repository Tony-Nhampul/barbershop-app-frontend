import BookingItem from "@/components/Booking-item";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

import { useBookingInfo } from "@/hooks/pages/useBookingInfo";
import { isFuture, isPast } from "date-fns";
import { useEffect } from "react";

const Bookings = () => {
  const { loading, getBookings, bookings } = useBookingInfo();

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmedBookings = bookings.filter((booking) =>
    isFuture(booking.date)
  );
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <>
      <Header />

      <div className="py-6 px-5 max-w-6xl mx-auto">
        <h1 className="text-lg font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-1">
          Confirmados
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <>
            {confirmedBookings.length > 0 ? (
              <>
                {confirmedBookings.map((booking, index) => (
                  <div className="py-2" key={index}>
                    <BookingItem bookingInfo={booking} />
                  </div>
                ))}
              </>
            ) : (
              <div className="pb-3">
                <p>Nenhum agendamento Confirmado</p>
              </div>
            )}
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-1">
              Finalizados
            </h2>

            {loading ? (
              <Loader />
            ) : (
              <>
                {finishedBookings.map((booking, index) => (
                  <div className="py-2" key={index}>
                    <BookingItem bookingInfo={booking} />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
