// import lib
import { lazy } from 'react'

const routes = [
  {
    path: '/templates2',
    exact: true,
    component: lazy(() => import('./list/index')),
  },
  {
    path: '/templates2/create',
    exact: true,
    component: lazy(() => import('./add/index')),
  },
  {
    path: '/templates2-editor',
    exact: true,
    component: lazy(() => import('./editor/index')),
  },
  {
    path: '/template2/:id/edit',
    exact: true,
    // auth: true,
    component: lazy(() => import('./edit/index')),
  },
  {
    path: '/templates2/:id/editor',
    exact: true,
    // auth: true,
    component: lazy(() => import('./editor/index')),
  },
]

export default routes
