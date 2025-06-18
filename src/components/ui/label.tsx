import { Root } from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

import type { ReactElement, ComponentProps } from "react";

export type LabelProps = ComponentProps<typeof Root>;

const Label = ({
  className,
  ...props
}: LabelProps): ReactElement => {
  return (
    <Root
      data-slot="label"
      className={cn(
        // eslint-disable-next-line max-len
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export { Label };
