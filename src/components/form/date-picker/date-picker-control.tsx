import { DatePicker } from "@/components/ui/date-picker";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import type { ReactElement, ReactNode } from "react";
import type { ControllerProps } from "react-hook-form";
import type { DatePickerProps } from "@/components/ui/date-picker";

export type DatePickerControlProps = DatePickerProps &
  Omit<ControllerProps, "render"> & {
    label?: string;
    description?: ReactNode;
  };

/**
 * DatePickerControl is a wrapper around the DatePicker component that integrates it with react-hook-form.
 * It uses the Controller component to manage the form state and validation.
 * It renders a FormControl with a label and error message, and passes the necessary props to the DatePicker.
 */
export const DatePickerControl = ({
  name,
  label,
  control,
  className,
  description,
  ...rest
}: DatePickerControlProps): ReactElement => (
  <FormField
    control={control}
    name={name}
    render={({ field: { onBlur, onChange, ref, value, disabled } }) => (
      <FormItem className={className}>
        {label && <FormLabel>{label}</FormLabel>}
        <DatePicker
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...rest}
        />
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
