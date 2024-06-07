import { usePartnerContext } from "@/context/PartnerContext";
import { useWaterBillingContext } from "@/context/WaterBillingContext";
import { lookupService } from "@/lib/client";
import React, { useState } from "react";

const useEmailVerification = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [key, setKey] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [showAccountNoField, setShowAccountNoField] = useState(false);
  const [showInvalidKey, setShowInvalidKey] = useState(false);
  const [billingInfo, setBillingInfo] = useState(false);
  const [payerInfo, setPayerInfo] = useState(false);
  const [accountNoError, setAccountNoError] = useState(false);
  const [open, setOpen] = useState(false);
  const { channelId } = usePartnerContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = React.useState(false);
  const { setAcctno } = useWaterBillingContext();
  const svcOTP = lookupService("OTPService");

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    let formatted = cleaned.substring(0, 4);
    if (cleaned.length > 4) formatted += `) ${cleaned.substring(4, 7)}`;
    if (cleaned.length > 7) formatted += `-${cleaned.substring(7, 11)}`;
    return formatted ? `(${formatted}` : "";
  };

  const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmailAddress(input);
    checkFormEmptiness(input, phoneNumber);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(input);
    setIsValidEmail(input.trim() === "" || isValidEmail);
    setShowEmailValidation(!isEmailFocused && !isValidEmail);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
    checkFormEmptiness(emailAddress, formattedPhoneNumber);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otpInput = e.target.value;
    setOtp(otpInput);
    setShowInvalidKey(false);
  };

  const handleAccountNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNo(e.target.value);
    setAccountNoError(false);
  };

  const checkFormEmptiness = (email: string, phone: string) => {
    setIsFormEmpty(email.trim() === "" && phone.trim() === "");
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    setShowEmailValidation(!isValidEmail);
  };

  const handleNextClick = async () => {
    setLoading(true);
    if (currentStep === 1) {
      if (emailAddress.trim() === "") {
        setShowEmailValidation(true);
        setLoading(false);
        return;
      } else {
        const otp = await svcOTP?.invoke("generateOtp", {
          partnerid: channelId,
          contact: { email: emailAddress },
        });
        setKey(otp.key);
        setCurrentStep(2);
        setLoading(false);
      }
    } else if (currentStep === 2) {
      if (otp.trim().length !== 6) {
        setShowInvalidKey(true);
        setLoading(false);
        return;
      }
      const res = await svcOTP?.invoke("verifyOtp", {
        key: key,
        otp: otp,
      });
      if (res.error === "Invalid Key Value") {
        setShowInvalidKey(true);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleBackClick = () => {
    if (currentStep === 3 && !billingInfo) {
      setCurrentStep(1);
    } else if (currentStep === 3 && billingInfo) {
      setBillingInfo(false);
      setShowAccountNoField(false); // Reset relevant state variables
      setCurrentStep(2); // Go back to step 2
    } else if (currentStep === 4) {
      // Handle going back from billingInfo step
      setBillingInfo(false);
      setShowAccountNoField(false); // Reset relevant state variables
      setCurrentStep(3); // Go back to step 3
    } else if (currentStep === 5) {
      // Handle going back from PayerInfo step
      setPayerInfo(false);
      setCurrentStep(4); // Go back to billingInfo step
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const otp = await svcOTP?.invoke("generateOtp", {
        partnerid: channelId,
        contact: { email: emailAddress },
      });
      setKey(otp.key);
      setLoading(false);
      setOpen(false); // Close the dialog after successful resend
    } catch (error) {
      console.error("Error resending OTP:", error);
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.emailAddress) {
      errors.emailAddress = "Email is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!values.otp && showOTPField) {
      errors.otp = "OTP is required";
    }

    return errors;
  };

  return {
    emailAddress,
    phoneNumber,
    otp,
    accountNo,
    isFormEmpty,
    isEmailFocused,
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
    payerInfo,
    loading,
    handleResendOTP,
  };
};

export default useEmailVerification;
