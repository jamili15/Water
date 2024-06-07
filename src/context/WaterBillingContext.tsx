"use client";

import { createContext, useContext, useState } from "react";

interface WaterBillingContextTypeProps {
  children: React.ReactNode;
}

interface WaterBillingContextType {
  acctno: string;
  setAcctno: (acctno: string) => void;
}

const WaterBillingContext = createContext<WaterBillingContextType | undefined>(
  undefined
);

export const WaterBillingProvider: React.FC<WaterBillingContextTypeProps> = ({
  children,
}) => {
  const [acctno, setAcctno] = useState("");

  return (
    <WaterBillingContext.Provider
      value={{
        acctno,
        setAcctno,
      }}
    >
      {children}
    </WaterBillingContext.Provider>
  );
};

export const useWaterBillingContext = () => {
  const context = useContext(WaterBillingContext);
  if (!context) {
    throw new Error(
      "useWaterBillingContext must be used within a WaterBillingProvider"
    );
  }
  return context;
};
