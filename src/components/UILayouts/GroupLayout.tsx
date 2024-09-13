import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type GroupLayoutPropsType = {
 
  group: {
    name: string;
    desc: string;
    link: string;
    action: string;
    image: string ;
  };
};

const GroupLayout: FC<GroupLayoutPropsType> = ({ group }) => {
  return (
    <div className="w-full p-3 flex items-center gap-3 shadow-lg bg-white">
      <Image
        src={group.image}
        width={500}
        height={500}
        alt=""
        className="bg-slate-700 w-[90px] h-[90px]"
      />
      <div className="">
        <h3 className="text-xl font-bold">{group.name}</h3>
        <h3 className="text-rose-800 text-sm">{group.desc}</h3>
       <Link href={group.link} className="bg-blue-950 px-2 py-1 shadow-xl text-white rounded-md" >
       {group.action}
       </Link>
      </div>
    </div>
  );
};

export default GroupLayout;
