// useEmailVerification

import { useState, useEffect } from "react";

const useEmailVerification = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [showAccountNoField, setShowAccountNoField] = useState(false);
  const [showInvalidKey, setShowInvalidKey] = useState(false);
  const [billingInfo, setBillingInfo] = useState(false);
  const [accountNoError, setAccountNoError] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
    setOTP(e.target.value);
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

  const otpValidationFunction = (enteredOTP: any) => {
    const correctOTP = "123456";
    return enteredOTP === correctOTP;
  };
  //
  const handleNextClick = () => {
    if (currentStep === 1) {
      if (emailAddress.trim() === "") {
        setShowEmailValidation(true);
        return;
      }
      setCurrentStep(2); // Move to OTP step
    } else if (currentStep === 2) {
      const isOTPValid = otpValidationFunction(otp);
      if (!isOTPValid) {
        setShowInvalidKey(true);
      } else {
        setCurrentStep(3); // Move to account number step
        setShowInvalidKey(false);
      }
    } else if (currentStep === 3) {
      if (accountNo === "240000669") {
        setBillingInfo(true);
      } else {
        setAccountNoError(true);
      }
    }
  };

  const handleBackClick = () => {
    if (currentStep === 3 && !billingInfo) {
      // If on the account number step, go back to the email and phone number step
      setCurrentStep(1);
    } else if (currentStep === 3 && billingInfo) {
      // If on the billing information step, go back to the account number step
      setBillingInfo(false);
      setCurrentStep(3);
    } else if (currentStep > 1) {
      // Otherwise, go back to the previous step
      setCurrentStep(currentStep - 1);
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
    if (!values.accountNo && showAccountNoField) {
      errors.accountNo = "value is required";
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
    currentStep,
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
  };
};

export default useEmailVerification;
