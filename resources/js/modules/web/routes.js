// import lib
import { lazy } from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./pages/home/index')),
  },
  {
    path: '/blog',
    exact: true,
    component: lazy(() => import('./pages/blog/list/index')),
  },
  {
    path: '/blog/:slug',
    exact: true,
    component: lazy(() => import('./pages/blog/details/index')),
  },
  {
    path: '/templates',
    exact: true,
    component: lazy(() => import('./templates/list/index')),
  },
  {
    path: '/templates-editor',
    exact: true,
    component: lazy(() => import('./templates/editor/index')),
  },
]

export default routes
