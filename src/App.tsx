import { Router} from './router';
import { AuthProvider } from './shared/providers/auth.provider';
import { LocalStorageProvider } from './shared/providers/local-storage.provider';
 
function App() {
  return (
    <LocalStorageProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </LocalStorageProvider>
  )
}

export default App
