import { useMemo, useState, useCallback } from 'react';
import { LocalStorageContext } from '../contexts/local-storage.context';

import type { ReactNode } from 'react';
import type { LocalStorageContextValues, LocalStorageSchema } from '../contexts/local-storage.context';

interface LocalStorageProviderProps {
  children: ReactNode;
}

// Clave única para almacenar todos los datos
const STORAGE_KEY = 'sales-app-storage';

const loadInitialState = (): Partial<LocalStorageSchema> => {
  const initialState: Partial<LocalStorageSchema> = {};

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error al inicializar el estado desde localStorage:', error);
  }

  return initialState;
};

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
  const [storageState, setStorageState] = useState<Partial<LocalStorageSchema>>(loadInitialState);

  const setItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
    value: LocalStorageSchema[K],
  ): void => {
    setStorageState((prevState) => {
      const newState = { ...prevState, [key]: value };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }

      return newState;
    });
  }, []);

  const getItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
  ): LocalStorageSchema[K] | undefined => {
    return storageState[key];
  }, [storageState]);

  const removeItem = useCallback(<K extends keyof LocalStorageSchema>(key: K): void => {
    setStorageState((prevState) => {
      const newState = { ...prevState };
      delete newState[key];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('Error al guardar en localStorage después de eliminar:', error);
      }

      return newState;
    });
  }, []);

  const clear = useCallback((): void => {
    setStorageState({});
    try {
      localStorage.removeItem(STORAGE_KEY);
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

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  );
}
