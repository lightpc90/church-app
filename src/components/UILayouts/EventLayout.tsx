import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

type EventLayoutPropsType = {
  event: {
    name: string;
    location: string;
    dateAndTime: string;
    regLink?: string;
    image: string;
  };
};

const EventLayout: FC<EventLayoutPropsType> = ({ event }) => {
  const time = event.dateAndTime.split("T")[1];
  const dateString = event.dateAndTime.split("T")[0];
  const date = new Date(dateString);

  // Get the individual parts
  const options: Intl.DateTimeFormatOptions = { weekday: "short" };
  const weekday = date.toLocaleDateString("en-US", options); // "THU"
  const day = date.getDate().toString().padStart(2, "0"); // "07"
  const month = date.toLocaleDateString("en-US", { month: "short" }); // "NOV"
  const year = date.getFullYear().toString().slice(-2); // "24"

  console.log(weekday); // "THU"
  console.log(day); // "07"
  console.log(month); // "NOV"
  console.log(year); // "24"

  return (
    <div className="w-[90%] flex gap-1 max-h-[350px]">
      {/* date */}
      <div className="font-bold text-end text-shadow-xl text-lg">
        <p className="text-rose-900 ">{weekday}</p>
        <p>{day}</p>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      {/* card */}
      <div className="bg-white w-full shadow-lg">
        <Image
          src={event.image}
          width={500}
          height={500}
          alt=""
          className="bg-slate-700 w-full max-h-[70%] object-fill"
        />
        <div className="p-2">
          <h2 className="font-bold">{event.name}</h2>
          <p className="">{event.location}</p>
          <p className="text-sm text-[#EE7575]">{time}</p>
          {event.regLink && (
            <Link className="flex gap-2 items-center" href={event.regLink}>
              Register for Event <FaLongArrowAltRight size={25} />{" "}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventLayout;
