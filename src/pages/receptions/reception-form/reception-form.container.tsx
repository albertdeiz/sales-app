import { useProductsQuery } from "@/api-query/queries/products.query";
import { ReceptionProductsForm } from "../reception-products-form/reception-products-form";

export const ReceptionFormContainer = () => {
  const { data = [], isLoading } = useProductsQuery();

  return (
    <ReceptionProductsForm
      products={data}
      isFetching={isLoading}
      isSubmitting={false}
      onSubmit={(data) => console.log(data)}
    />
  );
};
