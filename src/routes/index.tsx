import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Users from '@/pages/Users'
import NotFound from '../pages/NotFound'
import Page from '@/pages/Pages'
import Dashboard from '@/pages/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Page/>,
    errorElement: <NotFound />,
    children: [
       {
        index: true,
        element: < Dashboard/>,
      },
      {
        path: 'usuarios',
        element: <Users />,
      }
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
