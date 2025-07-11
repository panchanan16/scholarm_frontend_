export function SideBar (){
    return(
        <aside className="w-64 bg-white border-r min-h-full p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Submission with</h3>
              <div className="space-y-2 text-sm">
                <div className="text-blue-600 hover:underline cursor-pointer">No Review Completed: 12</div>
                <div className="text-blue-600 hover:underline cursor-pointer">One Review Completed: 10</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Two Reviews Completed: 1</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Three Reviews Completed: 2</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Four or More Reviews Completed: 0</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div className="text-blue-600 hover:underline cursor-pointer">Search People</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Activate User</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Add New Author</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Add New Editor</div>
                <div className="text-blue-600 hover:underline cursor-pointer">Add New Reviewer</div>
              </div>
            </div>
          </div>
        </aside>
    )
}