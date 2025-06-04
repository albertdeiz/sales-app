import { useWarehouseQuery, useWarehousesQuery } from '@/api-query/queries/warehouses.query';
import { WarehousesTable } from '../components/warehouses-table/warehouses-table';
import { useNavigate, useParams } from 'react-router';
import { WarehouseDrawer } from '../components/warehouse-drawer';
import { useCallback } from 'react';

export const WarehousesContainer = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useWarehousesQuery();
  const { id } = useParams<{ id: string }>();
  const { data: warehouse } = useWarehouseQuery(id ? parseInt(id) : undefined);

  const handleOnChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        navigate('/warehouses');
      }
    },
    [navigate],
  );

  return (
    <div className='bg-white'>
      <WarehousesTable data={data} isLoading={isLoading} />
      <WarehouseDrawer isOpen={!!id} onOpenChange={handleOnChangeIsOpen} data={warehouse} />
    </div>
  );
};
