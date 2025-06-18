import { Label } from "./label";

import type { ReactElement, ReactNode } from "react";
import type { LabelProps } from "./label";

export interface FormControlProps extends LabelProps {
  label?: string;
  error?: string
  children: ReactNode;
}

export const FormControl = ({
  children,
  label,
  error,
  ...labelProps
}: FormControlProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      <Label {...labelProps}>
        {label}
      </Label>
      <div>
        {children}
        {error && (
          <span className="block text-red-500 text-sm">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
