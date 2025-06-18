import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { InputControlContainer } from '@/components/form/input/input-control.container';
import { SelectControlContainer } from '@/components/form/select/select-control.container';

import type { Control } from 'react-hook-form';
import type { ReceptionProductsFormValues } from './reception-products-form';
import { usePrice } from '@/shared/hooks/use-price';

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
    name: 'receptionProducts',
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="p-2 border rounded-md mb-2 bg-white relative">
          <div className='absolute right-0 top-0 m-2'>
            <Button size="sm" onClick={() => remove(index)}><XIcon /></Button>
          </div>
          <div className='flex items-center'>
            <p className='text-xl px-5'>{index + 1}</p>
            <InputControlContainer label="Costo" name={`receptionProducts.${index}.cost`} type='number' />
            <InputControlContainer label="Cantidad" name={`receptionProducts.${index}.quantity`} type='number' />
            <SelectControlContainer label="Unidad de medida" name={`receptionProducts.${index}.measurementUnitId`} options={[{ value: 'hola', label: 'skjaskj' }]} />
            <InputControlContainer label="Lote" name={`receptionProducts.${index}.batch`} />
            <InputControlContainer label="Fecha de expiración" name={`receptionProducts.${index}.expirationDate`} />
            <p>costo: {formatPrice(values[index].cost * values[index].quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
