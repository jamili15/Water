import Currency from "@/common/components/Currency";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Bill from "./models/Bill";
import BillItem from "./models/BillItem";

interface BillingInfoProps {
  bill: Bill | null;
  loading: boolean;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ bill, loading }) => {
  const dataInfo = (bill: Bill | null) => [
    { value: bill?.acctno || "", label: "Account No." },
    { value: bill?.acctname || "", label: "Account Name" },
    { value: bill?.address || "", label: "Address" },
    { value: bill?.classification || "", label: "Classification" },
    { value: bill?.coverage || "", label: "Coverage" },
  ];

  const dataMonthYear = (bill: Bill | null) => [
    { value: bill?.billmonth || "", label: "Bill Month" },
    { value: bill?.billyear?.toString() || "", label: "Bill Year" },
  ];

  const dataReading = (bill: Bill | null) => [
    { value: bill?.metersize || "", label: "Meter Size" },
    { value: bill?.prevreading?.toString() || "", label: "Previous Reading" },
    { value: bill?.reading?.toString() || "", label: "Current Reading" },
    { value: bill?.volume?.toString() || "", label: "Consumption" },
  ];

  const totalAmountDue = (bill: Bill | null) => [
    { remarks: "Total amount due", amountdue: bill?.amount || 0 },
  ];

  if (loading || !bill) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

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
