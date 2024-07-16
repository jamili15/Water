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
  let txntype = data.txntype ?? "water";

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
      sortorder: item.sortorder,
      penalty: penalty,
    };
  });

  const bill: Bill = {
    acctno: data.acctno,
    acctid: data.acctid,
    billid: data.billid,
    classification: data.classification.objid,
    address: data.address.text,
    location: data.location.text,
    acctname: data.acctname,
    billno: data.billno,
    monthname: data.monthname,
    year: data.year,
    billtoyear: data.billtoyear,
    meter: data.meter.size.title,
    reading: data.reading,
    prevreading: data.prevreading,
    volume: data.volume,
    items: items,
    amount: data.amount,
    pmttxntype: data.pmttxntype,
    txntypename: data.txntypename,
    txntype: txntype,
  };

  return bill;
};
