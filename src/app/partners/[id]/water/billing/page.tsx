"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import MasterLayout from "@/components/layouts/MasterLayout";

import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  let step = "email";

  const handler = () => {
    step = "billing";
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
          onSuccess={handler}
        />
      </MasterLayout>
    );
  } else if (step === "billing") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <h1>Water</h1>
        {/* <WaterBilling moduleTitle={" waterworks online billing and payment"} /> */}
      </MasterLayout>
    );
  }

  return (
    <MasterLayout lgucaption={title} lguLogo={resources}>
      <h1>Invalid Access</h1>
    </MasterLayout>
  );
}
