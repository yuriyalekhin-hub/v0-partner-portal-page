"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Copy,
  Check,
  FileText,
  Users,
  Globe,
  Briefcase,
  TrendingUp,
  History,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

// Mock data - replace with real data from your backend
const partnerData = {
  contract: {
    fileName: "Partner_Agreement_2024.pdf",
    signedDate: "2024-01-15",
    fileUrl: "/contracts/partner-agreement.pdf",
  },
  appendices: [
    {
      fileName: "Appendix_A_Services.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/appendix-a.pdf",
    },
    {
      fileName: "Appendix_B_Pricing.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/appendix-b.pdf",
    },
  ],
  nda: {
    fileName: "NDA_Agreement_2024.pdf",
    signedDate: "2024-01-15",
    fileUrl: "/contracts/nda.pdf",
  },
  referralLink:
    "https://get-started.realytics.com/get-started-client-form/?utm_source=partner_name&utm_medium=partner&utm_content=cafe",
  contact: {
    fullName: "John Anderson",
    email: "john.anderson@example.com",
    phone: "+1 (555) 123-4567",
    company: "Anderson Analytics Group",
  },
  manager: {
    name: "Yosef Hersonski",
    email: "yosef@realytics.com",
  },
  countries: ["United States", "Canada", "United Kingdom", "Germany", "France"],
  industries: ["Cafes & Restaurants", "Automotive", "DIY & Home Improvement", "Retail", "Healthcare"],
  clients: [
    {
      name: "Cafe Delight",
      percentage: 15,
      amount: 12500,
      paidCommission: 5625,
      nextPaymentDate: "2025-10-15",
      nextPaymentAmount: 1875,
    },
    {
      name: "AutoPro Services",
      percentage: 12,
      amount: 8900,
      paidCommission: 3204,
      nextPaymentDate: "2025-10-20",
      nextPaymentAmount: 1068,
    },
    {
      name: "HomeMax DIY",
      percentage: 18,
      amount: 15200,
      paidCommission: 8208,
      nextPaymentDate: "2025-10-10",
      nextPaymentAmount: 2736,
    },
    {
      name: "Urban Bistro",
      percentage: 15,
      amount: 9800,
      paidCommission: 4410,
      nextPaymentDate: "2025-10-18",
      nextPaymentAmount: 1470,
    },
    {
      name: "CarCare Plus",
      percentage: 10,
      amount: 6400,
      paidCommission: 1920,
      nextPaymentDate: "2025-10-25",
      nextPaymentAmount: 640,
    },
  ],
}

export function PartnerPortal() {
  const [copied, setCopied] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(partnerData.clients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = partnerData.clients.slice(startIndex, endIndex)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(partnerData.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadContract = () => {
    // In a real app, this would trigger a file download
    window.open(partnerData.contract.fileUrl, "_blank")
  }

  const handleDownloadDocument = (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Partner Portal</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {partnerData.contact.fullName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Active Partner
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Client Deals Section */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <CardTitle>Clients</CardTitle>
                  </div>
                  <CardDescription>Track your active client relationships and commission rates</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  As of September 2025
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client Name</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                        Paid Commission
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Next Payment</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentClients.map((client, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <span className="text-sm font-medium text-foreground block">{client.name}</span>
                            <span className="text-xs text-muted-foreground">{client.percentage}% commission</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm font-medium text-foreground">
                            ${client.paidCommission.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="text-right">
                            <span className="text-sm font-semibold text-foreground block">
                              ${client.nextPaymentAmount.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(client.nextPaymentDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, partnerData.clients.length)} of{" "}
                    {partnerData.clients.length} clients
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-9"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Total Active Clients</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{partnerData.clients.length}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    ${partnerData.clients.reduce((acc, client) => acc + client.paidCommission, 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Next Payment Total</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    ${partnerData.clients.reduce((acc, client) => acc + client.nextPaymentAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signed Documents Section */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Signed Documents</CardTitle>
              </div>
              <CardDescription>Your partnership agreement, appendices, and NDA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Contract */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Main Contract</h4>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{partnerData.contract.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Signed on{" "}
                        {new Date(partnerData.contract.signedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/contract-history?type=contract">
                      <Button variant="ghost" size="sm">
                        <History className="h-4 w-4 mr-2" />
                        History
                      </Button>
                    </Link>
                    <Button onClick={handleDownloadContract} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Appendices */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Appendices</h4>
                <div className="space-y-2">
                  {partnerData.appendices.map((appendix, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{appendix.fileName}</p>
                          <p className="text-sm text-muted-foreground">
                            Signed on{" "}
                            {new Date(appendix.signedDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/contract-history?type=appendix${index + 1}`}>
                          <Button variant="ghost" size="sm">
                            <History className="h-4 w-4 mr-2" />
                            History
                          </Button>
                        </Link>
                        <Button onClick={() => handleDownloadDocument(appendix.fileUrl)} size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NDA */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Non-Disclosure Agreement</h4>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{partnerData.nda.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Signed on{" "}
                        {new Date(partnerData.nda.signedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/contract-history?type=nda">
                      <Button variant="ghost" size="sm">
                        <History className="h-4 w-4 mr-2" />
                        History
                      </Button>
                    </Link>
                    <Button onClick={() => handleDownloadDocument(partnerData.nda.fileUrl)} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Link Section */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Referral Link</CardTitle>
              </div>
              <CardDescription>Share this link to track your referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-border bg-muted/50 p-3">
                  <p className="text-sm text-foreground break-all font-mono">{partnerData.referralLink}</p>
                </div>
                <Button onClick={handleCopyLink} size="sm" variant="outline" className="shrink-0 bg-transparent">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Manager Section */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Your Account Manager</CardTitle>
              </div>
              <CardDescription>Your dedicated Realytics contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Manager</span>
                  <span className="text-sm font-medium text-foreground">{partnerData.manager.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <a
                    href={`mailto:${partnerData.manager.email}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {partnerData.manager.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Contact Information</CardTitle>
              </div>
              <CardDescription>Your registered partner details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <span className="text-sm font-medium text-foreground">{partnerData.contact.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground">{partnerData.contact.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium text-foreground">{partnerData.contact.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Company</span>
                  <span className="text-sm font-medium text-foreground">{partnerData.contact.company}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Countries & Industries */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Operating Regions</CardTitle>
              </div>
              <CardDescription>Countries and industries you serve</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Countries</h4>
                <div className="flex flex-wrap gap-2">
                  {partnerData.countries.map((country) => (
                    <Badge key={country} variant="secondary" className="text-xs">
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {partnerData.industries.map((industry) => (
                    <Badge key={industry} variant="outline" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2025 Realytics. All rights reserved.</p>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Settings className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
