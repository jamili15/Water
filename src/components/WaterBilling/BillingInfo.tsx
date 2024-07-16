import { Button } from "@/common/io/Button";
import { Label } from "@/common/io/Label";
import Title from "@/common/io/Title";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import Table, { Column } from "@/common/ui/Table";
import { Bill } from "@/types";

const BillingInfo = (props: any) => {
  const dataInfo = (bill: Bill) => [
    { value: bill?.acctno || "", label: "Account No." },
    { value: bill?.acctname || "", label: "Account Name" },
    { value: bill?.address || "", label: "Address" },
    { value: bill?.classification || "", label: "Classification" },
  ];

  const dataMonthYear = (bill: Bill) => [
    { value: bill?.monthname || "", label: "Bill Month" },
    { value: bill?.billtoyear.toString() || "", label: "Bill Year" },
  ];

  const dataReading = (bill: Bill) => [
    { value: bill?.meter || "", label: "Meter Size" },
    { value: bill?.prevreading.toString() || "", label: "Previous Reading" },
    { value: bill?.reading.toString() || "", label: "Current Reading" },
    { value: bill?.volume?.toString() || "", label: "Consumption" },
  ];

  const columns: Column[] = [
    { label: "Particulars", field: "particulars", align: "left" },
    { label: "Amount", field: "amount", align: "right" },
    { label: "Disc/Penalty", field: "penalty", align: "right" },
    { label: "Total", field: "total", align: "right" },
  ];

  return (
    <Card title={props.title} subTitleText={props.page.caption}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col justify-center gap-y-2">
          {dataInfo(props.formValues.bill).map((config, index) => (
            <Label
              key={index}
              name={""}
              caption={config.label}
              value={config.value}
            />
          ))}
        </div>
        <div className="flex justify-center gap-x-10">
          {dataMonthYear(props.formValues.bill).map((config, index) => (
            <Label
              key={index}
              name={""}
              caption={config.label}
              value={config.value}
            />
          ))}
        </div>
        <div className="flex justify-center gap-x-10">
          {dataReading(props.formValues.bill).map((config, index) => (
            <Label
              key={index}
              name={""}
              caption={config.label}
              value={config.value}
            />
          ))}
        </div>
        <Title className="text-center">Billing Summary</Title>
        <Table
          columns={columns}
          items={props.formValues.bill?.items || []}
          totalAmountDue={props.formValues.bill?.amount}
        />
      </div>
      <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
      <ActionBar>
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button type="submit">Confirm Payment</Button>
      </ActionBar>
    </Card>
  );
};

export default BillingInfo;
