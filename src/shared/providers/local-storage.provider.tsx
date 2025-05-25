import { useCallback, useMemo, useState, useEffect } from 'react';
import { LocalStorageContext } from '../contexts/local-storage.context';

import type { ReactNode } from 'react';
import type { LocalStorageContextValues, LocalStorageSchema } from '../contexts/local-storage.context';

interface LocalStorageProviderProps {
  children: ReactNode;
}

export function LocalStorageProvider ({ children }: LocalStorageProviderProps) {
  const [storageState, setStorageState] = useState<Partial<LocalStorageSchema>>({});

  const encode = useCallback((value: unknown): string => {
    const stringValue = JSON.stringify(value);

    return btoa(encodeURIComponent(stringValue));
  }, []);

  const decode = useCallback(<T, >(encodedValue: string): T => {
    try {
      const decodedString = decodeURIComponent(atob(encodedValue));

      return JSON.parse(decodedString) as T;
    } catch (error) {
      console.error('Error decodificando valor de localStorage:', error);

      return {} as T;
    }
  }, []);

  useEffect(() => {
    const initialState: Partial<LocalStorageSchema> = {};

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key) {
          const item = localStorage.getItem(key);

          if (item) {
            initialState[key as keyof LocalStorageSchema] = decode(item);
          }
        }
      }
    } catch (error) {
      console.error('Error al inicializar el estado desde localStorage:', error);
    }

    setStorageState(initialState);
  }, [decode]);

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
            [event.key as keyof LocalStorageSchema]: decode(event.newValue!)
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [decode]);

  // Funciones para manejar localStorage con tipos específicos
  const setItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
    value: LocalStorageSchema[K]
  ): void => {
    try {
      const encodedValue = encode(value);
      localStorage.setItem(String(key), encodedValue);

      setStorageState(prev => ({
        ...prev,
        [key]: value
      }));
    } catch (error) {
      console.error(`Error al guardar ${String(key)} en localStorage:`, error);
    }
  }, [encode]);

  const getItem = useCallback(<K extends keyof LocalStorageSchema>(
    key: K,
    defaultValue?: LocalStorageSchema[K]
  ): LocalStorageSchema[K] | undefined => {
    try {
      const item = localStorage.getItem(String(key));

      if (item) {
        return decode<LocalStorageSchema[K]>(item);
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error al recuperar ${String(key)} de localStorage:`, error);

      return defaultValue;
    }
  }, [decode]);

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
    state: storageState
  }), [setItem, getItem, removeItem, clear, storageState]);

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  );
}
