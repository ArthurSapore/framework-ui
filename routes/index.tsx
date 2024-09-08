import { Auth } from '@/pages/Auth'
import { Home } from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />
   },
   {
      path: '/auth',
      element: <Auth />
   }
])
