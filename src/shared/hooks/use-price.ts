/** Hook to render a price with an specific format and currency, its returns a function to format by user preferencies */
import { useMemo } from "react";

type Currency = "USD" | "CLP";

interface PriceOptions extends Intl.NumberFormatOptions {
  currency: Currency;
  locale: string;
}

const formatPrice = (value: number, options: PriceOptions) => {
  const { currency, locale } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const usePrice = (options?: Partial<PriceOptions>) => {
  const currency: Currency = "CLP";
  const locale = "es-CL";

  return useMemo(() => {
    return (value: number) => {
      return formatPrice(value, {
        currency,
        locale,
        ...options,
      });
    };
  }, [options]);
};
