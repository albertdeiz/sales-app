import { z as zod } from 'zod';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputControlContainer } from '@/components/form/input/input-control.container';
import { Button } from '@/components/ui/button';

import type { ReactElement } from 'react';
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import { LoadingWrapper } from '@/components/ui/loading-wrapper';

export interface FormValues {
  name: string;
  location: string;
  posAllowed?: boolean;
}

export interface WarehouseFormProps {
  data?: Warehouse;
  isLoading: boolean;
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

export const WarehouseForm = ({ data, isLoading, onSubmit }: WarehouseFormProps): ReactElement => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      name: data?.name ?? '',
      location: data?.location ?? '',
      posAllowed: data?.posAllowed,
    },
  });

  return (
    <DrawerContent>
      <FormProvider {...methods}>
        <LoadingWrapper isLoading={!data}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className='h-full flex flex-col'>
            <DrawerHeader>
              <DrawerTitle>Almacén {data?.id}</DrawerTitle>
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
            </DrawerHeader>
            <DrawerFooter>
              <Button type="submit" disabled={isLoading}>Guardar</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </LoadingWrapper>
      </FormProvider>
    </DrawerContent>
  );
};
