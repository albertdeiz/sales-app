import { useFormContext } from "react-hook-form";

import { DatePickerControl } from "./date-picker-control";

import type { DatePickerControlProps } from "./date-picker-control";
import type { ReactElement } from "react";

export type DatePickerControlContainerProps = Omit<DatePickerControlProps, "control">;

/**
 * Component that implements a date picker control wrapped in a controller provided by react-hook-form.
 * It uses the `useFormContext` hook to access the form methods.
 * This allows it to be used within a form context without needing to pass the control prop explicitly.
 */
export const DatePickerControlContainer = (props: DatePickerControlContainerProps): ReactElement => {
  const methods = useFormContext();

  return <DatePickerControl {...methods} {...props} />;
};
