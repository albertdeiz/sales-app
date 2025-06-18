import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useProductQuery,
  useProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "@/api-query/queries/products.query";

import { ProductsTable } from "../components/products-table/products-table";
import { ProductDrawer } from "../components/product-drawer";

import type { FormValues } from "../components/product-form";
import type { RowActionType } from "../components/products-table/products-table.columns";
import type { Product } from "@/interfaces/product.interfaces";

export const ProductsContainer = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useProductsQuery();
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading: isLoadingProduct,
  } = useProductQuery(!isNaN(Number(id)) ? Number(id) : undefined);
  const { mutateAsync: updateProduct } = useUpdateProductMutation();
  const { mutateAsync: createProduct } = useCreateProductMutation();
  const { mutateAsync: deleteProduct } = useDeleteProductMutation();

  const handleOnChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        navigate("/products");
      }
    },
    [navigate],
  );

  const handleClickNew = useCallback(() => {
    navigate("/products/new");
  }, [navigate]);

  const handleRemoveProduct = useCallback((id: number) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Producto eliminado correctamente");
      },
    });
  }, [deleteProduct]);

  const handleRowActionClick = useCallback((type: RowActionType, item: Product) => {
    if (type === "edit") {
      navigate(`/products/${item.id}`);
    }

    if (type === "delete") {
      handleRemoveProduct(item.id);
    }
  }, [handleRemoveProduct, navigate]);

  const handleSubmit = useCallback((values: FormValues): void => {
    if (!product?.id) {
      createProduct(values, {
        onSuccess: () => {
          navigate("/products");
          toast.success("Producto creado correctamente");
        },
      });
    } else {
      updateProduct({ id: product?.id, ...values }, {
        onSuccess: () => {
          navigate("/products");
          toast.success("Producto actualizado correctamente");
        },
      });
    }
  }, [createProduct, navigate, updateProduct, product?.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>Gestión de productos</CardDescription>
        <CardAction>
          <Button onClick={handleClickNew}>
            <PlusCircle />
            <span>Nuevo</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ProductsTable data={data} isLoading={isLoading} onRowActionClick={handleRowActionClick} />
      </CardContent>
      <ProductDrawer
        isOpen={!!id}
        data={product}
        isLoading={isLoadingProduct}
        onSaveData={handleSubmit}
        onOpenChange={handleOnChangeIsOpen}
      />
    </Card >
  );
};
