import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import { MainLayout } from './components/layout/MainLayout'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query' 
function App() {
  const queryClient = new QueryClient()
  return ( 
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <div className="flex-1">
          <Outlet />    
        </div>
      </MainLayout>
    </QueryClientProvider>
  )
}

export default App
