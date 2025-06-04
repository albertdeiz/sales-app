import {
  Drawer,
} from '@/components/ui/drawer';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import type { ReactElement } from 'react';
import { WarehouseForm } from './warehouse-form';

interface WarehouseDrawerProps {
  data?: Warehouse;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const WarehouseDrawer = ({ isOpen, data, onOpenChange }: WarehouseDrawerProps): ReactElement => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <WarehouseForm isLoading={false} onSubmit={console.log} data={data} />
    </Drawer>
  );
};
