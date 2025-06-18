import { useMemo } from "react";
import { DataTable } from "@/components/data/data-table";
import { getColumns } from "./products-table.columns";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";

import type { Product } from "@/interfaces/product.interfaces";
import type { RowActionType } from "./products-table.columns";

export interface ProductsTableProps {
  data: Product[];
  isLoading: boolean;
  onRowActionClick?: (type: RowActionType, item: Product) => void;
}

export const ProductsTable = ({ data, onRowActionClick, isLoading }: ProductsTableProps) => {
  const columns = useMemo(() => getColumns({ onRowActionClick }), [onRowActionClick]);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <DataTable columns={columns} data={data} />
    </LoadingWrapper>
  );
};
