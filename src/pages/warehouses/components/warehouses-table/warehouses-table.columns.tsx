import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';

export const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'location',
    header: 'Lugar',
  },
  {
    accessorKey: 'posAllowed',
    header: 'POS Permitido',
    cell: ({ row }) => (row.original.posAllowed ? 'Sí' : 'No'),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const warehouse = row.original;

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
              onClick={() => navigator.clipboard.writeText(String(warehouse.id))}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to={`/warehouses/${warehouse.id}`}>Ver almacén</Link></DropdownMenuItem>
            <DropdownMenuItem className='text-red-500'>Eliminar almacén</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
