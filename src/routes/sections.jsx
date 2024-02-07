import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import { ProtectedRoute } from './routerPrivate';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const AdvertsPage = lazy(() => import('../pages/adverts'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const AddAdvertsPage = lazy(() => import('../pages/formAdvert'));
export const AdvertPage = lazy(() => import('../pages/advert'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'adverts', element: <ProtectedRoute><AdvertsPage /></ProtectedRoute> },
        // { path: 'advert/:advertId/:advertName', element: <ProtectedRoute><AdvertPage /></ProtectedRoute> },
        { path: 'advert', element: <ProtectedRoute><AdvertPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute><UserPage /></ProtectedRoute> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'new-advert', element: <ProtectedRoute><AddAdvertsPage /></ProtectedRoute> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate
        to="/404"
        replace
      />,
    },
  ]);

  return routes;
}
