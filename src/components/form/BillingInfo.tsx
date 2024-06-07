import { usePartnerContext } from "@/context/PartnerContext";
import { useWaterBillingContext } from "@/context/WaterBillingContext";
import { lookupService } from "@/lib/client";
import Bill from "@/models/Bill";
import BillItem from "@/models/BillItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MouseEventHandler, useEffect, useState } from "react";
import Currency from "../ui/Currency";

interface BillInfoProps {
  onBack?: MouseEventHandler<HTMLButtonElement>;
}

const BillingInfo: React.FC<BillInfoProps> = ({ onBack }) => {
  const { acctno } = useWaterBillingContext();
  const svcAcct = lookupService("WaterService");
  const { channelId } = usePartnerContext();
  const [bill, setBill] = useState<Bill>();

  const loadData = async () => {
    try {
      const res = await svcAcct?.invoke("getBilling", {
        partnerid: channelId,
        refno: acctno,
      });
      setBill(new Bill(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const dataInfo = (bill: any) => [
    { value: bill?.acctno, label: "Account No." },
    { value: bill?.acctname, label: "Account Name" },
    { value: bill?.address, label: "Address" },
    { value: bill?.classification, label: "Classification" },
    { value: bill?.coverage, label: "Coverage" },
  ];

  const dataMonthYear = (bill: any) => [
    { value: bill?.billmonth, label: "Bill Month" },
    { value: bill?.billyear, label: "Bill Year" },
  ];

  const dataReading = (bill: any) => [
    { value: bill?.metersize, label: "Meter Size" },
    { value: bill?.prevreading, label: "Previous Reading" },
    { value: bill?.reading, label: "Current Reading" },
    { value: bill?.volume, label: "Consumption" },
  ];

  const totalAmountDue = (bill: any) => [
    { remarks: "Total amount due ", amountdue: bill?.amount },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        {dataInfo(bill).map((config, index) => (
          <label key={index} htmlFor="" className="w-full">
            <p className="text-gray-400 text-sm">{config.label}</p>
            <input
              type="text"
              className="border-b w-full border-black bg-transparent"
              value={config.value}
              disabled
            />
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-10">
        {dataMonthYear(bill).map((config, index) => (
          <label key={index} htmlFor="" className="w-full">
            <p className="text-gray-400 text-sm">{config.label}</p>
            <input
              type="text"
              className="border-b w-full border-black bg-transparent"
              value={config.value}
              disabled
            />
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-10">
        {dataReading(bill).map((config, index) => (
          <label key={index} htmlFor="" className="w-full">
            <p className="text-gray-400 text-sm">{config.label}</p>
            <input
              type="text"
              className="border-b w-full border-black bg-transparent"
              value={config.value}
              disabled
            />
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-center">Billing Summary</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow className="uppercase">
                <TableCell className="font-bold">Particulars</TableCell>
                <TableCell align="right" className="font-bold">
                  Amount
                </TableCell>
                <TableCell align="right" className="font-bold">
                  Disc/Penalty
                </TableCell>
                <TableCell align="right" className="font-bold">
                  total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill?.items.map((item: BillItem, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="uppercase">
                    {item.particulars}
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={item.amount} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={item.getDiscPenalty()} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={item.total} />
                  </TableCell>
                </TableRow>
              ))}
              {totalAmountDue(bill).map((row: any, index: number) => (
                <TableRow key={`${index}`}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="font-bold uppercase"
                  >
                    {row.remarks}
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell align="right" className="font-bold">
                    <Currency currency="Php" amount={row.amountdue} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BillingInfo;
