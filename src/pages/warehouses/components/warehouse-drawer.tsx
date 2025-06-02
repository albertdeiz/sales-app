import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import type { ReactElement } from 'react';

interface WarehouseDrawerProps {
  data: Warehouse;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const WarehouseDrawer = ({ isOpen, data, onOpenChange }: WarehouseDrawerProps): ReactElement => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Almacén {data.id}</DrawerTitle>
          <DrawerDescription>{Object.entries(data).map(([key, value]) => <div key={key}>
            <strong>{key}:</strong> {value.toString()}
          </div>)}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Editar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
