import Image from "next/image";
import banner1 from "../../public/nature.jpg";
import banner2 from "../../public/7.jpg";
import banner3 from "../../public/pastorAndfamily.jpg"
import banner4 from '../../public/fullChoir.jpg'
import banner5 from '../../public/randomChurchPic.jpg'
import banner6 from '../../public/randomChurchPic2.jpg'
import { CarouselPlugin } from "@/components/Carousel";
import { EmblaOptionsType } from "embla-carousel";


const Items = [
  banner1.src,
  banner2.src,
  banner3.src,
  banner4.src,
  banner5.src,
  banner6.src,
];
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between ">
      {/* Banner */}
      <section
        className="bg-gradient-to-tr from-purple-400 via-blue-400 
      to-purple-800 py-10 h-[250px] md:h-[600px] lg:h-[900px] flex items-center justify-center 
      relative overflow-hidden"
      >
        <CarouselPlugin slides={Items} options={OPTIONS} />
        <div className="flex items-center lg:p-20 bg-gradient-to-t from-zinc-800 via-slate-800 opacity-90 w-full h-full absolute z-30">
          <div className="flex flex-col text-white gap-5 font-bold lg:w-5/12 lg:pt-[50px]">
            <p className="lg:text-[50px]   ">
              Experience Gods Love through worship and fellowship at our Church.{" "}
            </p>
            <p className="lg:text-2xl">
              Experience a welcoming community and uplifting sermons at our
              church. All are welcome. Visit us and reach out with any question
            </p>
            {/* buttons */}
            <div className="flex gap-4 mt-5">
              <button className="bg-rose-800 lg:py-3 lg:px-4 rounded-full">Connect with Us</button>
              <button className="border py-3 px-4 rounded-full">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* contents */}
      <div className="flex flex-col gap-20 lg:p-[50px]">
        {/* welcome */}
        <div className="flex flex-col gap-2 p-[20px] items-center justify-center ">
          <h1 className="text-xl font-bold ">Welcome to RCCG Beautiful Gate</h1>
          <p className="text-lg ">
            A place of worship, a place of love, a place of hope, a place of
            peace
          </p>
        </div>

        {/* About Us */}
        <div className=" flex flex-col lg:flex-warp gap-2 items-center justify-center w-full ">
          <p className=" text-lg lg:flex-1 p-[20px] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            nesciunt autem explicabo laboriosam culpa, quam id rem ea aliquid
            vel itaque minus dolores veniam ex. Rerum provident ipsa tempora
            deserunt. A place of worship, a place of love, a place of hope, a
            place of peace
          </p>
          <div className=" lg:flex-1 bg-zinc-800 h-[500px] w-full lg:w-[400px] "></div>
        </div>
      </div>
    </main>
  );
}
