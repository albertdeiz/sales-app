import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSelector } from "@/components/ui/search-selector";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";
import { ProductsListFormPart } from "./products-list-form-part";

import type { Product } from "@/interfaces/product.interfaces";
import type { ReceptionProductFormValues } from "./products-list-form-part";

export interface ReceptionProductsFormValues {
  receptionProducts: ReceptionProductFormValues[];
}

interface ReceptionProductsFormProps {
  products: Product[];
  isFetching: boolean;
  isSubmitting: boolean;
  onSubmit(values: ReceptionProductsFormValues): void;
}

const schema = z.object({
  receptionProducts: z.array(
    z.object({
      productId: z.number().min(1, "El ID del producto es obligatorio"),
      cost: z.number().min(1, "El coste es obligatorio"),
      quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
      measurementUnitId: z.string().min(1, "La unidad de medida es obligatoria"),
      batch: z.string().min(1, "El lote es obligatorio"),
      expirationDate: z.date().optional(),
      elaborationDate: z.date().optional(),
    }),
  ),
});

export const ReceptionProductsForm = ({
  products,
  isFetching,
  isSubmitting,
  onSubmit,
}: ReceptionProductsFormProps) => {
  const methods = useForm<ReceptionProductsFormValues>({
    resolver: zodResolver(schema),
    values: {
      receptionProducts: [],
    },
  });

  const onAddProduct = (product: Product): void => {
    console.log("Selected product:", product);
    methods.setValue("receptionProducts", [
      ...methods.getValues("receptionProducts"),
      {
        product,
        productId: product.id,
        cost: product.price,
        quantity: 1,
        measurementUnitId: "",
        batch: "",
        expirationDate: undefined,
        elaborationDate: undefined,
      },
    ]);
  };

  return (
    <Form {...methods}>
      <form className='relative' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='sticky top-0 z-10 bg-white p-4 border-b'>
          <LoadingWrapper isLoading={isFetching}>
            <SearchSelector options={products} onChange={onAddProduct} />
          </LoadingWrapper>
        </div>

        <div>
          <ProductsListFormPart
            control={methods.control}
            values={methods.watch("receptionProducts")}
          />

          <Button type='submit' disabled={isSubmitting}>Guardar</Button>
        </div>
      </form>
    </Form>
  );
};
