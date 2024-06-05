import React, { MouseEventHandler } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Currency from "../ui/Currency";

interface BillInfoProps {
  onBack?: MouseEventHandler<HTMLButtonElement>;
}

function createData(
  particulars: string | number,
  amountdiscpenalty: number,
  total: number
) {
  return { particulars, amountdiscpenalty, total };
}

const rows = [
  createData("WATER BILL mar 2024", 200, 200),
  createData("WATER BILL apr 2024", 80, 80),
];

const additionalRows = [{ remarks: "Total amount due", amountdue: 280 }];

const dataInfo = [
  { value: "24000069", label: "Account No." },
  { value: "JUAN DELA CRUZ", label: "Account Name" },
  { value: "CEBU CITY", label: "Address" },
  { value: "RESIDENTIAL", label: "Classification" },
  { value: "WB202405-260801-B-00024", label: "Last Bill Period" },
];

const dataMonthYear = [
  { value: "MAY", label: "Bill Month" },
  { value: "2024", label: "Bill Year" },
];

const dataReading = [
  { value: "1/2", label: "Meter Size" },
  { value: "7865", label: "Previous Reading" },
  { value: "7903", label: "Current Reading" },
  { value: "38", label: "Consumption" },
];

const BillingInfo: React.FC<BillInfoProps> = ({ onBack }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        {dataInfo.map((config, index) => (
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
        {dataMonthYear.map((config, index) => (
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
        {dataReading.map((config, index) => (
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
                <TableCell align="left" className="font-bold">
                  Amount disc/penalty
                </TableCell>
                <TableCell align="right" className="font-bold">
                  total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.particulars}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="uppercase">
                    {row.particulars}
                  </TableCell>
                  <TableCell align="left">
                    <Currency currency="Php" amount={row.amountdiscpenalty} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency currency="Php" amount={row.total} />
                  </TableCell>
                </TableRow>
              ))}
              {additionalRows.map((row, index) => (
                <TableRow key={`${index}`}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="font-bold uppercase"
                  >
                    {row.remarks}
                  </TableCell>
                  <TableCell align="left" className="font-bold" />
                  <TableCell align="right" className="font-bold">
                    <Currency currency="Php" amount={row.amountdue} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex items-center justify-between px-5 w-full ">
        <Button
          className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
          size="medium"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          type="submit"
          size="medium"
          className={`   
            bg-[#6200EE] text-white font-semibold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
          `}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default BillingInfo;
