import { DataTable } from '@/components/data/data-table';
import { columns } from './warehouses-table.columns';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';

export const WarehousesTable = ({ data, isLoading }: { data: Warehouse[], isLoading: boolean }) => {
  return isLoading
    ? (
      <div className="flex items-center justify-center h-full p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
      )
    : (
      <DataTable columns={columns} data={data} />
      );
};
