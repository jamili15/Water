import connections from "@/common/lib/server/connections";

const EPAYMENT_HOST = connections["epayment"]["app.host"];

export const checkout = async (params: Record<string, any>) => {
  const data = {
    serviceName: "EPaymentService",
    method: "checkout",
    data: params,
  };
  const res = await fetch(`${EPAYMENT_HOST}/api/service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_CLOUD_API_AUTHORIZATION || "",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const jsonData = await res.json();
    return {
      redirect: true,
      url: `${EPAYMENT_HOST}/checkout/v1/checkout/${jsonData.data.checkoutid}`,
    };
  } else {
    return {
      status: "ERROR",
      error: res.statusText,
    };
  }
};
