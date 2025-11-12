"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, FileText, DollarSign } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-semibold">
                Realytics Admin
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin" className="gap-2">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/partners" className="gap-2">
                    <Users className="h-4 w-4" />
                    Partners
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/contracts" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Contracts
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/clients" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Clients
                  </Link>
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">View Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
