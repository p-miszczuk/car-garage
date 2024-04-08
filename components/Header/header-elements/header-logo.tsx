import Image from "next/image";
import LogoIcon from "@/shares/images/logo-icon.svg";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image priority src={LogoIcon} alt="Logo" width={30} height={30} />
      <div className="text-2xl font-bold">CAR GARAGE</div>
    </div>
  );
};

export default HeaderLogo;
