import { useProductsQuery } from '@/api-query/queries/products.query';
import { Button } from '@/components/ui/button';
import { SearchSelector } from '@/components/ui/search-selector';
import type { Product } from '@/interfaces/product.interfaces';
import { X } from 'lucide-react';
import { useState } from 'react';

export const ReceptionFormContainer = () => {
  const { data = [], isLoading } = useProductsQuery();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSelectedProduct = (product: Product) => {
    console.log(product);
    setSelectedProducts((products) => products.concat(product));
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts((products) => products.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-1 max-h-full">
      <div className="w-1/3 flex flex-col gap-4">
        <h1 className="text-1xl font-bold">Nueva recepción</h1>
        <p className="text-muted-foreground">
          Aquí puedes crear una nueva recepción de productos.
        </p>
      </div>
      <div className="w-2/3 flex-1 max-h-full overflow-auto">
        <div className='sticky top-0 z-10 bg-white p-4 border-b'>
          <SearchSelector
            options={data}
            onChange={handleSelectedProduct}
          />
        </div>
        <div className='mt-2'>
          {selectedProducts.map((product, i) => (
            <div key={product.id} className="p-2 border rounded-md mb-2 bg-white relative">
              <div className='absolute right-0 top-0 m-2'>
                <Button size="sm" onClick={() => handleRemoveProduct(i)}><X /></Button>
              </div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">ID: {product.id}</p>
              <p className="text-sm text-gray-500">Precio: {product.price} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
