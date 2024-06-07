import BillItem from "./BillItem";

class Bill {
  billno: string;
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

  public constructor(data: any) {
    this.billno = data.billno;
    this.acctno = data.acctno;
    this.acctname = data.acctname;
    this.address = data.address.text;
    this.classification = data.classification.objid;
    this.coverage = `${data.fromdate} - ${data.todate}`;
    this.billmonth = data.monthname;
    this.billyear = data.year;
    this.metersize = data.meter.size.title;
    this.prevreading = data.prevreading;
    this.reading = data.reading;
    this.volume = data.volume;
    this.amount = data.amount;
    this.items = [];
    data.billitems.map((item: any, index: number) =>
      this.items.push(new BillItem(item))
    );
  }
}

export default Bill;
