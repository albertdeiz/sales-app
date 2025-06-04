import { z as zod } from 'zod';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputControlContainer } from '@/components/form/input/input-control.container';
import { Button } from '@/components/ui/button';

import type { ReactElement } from 'react';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';

export interface FormValues {
  name: string;
  location: string;
  posAllowed?: boolean;
}

export interface WarehouseFormProps {
  data?: Warehouse;
  onSubmit(values: FormValues): void
}

const schema = zod.object({
  name: zod
    .string()
    .min(1, 'campo obligatorio'),
  location: zod
    .string()
    .min(1, 'campo obligatorio'),
  posAllowed: zod
    .boolean()
    .default(false),
});

export const WarehouseForm = ({ data, onSubmit }: WarehouseFormProps): ReactElement => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      name: data?.name ?? '',
      location: data?.location ?? '',
      posAllowed: data?.posAllowed,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className='h-full flex flex-col'>
        <div className='px-4 flex flex-col gap-4 flex-1 justify-center'>
          <InputControlContainer
            name="name"
            label="Nombre"
          />
          <InputControlContainer
            name="location"
            label="Lugar"
          />
          <InputControlContainer
            name="posAllowed"
            label="Permitir POS"
          />
          <Button type="submit" disabled={methods.formState.isLoading}>Guardar</Button>
        </div>
      </form>
    </FormProvider>
  );
};
