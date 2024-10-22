import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import GroupModal from "./GroupModal";

type GroupLayoutPropsType = {
 
  group: {
    name: string;
    desc?: string;
    link: string;
    action?: string;
    image?: string ;
  };
};

const GroupLayout: FC<GroupLayoutPropsType> = ({ group }) => {
  const id = group.link.split('#')[1]
  console.log('id: ', id)
  return (
    <div
      id={id}
      className="w-full p-3 flex items-center gap-3 shadow-lg bg-white"
    >
      <Image
        src={group.image || ""}
        width={500}
        height={500}
        alt=""
        className="bg-slate-700 w-[90px] h-[90px]"
      />
      <div className="">
        <h3 className="text-xl font-bold">{group.name}</h3>
        <h3 className="text-rose-800 text-sm mb-2">{group.desc}</h3>
        <GroupModal group={group}/>
      </div>
    </div>
  );
};

export default GroupLayout;
