import { Search, Eye, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const dashboardCards = [
    {
      title: "PUBLISHER TO DO LIST",
      items: [
        { label: "New Submission", count: 0 },
        { label: "Editor Invited", count: 23 },
        { label: "Need To Assign Editor", count: 23 },
        { label: "Need To Assign Reviewers", count: 6 },
      ],
    },
    {
      title: "REVISIONS",
      items: [
        { label: "New Revision Received", count: 26 },
        { label: "Editor Invited", count: 0 },
        { label: "Need To Assign Editor", count: 0 },
        { label: "Need To Assign Reviewers", count: 0 },
      ],
    },
    {
      title: "REVIEW IN PROGRESS",
      items: [
        { label: "Reviewers Invited", count: 54 },
        { label: "Submission Require Additional Reviews", count: 51 },
        { label: "Submission With Required Reviews Completed", count: 3 },
        { label: "Under Review", count: 25 },
      ],
    },
    {
      title: "REVISIONS REVIEW IN PROGRESS",
      items: [
        { label: "Reviewers Invited", count: 0 },
        { label: "Submission Require Additional Reviews", count: 0 },
        { label: "Submission With Required Reviews Completed", count: 0 },
        { label: "Under Review", count: 0 },
      ],
    },
    {
      title: "COMPLETED ASSIGNMENTS",
      items: [
        { label: "Decision In Process", count: 0 },
        { label: "In Press", count: 0 },
        { label: "Publish", count: 0 },
        { label: "Accept", count: 78 },
      ],
    },
    {
      title: "INCOMPLETED ASSIGNMENTS",
      items: [
        { label: "Incompleted Submissions", count: 56 },
        { label: "Revisions Due", count: 34 },
        { label: "Submissions Sent Back to Author", count: 0 },
      ],
    },
  ]

  return (
    <main className="flex-1 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="bg-slate-700 text-white py-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {card.title}
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-600 p-1">
                  <Eye className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {card.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm text-blue-600 hover:underline">
                    {item.label} ( {item.count} )
                  </span>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
