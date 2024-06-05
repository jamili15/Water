import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface HomeProps {
  children: React.ReactNode;
  lgucaption?: string | undefined;
  lguLogo: string;
}

const MasterLayout: React.FC<HomeProps> = ({
  children,
  lgucaption,
  lguLogo,
}) => {
  return (
    <div className="flex flex-col items-center justify-between  min-h-screen">
      <Header lguLogo={lguLogo} lgucaption={lgucaption} />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer copyright={"@Copyright 2024 Filipizen"} />
    </div>
  );
};

export default MasterLayout;
