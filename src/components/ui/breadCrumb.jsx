import { ChevronRight } from "lucide-react";



export function Breadcrumb({title,content}){
    return   <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <span>{title}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{content}</span>
      </div>
}