"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WaterBillingContextTypeProps {
  children: React.ReactNode;
}

interface BillItem {
  amount: number;
  discount: number;
  interest: number;
  particulars: string;
  surcharge: number;
  total: number;
}

interface WaterBillingContextType {
  acctno: string;
  acctName: string;
  address: string;
  classification: string;
  coverage: string;
  monthName: string;
  billYear: string;
  meterSize: string;
  prevReading: string;
  reading: string;
  volume: number;
  amount: string;
  billitems: BillItem[];
  penalty: number;
  setAcctno: (acctno: string) => void;
  setAcctName: (acctName: string) => void;
  setAddress: (accaddresstno: string) => void;
  setClassification: (classification: string) => void;
  setCoverage: (coverage: string) => void;
  setMonthName: (monthName: string) => void;
  setBillYear: (billYear: string) => void;
  setMeterSize: (meterSize: string) => void;
  setPrevReading: (prevReading: string) => void;
  setReading: (reading: string) => void;
  setVolume: (volume: number) => void;
  setAmount: (amount: string) => void;
  setBillitems: (billitems: any[]) => void;
  calculatePenalty: () => void;
}

const WaterBillingContext = createContext<WaterBillingContextType | undefined>(
  undefined
);

export const WaterBillingProvider: React.FC<WaterBillingContextTypeProps> = ({
  children,
}) => {
  const [acctno, setAcctno] = useState("");
  const [acctName, setAcctName] = useState("");
  const [address, setAddress] = useState("");
  const [classification, setClassification] = useState("");
  const [coverage, setCoverage] = useState("");
  const [monthName, setMonthName] = useState("");
  const [billYear, setBillYear] = useState("");
  const [meterSize, setMeterSize] = useState("");
  const [prevReading, setPrevReading] = useState("");
  const [reading, setReading] = useState("");
  const [volume, setVolume] = useState<number>(0);
  const [amount, setAmount] = useState("");
  const [billitems, setBillitems] = useState<BillItem[]>([]);
  const [penalty, setPenalty] = useState<number>(0);

  const calculatePenalty = () => {
    const totalPenalty = billitems.reduce((acc, item) => {
      const surcharge = item.surcharge !== null ? item.surcharge : 0;
      const interest = item.interest !== null ? item.interest : 0;
      return surcharge + interest;
    }, 0);
    setPenalty(totalPenalty);
  };

  useEffect(() => {
    calculatePenalty();
  }, [billitems]);

  return (
    <WaterBillingContext.Provider
      value={{
        acctno,
        acctName,
        address,
        classification,
        coverage,
        monthName,
        billYear,
        meterSize,
        prevReading,
        reading,
        volume,
        amount,
        billitems,
        penalty,
        setAcctno,
        setAcctName,
        setAddress,
        setClassification,
        setCoverage,
        setMonthName,
        setBillYear,
        setMeterSize,
        setPrevReading,
        setReading,
        setVolume,
        setAmount,
        setBillitems,
        calculatePenalty,
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
