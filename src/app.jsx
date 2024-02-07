import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';
import { AuthProvider } from './contexts/auth-context';
import Router from './routes/sections';
import ThemeProvider from './theme';

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
