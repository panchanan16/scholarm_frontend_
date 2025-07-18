"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronDown, HelpCircle, User } from "lucide-react"

export default function SubmissionInterface() {
  const [selectedOption, setSelectedOption] = useState("no")
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">C</div>
          <span className="font-medium">EDIT MODE</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500">
            PREVIEW
          </Button>
          <Button variant="outline" size="sm" className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500">
            EXIT
          </Button>
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Type: TBD</div>
            </div>

            <nav className="space-y-1">
              <div>
                <button
                  onClick={() => toggleSection("gettingStarted")}
                  className="flex items-center w-full text-left py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  {expandedSections.gettingStarted ? (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1" />
                  )}
                  Getting Started
                </button>
                {expandedSections.gettingStarted && (
                  <div className="ml-5 space-y-1">
                    <div className="py-1 text-sm text-blue-600 font-medium">Competition</div>
                  </div>
                )}
              </div>

              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Channel</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Collection</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Article Type</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Title, etc.</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Authors</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Disclosures</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Article</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">References</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Reviewers</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Summary</div>
              <div className="py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Submit</div>
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex items-center py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-2" />
                How-to & Info
              </div>
              <div className="flex items-center py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                📖 Author Guide
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Advertisement Banner */}
          <div className="text-center text-xs text-gray-400 mb-6">ADVERTISEMENT</div>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span>Getting Started</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Competition</span>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl">
            <h1 className="text-3xl font-light text-blue-600 mb-6">Is this a competition entry?</h1>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed mb-2">
                Cureus hosts sponsored publishing competitions to encourage medical discovery and document clinical
                experiences – be they positive, negative, or neutral – and foster broader educational outreach through
                Open Access publication that is free to both authors and readers.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Click here to learn more.
                </a>
              </p>
            </div>

            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4 mb-12">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="text-gray-700">
                  No, this is not a competition entry.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="text-gray-700">
                  Yes, this is a competition entry.
                </Label>
              </div>
            </RadioGroup>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="px-8 py-2 bg-red-100 border-red-300 text-red-700 hover:bg-red-200">
                SAVE
              </Button>
              <Button className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white">SAVE AND CONTINUE</Button>
            </div>
          </div>
        </main>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-6 left-6">
        <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 shadow-lg" size="sm">
          <HelpCircle className="w-4 h-4 mr-2" />
          Help
        </Button>
      </div>
    </div>
  )
}
