export type Bill = {
  acctno: string;
  acctname: string;
  address: string;
  classification: string;
  coverage: string;
  billmonth: string;
  billyear: number;
  metersize: string;
  prevreading: number;
  reading: number;
  volume: number;
  amount: number;
  items: BillItem[];
};

export type BillItem = {
  amount: number;
  discount: number;
  interest: number;
  surcharge: number;
  particulars: string;
  total: number;
  penalty: number;
};
