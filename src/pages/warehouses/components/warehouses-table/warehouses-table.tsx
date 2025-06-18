import { DataTable } from "@/components/data/data-table";
import { getColumns } from "./warehouses-table.columns";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";

import type { Warehouse } from "@/interfaces/warehouse.interfaces";
import type { RowActionType } from "./warehouses-table.columns";
import { useMemo } from "react";

export interface WarehousesTableProps {
  data: Warehouse[];
  isLoading: boolean;
  onRowActionClick?: (type: RowActionType, item: Warehouse) => void;
}

export const WarehousesTable = ({ data, onRowActionClick, isLoading }: WarehousesTableProps) => {
  const columns = useMemo(() => getColumns({ onRowActionClick }), [onRowActionClick]);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <DataTable columns={columns} data={data} />
    </LoadingWrapper>
  );
};
