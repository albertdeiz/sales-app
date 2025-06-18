import { useMemo } from "react";

import { useProductsQuery } from "@/api-query/queries/products.query";
import { useWarehousesQuery } from "@/api-query/queries/warehouses.query";
import { useUsersQuery } from "@/api-query/queries/users/users.query";
import { useCreateReceptionMutation } from "@/api-query/queries/receptions.query";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";
import { Card } from "@/components/ui/card";

import {
  ReceptionProductsForm,
} from "../components/reception-products-form/reception-products-form";

import type {
  ReceptionProductsFormValues,
} from "../components/reception-products-form/reception-products-form";

export const ReceptionFormContainer = () => {
  const { data: products = [], isLoading } = useProductsQuery();
  const { data: warehouses = [] } = useWarehousesQuery();
  const { data: users = [] } = useUsersQuery();

  const { mutate: createReception, isPending } = useCreateReceptionMutation();

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

  const handleSubmit = ({
    userId,
    receptionProducts,
    vendorId,
    warehouseId,
  }: ReceptionProductsFormValues): void => {
    createReception({
      vendorId: Number(vendorId),
      warehouseId: Number(warehouseId),
      userId: Number(userId),
      receptionProducts: receptionProducts.map(({
        batch,
        elaborationDate,
        expirationDate,
        productId,
        measurementUnitId,
        quantity,
        cost,
      }) => ({
        productId: Number(productId),
        quantity: Number(quantity),
        productUmId: Number(measurementUnitId),
        cost: Number(cost),
        batch,
        elaboratedAt: elaborationDate,
        expiredAt: expirationDate,
        receivedProductUmId: 1,
        receivedQuantity: 10,
      })),
    }, {
      onSuccess: (data) => {
        console.log("Recepción creada:", data);
        // Mostrar mensaje de éxito o redireccionar
      },
      onError: (error) => {
        console.error("Error al crear la recepción:", error);
        // Mostrar mensaje de error
      },
    });
  };

  return (
    <LoadingWrapper isLoading={isPending}>
      <Card className="max-h-full max-w-full overflow-hidden h-full">
        <ReceptionProductsForm
          products={products}
          responsibleOptions={responsibleOptions}
          warehouseOptions={warehouseOptions}
          vendorOptions={verdorOptions}
          isFetching={isLoading}
          isSubmitting={isPending}
          onSubmit={handleSubmit}
        />
      </Card>
    </LoadingWrapper>
  );
};
