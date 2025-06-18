import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FormControl } from './form';

import type { RefCallBack } from 'react-hook-form';

export interface DatePickerProps {
  value?: Date;
  ref?: RefCallBack;
  onChange?(date: Date | undefined): void;
  onBlur?(): void;
}

export const DatePicker = ({ value, ref, onChange, onBlur }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            ref={ref}
            variant={'outline'}
            onBlur={onBlur}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            {value
              ? (
                format(value, 'PPP', { locale: es })
              )
              : (
                <span>Elige una fecha</span>
              )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};
