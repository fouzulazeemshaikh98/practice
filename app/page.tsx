"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"

interface TableEntry {
  id: string
  name: string
  email: string
  phone: string
  department: string
}

export default function Home() {
  const [entries, setEntries] = useState<TableEntry[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.department) {
      alert("Please fill in all fields")
      return
    }

    // Create new entry
    const newEntry: TableEntry = {
      id: Date.now().toString(),
      ...formData,
    }

    // Add to table
    setEntries((prev) => [newEntry, ...prev])

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
    })
  }

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Data Management</h1>
          <p className="text-slate-600">Add and manage your entries efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <Card className="lg:col-span-1 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Add New Entry</h2>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <Input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Entry
              </Button>
            </form>
          </Card>

          {/* Table Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Entries ({entries.length})</h2>

              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">No entries yet. Add one to get started!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Phone</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-slate-50"
                          }`}
                        >
                          <td className="py-3 px-4 text-slate-900">{entry.name}</td>
                          <td className="py-3 px-4 text-slate-600">{entry.email}</td>
                          <td className="py-3 px-4 text-slate-600">{entry.phone}</td>
                          <td className="py-3 px-4 text-slate-600">{entry.department}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Delete entry"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
