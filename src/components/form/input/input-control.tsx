import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { ReactElement, ReactNode } from "react";
import type { InputProps } from "@/components/ui/input";
import type { ControllerProps } from "react-hook-form";

export type InputControlProps = InputProps &
  Omit<ControllerProps, "render"> & { description?: ReactNode; label?: string };

/**
 * Component that implement a form control input wrapped on controller provided by react hook form
 */
export const InputControl = ({
  name,
  label,
  control,
  description,
  ...rest
}: InputControlProps): ReactElement => (

  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input
            id={name}
            {...field}
            {...rest}
            onChange={(e) => {
              if (rest.type === "number") {
                field.onChange(Number(e.target.value));
              } else {
                field.onChange(e.target.value);
              }
            }}
          />
        </FormControl>
        {description && <FormDescription>
          {description}
        </FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
