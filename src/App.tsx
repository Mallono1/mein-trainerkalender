import { Routes, Route } from 'react-router-dom';

// Pages
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

import { protectedRoutes, publicRoute } from './constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* PublicRoutes */}
        <Route element={<PublicRoutes />}>
          {publicRoute.map((route) => (
            <Route
              key={route.key}
              path={route.url}
              element={<route.component />}
            />
          ))}
        </Route>

        {/* PrivateRoutes */}
        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map((route) => (
            <Route
              key={route.key}
              path={route.url}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
