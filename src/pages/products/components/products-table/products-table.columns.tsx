import { MoreHorizontal } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/interfaces/product.interfaces';

export type RowActionType = 'delete' | 'edit';

export interface GetColumnsProps {
  onRowActionClick?(type: RowActionType, item: Product): void;
}

export const getColumns = ({ onRowActionClick }: GetColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'available',
    header: 'Disponible',
    cell: ({ row }) => (row.original.available ? 'Sí' : 'No'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="h-8 w-8 p-0" >
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(product.id))}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onRowActionClick?.('edit', product)}>
              Ver producto
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500'
              onClick={() => onRowActionClick?.('delete', product)}
            >
              Eliminar almacén
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
