import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import RoleRoute from '@/components/RoleRoute';
import { PUBLIC_ROUTES, AUTH_ROUTES, ROLE_ROUTES } from '@/routes/appRoutes';

function App() {
  const renderRoute = ({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            {PUBLIC_ROUTES.map(renderRoute)}
            {AUTH_ROUTES.map(renderRoute)}
            {Object.entries(ROLE_ROUTES).flatMap(([role, routes]) =>
              routes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<RoleRoute allowedRoles={[role]}><Component /></RoleRoute>}
                />
              )),
            )}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
