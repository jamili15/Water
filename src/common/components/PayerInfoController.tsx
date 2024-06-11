import { lookupService } from "@/common/lib/client";
import React, { useState } from "react";

const PaymentInfoController = () => {
  const [payerName, setPayerName] = useState("");
  const [payerAddr, setPayerAddr] = useState("");
  const [payerNameError, setPayerNameError] = useState(false);
  const [payerAddrError, setPayerAddrError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const svc = lookupService("WaterService");

  const handlePayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayerName(e.target.value);
    setPayerNameError(false);
  };

  const handlePayerAddrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayerAddr(e.target.value);
    setPayerAddrError(false);
  };

  const handleNextClick = async () => {
    setLoading(true);
    setPayerNameError(false);
    setPayerAddrError(false);

    if (payerName === "") {
      setPayerNameError(true);
    }

    if (payerAddr === "") {
      setPayerAddrError(true);
    }

    if (payerName !== "" && payerAddr !== "") {
      console.log("E-payment Page");
    }

    setLoading(false);
  };

  const handleBackClick = () => {};

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    loading,
    onSubmit,
    payerName,
    payerAddr,
    payerNameError,
    payerAddrError,
    handlePayerNameChange,
    handlePayerAddrChange,
    handleNextClick,
    handleBackClick,
  };
};
export default PaymentInfoController;
