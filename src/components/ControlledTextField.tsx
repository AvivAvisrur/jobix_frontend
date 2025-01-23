import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface GenericTextFieldProps
  extends Omit<TextFieldProps, "name" | "defaultValue"> {
  name: string; // Field name for react-hook-form
  control: Control<any>; // Form control from react-hook-form
  label: string; // Label for the TextField
  errorMessage?: string; // Optional: Custom error message
  rules?: object; // Validation rules for react-hook-form
}

const GenericTextField: React.FC<GenericTextFieldProps> = ({
  name,
  control,
  label,
  errorMessage,
  rules,
  ...textFieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || errorMessage}
        />
      )}
    />
  );
};

export default GenericTextField;
