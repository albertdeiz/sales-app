import { useProductsQuery } from '@/api-query/queries/products.query';
import { ReceptionProductsForm } from '../reception-products-form/reception-products-form';

export const ReceptionFormContainer = () => {
  const { data = [], isLoading } = useProductsQuery();

  return (
    <div className="flex flex-1 max-h-full">
      <div className="w-1/4 flex flex-col gap-4">
        <h1 className="text-1xl font-bold">Nueva recepción</h1>
        <p className="text-muted-foreground">
          Aquí puedes crear una nueva recepción de productos.
        </p>
      </div>
      <div className="w-3/4 flex-1 max-h-full overflow-auto">
        <ReceptionProductsForm products={data} isFetching={isLoading} isSubmitting={false} onSubmit={(data) => console.log(data)} />
      </div>
    </div>
  );
};
