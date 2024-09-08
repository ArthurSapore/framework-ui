import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { ToastDemo } from './components/Custom/ToastDemo'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './providers/theme/ThemeProvider'
import { router } from './routes/index'

const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
         >
            <RouterProvider router={router} />
            <ToastDemo />
            <Toaster />
         </ThemeProvider>
      </QueryClientProvider>
   )
}

export default App
