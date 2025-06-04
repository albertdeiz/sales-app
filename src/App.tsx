import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

import { Router } from './router';
import { AuthProvider } from './shared/providers/auth.provider';
import { LocalStorageProvider } from './shared/providers/local-storage.provider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </LocalStorageProvider>
    </QueryClientProvider>
  );
};

export default App;
