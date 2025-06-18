import { useFieldArray } from "react-hook-form";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePrice } from "@/shared/hooks/use-price";
import { InputControlContainer } from "@/components/form/input/input-control.container";
import { SelectControlContainer } from "@/components/form/select/select-control.container";
import {
  DatePickerControlContainer,
} from "@/components/form/date-picker/date-picker-control.container";

import type { Control } from "react-hook-form";
import type { ReceptionProductsFormValues } from "./reception-products-form";

export interface ReceptionProductFormValues {
  productId: number;
  cost: number;
  quantity: number;
  measurementUnitId: string;
  batch: string;
  expirationDate?: Date;
  elaborationDate?: Date;
}

interface ProductsListFormPartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ReceptionProductsFormValues, any, ReceptionProductsFormValues>;
  values: ReceptionProductFormValues[];
}

export const ProductsListFormPart = ({ control, values }: ProductsListFormPartProps) => {
  const formatPrice = usePrice();

  const { fields, remove } = useFieldArray({
    control,
    name: "receptionProducts",
  });

  const getTotalCost = (index: number): string => {
    const { cost, quantity } = values[index];
    const total = cost * quantity;

    return formatPrice(total);
  };

  const total = formatPrice(values.reduce((acc, product) => {
    const { cost, quantity } = product;
    return acc + (cost * quantity);
  }, 0));

  return (
    <Table className="overflow-auto bg-white">
      <TableHeader className="sticky top-0 z-10 bg-white">
        <TableRow>
          <TableHead className="text-center">Linea</TableHead>
          <TableHead className="text-center">Producto</TableHead>
          <TableHead className="text-center">Costo</TableHead>
          <TableHead className="text-center">Cantidad</TableHead>
          <TableHead className="text-center">UM</TableHead>
          <TableHead className="text-center">Lote</TableHead>
          <TableHead className="text-center">Vencimiento</TableHead>
          <TableHead className="text-center">Subtotal</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {fields.map((field, index) => (
          <TableRow key={field.id}>
            <TableCell><p className="text-xl px-5">{index + 1}</p></TableCell>
            <TableCell>{field.product.name}</TableCell>
            <TableCell>
              <InputControlContainer
                name={`receptionProducts.${index}.cost`}
                type="number"
              />
            </TableCell>
            <TableCell>
              <InputControlContainer
                name={`receptionProducts.${index}.quantity`}
                type="number"
              />
            </TableCell>
            <TableCell>
              <SelectControlContainer
                name={`receptionProducts.${index}.measurementUnitId`}
                options={[{ value: "hola", label: "skjaskj" }]}
              />
            </TableCell>
            <TableCell>
              <InputControlContainer
                name={`receptionProducts.${index}.batch`}
              />
            </TableCell>
            <TableCell>
              <DatePickerControlContainer
                name={`receptionProducts.${index}.expirationDate`}
              />
            </TableCell>
            <TableCell>
              <Input value={getTotalCost(index)} readOnly disabled />
            </TableCell>
            <TableCell>
              <Button size="sm" onClick={() => remove(index)}><XIcon /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="sticky bottom-0 z-10 bg-white">
        <TableRow>
          <TableCell colSpan={7} className="text-left text-xl">Total</TableCell>
          <TableCell colSpan={2} className="text-center text-xl">{total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
