"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import MasterLayout from "@/common/layouts/MasterLayout";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  const handler = () => {};

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  return (
    <MasterLayout lgucaption={title} lguLogo={resources}>
      <EmailVerification
        moduleTitle="Sample Online Billing"
        onSuccess={handler}
      />
    </MasterLayout>
  );
}
