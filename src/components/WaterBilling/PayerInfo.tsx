import { TextField } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";

interface PayerInfoProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayerInfo: React.FC<PayerInfoProps> = ({ value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Field
        name="payerName"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              value={value}
              onChange={onChange}
              id="payerName"
              label="Payer Name"
              variant="standard"
              className="w-full"
              required
            />
          </div>
        )}
      />
      <Field
        name="payerAddress"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              value={value}
              onChange={onChange}
              id="payerAddress"
              label="Payer Address"
              variant="standard"
              className="w-full"
              required
            />
          </div>
        )}
      />
    </div>
  );
};

export default PayerInfo;
