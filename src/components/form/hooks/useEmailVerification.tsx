import { usePartnerContext } from "@/context/PartnerContext";
import { useWaterBillingContext } from "@/context/WaterBillingContext";
import { lookupService } from "@/lib/client";
import { useState } from "react";

const useEmailVerification = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [key, setKey] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerAddress, setPayerAddress] = useState("");
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
  const { channelId } = usePartnerContext();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    setAcctno,
    setAcctName,
    setAddress,
    setClassification,
    setCoverage,
    setMonthName,
    setBillYear,
    setMeterSize,
    setPrevReading,
    setReading,
    setVolume,
    setAmount,
    setBillitems,
    billitems,
  } = useWaterBillingContext();
  const svcOTP = lookupService("OTPService");
  const svcAcct = lookupService("WaterService");

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
    setOtp(e.target.value);
  };

  const handleAccountNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNo(e.target.value);
    setAccountNoError(false);
  };

  const handlePayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayerName(e.target.value);
  };

  const handlePayerAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayerAddress(e.target.value);
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
    if (currentStep === 1) {
      if (emailAddress.trim() === "") {
        setShowEmailValidation(true);
        return;
      } else {
        const otp = await svcOTP?.invoke("generateOtp", {
          partnerid: channelId,
          contact: { email: emailAddress },
        });
        setKey(otp.key);
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const res = await svcOTP?.invoke("verifyOtp", {
        key: key,
        otp: otp,
      });
      if (res.error === "Invalid Key Value") {
        setShowInvalidKey(true);
      } else {
        setShowOTPField(true);
        setCurrentStep(3);
        setShowInvalidKey(false);
      }
    } else if (currentStep === 3) {
      try {
        const res = await svcAcct?.invoke("getBilling", {
          partnerid: channelId,
          refno: accountNo,
        });

        if (!res || res.error) {
          setAccountNoError(true);
          console.log("Invalid Account Number");
          return;
        }

        if (res) {
          setAcctno(res.acctno);
          setAcctName(res.acctname);
          setAddress(res.address.text);
          setClassification(res.classification.objid);
          setCoverage(`${res.fromdate}-${res.todate}`);
          setMonthName(res.monthname);
          setBillYear(res.billtoyear);
          setMeterSize(res.meter.size.title);
          setPrevReading(res.prevreading);
          setReading(res.reading);
          setVolume(res.volume);
          setAmount(res.amount);
          setBillitems(
            res.billitems.map((item: any) => ({
              amount: item.amount,
              discount: item.discount,
              interest: item.interest,
              particulars: item.particulars,
              surcharge: item.surcharge,
              total: item.total,
            }))
          );
        }
        console.log(res);
        setShowAccountNoField(true);
        setBillingInfo(true);
      } catch (error) {
        setBillingInfo(false);
        console.log("error", error);
      }
    }
  };

  const handleBackClick = () => {
    if (currentStep === 3 && !billingInfo) {
      setCurrentStep(1);
    } else if (currentStep === 3 && billingInfo) {
      setBillingInfo(false);
      setCurrentStep(3);
    } else if (currentStep > 1) {
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
  };
};

export default useEmailVerification;
