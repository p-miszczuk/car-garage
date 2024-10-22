"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Vehicles from "../../public/assets/images/vehicles.svg";
import Vehicle from "../../public/assets/images/vehicle.svg";
import Report from "../../public/assets/images/report.svg";
import Reminder from "../../public/assets/images/reminder.svg";

type Props = {
  title: string;
  image: string;
  path: string;
};

type BoxesMenuViewProps = Readonly<Props>;

const ICONS = {
  "vehicles-img": Vehicles,
  "vehicle-img": Vehicle,
  "reminder-img": Reminder,
  "report-img": Report,
} as const;

const BoxesMenuView = ({ image, title, path }: BoxesMenuViewProps) => {
  const router = useRouter();

  const handleClickBox = () => {
    router.push(path);
  };

  return (
    <div
      className={`flex justify-center items-center h-full relative cursor-pointer hover:scale-110 duration-300`}
      onClick={handleClickBox}
    >
      <Image
        className="absolute top-0 left-0 w-full"
        priority={false}
        src={ICONS[image as keyof typeof ICONS]}
        alt={image}
        width={30}
        height={30}
      />
      <div className="text-4xl font-bold text-center z-10">{title}</div>
    </div>
  );
};

export default BoxesMenuView;
