import { useMemo } from "react";

import { useProductsQuery } from "@/api-query/queries/products.query";
import { useWarehousesQuery } from "@/api-query/queries/warehouses.query";

import { ReceptionProductsForm } from "../reception-products-form/reception-products-form";
import { useUsersQuery } from "@/api-query/queries/users/users.query";

export const ReceptionFormContainer = () => {
  const { data: products = [], isLoading } = useProductsQuery();
  const { data: warehouses = [] } = useWarehousesQuery();
  const { data: users = [] } = useUsersQuery();

  const warehouseOptions = useMemo(() => warehouses.map(({ id, name }) => ({
    value: String(id),
    label: name,
  })), [warehouses]);

  const responsibleOptions = useMemo(() => users.map(({ id, firstName }) => ({
    value: String(id),
    label: firstName,
  })), [users]);

  const verdorOptions = [{
    value: "1",
    label: "Proveedor 1",
  }, {
    value: "2",
    label: "Proveedor 2",
  }];

  return (
    <ReceptionProductsForm
      products={products}
      responsibleOptions={responsibleOptions}
      warehouseOptions={warehouseOptions}
      vendorOptions={verdorOptions}
      isFetching={isLoading}
      isSubmitting={false}
      onSubmit={(data) => console.log(data)}
    />
  );
};
