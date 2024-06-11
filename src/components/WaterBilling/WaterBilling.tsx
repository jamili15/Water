// EmailVerification.tsx

"use client";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import React from "react";
import { Form } from "react-final-form";
import BillingInfo from "./BillingInfo";
import RefAccount from "./RefAccount";
import WaterBillingController from "./WaterBillingController";

interface WaterBillingProps {
  moduleTitle: string;
  subTitle?: string;
  description?: string;
  onChangeAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
  onBack: () => void;
}

const WaterBilling: React.FC<WaterBillingProps> = ({
  moduleTitle,
  onBack,
  onSuccess,
}) => {
  const {
    onSubmit,
    currentStep,
    loading,
    accountNo,
    handleAccountNoChange,
    accountNoError,
    handleBackClick,
    handleAccountClick,
    handleBillingClick,
  } = WaterBillingController();

  const handlePaymentClick = () => {
    handleBillingClick(onSuccess);
  };

  let descriptionText = "";
  let subTitleText = "";

  if (currentStep === 1) {
    descriptionText = "Please enter your Account number.";
    subTitleText = "Initial Information";
  } else if (currentStep === 2) {
    subTitleText = "Billing Information";
  } else if (currentStep === 3) {
    subTitleText = "Payment Information";
    descriptionText = "Please fill in the Payer Name and Payer Address";
  }

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitleText}
          </h2>

          <p>{descriptionText}</p>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col w-full gap-6">
                {currentStep === 1 && (
                  <RefAccount
                    value={accountNo}
                    onChange={handleAccountNoChange}
                    error={accountNoError}
                    helperText={accountNoError && "Incorrect account number."}
                  />
                )}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <BillingInfo accountNo={accountNo} />
                  </div>
                )}
              </div>
              <>
                <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
                <div className="flex items-center justify-between px-5 w-full ">
                  <Button
                    className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                    size="medium"
                    onClick={currentStep === 1 ? onBack : handleBackClick}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    size="medium"
                    onClick={
                      currentStep === 1
                        ? handleAccountClick
                        : handlePaymentClick
                    }
                    endIcon={
                      <SendIcon
                        className={`${
                          loading ? "block text-transparent" : "hidden"
                        }`}
                      />
                    }
                    loading={loading}
                    loadingPosition="end"
                    variant="outlined"
                    className="bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                  >
                    {currentStep === 2 ? "Confirm Payment" : "Next"}
                  </LoadingButton>
                </div>
              </>
            </form>
          )}
        />
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default WaterBilling;
