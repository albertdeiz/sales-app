import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSelector } from "@/components/ui/search-selector";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";
import { SelectControlContainer } from "@/components/form/select/select-control.container";
import { ProductsListFormPart } from "./products-list-form-part";

import type { Product } from "@/interfaces/product.interfaces";
import type { ReceptionProductFormValues } from "./products-list-form-part";
import type { SelectOption } from "@/components/ui/select";

export interface ReceptionProductsFormValues {
  warehouseId: string;
  vendorId: string
  userId: string;
  receptionProducts: ReceptionProductFormValues[];
}

interface ReceptionProductsFormProps {
  products: Product[];
  responsibleOptions: SelectOption[];
  warehouseOptions: SelectOption[];
  vendorOptions: SelectOption[];
  isFetching: boolean;
  isSubmitting: boolean;
  onSubmit(values: ReceptionProductsFormValues): void;
}

const schema = z.object({
  warehouseId: z.string().min(1, "El almacén es obligatorio"),
  vendorId: z.string().min(1, "El proveedor es obligatorio"),
  userId: z.string().min(1, "El tipo de documento es obligatorio"),
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
  responsibleOptions,
  vendorOptions,
  warehouseOptions,
  isFetching,
  isSubmitting,
  onSubmit,
}: ReceptionProductsFormProps) => {
  const methods = useForm<ReceptionProductsFormValues>({
    resolver: zodResolver(schema),
    values: {
      warehouseId: "",
      vendorId: "",
      userId: "",
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
      <form className="flex h-full gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-1/4 flex flex-col gap-4">
          <h1 className="text-1xl font-bold">Nueva recepción</h1>
          <SelectControlContainer label="Almacén" name="warehouseId" options={warehouseOptions} />
          <SelectControlContainer label="Proveedor" name="vendorId" options={vendorOptions} />
          <SelectControlContainer label="Responsable" name="userId" options={responsibleOptions} />
          <Button type='submit' disabled={isSubmitting}>Guardar</Button>
        </div>
        <div className="w-3/4 flex-1 h-full flex flex-col">
          <div className='bg-white p-4 border-b'>
            <LoadingWrapper isLoading={isFetching}>
              <SearchSelector options={products} onChange={onAddProduct} />
            </LoadingWrapper>
          </div>

          <div className="max-h-full flex-1 overflow-hidden">
            <ProductsListFormPart
              control={methods.control}
              values={methods.watch("receptionProducts")}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
