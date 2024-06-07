// EmailVerification.tsx

"use client";
import BillingInfo from "@/components/form/BillingInfo";
import PayerInfo from "@/components/form/PayerInfo";
import RefAccount from "@/components/form/RefAccount";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React from "react";
import { Form } from "react-final-form";
import useEmailVerification from "../../form/hooks/useEmailVerification";

interface LoginFromProps {
  moduleTitle: string;
  subTitle?: string;
  description?: string;
  onChangeAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BouncedTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "showEmailValidation",
})<{ showEmailValidation: boolean }>(({ showEmailValidation }) => ({
  "& .MuiFormLabel-root": {
    transition: "color 0.2s, transform 0.2s",
    ...(showEmailValidation && {
      animation: "bounce 0.2s ease-in-out 1.5",
      color: "#b00020",
    }),
  },
}));

const EmailVerification: React.FC<LoginFromProps> = ({
  moduleTitle,
  onChangeAccount,
}) => {
  const {
    otp,
    accountNo,
    isFormEmpty,
    isValidEmail,
    showEmailValidation,
    showInvalidKey,
    billingInfo,
    accountNoError,
    open,
    handleEmailAddressChange,
    handlePhoneNumberChange,
    handleOTPChange,
    handleAccountNoChange,
    handleEmailFocus,
    handleEmailBlur,
    handleNextClick,
    handleBackClick,
    onSubmit,
    handleClickOpen,
    handleClose,
    validate,
    currentStep,
    payerInfo,
    loading,
    handleResendOTP,
  } = useEmailVerification();

  let descriptionText = "";
  let subTitleText = "";

  if (!billingInfo) {
    if (currentStep === 1) {
      descriptionText =
        "A validation key will be sent to your email or mobile phone. Please make sure your email is valid and you have access to it.";
      subTitleText = "Email Verification";
    } else if (currentStep === 2) {
      descriptionText =
        "Please check your email inbox or spam folder for the sent 6-digit validation key. If you have not received any Email Verification, please click resend code.";
      subTitleText = "Email Verification";
    } else if (currentStep === 3) {
      descriptionText = "Please enter your Account number.";
      subTitleText = "Initial Information";
    }
  } else if (currentStep === 4) {
    subTitleText = "Billing Information";
  } else if (currentStep === 5) {
    subTitleText = "Payment Information";
    descriptionText = "Please fill in the Payer Name and Payer Address";
  }

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAccountNoChange(e);
    if (onChangeAccount) onChangeAccount(e);
  };

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitleText}
          </h2>
          {showInvalidKey && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
              Invalid Key Value
            </p>
          )}
          {accountNoError && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
              Incorrect Account Number. Please check and try again.
            </p>
          )}
          <p>{descriptionText}</p>
        </div>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col w-full gap-6">
                {currentStep === 3 && !billingInfo && (
                  <RefAccount
                    value={accountNo}
                    onChange={handleAccountChange}
                    error={accountNoError}
                    helperText={accountNoError && "Incorrect account number."}
                  />
                )}
                {currentStep === 4 && billingInfo && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <BillingInfo />
                  </div>
                )}

                {currentStep === 5 && billingInfo && payerInfo && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <PayerInfo onBack={handleBackClick} />
                  </div>
                )}
              </div>
              <>
                <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
                <div className="flex items-center justify-between px-5 w-full ">
                  <Button
                    className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                    size="medium"
                    onClick={handleBackClick}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    size="medium"
                    onClick={handleNextClick}
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
                    disabled={
                      isFormEmpty ||
                      !isValidEmail ||
                      (currentStep === 2 && otp.length !== 6) ||
                      (currentStep === 3 && !accountNo)
                    }
                    className={`${
                      isFormEmpty ||
                      loading ||
                      (currentStep === 2 && otp.length !== 6) ||
                      (currentStep === 3 && !accountNo)
                        ? "bg-gray-200 font-bold text-gray-500 !border-none"
                        : "bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                    }`}
                  >
                    {billingInfo ? "Confirm Payment" : "Next"}
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

export default EmailVerification;
