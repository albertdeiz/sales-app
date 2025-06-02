import { DataTable } from '@/components/data/data-table';
import { columns } from './warehouses-table.columns';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';

export const WarehousesTable = ({ data, isLoading }: { data: Warehouse[], isLoading: boolean }) => {
  return (
    <DataTable columns={columns} data={data} />
  );
};
