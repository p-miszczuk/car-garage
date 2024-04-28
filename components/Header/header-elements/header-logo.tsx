import Image from "next/image";
import LogoIcon from "@/shares/images/logo-icon.svg";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        priority={false}
        src={LogoIcon}
        alt="Logo-car-garage"
        width={30}
        height={30}
      />
      <div className="text-2xl font-bold" data-testid="logo-name">
        CAR GARAGE
      </div>
    </div>
  );
};

export default HeaderLogo;
