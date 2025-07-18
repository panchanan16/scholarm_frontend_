import { ChevronDown, Notebook, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function NavBar(){
    return (
      <>
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-semibold">
                <span className="text-gray-800">Scholar</span>
                <span className="text-orange-500">Manuscript</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/submission">
                <Button variant="ghost" className="text-yellow-600 bg-yellow-100 hover:bg-yellow-200">
                <Notebook className="w-4 h-4 mr-2" />
                  Add A Article
                  </Button>
              </Link>
              <Button variant="ghost" className="text-yellow-600 bg-yellow-100 hover:bg-yellow-200">
                <User className="w-4 h-4 mr-2" />
                Iftikhar Ahmed (PhD)
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-slate-700 text-white">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-6">
              <span className="text-sm">Journal of Pioneering Medical Sciences</span>
              <Button variant="ghost" className="text-white hover:bg-slate-600 text-sm">
                About the Journal
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-slate-600 text-sm bg-slate-600">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-white hover:bg-slate-600 text-sm">
                Users
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-slate-600 text-sm">
                Administration
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Submission Search" className="w-64 bg-white text-gray-900 placeholder-gray-500" />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </>
    );
}