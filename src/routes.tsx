import { createBrowserRouter, Navigate } from 'react-router-dom';
import DemoAstGrep from '@components/demos/ast-grep';
import DemoAstGrepNapi from '@components/demos/ast-grep-napi';
import DemoJscodeshiftCustom from '@components/demos/jscodeshift-custom';
import DemoJscodeshiftOss from '@components/demos/jscodeshift-oss';
import DemoJssg from '@components/demos/jssg';
import DemoTsMorph from '@components/demos/ts-morph';
import RootLayout from '@components/layouts/layout-root';
import HomePage from '@components/pages/home';
import NotFoundPage from '@components/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'jscodeshift-oss', element: <DemoJscodeshiftOss /> },
      { path: 'jscodeshift-custom', element: <DemoJscodeshiftCustom /> },
      { path: 'ast-grep', element: <DemoAstGrep /> },
      { path: 'ast-grep-napi', element: <DemoAstGrepNapi /> },
      { path: 'jssg', element: <DemoJssg /> },
      { path: 'ts-morph', element: <DemoTsMorph /> },

      // Compatibility redirects
      {
        path: 'modernizing/jscodeshift-oss',
        element: <Navigate to="/jscodeshift-oss" replace />,
      },
      {
        path: 'modernizing/jscodeshift-custom',
        element: <Navigate to="/jscodeshift-custom" replace />,
      },
      {
        path: 'modernizing/ast-grep',
        element: <Navigate to="/ast-grep" replace />,
      },
      {
        path: 'modernizing/ast-grep-napi',
        element: <Navigate to="/ast-grep-napi" replace />,
      },
      { path: 'modernizing/jssg', element: <Navigate to="/jssg" replace /> },
      {
        path: 'modernizing/ts-morph',
        element: <Navigate to="/ts-morph" replace />,
      },
      { path: 'modernizing/*', element: <Navigate to="/" replace /> },
      {
        path: 'compiling/jscodeshift-oss',
        element: <Navigate to="/jscodeshift-oss" replace />,
      },
      {
        path: 'compiling/jscodeshift-custom',
        element: <Navigate to="/jscodeshift-custom" replace />,
      },
      {
        path: 'compiling/ast-grep',
        element: <Navigate to="/ast-grep" replace />,
      },
      {
        path: 'compiling/ts-morph',
        element: <Navigate to="/ts-morph" replace />,
      },
      { path: 'compiling/*', element: <Navigate to="/" replace /> },
      { path: 'generating/*', element: <Navigate to="/" replace /> },
      { path: 'querying/*', element: <Navigate to="/" replace /> },
      { path: 'observing/*', element: <Navigate to="/" replace /> },
      { path: 'measuring/*', element: <Navigate to="/" replace /> },
    ],
  },
]);
