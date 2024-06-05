"use client";

import { lookupService } from "@/lib/client";
import { useState } from "react";

export default function MainPage(): JSX.Element {
  const [otp, setOtp] = useState<Record<string, any>>({});
  const [error, setError] = useState();

  const svc = lookupService("OTPService");

  const generateOtp = async () => {
    const otp = await svc?.invoke("generateOtp", {
      partnerid: "154",
      contact: { email: "gg@g.com" },
    });
    console.log("OTP", otp);
    setOtp(otp);
  };

  const verifyOtp = async () => {
    const res = await svc?.invoke("verifyOtp", {
      key: otp.key,
      otp: otp.enteredKey,
    });
    setError(res.error);
  };

  return (
    <div>
      <h1>OTP Test </h1>
      <h2>Error: {error}</h2>
      <pre>{JSON.stringify(otp, null, 2)}</pre>
      <button
        onClick={generateOtp}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Generate OTP
      </button>
      <button
        onClick={verifyOtp}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Verify OTP
      </button>
    </div>
  );
}

528422;
