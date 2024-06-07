class BillItem {
  particulars: string;
  amount: number;
  surcharge: number;
  interest: number;
  discount: number;
  total: number;

  public constructor(item: any) {
    this.particulars = item.particulars;
    this.amount = item.amount;
    this.surcharge = item.surcharge;
    this.interest = item.interest;
    this.discount = item.discount;
    this.total = item.total;
  }

  public getDiscPenalty(): number {
    const s = this.surcharge !== null ? this.surcharge : 0;
    const i = this.interest !== null ? this.interest : 0;
    const d = this.discount !== null ? this.discount : 0;

    return s + i - d;
  }
}

export default BillItem;
