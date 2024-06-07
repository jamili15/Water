"use client";

import EmailVerification from "@/components/EmailVerification/forms/Main";
import MasterLayout from "@/components/layouts/MasterLayout";
import { usePartnerContext } from "@/context/PartnerContext";
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
      <EmailVerification moduleTitle=" waterworks online billing and payment" />
    </MasterLayout>
  );
}
