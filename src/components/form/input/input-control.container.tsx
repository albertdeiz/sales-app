import { useFormContext } from "react-hook-form";

import { InputControl } from "./input-control";

import type { InputControlProps } from "./input-control";
import type { ReactElement } from "react";

export type InputControlContainerProps = Omit<InputControlProps, "control">;

/**
 * Reusable container with the form context and form provider, used in nested forms elements.
 * This implementation does not require to receive the form methods as parameters
 */
export const InputControlContainer = (props: InputControlContainerProps): ReactElement => {
  const methods = useFormContext();

  return <InputControl {...methods} {...props} />;
};
