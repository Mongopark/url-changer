import { useRoutes, Navigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import NotFound from '../components/NotFound';
import AuthScreen from '../features/auth/AuthScreen';
import HomeScreen from '../features/transactions/HomeScreen';
import EditProfileScreen from '../features/transactions/components/EditProfile';
import { useAppSelector } from '../hooks';

export default function Routes() {  
  const isUserAuthenticated = useAppSelector((state) => state.auth.isUserAuthenticated);
  
  
  const routes = useRoutes([
    {
      path: '/edit',
      element: isUserAuthenticated ? <EditProfileScreen /> : <Navigate to="/auth" replace />,
    },
    {
      path: '/auth',
      element: !isUserAuthenticated ? <AuthScreen /> : <Navigate to="/home" replace />,
    },
    {
      path: '/',
      element: !isUserAuthenticated ? <AuthScreen /> : <Navigate to="/home" replace />,
    },
    {
      path: '/home',
      element: isUserAuthenticated ? <HomeScreen /> : <Navigate to="/auth" replace />,
    },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
