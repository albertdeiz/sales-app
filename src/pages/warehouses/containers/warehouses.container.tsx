import { useWarehousesQuery } from '@/api-query/queries/warehouses.query';
import { WarehousesTable } from '../components/warehouses-table/warehouses-table';

export const WarehousesContainer = () => {
  const { data = [], isLoading } = useWarehousesQuery();

  return (
    <div className='bg-white'>
      <WarehousesTable data={data} isLoading={isLoading} />
    </div>
  );
};
