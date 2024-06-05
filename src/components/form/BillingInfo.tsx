import { useWaterBillingContext } from "@/context/WaterBillingContext";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MouseEventHandler } from "react";
import Currency from "../ui/Currency";

interface BillInfoProps {
  onBack?: MouseEventHandler<HTMLButtonElement>;
}

const BillingInfo: React.FC<BillInfoProps> = ({ onBack }) => {
  const {
    acctno,
    acctName,
    address,
    classification,
    coverage,
    monthName,
    billYear,
    meterSize,
    prevReading,
    reading,
    volume,
    billitems,
    penalty,
  } = useWaterBillingContext();

  const dataInfo = [
    { value: acctno, label: "Account No." },
    { value: acctName, label: "Account Name" },
    { value: address, label: "Address" },
    { value: classification, label: "Classification" },
    { value: coverage, label: "Coverage" },
  ];

  const dataMonthYear = [
    { value: monthName, label: "Bill Month" },
    { value: billYear, label: "Bill Year" },
  ];

  const dataReading = [
    { value: meterSize, label: "Meter Size" },
    { value: prevReading, label: "Previous Reading" },
    { value: reading, label: "Current Reading" },
    { value: volume, label: "Consumption" },
  ];

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
              {billitems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="uppercase">
                    {item.particulars}
                  </TableCell>
                  <TableCell align="right">
                    <Currency currency="Php" amount={item.amount} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency currency="Php" amount={penalty} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency currency="Php" amount={item.total} />
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
