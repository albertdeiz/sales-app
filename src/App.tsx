import { Router} from './router';
import { AuthProvider } from './shared/providers/auth.provider';
 
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
