import Service from "@/common/lib/server/remote-service";
import { Bill, BillItem } from "../types";

export const getBilling = async ({
  partnerid,
  refno,
}: {
  partnerid: string;
  refno: string;
}): Promise<Bill> => {
  const svc = Service.lookup(`${partnerid}:OnlineWaterBillingService`, "water");
  const data = await svc.invoke("getBilling", { refno: refno });

  const items: BillItem[] = data.billitems.map((item: any) => {
    const surcharge = item.surcharge !== null ? item.surcharge : 0;
    const interest = item.interest !== null ? item.interest : 0;
    const discount = item.discount !== null ? item.discount : 0;
    const penalty = surcharge + interest - discount;

    return {
      particulars: item.particulars,
      amount: item.amount,
      surcharge: item.surcharge,
      interest: item.interest,
      discount: item.discount,
      total: item.total,
      penalty: penalty,
    };
  });

  const bill: Bill = {
    acctno: data.acctno,
    acctname: data.acctname,
    address: data.address.text,
    classification: data.classification.objid,
    coverage: "",
    billmonth: data.monthname,
    billyear: data.billtoyear,
    metersize: data.meter.size.title,
    prevreading: data.prevreading,
    reading: data.reading,
    volume: data.volume,
    amount: data.amount,
    items: items,
  };

  return bill;
};
