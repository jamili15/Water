// EmailVerification.tsx

"use client";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { timeout } from "@/common/helpers";
import { Button } from "@/common/io/Button";
import { Text } from "@/common/io/Text";
import { lookupService } from "@/common/lib/client";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import { required } from "@/common/validators";
import { Bill } from "@/types";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const AccountRef = (props: any) => {
  const { partner } = usePartnerContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const svc = lookupService("WaterService");

  let descriptionText = "Please enter your Account number.";

  const handleClickNext = async () => {
    setLoading(true);
    try {
      await timeout(2);
      const bill: Bill = await svc?.invoke("getBilling", {
        refno: props.formValues.accountNo,
        partnerid: partner?.channelid,
      });
      if (bill === undefined) {
        setError("Invalid Account Number");
      } else {
        props.form.change("bill", bill);
        props.onSubmit();
      }
    } catch (error) {
      console.log("error => ", error);
    }
    setLoading(false);
  };

  return (
    <Card
      title={props.title}
      subTitleText={props.page.caption}
      description={descriptionText}
      error={error}
    >
      <Text
        name="accountNo"
        label="Account No."
        validate={required}
        variant="standard"
      />
      <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
      <ActionBar>
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button
          onClick={handleClickNext}
          disabled={props.hasValidationErrors || loading}
        >
          Next
          {loading ? <CircularProgress thickness={5} size={24} /> : ""}
        </Button>
      </ActionBar>
    </Card>
  );
};

export default AccountRef;
