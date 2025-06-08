// filepath: /my-sales-app/my-sales-app/src/pages/products/components/product-form.tsx
import { z as zod } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputControlContainer } from '@/components/form/input/input-control.container';
import { CheckboxControlContainer } from '@/components/form/checkbox/checkbox-control.container';
import { Button } from '@/components/ui/button';

import type { ReactElement } from 'react';
import type { Product } from '@/interfaces/product.interfaces';

export interface FormValues {
  name: string;
  price: number;
  sku: string;
  codeEan?: string;
  codeDun?: string;
  available?: boolean;
}

export interface ProductFormProps {
  data?: Product;
  onSubmit(values: FormValues): void;
}

const schema = zod.object({
  name: zod.string().min(1, 'Campo obligatorio'),
  price: zod.string().min(0, 'El precio debe ser mayor o igual a 0'),
  sku: zod.string().min(1, 'Campo obligatorio'),
  codeEan: zod.string().optional(),
  codeDun: zod.string().optional(),
  available: zod.boolean().default(false),
});

export const ProductForm = ({ data, onSubmit }: ProductFormProps): ReactElement => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name ?? '',
      price: data?.price ?? 0,
      sku: data?.sku ?? '',
      codeEan: data?.codeEan,
      codeDun: data?.codeDun,
      available: data?.available ?? false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className='h-full flex flex-col'>
        <div className='px-4 flex flex-col gap-4 flex-1 justify-center'>
          <InputControlContainer name="name" label="Nombre" />
          <InputControlContainer name="price" label="Precio" type="number" />
          <InputControlContainer name="sku" label="SKU" />
          <InputControlContainer name="codeEan" label="Código EAN" />
          <InputControlContainer name="codeDun" label="Código Dun" />
          <CheckboxControlContainer name="available" label="Disponible" />
          <Button type="submit" disabled={methods.formState.isLoading}>Guardar</Button>
        </div>
      </form>
    </FormProvider>
  );
};
