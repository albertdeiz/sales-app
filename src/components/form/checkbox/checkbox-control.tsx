import { Controller } from "react-hook-form";
import { FormControl } from "@/components/ui/form-control";
import { Checkbox } from "@/components/ui/checkbox";

import type { ReactElement } from "react";
import type { ControllerProps } from "react-hook-form";
import type { FormControlProps } from "@/components/ui/form-control";
import type { CheckboxProps } from "@/components/ui/checkbox";

export type CheckboxControlProps = Omit<FormControlProps, "children"> & CheckboxProps &
  Omit<ControllerProps, "render">;

/**
 * Component that implement a form control checkbox wrapped on controller provided by react hook form
 */
export const CheckboxControl = ({
  name,
  label,
  defaultValue = "",
  control,
  ...rest
}: CheckboxControlProps): ReactElement => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field: { ref, ...field }, fieldState: { error } }): ReactElement => (
      <FormControl
        label={label}
        error={error?.message}
        htmlFor={name}
      >
        <Checkbox
          id={name}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...field}
          ref={ref}
          {...rest}
        />
      </FormControl>
    )}
  />
);
