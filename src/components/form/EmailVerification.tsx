"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React from "react";
import { Field, Form } from "react-final-form";
import BillingInfo from "./BillingInfo";
import RefAccount from "./RefAccount";
import useEmailVerification from "./hooks/useEmailVerification"; // Adjust the path as needed

interface LoginFromProps {
  moduleTitle: string;
  subTitle?: string;
  description?: string;
  emailaddress?: string;
  onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileno?: number | string;
  onChangeMobile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otp?: string;
  onChangeOTP?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refno?: number | string;
  onChangeAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BouncedTextField = styled(TextField)<{ showEmailValidation: boolean }>(
  ({ showEmailValidation }) => ({
    "& .MuiFormLabel-root": {
      transition: "color 0.2s, transform 0.2s",
      ...(showEmailValidation && {
        animation: "bounce 0.2s ease-in-out 1.5",
        color: "#b00020",
      }),
    },
  })
);

const EmailVerification: React.FC<LoginFromProps> = ({
  moduleTitle,
  subTitle,
  description,
  emailaddress: valueEmail,
  onChangeEmail,
  mobileno,
  onChangeMobile,
  otp: initialotp,
  onChangeOTP,
  refno,
  onChangeAccount,
}) => {
  const {
    emailAddress,
    phoneNumber,
    otp,
    accountNo,
    isFormEmpty,
    isValidEmail,
    showEmailValidation,
    showOTPField,
    showAccountNoField,
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
  } else {
    subTitleText = "Billing Information";
  }

  const ariaLabel = { "aria-label": "description" };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEmailAddressChange(e);
    if (onChangeEmail) onChangeEmail(e);
  };
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneNumberChange(e);
    if (onChangeMobile) onChangeMobile(e);
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOTPChange(e);
    if (onChangeOTP) onChangeOTP(e);
  };
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAccountNoChange(e);
    if (onChangeAccount) onChangeAccount(e);
  };

  return (
    <div
      className={`bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]`}
    >
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
          <p>{descriptionText}</p>
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            emailAddress: valueEmail,
            phoneNumber: mobileno,
            otp: initialotp,
            accountNo: refno,
          }}
          validate={validate}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col w-full gap-6">
                {currentStep === 1 && (
                  <>
                    <Field
                      name="emailAddress"
                      render={({ input, meta }) => (
                        <BouncedTextField
                          {...input}
                          error={showEmailValidation}
                          value={emailAddress}
                          onChange={handleEmailChange}
                          onFocus={handleEmailFocus}
                          onBlur={handleEmailBlur}
                          id="standard-basic"
                          label="Email Address"
                          variant="standard"
                          required
                          helperText={
                            showEmailValidation ? "Incorrect entry." : ""
                          }
                          showEmailValidation={showEmailValidation}
                        />
                      )}
                    />
                    <Field
                      name="phoneNumber"
                      render={({ input, meta }) => (
                        <TextField
                          {...input}
                          placeholder="(0000) 000-0000"
                          label="Mobile No."
                          variant="standard"
                          value={phoneNumber}
                          onChange={handleMobileChange}
                          inputProps={ariaLabel}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className="w-full"
                        />
                      )}
                    />
                  </>
                )}
                {currentStep === 2 && !billingInfo && (
                  <div className="!w-full">
                    <Field
                      name="otp"
                      render={({ input, meta }) => (
                        <div>
                          <TextField
                            {...input}
                            value={otp}
                            onChange={handleOtpChange}
                            id="otp"
                            label="OTP"
                            variant="standard"
                            className="w-full"
                            required
                          />
                        </div>
                      )}
                    />
                    <div className="!w-full">
                      <Button
                        className="float-right hover:bg-transparent mt-5 text-gray-500"
                        onClick={handleClickOpen}
                      >
                        Resend OTP
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title" className="pr-32">
                          Email Verification
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Resend OTP?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleClose}
                            className="text-[#6200EE] hover:bg-[#b898e626]"
                            size="small"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleClose}
                            className="bg-[#6200EE] hover:bg-[#7319f0] !text-white"
                            autoFocus
                            size="small"
                            variant="contained"
                          >
                            OK
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                )}
                {currentStep === 3 && !billingInfo && (
                  <RefAccount
                    value={accountNo}
                    onChange={handleAccountChange}
                    error={accountNoError}
                    helperText={accountNoError}
                  />
                )}
                {billingInfo && (
                  <div className="flex flex-col items-center justify-center w-full">
                    {/*  */}

                    <BillingInfo onBack={handleBackClick} />
                  </div>
                )}
              </div>
              {!billingInfo && (
                <>
                  <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
                  <div className="flex items-center justify-between px-5 w-full ">
                    <Button
                      className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                      size="large"
                      onClick={handleBackClick}
                    >
                      Back
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={isFormEmpty || !isValidEmail}
                      onClick={handleNextClick}
                      type="submit"
                      size="large"
                      className={`${
                        isFormEmpty
                          ? "bg-gray-200 font-bold text-gray-500 !border-none "
                          : "bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                      }`}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
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
