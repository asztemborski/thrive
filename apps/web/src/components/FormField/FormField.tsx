import React, { ComponentProps, ElementType } from "react";
import { Controller } from "react-hook-form";

import Label from "../Label";

// TODO: Add proper typing

interface FormFieldProps<T> {
  component: T;
  fieldName: string;
  control: any;
  label?: string;
  error?: string;
  rules?: any;
}

const FormField = <T extends ElementType>({
  component: Component,
  fieldName,
  control,
  label,
  error,
  rules,
  ...props
}: ComponentProps<T> & FormFieldProps<T>) => {
  return (
    <div className="flex flex-col space-y-2 mb-1">
      {label && <Label className="text-sm">{label}</Label>}
      <Controller
        control={control}
        rules={rules}
        name={fieldName}
        render={({ field }) => <Component {...field} {...props} />}
      />

      <Label
        className=" text-xs text-red-600"
        style={{ visibility: error ? "visible" : "hidden" }}
      >
        {error || "Error message placeholder"}
      </Label>
    </div>
  );
};

export default FormField;
