import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface HomeProps {
  children: React.ReactNode;
  lgucaption?: string | undefined;
}

const MasterLayout: React.FC<HomeProps> = ({ children, lgucaption }) => {
  return (
    <div className="flex flex-col items-center justify-between  min-h-screen">
      <Header lgucaption={lgucaption} />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer copyright={"@Copyright 2024 Filipizen"} />
    </div>
  );
};

export default MasterLayout;
