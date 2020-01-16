// import lib
import { lazy } from 'react'

const routes = [
  {
    path: '/templates',
    exact: true,
    component: lazy(() => import('./list/index')),
  },
  {
    path: '/templates/create',
    exact: true,
    component: lazy(() => import('./add/index')),
  },
  {
    path: '/templates-editor',
    exact: true,
    component: lazy(() => import('./editor/index')),
  }
]

export default routes
