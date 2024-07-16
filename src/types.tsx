export type Bill = {
  acctno: string;
  acctid: string;
  billid: string;
  classification: string;
  address: string;
  location: string;
  acctname: string;
  billno: string;
  monthname: string;
  year: number;
  billtoyear: number;
  meter: string;
  reading: number;
  prevreading: number;
  volume: number;
  items: BillItem[];
  amount: number;
  pmttxntype: string;
  txntypename: string;
  txntype: string;
};

export type BillItem = {
  amount: number;
  discount: number;
  interest: number;
  surcharge: number;
  particulars: string;
  total: number;
  sortorder: number;
  penalty: number;
};
