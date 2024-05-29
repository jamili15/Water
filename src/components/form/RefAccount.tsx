import { TextField } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";

interface RefAccountProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
}

const RefAccount: React.FC<RefAccountProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <div>
      <Field
        name="accountNo"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              value={value}
              onChange={onChange}
              id="accountNo"
              label="Account No."
              variant="standard"
              className="w-full"
              required
              error={error || (meta.error && meta.touched)}
              helperText={
                helperText
                  ? "Incorrect account number."
                  : meta.error && meta.touched
                  ? meta.error
                  : ""
              }
            />
          </div>
        )}
      />
    </div>
  );
};

export default RefAccount;
