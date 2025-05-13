import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Router} from './router';
import { AuthProvider } from './shared/providers/auth.provider';
import { LocalStorageProvider } from './shared/providers/local-storage.provider';

const queryClient = new QueryClient()
 
function App() {
  return (
    <LocalStorageProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </LocalStorageProvider>
  )
};

export default App
