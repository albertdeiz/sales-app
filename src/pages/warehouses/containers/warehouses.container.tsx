import { useWarehouseQuery, useWarehousesQuery, useUpdateWarehouseMutation, useCreateWarehouseMutation } from '@/api-query/queries/warehouses.query';
import { WarehousesTable } from '../components/warehouses-table/warehouses-table';
import { useNavigate, useParams } from 'react-router';
import { WarehouseDrawer } from '../components/warehouse-drawer';
import { useCallback } from 'react';
import type { FormValues } from '../components/warehouse-form';

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

  const handleOnChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        navigate('/warehouses');
      }
    },
    [navigate],
  );

  const handleSubmit = useCallback((values: FormValues): void => {
    if (!warehouse?.id) {
      createWarehouse(values, {
        onSuccess: () => {
          navigate('/warehouses');
        },
      });
    } else {
      updateWarehouse({ id: warehouse?.id, ...values }, {
        onSuccess: () => {
          navigate('/warehouses');
        },
      });
    }
  }, [createWarehouse, navigate, updateWarehouse, warehouse?.id]);

  return (
    <div className='bg-white'>
      <WarehousesTable data={data} isLoading={isLoading} />
      <WarehouseDrawer
        isOpen={!!id}
        data={warehouse}
        isLoading={isLoadingWarehouse}
        onSaveData={handleSubmit}
        onOpenChange={handleOnChangeIsOpen}
      />
    </div>
  );
};
