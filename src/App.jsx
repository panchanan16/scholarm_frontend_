import { Outlet } from 'react-router-dom'
import './App.css'
import  Footer  from './components/footer'
import { NavBar } from './components/navbar'
import { SideBar } from './components/layout/sidebar'
function App() {
  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar/>
        <Outlet /> 
        <Footer/>
   </div>
  )
}

export default App
