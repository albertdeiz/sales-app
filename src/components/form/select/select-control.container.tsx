import { useFormContext } from "react-hook-form";

import { SelectControl } from "./select-control";

import type { SelectControlProps } from "./select-control";
import type { ReactElement } from "react";

export type SelectControlContainerProps = Omit<SelectControlProps, "control">;

/**
 * Reusable container with the form context and form provider, used in nested forms elements.
 * This implementation does not require to receive the form methods as parameters
 */
export const SelectControlContainer = (props: SelectControlContainerProps): ReactElement => {
  const methods = useFormContext();

  return <SelectControl {...methods} {...props} />;
};
