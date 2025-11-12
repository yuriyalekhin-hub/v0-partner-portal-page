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
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

type Partner = {
  id: string
  fullName: string
  email: string
  phone: string
  company: string
  countries: string[]
  industries: string[]
  managerName: string
  managerEmail: string
  referralLink: string
}

const mockPartners: Partner[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 8900",
    company: "Tech Solutions Inc",
    countries: ["USA", "Canada", "Mexico"],
    industries: ["Technology", "SaaS", "E-commerce"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=tech_solutions&utm_medium=partner&utm_content=tech",
  },
  {
    id: "2",
    fullName: "Maria Garcia",
    email: "maria.garcia@partners.com",
    phone: "+34 612 345 678",
    company: "European Analytics Group",
    countries: ["Spain", "France", "Italy"],
    industries: ["Restaurants", "Hospitality", "Retail"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=european_analytics&utm_medium=partner&utm_content=hospitality",
  },
  {
    id: "3",
    fullName: "David Chen",
    email: "david.chen@asiapacific.com",
    phone: "+86 138 0000 1234",
    company: "Asia Pacific Ventures",
    countries: ["China", "Singapore", "Japan"],
    industries: ["E-commerce", "Technology", "Manufacturing"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=asia_pacific&utm_medium=partner&utm_content=ecommerce",
  },
  {
    id: "4",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@autogroup.com",
    phone: "+44 20 7123 4567",
    company: "UK Auto Solutions",
    countries: ["United Kingdom", "Ireland"],
    industries: ["Automotive", "DIY", "Retail"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=uk_auto&utm_medium=partner&utm_content=automotive",
  },
  {
    id: "5",
    fullName: "Mohammed Al-Rashid",
    email: "m.alrashid@middleeastco.com",
    phone: "+971 50 123 4567",
    company: "Middle East Consulting",
    countries: ["UAE", "Saudi Arabia", "Qatar"],
    industries: ["Restaurants", "Hospitality", "Real Estate"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=middle_east&utm_medium=partner&utm_content=hospitality",
  },
  {
    id: "6",
    fullName: "Anna Kowalski",
    email: "anna.kowalski@easteurope.com",
    phone: "+48 601 234 567",
    company: "Eastern European Partners",
    countries: ["Poland", "Czech Republic", "Hungary"],
    industries: ["Technology", "Manufacturing", "Logistics"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=east_europe&utm_medium=partner&utm_content=tech",
  },
  {
    id: "7",
    fullName: "Carlos Rodriguez",
    email: "carlos.r@latinoamerica.com",
    phone: "+52 55 1234 5678",
    company: "Latino America Ventures",
    countries: ["Mexico", "Brazil", "Argentina"],
    industries: ["Restaurants", "Retail", "E-commerce"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=latino_america&utm_medium=partner&utm_content=restaurant",
  },
  {
    id: "8",
    fullName: "Sophie Martin",
    email: "sophie.martin@franceconsult.fr",
    phone: "+33 6 12 34 56 78",
    company: "France Business Consulting",
    countries: ["France", "Belgium", "Luxembourg"],
    industries: ["Restaurants", "Fashion", "Retail"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=france_business&utm_medium=partner&utm_content=restaurant",
  },
  {
    id: "9",
    fullName: "Hans Mueller",
    email: "hans.mueller@germanytech.de",
    phone: "+49 170 123 4567",
    company: "Germany Tech Solutions",
    countries: ["Germany", "Austria", "Switzerland"],
    industries: ["Automotive", "Manufacturing", "Technology"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=germany_tech&utm_medium=partner&utm_content=auto",
  },
  {
    id: "10",
    fullName: "Priya Sharma",
    email: "priya.sharma@indiaventures.in",
    phone: "+91 98765 43210",
    company: "India Digital Ventures",
    countries: ["India", "Bangladesh", "Sri Lanka"],
    industries: ["Technology", "E-commerce", "SaaS"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=india_digital&utm_medium=partner&utm_content=tech",
  },
  {
    id: "11",
    fullName: "Lars Andersson",
    email: "lars.andersson@nordic.se",
    phone: "+46 70 123 4567",
    company: "Nordic Partners Group",
    countries: ["Sweden", "Norway", "Denmark", "Finland"],
    industries: ["Technology", "SaaS", "Sustainability"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=nordic_group&utm_medium=partner&utm_content=saas",
  },
  {
    id: "12",
    fullName: "Elena Petrov",
    email: "elena.petrov@russiaconnect.ru",
    phone: "+7 916 123 4567",
    company: "Russia Business Connect",
    countries: ["Russia", "Ukraine", "Kazakhstan"],
    industries: ["E-commerce", "Retail", "Technology"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=russia_connect&utm_medium=partner&utm_content=ecommerce",
  },
  {
    id: "13",
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@africapartners.com",
    phone: "+20 100 123 4567",
    company: "Africa Growth Partners",
    countries: ["Egypt", "Kenya", "South Africa"],
    industries: ["Retail", "Hospitality", "Agriculture"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=africa_growth&utm_medium=partner&utm_content=retail",
  },
  {
    id: "14",
    fullName: "James Wilson",
    email: "james.wilson@australasia.com.au",
    phone: "+61 400 123 456",
    company: "Australasia Business Group",
    countries: ["Australia", "New Zealand"],
    industries: ["Restaurants", "Hospitality", "Tourism"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=australasia&utm_medium=partner&utm_content=hospitality",
  },
  {
    id: "15",
    fullName: "Isabella Costa",
    email: "isabella.costa@brazilventures.br",
    phone: "+55 11 98765 4321",
    company: "Brazil Growth Ventures",
    countries: ["Brazil", "Chile", "Colombia"],
    industries: ["E-commerce", "Fashion", "Beauty"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=brazil_ventures&utm_medium=partner&utm_content=ecommerce",
  },
  {
    id: "16",
    fullName: "Takeshi Yamamoto",
    email: "takeshi.yamamoto@japancorp.jp",
    phone: "+81 90 1234 5678",
    company: "Japan Innovation Corp",
    countries: ["Japan", "South Korea", "Taiwan"],
    industries: ["Technology", "Manufacturing", "Automotive"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=japan_innovation&utm_medium=partner&utm_content=tech",
  },
  {
    id: "17",
    fullName: "Fatima Al-Mansouri",
    email: "fatima.almansouri@gulfpartners.ae",
    phone: "+971 50 987 6543",
    company: "Gulf Business Partners",
    countries: ["UAE", "Bahrain", "Oman", "Kuwait"],
    industries: ["Real Estate", "Hospitality", "Luxury Retail"],
    managerName: "Yosef Hersonski",
    managerEmail: "yosef@realytics.com",
    referralLink:
      "https://get-started.realytics.com/get-started-client-form/?utm_source=gulf_partners&utm_medium=partner&utm_content=luxury",
  },
]

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    countries: "",
    industries: "",
    managerName: "",
    managerEmail: "",
    referralLink: "",
  })

  const totalPages = Math.ceil(partners.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPartners = partners.slice(startIndex, endIndex)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPartner: Partner = {
      id: editingPartner?.id || Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      countries: formData.countries.split(",").map((c) => c.trim()),
      industries: formData.industries.split(",").map((i) => i.trim()),
      managerName: formData.managerName,
      managerEmail: formData.managerEmail,
      referralLink: formData.referralLink,
    }

    if (editingPartner) {
      setPartners(partners.map((p) => (p.id === editingPartner.id ? newPartner : p)))
    } else {
      setPartners([...partners, newPartner])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      fullName: partner.fullName,
      email: partner.email,
      phone: partner.phone,
      company: partner.company,
      countries: partner.countries.join(", "),
      industries: partner.industries.join(", "),
      managerName: partner.managerName,
      managerEmail: partner.managerEmail,
      referralLink: partner.referralLink,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      setPartners(partners.filter((p) => p.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      countries: "",
      industries: "",
      managerName: "",
      managerEmail: "",
      referralLink: "",
    })
    setEditingPartner(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners Management</h1>
          <p className="text-muted-foreground mt-2">Manage partner information and details</p>
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
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPartner ? "Edit Partner" : "Add New Partner"}</DialogTitle>
              <DialogDescription>
                {editingPartner ? "Update partner information below." : "Fill in the partner information below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="countries">Countries (comma-separated)</Label>
                  <Input
                    id="countries"
                    placeholder="USA, Canada, Mexico"
                    value={formData.countries}
                    onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industries">Industries (comma-separated)</Label>
                  <Input
                    id="industries"
                    placeholder="Technology, SaaS, E-commerce"
                    value={formData.industries}
                    onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
                    required
                  />
                </div>
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-semibold mb-3">Account Manager Information</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="managerName">Manager Name</Label>
                      <Input
                        id="managerName"
                        placeholder="Yosef Hersonski"
                        value={formData.managerName}
                        onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="managerEmail">Manager Email</Label>
                      <Input
                        id="managerEmail"
                        type="email"
                        placeholder="yosef@realytics.com"
                        value={formData.managerEmail}
                        onChange={(e) => setFormData({ ...formData, managerEmail: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-semibold mb-3">Referral Information</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="referralLink">Referral Link</Label>
                    <Input
                      id="referralLink"
                      type="url"
                      placeholder="https://get-started.realytics.com/get-started-client-form/?utm_source=partner_name&utm_medium=partner&utm_content=cafe"
                      value={formData.referralLink}
                      onChange={(e) => setFormData({ ...formData, referralLink: e.target.value })}
                      required
                    />
                  </div>
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
                <Button type="submit">{editingPartner ? "Update Partner" : "Add Partner"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Partners ({partners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Countries</TableHead>
                <TableHead>Industries</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.fullName}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>{partner.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.countries.slice(0, 2).map((country) => (
                        <Badge key={country} variant="secondary">
                          {country}
                        </Badge>
                      ))}
                      {partner.countries.length > 2 && (
                        <Badge variant="secondary">+{partner.countries.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.industries.slice(0, 2).map((industry) => (
                        <Badge key={industry} variant="outline">
                          {industry}
                        </Badge>
                      ))}
                      {partner.industries.length > 2 && (
                        <Badge variant="outline">+{partner.industries.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(partner)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, partners.length)} of {partners.length} partners
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
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
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
