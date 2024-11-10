import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { useLogin } from "@/hooks/pages/useLogin";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useMemo, useRef, useState } from "react";
import "./custom-calendar.css";
import { ptBR } from "date-fns/locale";
import { addDays, format, setHours, setMinutes } from "date-fns";
import "./custom-calendar.css";
import { generateDayTimeList } from "@/helpers/hours";
import ChevronLeft from "@/components/Chevron-left";
import ChevronRight from "@/components/Chevron-right";
import { useBooking } from "@/hooks/pages/useBooking";
import Loader from "@/components/Loader";
import { SaveIcon } from "lucide-react";

interface servicesItemProps {
  service: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
  barbershop_id: number;
  barbershopName: string;
}

const ServicesItem = (props: servicesItemProps) => {
  const { theme } = useTheme();
  const { logedIn, logedUser } = useLogin();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const timeListRef = useRef<HTMLDivElement>(null);
  const {
    loading,
    handleSaveBooking,
    getBookingsOfTheDay,
    bookingsOfTheDay,
    bookingsLoading,
  } = useBooking();
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  const handleBookingSuccess = () => {
    setDate(undefined);
    setHour(undefined);
    setBookingSheetIsOpen(false);
  };

  const handleBookingClick = () => {
    if (!logedIn) {
      navigate("/login", {
        state: { from: `/barbershop/${props.barbershop_id}` },
      });
    }
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);

    getBookingsOfTheDay(
      format(date as Date, "yyyy-MM-dd"),
      props.barbershop_id
    );
  };

  const serviceTimeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      //Filtering the Bookings, so that don't display already saved booking time

      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = bookingsOfTheDay.find((booking) => {
        const bookingDate = new Date(booking.date); // Ensure booking.date is a Date object
        const bookingHour = bookingDate.getHours();
        const bookingMinutes = bookingDate.getMinutes();

        return bookingHour == timeHour && bookingMinutes == timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, bookingsOfTheDay]);

  return (
    <Card className={`${theme == "light" ? "border-gray-300 rounded" : ""}`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-4">
          {/*<div className="relative h-[110px] w-[110px]">
             <img
              src={props.service.image_url}
              alt={props.service.name}
              style={{ objectFit: "contain" }}
              className="rounded-xl"
            />
          </div>*/}
          <div
            className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${props.service.image_url})`,
              objectFit: "contain",
            }}
          ></div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{props.service.name}</h2>
            <p className="text-sm text-gray-400">{props.service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p
                className={`text-sm font-bold ${
                  theme == "light" ? "text-[#8161ff]" : "text-primary"
                }`}
              >
                {Intl.NumberFormat("pt-MZ", {
                  style: "currency",
                  currency: "MZN",
                }).format(props.service.price)}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={setBookingSheetIsOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant={"secondary"}
                    className={`${
                      theme == "light"
                        ? "bg-gray-300 rounded hover:bg-gray-400"
                        : ""
                    }`}
                    onClick={() => handleBookingClick()}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent
                  className={`p-0 ${
                    theme == "light" ? "bg-white border-gray-300" : ""
                  }`}
                >
                  <SheetHeader
                    className={`text-left border-b border-solid border-secondary px-5 py-3 ${
                      theme == "light" ? "border-gray-300 text-[#8161ff]" : ""
                    }`}
                  >
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="pt-3 pb-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      classNames={{
                        day_selected: "custom-calendar rdp-day_selected",
                      }}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div
                      className={`relative flex items-center ${
                        theme == "light"
                          ? "border-y border-gray-300"
                          : "border-y border-solid border-secondary"
                      }`}
                    >
                      <ChevronLeft
                        scrollRef={timeListRef}
                        leftPosition={0}
                        scrollSpeed={200}
                      />
                      <div className="px-8 w-full">
                        <div
                          ref={timeListRef}
                          className={`py-6 flex overflow-x-auto gap-3 scroll-smooth [&::-webkit-scrollbar]:hidden `}
                        >
                          {bookingsLoading ? (
                            <Loader />
                          ) : (
                            <>
                              {serviceTimeList.map((time) => (
                                <Button
                                  key={time}
                                  variant={
                                    hour === time ? "default" : "outline"
                                  }
                                  className={`${
                                    theme === "light"
                                      ? "border-[1px] border-gray-300 rounded-xl hover:bg-[#8161ff]"
                                      : ""
                                  } ${
                                    hour === time
                                      ? "bg-[#8161ff] text-white"
                                      : ""
                                  }`}
                                  onClick={() => handleHourClick(time)}
                                >
                                  {time}
                                </Button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      <ChevronRight
                        scrollRef={timeListRef}
                        rightPosition={0}
                        scrollSpeed={200}
                      />
                    </div>
                  )}

                  <div className="py-6 px-5">
                    <Card
                      className={`${
                        theme === "light"
                          ? "border-[1px] border-gray-300 rounded-xl bg-gray-100"
                          : ""
                      }`}
                    >
                      <CardContent className="p-3 gap-2 flex flex-col">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{props.service.name}</h2>

                          <h3 className="font-bold">
                            {Intl.NumberFormat("pt-MZ", {
                              style: "currency",
                              currency: "MZN",
                            }).format(props.service.price)}
                          </h3>
                        </div>

                        <div className="flex justify-between">
                          <h3 className="text-gray-400">Barbearia</h3>
                          <h4 className="text-gray-400 text-sm">
                            {props.barbershopName}
                          </h4>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400">Data</h3>
                            <h4 className="text-gray-400 text-sm">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400">Horário</h3>
                            <h4 className="text-gray-400 text-sm">{hour}</h4>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5 ">
                    <Button
                      className={`w-full ${
                        theme === "light"
                          ? "border-[1px] border-gray-300 bg-[#8161ff] text-white rounded hover:bg-[#613cf3]"
                          : ""
                      }`}
                      disabled={!hour || !date || loading}
                      onClick={() => {
                        const dateHour = Number(hour?.split(":")[0]);
                        const dateMinutes = Number(hour?.split(":")[1]);
                        const newDate = format(
                          setMinutes(
                            setHours(date as Date, dateHour),
                            dateMinutes
                          ),
                          "yyyy-MM-dd HH:mm:ss"
                        );

                        handleSaveBooking(
                          {
                            barbershop_id: props.barbershop_id,
                            service_id: props.service.id,
                            user_id: logedUser.id,
                            date: newDate,
                          },
                          handleBookingSuccess
                        );
                      }}
                    >
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          {<SaveIcon className="w-4 h-4" />} Confirmar Reserva
                        </>
                      )}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesItem;
