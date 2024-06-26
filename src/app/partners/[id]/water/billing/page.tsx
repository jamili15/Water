"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import PaymentInfo from "@/common/components/PayerInfo";
import MasterLayout from "@/common/layouts/MasterLayout";
import WaterBilling from "@/components/WaterBilling/WaterBilling";
import Bill from "@/components/WaterBilling/models/Bill";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  const [step, setStep] = useState<string>("email");
  const [bill, setBill] = useState<Bill | null>(null);
  let moduleTitle = "waterworks online billing and payment";

  const handleNextStep = () => {
    if (step === "email") {
      setStep("billing");
    } else if (step === "billing") {
      setStep("payerinfo");
    }
  };

  const handleCancel = () => {
    if (step === "billing") {
      setStep("email");
    } else if (step === "payerinfo") {
      setStep("billing");
    }
  };

  const billInfo = (bill: Bill) => {
    setBill(bill);
  };

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  return (
    <MasterLayout lgucaption={title} lguLogo={resources}>
      {step === "email" && (
        <EmailVerification
          moduleTitle={moduleTitle}
          onSuccess={handleNextStep}
        />
      )}
      {step === "billing" && (
        <WaterBilling
          moduleTitle={moduleTitle}
          onSuccess={handleNextStep}
          onCancel={handleCancel}
          billInfo={billInfo}
        />
      )}
      {step === "payerinfo" && (
        <PaymentInfo
          moduleTitle={moduleTitle}
          onSuccess={handleNextStep}
          onCancel={handleCancel}
          billAmount={bill?.amount || 0}
        />
      )}
      {["email", "billing", "payerinfo"].indexOf(step) === -1 && (
        <h1>Invalid Access</h1>
      )}
    </MasterLayout>
  );
}
