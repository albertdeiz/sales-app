import { Controller } from 'react-hook-form';
import { FormControl } from '@/components/ui/form-control';
import { DatePicker } from '@/components/ui/date-picker';

import type { ReactElement } from 'react';
import type { ControllerProps } from 'react-hook-form';
import type { FormControlProps } from '@/components/ui/form-control';
import type { DatePickerProps } from '@/components/ui/date-picker';

export type DatePickerControlProps = Omit<FormControlProps, 'children'> & DatePickerProps &
  Omit<ControllerProps, 'render'>;

/**
 * DatePickerControl is a wrapper around the DatePicker component that integrates it with react-hook-form.
 * It uses the Controller component to manage the form state and validation.
 * It renders a FormControl with a label and error message, and passes the necessary props to the DatePicker.
 */
export const DatePickerControl = ({
  name,
  label,
  defaultValue = '',
  control,
  ...rest
}: DatePickerControlProps): ReactElement => (
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
        <DatePicker
          value={field.value}
          {...rest}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={ref}
        />
      </FormControl>
    )}
  />
);
