// import lib
import { lazy } from 'react'

const routes = [
  {
    path: '/templates1',
    exact: true,
    component: lazy(() => import('./list/index')),
  },
  {
    path: '/templates1/create',
    exact: true,
    component: lazy(() => import('./add/index')),
  },
  {
    path: '/templates1-editor',
    exact: true,
    component: lazy(() => import('./editor/index')),
  },
  {
    path: '/template1/:id/edit',
    exact: true,
    // auth: true,
    component: lazy(() => import('./edit/index')),
  },
  {
    path: '/templates1/:id/editor',
    exact: true,
    // auth: true,
    component: lazy(() => import('./editor/index')),
  },
]

export default routes
