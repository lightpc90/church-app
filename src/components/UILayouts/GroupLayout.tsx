import Image from "next/image";
import GroupModal from "./GroupModal";

type GroupLayoutPropsType = {
  group: {
    name: string;
    desc?: string;
    link: string;
    action?: string;
    image?: string;
  };
};

const GroupLayout = ({ group }: GroupLayoutPropsType) => {
  const id = group.link.split("#")[1];
  return (
    <article
      id={id}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        {group.image && (
          <Image
            src={group.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-medium text-ink">{group.name}</h3>
        {group.desc && <p className="mt-2 text-stone">{group.desc}</p>}
        <div className="mt-auto pt-6">
          <GroupModal group={group} />
        </div>
      </div>
    </article>
  );
};

export default GroupLayout;
