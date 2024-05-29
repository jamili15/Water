import React from "react";
import Image from "next/image";

interface HeaderProps {
  lgucaption?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ lgucaption, className }) => {
  return (
    <header className={`${className} bg-[#2c3e50] w-full h-14`}>
      <div className="flex gap-5 items-center h-full pl-16 text-xl text-white font-bold">
        <div>
          <Image
            src={"/lgu-logo.png"}
            height={45}
            width={45}
            quality={100}
            alt={"lgu-logo"}
            className="bg-white rounded-full"
          />
        </div>
        <p>{lgucaption}</p>
      </div>
    </header>
  );
};

export default Header;
