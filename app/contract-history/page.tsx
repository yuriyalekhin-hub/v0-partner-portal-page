"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const documentHistory = {
  contract: [
    {
      id: 1,
      fileName: "Partner_Agreement_2024.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/partner-agreement-2024.pdf",
      version: "v3.0",
      status: "current",
    },
    {
      id: 2,
      fileName: "Partner_Agreement_2023_Amendment.pdf",
      signedDate: "2023-08-22",
      fileUrl: "/contracts/partner-agreement-2023-amendment.pdf",
      version: "v2.1",
      status: "superseded",
    },
    {
      id: 3,
      fileName: "Partner_Agreement_2023.pdf",
      signedDate: "2023-03-10",
      fileUrl: "/contracts/partner-agreement-2023.pdf",
      version: "v2.0",
      status: "superseded",
    },
    {
      id: 4,
      fileName: "Partner_Agreement_2022.pdf",
      signedDate: "2022-06-05",
      fileUrl: "/contracts/partner-agreement-2022.pdf",
      version: "v1.0",
      status: "superseded",
    },
  ],
  appendix1: [
    {
      id: 1,
      fileName: "Appendix_A_Services_2024.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/appendix-a-2024.pdf",
      version: "v2.0",
      status: "current",
    },
    {
      id: 2,
      fileName: "Appendix_A_Services_2023.pdf",
      signedDate: "2023-03-10",
      fileUrl: "/contracts/appendix-a-2023.pdf",
      version: "v1.0",
      status: "superseded",
    },
  ],
  appendix2: [
    {
      id: 1,
      fileName: "Appendix_B_Pricing_2024.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/appendix-b-2024.pdf",
      version: "v2.0",
      status: "current",
    },
    {
      id: 2,
      fileName: "Appendix_B_Pricing_2023.pdf",
      signedDate: "2023-03-10",
      fileUrl: "/contracts/appendix-b-2023.pdf",
      version: "v1.0",
      status: "superseded",
    },
  ],
  nda: [
    {
      id: 1,
      fileName: "NDA_Agreement_2024.pdf",
      signedDate: "2024-01-15",
      fileUrl: "/contracts/nda-2024.pdf",
      version: "v1.0",
      status: "current",
    },
  ],
}

const documentTitles: Record<string, string> = {
  contract: "Main Contract",
  appendix1: "Appendix A - Services",
  appendix2: "Appendix B - Pricing",
  nda: "Non-Disclosure Agreement",
}

export default function ContractHistoryPage() {
  const searchParams = useSearchParams()
  const documentType = (searchParams.get("type") as keyof typeof documentHistory) || "contract"
  const documents = documentHistory[documentType] || documentHistory.contract

  const handleDownloadContract = (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portal
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Document History</h1>
              <p className="text-muted-foreground mt-1">
                View all previous versions of {documentTitles[documentType] || "your documents"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>{documentTitles[documentType] || "All Documents"}</CardTitle>
            </div>
            <CardDescription>Complete history of signed versions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-foreground">{document.fileName}</p>
                        <Badge variant={document.status === "current" ? "default" : "secondary"} className="text-xs">
                          {document.status === "current" ? "Current" : "Superseded"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {document.version}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Signed on{" "}
                        {new Date(document.signedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownloadContract(document.fileUrl)}
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Versions</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{documents.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">First Signed</p>
                  <p className="text-lg font-semibold text-foreground mt-1">
                    {new Date(documents[documents.length - 1].signedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
