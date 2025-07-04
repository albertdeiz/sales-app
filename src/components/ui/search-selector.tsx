import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchableList, type ItemObject } from "./searchable-list";

interface SearchSelectorProps<T> {
  placeholder?: string;
  options: T[];
  onChange?: (value: T) => void;
}

export const SearchSelector = <T extends ItemObject>({
  placeholder = "Selecciona una opción",
  options = [],
  onChange,
}: SearchSelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between"
          size="lg"
        >
          {placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <SearchableList onSelect={onChange} items={options} />
      </PopoverContent>
    </Popover >
  );
};
