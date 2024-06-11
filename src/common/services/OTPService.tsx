import { Service } from "@/common/lib/server";

const SECRET_KEY = "U0VDUkVUX2tleQ";

export const generateOtp = async ({
  partnerid,
  contact,
  connection,
}: {
  partnerid: string;
  contact: Record<string, any>;
  connection: string;
}) => {
  try {
    const svc = Service.lookup(`${partnerid}:VerifyEmailService`, connection);
    const otp = await svc.invoke("verifyEmail", contact);
    return await encryptKey(otp);
  } catch (error) {
    console.log("generate otp error:", error);
  }
};

export const verifyOtp = async ({ otp, key }: { otp: string; key: string }) => {
  try {
    const res = await doVerifyOtp({
      otp,
      key,
      secretkey: SECRET_KEY,
    });
    return res;
  } catch (err) {
    return {
      status: "ERROR",
      error: "Unable to validate OTP. Please try again.",
    };
  }
};

const encryptKey = async (otp: Record<string, any>) => {
  const encryptParam = { ...otp, secretkey: SECRET_KEY };
  const svc = Service.lookup("CloudOTPService", "partner");
  const res = await svc.invoke("encrypt", encryptParam);
  otp.status = res.status;
  otp.error = res.msg;
  otp.key = res.value;
  return otp;
};

const doVerifyOtp = async (otp: Record<string, any>) => {
  const verifyParam = {
    key: otp.otp,
    value: otp.key,
    secretkey: SECRET_KEY,
  };
  const svc = Service.lookup("CloudOTPService", "partner");
  return await svc.invoke("verify", verifyParam);
};
