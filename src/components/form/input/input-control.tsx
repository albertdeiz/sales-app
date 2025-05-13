import { Controller } from 'react-hook-form';


import type { ReactElement } from 'react';
import type { ControllerProps } from 'react-hook-form';
import { FormControl, type FormControlProps } from '@/components/ui/form-control';
import { Input, type InputProps } from '@/components/ui/input';

export type InputControlProps = Omit<FormControlProps, 'children'> & InputProps &
  Omit<ControllerProps, 'render'>;

/**
 * Component that implement a form control input wrapped on controller provided by react hook form
 */
export const InputControl = ({
  name,
  label,
  defaultValue = '',
  control,
  ...rest
}: InputControlProps): ReactElement => (
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
        <Input
          {...field}
          ref={ref}
          {...rest}
        />
      </FormControl>
    )}
  />
);
