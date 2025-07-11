import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import { MainLayout } from './components/layout/MainLayout'

function App() {
  return (
    <MainLayout>
      <div className="flex-1">
        <Outlet />
      </div>
    </MainLayout>
  )
}

export default App
