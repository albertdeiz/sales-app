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
import { ProductForm } from './product-form';

import type { Product } from '@/interfaces/product.interfaces';
import type { ReactElement } from 'react';
import type { FormValues } from './product-form';

interface ProductDrawerProps {
  data?: Product;
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSaveData: (data: FormValues) => void;
}

export const ProductDrawer = ({ isOpen, data, isLoading, onOpenChange, onSaveData }: ProductDrawerProps): ReactElement => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Producto #{data?.id}</DrawerTitle>
        </DrawerHeader>
        <LoadingWrapper isLoading={isLoading}>
          <ProductForm onSubmit={onSaveData} data={data} />
        </LoadingWrapper>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
