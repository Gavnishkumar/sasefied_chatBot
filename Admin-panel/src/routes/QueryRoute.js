import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const Query = Loadable(lazy(() => import('pages/queriesPages/Queries')));

const QueryRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'query',
      element: <Query />
    }
  ]
};

export default QueryRoutes;
