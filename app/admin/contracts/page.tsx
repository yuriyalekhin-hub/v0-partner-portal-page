"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, FileText, Download, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DocumentType = "contract" | "appendix1" | "appendix2" | "nda"

type Document = {
  id: string
  partnerId: string
  partnerName: string
  type: DocumentType
  version: string
  fileName: string
  signedDate: string
  status: "current" | "superseded"
}

type Partner = {
  id: string
  fullName: string
}

const mockPartners: Partner[] = [
  { id: "1", fullName: "John Smith" },
  { id: "2", fullName: "Maria Garcia" },
  { id: "3", fullName: "David Chen" },
  { id: "4", fullName: "Sarah Johnson" },
  { id: "5", fullName: "Mohammed Al-Rashid" },
  { id: "6", fullName: "Anna Kowalski" },
  { id: "7", fullName: "Carlos Rodriguez" },
  { id: "8", fullName: "Sophie Martin" },
  { id: "9", fullName: "Hans Mueller" },
  { id: "10", fullName: "Priya Sharma" },
  { id: "11", fullName: "Lars Andersson" },
  { id: "12", fullName: "Elena Petrov" },
  { id: "13", fullName: "Ahmed Hassan" },
  { id: "14", fullName: "James Wilson" },
  { id: "15", fullName: "Isabella Costa" },
  { id: "16", fullName: "Takeshi Yamamoto" },
  { id: "17", fullName: "Fatima Al-Mansouri" },
]

const mockDocuments: Document[] = [
  {
    id: "1",
    partnerId: "1",
    partnerName: "John Smith",
    type: "contract",
    version: "2.0",
    fileName: "partnership-agreement-v2.pdf",
    signedDate: "2024-12-15",
    status: "current",
  },
  {
    id: "2",
    partnerId: "1",
    partnerName: "John Smith",
    type: "appendix1",
    version: "1.0",
    fileName: "appendix-1-terms.pdf",
    signedDate: "2024-12-15",
    status: "current",
  },
  {
    id: "3",
    partnerId: "1",
    partnerName: "John Smith",
    type: "appendix2",
    version: "1.0",
    fileName: "appendix-2-pricing.pdf",
    signedDate: "2024-12-15",
    status: "current",
  },
  {
    id: "4",
    partnerId: "1",
    partnerName: "John Smith",
    type: "nda",
    version: "1.0",
    fileName: "nda-agreement.pdf",
    signedDate: "2024-12-15",
    status: "current",
  },
  {
    id: "5",
    partnerId: "2",
    partnerName: "Maria Garcia",
    type: "contract",
    version: "1.0",
    fileName: "partnership-agreement-maria.pdf",
    signedDate: "2024-11-20",
    status: "current",
  },
  {
    id: "6",
    partnerId: "2",
    partnerName: "Maria Garcia",
    type: "nda",
    version: "1.0",
    fileName: "nda-maria.pdf",
    signedDate: "2024-11-20",
    status: "current",
  },
  {
    id: "7",
    partnerId: "3",
    partnerName: "David Chen",
    type: "contract",
    version: "1.0",
    fileName: "partnership-agreement-david.pdf",
    signedDate: "2024-10-10",
    status: "current",
  },
  {
    id: "8",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    type: "contract",
    version: "2.0",
    fileName: "partnership-agreement-sarah-v2.pdf",
    signedDate: "2025-01-05",
    status: "current",
  },
  {
    id: "9",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    type: "appendix1",
    version: "1.0",
    fileName: "appendix-1-sarah.pdf",
    signedDate: "2025-01-05",
    status: "current",
  },
  {
    id: "10",
    partnerId: "5",
    partnerName: "Mohammed Al-Rashid",
    type: "contract",
    version: "1.0",
    fileName: "partnership-agreement-mohammed.pdf",
    signedDate: "2024-09-15",
    status: "current",
  },
]

const documentTypeLabels: Record<DocumentType, string> = {
  contract: "Main Contract",
  appendix1: "Appendix 1",
  appendix2: "Appendix 2",
  nda: "NDA",
}

export default function ContractsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<string>("all")
  const [formData, setFormData] = useState({
    partnerId: "",
    partnerName: "",
    type: "contract" as DocumentType,
    version: "",
    fileName: "",
    signedDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mark previous versions as superseded
    const updatedDocuments = documents.map((doc) =>
      doc.partnerId === formData.partnerId && doc.type === formData.type
        ? { ...doc, status: "superseded" as const }
        : doc,
    )

    const newDocument: Document = {
      id: Date.now().toString(),
      partnerId: formData.partnerId,
      partnerName: formData.partnerName,
      type: formData.type,
      version: formData.version,
      fileName: formData.fileName,
      signedDate: formData.signedDate,
      status: "current",
    }

    setDocuments([...updatedDocuments, newDocument])
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter((d) => d.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      partnerId: "",
      partnerName: "",
      type: "contract",
      version: "",
      fileName: "",
      signedDate: "",
    })
  }

  const getDocumentsByType = (type: DocumentType) => {
    const filtered = documents.filter((doc) => doc.type === type)
    if (selectedPartner === "all") {
      return filtered
    }
    return filtered.filter((doc) => doc.partnerId === selectedPartner)
  }

  const DocumentTable = ({ type }: { type: DocumentType }) => {
    const docs = getDocumentsByType(type)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Signed Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            docs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.partnerName}</TableCell>
                <TableCell>v{doc.version}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {doc.fileName}
                  </div>
                </TableCell>
                <TableCell>{new Date(doc.signedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === "current" ? "default" : "secondary"}>
                    {doc.status === "current" ? "Current" : "Superseded"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts Management</h1>
          <p className="text-muted-foreground mt-2">Manage contracts, appendices, and NDAs</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a new contract, appendix, or NDA for a partner.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="partner">Partner</Label>
                  <Select
                    value={formData.partnerId}
                    onValueChange={(value) => {
                      const partner = mockPartners.find((p) => p.id === value)
                      setFormData({
                        ...formData,
                        partnerId: value,
                        partnerName: partner?.fullName || "",
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPartners.map((partner) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as DocumentType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Main Contract</SelectItem>
                      <SelectItem value="appendix1">Appendix 1</SelectItem>
                      <SelectItem value="appendix2">Appendix 2</SelectItem>
                      <SelectItem value="nda">NDA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="1.0"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fileName">File Name</Label>
                  <Input
                    id="fileName"
                    placeholder="partnership-agreement.pdf"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signedDate">Signed Date</Label>
                  <Input
                    id="signedDate"
                    type="date"
                    value={formData.signedDate}
                    onChange={(e) => setFormData({ ...formData, signedDate: e.target.value })}
                    required
                  />
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF files only (max 10MB)</p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload Document</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              All Documents (
              {documents.filter((doc) => selectedPartner === "all" || doc.partnerId === selectedPartner).length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="partner-filter" className="text-sm font-normal">
                Filter by Partner:
              </Label>
              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger id="partner-filter" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  {mockPartners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contract" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contract">Main Contracts</TabsTrigger>
              <TabsTrigger value="appendix1">Appendix 1</TabsTrigger>
              <TabsTrigger value="appendix2">Appendix 2</TabsTrigger>
              <TabsTrigger value="nda">NDAs</TabsTrigger>
            </TabsList>
            <TabsContent value="contract" className="mt-4">
              <DocumentTable type="contract" />
            </TabsContent>
            <TabsContent value="appendix1" className="mt-4">
              <DocumentTable type="appendix1" />
            </TabsContent>
            <TabsContent value="appendix2" className="mt-4">
              <DocumentTable type="appendix2" />
            </TabsContent>
            <TabsContent value="nda" className="mt-4">
              <DocumentTable type="nda" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
