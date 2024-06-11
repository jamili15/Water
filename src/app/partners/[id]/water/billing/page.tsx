"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import PaymentInfo from "@/common/components/PayerInfo";
import MasterLayout from "@/common/layouts/MasterLayout";
import WaterBilling from "@/components/WaterBilling/WaterBilling";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  const [step, setStep] = useState<string>("email");

  const handleNextStep = () => {
    if (step === "email") {
      setStep("billing");
    } else if (step === "billing") {
      setStep("payerinfo");
    }
  };

  const handleBackStep = () => {
    if (step === "billing") {
      setStep("email");
    } else if (step === "payerinfo") {
      setStep("billing");
    }
  };

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  if (step === "email") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <EmailVerification
          moduleTitle=" waterworks online billing and payment"
          onSuccess={handleNextStep}
        />
      </MasterLayout>
    );
  } else if (step === "billing") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <WaterBilling
          moduleTitle={" waterworks online billing and payment"}
          onSuccess={handleNextStep}
          onBack={handleBackStep}
        />
      </MasterLayout>
    );
  } else if (step === "payerinfo") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <PaymentInfo
          moduleTitle={" waterworks online billing and payment"}
          onSuccess={handleNextStep}
          onBack={handleBackStep}
        />
      </MasterLayout>
    );
  }

  return (
    <MasterLayout lgucaption={title} lguLogo={resources}>
      <h1>Invalid Access</h1>
    </MasterLayout>
  );
}
