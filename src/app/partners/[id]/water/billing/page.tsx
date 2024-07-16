"use client";

import EmailVerification from "@/common/components/Email/EmailVerification";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import PayerInfo from "@/common/components/Payer/PayerInfo";
import MasterLayout from "@/common/layouts/MasterLayout";
import PageFlow from "@/common/ui/PageFlow";
import AccountRef from "@/components/WaterBilling/AccountRef";
import BillingInfo from "@/components/WaterBilling/BillingInfo";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { setId, resources, partner } = usePartnerContext();
  let moduleTitle = "waterworks online billing and payment";

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  const pages = [
    {
      name: "Email Verification",
      caption: "Email Verification",
      Component: EmailVerification,
    },
    {
      name: "Account No",
      caption: "Account No",
      Component: AccountRef,
    },
    {
      name: "Billing Information",
      caption: "Billing Information",
      Component: BillingInfo,
    },
    {
      name: "Payer Information",
      caption: "Confirm Transaction",
      Component: PayerInfo,
    },
  ];

  return (
    <MasterLayout lgucaption={partner?.title} lguLogo={resources}>
      <PageFlow title={moduleTitle} pages={pages} />
    </MasterLayout>
  );
}
