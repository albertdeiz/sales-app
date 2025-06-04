import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useWarehouseQuery,
  useWarehousesQuery,
  useUpdateWarehouseMutation,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
} from '@/api-query/queries/warehouses.query';

import { WarehousesTable } from '../components/warehouses-table/warehouses-table';
import { WarehouseDrawer } from '../components/warehouse-drawer';

import type { FormValues } from '../components/warehouse-form';
import type { RowActionType } from '../components/warehouses-table/warehouses-table.columns';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';

export const WarehousesContainer = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useWarehousesQuery();
  const { id } = useParams<{ id: string }>();
  const {
    data: warehouse,
    isLoading: isLoadingWarehouse,
  } = useWarehouseQuery(!isNaN(Number(id)) ? Number(id) : undefined);
  const { mutateAsync: updateWarehouse } = useUpdateWarehouseMutation();
  const { mutateAsync: createWarehouse } = useCreateWarehouseMutation();
  const { mutateAsync: deleteWarehouse } = useDeleteWarehouseMutation();

  const handleOnChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        navigate('/warehouses');
      }
    },
    [navigate],
  );

  const handleClickNew = useCallback(() => {
    navigate('/warehouses/new');
  }, [navigate]);

  const handleRemoveWarehouse = useCallback((id: number) => {
    deleteWarehouse(id, {
      onSuccess: () => {
        toast.success('Almacén eliminado correctamente');
      },
    });
  }, [deleteWarehouse]);

  const handleRowActionClick = useCallback((type: RowActionType, item: Warehouse) => {
    if (type === 'edit') {
      navigate(`/warehouses/${item.id}`);
    }

    if (type === 'delete') {
      handleRemoveWarehouse(item.id);
    }
  }, [handleRemoveWarehouse, navigate]);

  const handleSubmit = useCallback((values: FormValues): void => {
    if (!warehouse?.id) {
      createWarehouse(values, {
        onSuccess: () => {
          navigate('/warehouses');
          toast.success('Almacén creado correctamente');
        },
      });
    } else {
      updateWarehouse({ id: warehouse?.id, ...values }, {
        onSuccess: () => {
          navigate('/warehouses');
          toast.success('Almacén actualizado correctamente');
        },
      });
    }
  }, [createWarehouse, navigate, updateWarehouse, warehouse?.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Almacenes</CardTitle>
        <CardDescription>Gestión de almacenes</CardDescription>
        <CardAction>
          <Button onClick={handleClickNew}>
            <PlusCircle />
            <span>Nuevo</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <WarehousesTable data={data} isLoading={isLoading} onRowActionClick={handleRowActionClick} />
      </CardContent>
      <WarehouseDrawer
        isOpen={!!id}
        data={warehouse}
        isLoading={isLoadingWarehouse}
        onSaveData={handleSubmit}
        onOpenChange={handleOnChangeIsOpen}
      />
    </Card >
  );
};
