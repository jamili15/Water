import Service from "@/lib/server/remote-service";

export const getBilling = async ({
  partnerid,
  refno,
}: {
  partnerid: string;
  refno: string;
}) => {
  const svc = Service.lookup(`${partnerid}:OnlineWaterBillingService`, "water");
  const data = await svc.invoke("getBilling", { refno: refno });
  return data;
};
