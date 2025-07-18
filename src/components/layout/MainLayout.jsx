import Footer from '../footer';
import { NavBar } from '../navbar';
import { SideBar } from './sidebar'; 


export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar at the top */}
      <NavBar />
      <div className="flex flex-1">
        {/* <SideBar /> */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>

  );
}
