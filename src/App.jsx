import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import { MainLayout } from './components/layout/MainLayout'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query' 
import store from './store/store'
import { Provider } from 'react-redux'
function App() {
  const queryClient = new QueryClient()
  return ( 
    <Provider store={store}>  
    <QueryClientProvider client={queryClient}>
      <MainLayout>  
        <div className="flex-1">
          <Outlet />    
        </div>
      </MainLayout>
    </QueryClientProvider>
    </Provider>
  )
}

export default App
