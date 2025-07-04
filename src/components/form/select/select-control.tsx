import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { ReactElement, ReactNode } from "react";
import type { ControllerProps } from "react-hook-form";
import type { SelectProps } from "@/components/ui/select";

export type SelectControlProps = SelectProps &
  Omit<ControllerProps, "render"> & {
    label?: string;
    description?: ReactNode;
  };

/**
 * Component that implement a form control select wrapped on controller provided by react hook form
 */
export const SelectControl = ({
  name,
  label,
  defaultValue,
  control,
  placeholder,
  size,
  options,
  description,
  className,
  ...rest
}: SelectControlProps): ReactElement => (
  <FormField
    control={control}
    name={name}
    render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
      <FormItem className={className}>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          onValueChange={onChange}
          value={value}
          defaultValue={defaultValue}
          name={name}
          disabled={disabled}
          {...rest}
        >
          <FormControl className='w-full'>
            <SelectTrigger ref={ref} onBlur={onBlur} size={size}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map(({ label, value, disabled }) => (
              <SelectItem key={value} value={value} disabled={disabled}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />);
