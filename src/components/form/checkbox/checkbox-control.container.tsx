import { useFormContext } from 'react-hook-form';

import { CheckboxControl } from './checkbox-control';

import type { CheckboxControlProps } from './checkbox-control';
import type { ReactElement } from 'react';

export type CheckboxControlContainerProps = Omit<CheckboxControlProps, 'control'>;

/**
 * Reusable container with the form context and form provider, used in nested forms elements.
 * This implementation does not require to receive the form methods as parameters
 */
export const CheckboxControlContainer = (props: CheckboxControlContainerProps): ReactElement => {
  const methods = useFormContext();

  return <CheckboxControl {...methods} {...props} />;
};
