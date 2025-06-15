import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Input } from './input';

export type ItemObject = object;

interface FilterableListProps<T> {
  items: T[];
  onSelect?: (item: T) => void;
}

export const SearchableList = <T extends ItemObject>({ items, onSelect }: FilterableListProps<T>) => {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(query.toLowerCase()),
    ),
  );

  useEffect(() => {
    if (query.trim() === '') {
      setHighlightedIndex(null);
    } else if (filteredItems.length > 0) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(null);
    }
  }, [query, filteredItems.length]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1,
      );
    } else if (e.key === 'Enter' && highlightedIndex !== null) {
      e.preventDefault();
      onSelect?.(filteredItems[highlightedIndex]);
    } else {
      if (filteredItems.length > 0 && query.trim() !== '') {
        setHighlightedIndex(1);
      }
    }
  };

  useEffect(() => {
    if (highlightedIndex !== null && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="max-w-xl mx-auto p-2 bg-white rounded-xl shadow-md">
      <Input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />

      {filteredItems.length > 0
        ? <ul className="space-y-2 max-h-64 overflow-y-auto mt-2">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`p-2 rounded-md cursor-pointer ${highlightedIndex === index
                ? 'bg-gray-400 text-white'
                : 'bg-gray-100 text-gray-800'
                }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => onSelect?.(item)}
            >
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <strong className="capitalize">{key}:</strong> {String(value)}
                </div>
              ))}
            </li>
          ))}
        </ul>
        : <p className="text-gray-500 mt-2">No se encontraron resultados.</p>
      }
    </div>
  );
};
