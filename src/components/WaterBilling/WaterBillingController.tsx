import { usePartnerContext } from "@/common/components/PartnerModel";
import { lookupService } from "@/common/lib/client";
import React, { useState } from "react";
import Bill from "./models/Bill";

const WaterBillingController = () => {
  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = React.useState(false);
  const { channelId } = usePartnerContext();
  const [bill, setBill] = useState<Bill | null>(null);
  const svc = lookupService("WaterService");

  const handleAccountNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNo(e.target.value);
    setAccountNoError(false);
  };

  const handleAccountClick = async () => {
    setLoading(true);
    try {
      const res = await svc?.invoke("getBilling", {
        refno: accountNo,
        partnerid: channelId,
      });
      if (res === undefined) {
        setAccountNoError(true);
      } else {
        setBill(new Bill(res));

        setCurrentStep(2);
      }
    } catch (error) {
      setAccountNoError(true);
    }
    setLoading(false);
  };

  const handleBillingClick = (onSuccess: any) => {
    setLoading(true);
    onSuccess();
    setLoading(false);
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setAccountNo("");
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    loading,
    onSubmit,
    currentStep,
    accountNo,
    accountNoError,
    bill,
    handleClose,
    handleClickOpen,
    handleBackClick,
    handleAccountClick,
    handleBillingClick,
    handleAccountNoChange,
  };
};
export default WaterBillingController;
