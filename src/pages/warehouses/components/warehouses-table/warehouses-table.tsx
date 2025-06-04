import { DataTable } from '@/components/data/data-table';
import { columns } from './warehouses-table.columns';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import { LoadingWrapper } from '@/components/ui/loading-wrapper';

export const WarehousesTable = ({ data, isLoading }: { data: Warehouse[], isLoading: boolean }) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <DataTable columns={columns} data={data} />
    </LoadingWrapper>
  );
};
