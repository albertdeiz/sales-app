import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { LoadingWrapper } from '@/components/ui/loading-wrapper';
import { WarehouseForm } from './warehouse-form';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import type { ReactElement } from 'react';
import type { FormValues } from './warehouse-form';

interface WarehouseDrawerProps {
  data?: Warehouse;
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSaveData: (data: FormValues) => void;
}

export const WarehouseDrawer = ({ isOpen, data, isLoading, onOpenChange, onSaveData }: WarehouseDrawerProps): ReactElement => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Almacén #{data?.id}</DrawerTitle>
        </DrawerHeader>
        <LoadingWrapper isLoading={isLoading}>
          <WarehouseForm onSubmit={onSaveData} data={data} />
        </LoadingWrapper>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
