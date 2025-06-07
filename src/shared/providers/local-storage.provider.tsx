import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocalStorageContext } from '../contexts/local-storage.context';

import type { ReactNode } from 'react';
import type { LocalStorageContextValues, LocalStorageSchema } from '../contexts/local-storage.context';

interface LocalStorageProviderProps {
  children: ReactNode;
}

const loadInitialState = (): Partial<LocalStorageSchema> => {
  const initialState: Partial<LocalStorageSchema> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key) {
        const item = localStorage.getItem(key);

        if (item) {
          initialState[key as keyof LocalStorageSchema] = JSON.parse(item);
        }
      }
    }
  } catch (error) {
    console.error('Error al inicializar el estado desde localStorage:', error);
  }

  return initialState;
};

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
  const [storageState, setStorageState] = useState<Partial<LocalStorageSchema>>(loadInitialState());

  const setItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
    value: LocalStorageSchema[K],
  ): void => {
    try {
      localStorage.setItem(String(key), JSON.stringify(value));

      setStorageState(prev => ({
        ...prev,
        [key]: value,
      }));
    } catch (error) {
      console.error(`Error al guardar ${String(key)} en localStorage:`, error);
    }
  }, []);

  const getItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
    defaultValue?: LocalStorageSchema[K],
  ): LocalStorageSchema[K] | undefined => {
    try {
      const item = localStorage.getItem(String(key));

      if (item) {
        return JSON.parse(item);
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error al recuperar ${String(key)} de localStorage:`, error);

      return defaultValue;
    }
  }, []);

  const removeItem = useCallback((key: keyof LocalStorageSchema): void => {
    try {
      localStorage.removeItem(String(key));

      setStorageState(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } catch (error) {
      console.error(`Error al eliminar ${String(key)} de localStorage:`, error);
    }
  }, []);

  const clear = useCallback((): void => {
    try {
      localStorage.clear();

      setStorageState({});
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }, []);

  const contextValue: LocalStorageContextValues = useMemo(() => ({
    setItem,
    getItem,
    removeItem,
    clear,
    state: storageState,
  }), [setItem, getItem, removeItem, clear, storageState]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key) {
        if (event.newValue === null) {
          setStorageState(prev => {
            const updated = { ...prev };
            delete updated[event.key as keyof LocalStorageSchema];
            return updated;
          });
        } else if (event.newValue) {
          setStorageState(prev => ({
            ...prev,
            [event.key as keyof LocalStorageSchema]: JSON.parse(event.newValue!),
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  );
}
