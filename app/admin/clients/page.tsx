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
import { Plus, Pencil, Trash2, TrendingUp, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Deal = {
  id: string
  partnerId: string
  partnerName: string
  clientName: string
  commission: number
  amount: number
  paidCommission: number
  nextPaymentDate: string
  nextPaymentAmount: number
  status: "active" | "pending" | "completed"
  startDate: string
}

const mockDeals: Deal[] = [
  // John Smith (Partner 1) - 11 clients
  {
    id: "1-1",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Acme Corporation",
    commission: 15,
    amount: 125000,
    paidCommission: 56250,
    nextPaymentDate: "2025-10-15",
    nextPaymentAmount: 18750,
    status: "active",
    startDate: "2024-01-15",
  },
  {
    id: "1-2",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "TechStart Inc",
    commission: 12,
    amount: 85000,
    paidCommission: 30600,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 10200,
    status: "active",
    startDate: "2024-03-20",
  },
  {
    id: "1-3",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Global Solutions",
    commission: 18,
    amount: 200000,
    paidCommission: 108000,
    nextPaymentDate: "2025-10-10",
    nextPaymentAmount: 36000,
    status: "active",
    startDate: "2024-06-10",
  },
  {
    id: "1-4",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Digital Ventures",
    commission: 14,
    amount: 95000,
    paidCommission: 39900,
    nextPaymentDate: "2025-10-18",
    nextPaymentAmount: 13300,
    status: "active",
    startDate: "2024-02-28",
  },
  {
    id: "1-5",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Cloud Innovations",
    commission: 16,
    amount: 150000,
    paidCommission: 72000,
    nextPaymentDate: "2025-10-12",
    nextPaymentAmount: 24000,
    status: "active",
    startDate: "2024-04-15",
  },
  {
    id: "1-6",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Smart Systems",
    commission: 13,
    amount: 110000,
    paidCommission: 42900,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 14300,
    status: "active",
    startDate: "2024-05-20",
  },
  {
    id: "1-7",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Future Tech",
    commission: 15,
    amount: 130000,
    paidCommission: 58500,
    nextPaymentDate: "2025-10-14",
    nextPaymentAmount: 19500,
    status: "pending",
    startDate: "2024-07-01",
  },
  {
    id: "1-8",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Innovate Corp",
    commission: 17,
    amount: 175000,
    paidCommission: 89250,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 29750,
    status: "active",
    startDate: "2024-08-10",
  },
  {
    id: "1-9",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "NextGen Solutions",
    commission: 14,
    amount: 105000,
    paidCommission: 44100,
    nextPaymentDate: "2025-10-16",
    nextPaymentAmount: 14700,
    status: "active",
    startDate: "2024-09-15",
  },
  {
    id: "1-10",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Advanced Analytics",
    commission: 16,
    amount: 140000,
    paidCommission: 67200,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 22400,
    status: "active",
    startDate: "2024-10-01",
  },
  {
    id: "1-11",
    partnerId: "1",
    partnerName: "John Smith",
    clientName: "Data Dynamics",
    commission: 15,
    amount: 120000,
    paidCommission: 54000,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 18000,
    status: "completed",
    startDate: "2024-11-12",
  },

  // Maria Garcia (Partner 2) - 11 clients
  {
    id: "2-1",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Cafe Central",
    commission: 20,
    amount: 45000,
    paidCommission: 27000,
    nextPaymentDate: "2025-10-17",
    nextPaymentAmount: 9000,
    status: "active",
    startDate: "2024-01-20",
  },
  {
    id: "2-2",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Bistro Elegante",
    commission: 18,
    amount: 52000,
    paidCommission: 28080,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 9360,
    status: "active",
    startDate: "2024-02-15",
  },
  {
    id: "2-3",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "La Cocina",
    commission: 22,
    amount: 38000,
    paidCommission: 25080,
    nextPaymentDate: "2025-10-13",
    nextPaymentAmount: 8360,
    status: "active",
    startDate: "2024-03-10",
  },
  {
    id: "2-4",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Tapas Bar Madrid",
    commission: 19,
    amount: 48000,
    paidCommission: 27360,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 9120,
    status: "active",
    startDate: "2024-04-05",
  },
  {
    id: "2-5",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Restaurant Plaza",
    commission: 21,
    amount: 55000,
    paidCommission: 34650,
    nextPaymentDate: "2025-10-11",
    nextPaymentAmount: 11550,
    status: "active",
    startDate: "2024-05-12",
  },
  {
    id: "2-6",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Gourmet Corner",
    commission: 20,
    amount: 42000,
    paidCommission: 25200,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 8400,
    status: "pending",
    startDate: "2024-06-18",
  },
  {
    id: "2-7",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Urban Kitchen",
    commission: 18,
    amount: 50000,
    paidCommission: 27000,
    nextPaymentDate: "2025-10-15",
    nextPaymentAmount: 9000,
    status: "active",
    startDate: "2024-07-22",
  },
  {
    id: "2-8",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Fine Dining Co",
    commission: 23,
    amount: 60000,
    paidCommission: 41400,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 13800,
    status: "active",
    startDate: "2024-08-05",
  },
  {
    id: "2-9",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Street Food Hub",
    commission: 17,
    amount: 35000,
    paidCommission: 17850,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 5950,
    status: "active",
    startDate: "2024-09-10",
  },
  {
    id: "2-10",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Fusion Restaurant",
    commission: 20,
    amount: 47000,
    paidCommission: 28200,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 9400,
    status: "active",
    startDate: "2024-10-15",
  },
  {
    id: "2-11",
    partnerId: "2",
    partnerName: "Maria Garcia",
    clientName: "Seafood Palace",
    commission: 19,
    amount: 53000,
    paidCommission: 30210,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 10070,
    status: "completed",
    startDate: "2024-11-20",
  },

  // Chen Wei (Partner 3) - 11 clients
  {
    id: "3-1",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Beijing Motors",
    commission: 16,
    amount: 180000,
    paidCommission: 86400,
    nextPaymentDate: "2025-10-14",
    nextPaymentAmount: 28800,
    status: "active",
    startDate: "2024-01-25",
  },
  {
    id: "3-2",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Shanghai Auto Group",
    commission: 17,
    amount: 195000,
    paidCommission: 99450,
    nextPaymentDate: "2025-10-18",
    nextPaymentAmount: 33150,
    status: "active",
    startDate: "2024-02-20",
  },
  {
    id: "3-3",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Dragon Tech Solutions",
    commission: 15,
    amount: 160000,
    paidCommission: 72000,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 24000,
    status: "active",
    startDate: "2024-03-15",
  },
  {
    id: "3-4",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Great Wall Automotive",
    commission: 18,
    amount: 210000,
    paidCommission: 113400,
    nextPaymentDate: "2025-10-16",
    nextPaymentAmount: 37800,
    status: "active",
    startDate: "2024-04-10",
  },
  {
    id: "3-5",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Pearl River Industries",
    commission: 16,
    amount: 175000,
    paidCommission: 84000,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 28000,
    status: "active",
    startDate: "2024-05-05",
  },
  {
    id: "3-6",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Yangtze Manufacturing",
    commission: 17,
    amount: 188000,
    paidCommission: 95880,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 31960,
    status: "pending",
    startDate: "2024-06-12",
  },
  {
    id: "3-7",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Silk Road Logistics",
    commission: 15,
    amount: 165000,
    paidCommission: 74250,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 24750,
    status: "active",
    startDate: "2024-07-08",
  },
  {
    id: "3-8",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Forbidden City Motors",
    commission: 19,
    amount: 220000,
    paidCommission: 125400,
    nextPaymentDate: "2025-10-12",
    nextPaymentAmount: 41800,
    status: "active",
    startDate: "2024-08-15",
  },
  {
    id: "3-9",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Dynasty Auto Parts",
    commission: 16,
    amount: 170000,
    paidCommission: 81600,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 27200,
    status: "active",
    startDate: "2024-09-20",
  },
  {
    id: "3-10",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Terracotta Technologies",
    commission: 17,
    amount: 192000,
    paidCommission: 97920,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 32640,
    status: "active",
    startDate: "2024-10-25",
  },
  {
    id: "3-11",
    partnerId: "3",
    partnerName: "Chen Wei",
    clientName: "Lotus Automotive",
    commission: 18,
    amount: 205000,
    paidCommission: 110700,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 36900,
    status: "completed",
    startDate: "2024-11-30",
  },

  // Sarah Johnson (Partner 4) - 11 clients
  {
    id: "4-1",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Home Depot UK",
    commission: 14,
    amount: 145000,
    paidCommission: 60900,
    nextPaymentDate: "2025-10-15",
    nextPaymentAmount: 20300,
    status: "active",
    startDate: "2024-01-18",
  },
  {
    id: "4-2",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "DIY Masters",
    commission: 15,
    amount: 135000,
    paidCommission: 60750,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 20250,
    status: "active",
    startDate: "2024-02-22",
  },
  {
    id: "4-3",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Build & Fix",
    commission: 16,
    amount: 128000,
    paidCommission: 61440,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 20480,
    status: "active",
    startDate: "2024-03-28",
  },
  {
    id: "4-4",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Garden Center Plus",
    commission: 13,
    amount: 115000,
    paidCommission: 44850,
    nextPaymentDate: "2025-10-17",
    nextPaymentAmount: 14950,
    status: "active",
    startDate: "2024-04-15",
  },
  {
    id: "4-5",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Tools & More",
    commission: 14,
    amount: 140000,
    paidCommission: 58800,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 19600,
    status: "active",
    startDate: "2024-05-20",
  },
  {
    id: "4-6",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Hardware Kingdom",
    commission: 15,
    amount: 132000,
    paidCommission: 59400,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 19800,
    status: "pending",
    startDate: "2024-06-25",
  },
  {
    id: "4-7",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Construction Supply Co",
    commission: 17,
    amount: 155000,
    paidCommission: 79050,
    nextPaymentDate: "2025-10-13",
    nextPaymentAmount: 26350,
    status: "active",
    startDate: "2024-07-30",
  },
  {
    id: "4-8",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Home Improvement Hub",
    commission: 14,
    amount: 138000,
    paidCommission: 57960,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 19320,
    status: "active",
    startDate: "2024-08-18",
  },
  {
    id: "4-9",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Renovation Station",
    commission: 16,
    amount: 148000,
    paidCommission: 71040,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 23680,
    status: "active",
    startDate: "2024-09-22",
  },
  {
    id: "4-10",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Paint & Decor",
    commission: 15,
    amount: 125000,
    paidCommission: 56250,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 18750,
    status: "active",
    startDate: "2024-10-28",
  },
  {
    id: "4-11",
    partnerId: "4",
    partnerName: "Sarah Johnson",
    clientName: "Outdoor Living Store",
    commission: 14,
    amount: 142000,
    paidCommission: 59640,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 19880,
    status: "completed",
    startDate: "2024-12-05",
  },

  // Ahmed Hassan (Partner 5) - 11 clients
  {
    id: "5-1",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Dubai Tech Hub",
    commission: 18,
    amount: 165000,
    paidCommission: 89100,
    nextPaymentDate: "2025-10-16",
    nextPaymentAmount: 29700,
    status: "active",
    startDate: "2024-01-22",
  },
  {
    id: "5-2",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Abu Dhabi Solutions",
    commission: 17,
    amount: 155000,
    paidCommission: 79050,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 26350,
    status: "active",
    startDate: "2024-02-18",
  },
  {
    id: "5-3",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Emirates Digital",
    commission: 19,
    amount: 178000,
    paidCommission: 101460,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 33820,
    status: "active",
    startDate: "2024-03-25",
  },
  {
    id: "5-4",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Arabian Software",
    commission: 16,
    amount: 142000,
    paidCommission: 68160,
    nextPaymentDate: "2025-10-18",
    nextPaymentAmount: 22720,
    status: "active",
    startDate: "2024-04-12",
  },
  {
    id: "5-5",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Gulf Innovations",
    commission: 18,
    amount: 168000,
    paidCommission: 90720,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 30240,
    status: "active",
    startDate: "2024-05-28",
  },
  {
    id: "5-6",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Desert Tech",
    commission: 17,
    amount: 152000,
    paidCommission: 77520,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 25840,
    status: "pending",
    startDate: "2024-06-15",
  },
  {
    id: "5-7",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Oasis Systems",
    commission: 19,
    amount: 175000,
    paidCommission: 99750,
    nextPaymentDate: "2025-10-14",
    nextPaymentAmount: 33250,
    status: "active",
    startDate: "2024-07-20",
  },
  {
    id: "5-8",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Falcon Technologies",
    commission: 18,
    amount: 162000,
    paidCommission: 87480,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 29160,
    status: "active",
    startDate: "2024-08-25",
  },
  {
    id: "5-9",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Camel Consulting",
    commission: 16,
    amount: 145000,
    paidCommission: 69600,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 23200,
    status: "active",
    startDate: "2024-09-18",
  },
  {
    id: "5-10",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Mirage Digital",
    commission: 17,
    amount: 158000,
    paidCommission: 80580,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 26860,
    status: "active",
    startDate: "2024-10-22",
  },
  {
    id: "5-11",
    partnerId: "5",
    partnerName: "Ahmed Hassan",
    clientName: "Pearl Innovations",
    commission: 19,
    amount: 182000,
    paidCommission: 103740,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 34580,
    status: "completed",
    startDate: "2024-11-28",
  },

  // Anna Kowalski (Partner 6) - 11 clients
  {
    id: "6-1",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Warsaw Manufacturing",
    commission: 15,
    amount: 118000,
    paidCommission: 53100,
    nextPaymentDate: "2025-10-17",
    nextPaymentAmount: 17700,
    status: "active",
    startDate: "2024-01-30",
  },
  {
    id: "6-2",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Krakow Industries",
    commission: 16,
    amount: 125000,
    paidCommission: 60000,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 20000,
    status: "active",
    startDate: "2024-02-25",
  },
  {
    id: "6-3",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Polish Electronics",
    commission: 14,
    amount: 110000,
    paidCommission: 46200,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 15400,
    status: "active",
    startDate: "2024-03-20",
  },
  {
    id: "6-4",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Gdansk Tech",
    commission: 17,
    amount: 132000,
    paidCommission: 67320,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 22440,
    status: "active",
    startDate: "2024-04-28",
  },
  {
    id: "6-5",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Wroclaw Solutions",
    commission: 15,
    amount: 122000,
    paidCommission: 54900,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 18300,
    status: "active",
    startDate: "2024-05-15",
  },
  {
    id: "6-6",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Baltic Manufacturing",
    commission: 16,
    amount: 128000,
    paidCommission: 61440,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 20480,
    status: "pending",
    startDate: "2024-06-22",
  },
  {
    id: "6-7",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Vistula Industries",
    commission: 14,
    amount: 115000,
    paidCommission: 48300,
    nextPaymentDate: "2025-10-15",
    nextPaymentAmount: 16100,
    status: "active",
    startDate: "2024-07-18",
  },
  {
    id: "6-8",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Poznan Electronics",
    commission: 18,
    amount: 138000,
    paidCommission: 74520,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 24840,
    status: "active",
    startDate: "2024-08-22",
  },
  {
    id: "6-9",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Lodz Components",
    commission: 15,
    amount: 120000,
    paidCommission: 54000,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 18000,
    status: "active",
    startDate: "2024-09-28",
  },
  {
    id: "6-10",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Silesia Manufacturing",
    commission: 16,
    amount: 130000,
    paidCommission: 62400,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 20800,
    status: "active",
    startDate: "2024-10-30",
  },
  {
    id: "6-11",
    partnerId: "6",
    partnerName: "Anna Kowalski",
    clientName: "Carpathian Tech",
    commission: 17,
    amount: 135000,
    paidCommission: 68850,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 22950,
    status: "completed",
    startDate: "2024-12-08",
  },

  // Pierre Dubois (Partner 7) - 11 clients
  {
    id: "7-1",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Paris Retail Group",
    commission: 19,
    amount: 98000,
    paidCommission: 55860,
    nextPaymentDate: "2025-10-18",
    nextPaymentAmount: 18620,
    status: "active",
    startDate: "2024-01-28",
  },
  {
    id: "7-2",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Lyon Fashion",
    commission: 20,
    amount: 105000,
    paidCommission: 63000,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 21000,
    status: "active",
    startDate: "2024-02-20",
  },
  {
    id: "7-3",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Marseille Boutique",
    commission: 18,
    amount: 88000,
    paidCommission: 47520,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 15840,
    status: "active",
    startDate: "2024-03-18",
  },
  {
    id: "7-4",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Bordeaux Style",
    commission: 21,
    amount: 112000,
    paidCommission: 70560,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 23520,
    status: "active",
    startDate: "2024-04-22",
  },
  {
    id: "7-5",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Nice Fashion House",
    commission: 19,
    amount: 95000,
    paidCommission: 54150,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 18050,
    status: "active",
    startDate: "2024-05-18",
  },
  {
    id: "7-6",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Toulouse Retail",
    commission: 20,
    amount: 102000,
    paidCommission: 61200,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 20400,
    status: "pending",
    startDate: "2024-06-25",
  },
  {
    id: "7-7",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Strasbourg Boutique",
    commission: 18,
    amount: 92000,
    paidCommission: 49680,
    nextPaymentDate: "2025-10-16",
    nextPaymentAmount: 16560,
    status: "active",
    startDate: "2024-07-15",
  },
  {
    id: "7-8",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Nantes Fashion",
    commission: 22,
    amount: 118000,
    paidCommission: 77880,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 25960,
    status: "active",
    startDate: "2024-08-20",
  },
  {
    id: "7-9",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Montpellier Style",
    commission: 19,
    amount: 100000,
    paidCommission: 57000,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 19000,
    status: "active",
    startDate: "2024-09-25",
  },
  {
    id: "7-10",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Lille Retail Co",
    commission: 20,
    amount: 108000,
    paidCommission: 64800,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 21600,
    status: "active",
    startDate: "2024-10-28",
  },
  {
    id: "7-11",
    partnerId: "7",
    partnerName: "Pierre Dubois",
    clientName: "Cannes Fashion District",
    commission: 21,
    amount: 115000,
    paidCommission: 72450,
    nextPaymentDate: "2025-11-06",
    nextPaymentAmount: 24150,
    status: "completed",
    startDate: "2024-12-02",
  },

  // Yuki Tanaka (Partner 8) - 11 clients
  {
    id: "8-1",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Tokyo Electronics",
    commission: 16,
    amount: 188000,
    paidCommission: 90240,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 30080,
    status: "active",
    startDate: "2024-01-25",
  },
  {
    id: "8-2",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Osaka Tech Corp",
    commission: 17,
    amount: 195000,
    paidCommission: 99450,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 33150,
    status: "active",
    startDate: "2024-02-28",
  },
  {
    id: "8-3",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Kyoto Systems",
    commission: 15,
    amount: 175000,
    paidCommission: 78750,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 26250,
    status: "active",
    startDate: "2024-03-22",
  },
  {
    id: "8-4",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Yokohama Industries",
    commission: 18,
    amount: 202000,
    paidCommission: 109080,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 36360,
    status: "active",
    startDate: "2024-04-18",
  },
  {
    id: "8-5",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Nagoya Manufacturing",
    commission: 16,
    amount: 182000,
    paidCommission: 87360,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 29120,
    status: "active",
    startDate: "2024-05-25",
  },
  {
    id: "8-6",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Sapporo Tech",
    commission: 17,
    amount: 192000,
    paidCommission: 97920,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 32640,
    status: "pending",
    startDate: "2024-06-20",
  },
  {
    id: "8-7",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Fukuoka Solutions",
    commission: 15,
    amount: 178000,
    paidCommission: 80100,
    nextPaymentDate: "2025-10-17",
    nextPaymentAmount: 26700,
    status: "active",
    startDate: "2024-07-28",
  },
  {
    id: "8-8",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Kobe Electronics",
    commission: 19,
    amount: 208000,
    paidCommission: 118560,
    nextPaymentDate: "2025-10-31",
    nextPaymentAmount: 39520,
    status: "active",
    startDate: "2024-08-15",
  },
  {
    id: "8-9",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Sendai Components",
    commission: 16,
    amount: 185000,
    paidCommission: 88800,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 29600,
    status: "active",
    startDate: "2024-09-20",
  },
  {
    id: "8-10",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Hiroshima Tech",
    commission: 17,
    amount: 198000,
    paidCommission: 100980,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 33660,
    status: "active",
    startDate: "2024-10-25",
  },
  {
    id: "8-11",
    partnerId: "8",
    partnerName: "Yuki Tanaka",
    clientName: "Kawasaki Industries",
    commission: 18,
    amount: 205000,
    paidCommission: 110700,
    nextPaymentDate: "2025-11-07",
    nextPaymentAmount: 36900,
    status: "completed",
    startDate: "2024-11-30",
  },

  // Lucas Silva (Partner 9) - 11 clients
  {
    id: "9-1",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Sao Paulo Retail",
    commission: 18,
    amount: 85000,
    paidCommission: 45900,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 15300,
    status: "active",
    startDate: "2024-01-22",
  },
  {
    id: "9-2",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Rio Fashion Group",
    commission: 19,
    amount: 92000,
    paidCommission: 52440,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 17480,
    status: "active",
    startDate: "2024-02-18",
  },
  {
    id: "9-3",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Brasilia Style",
    commission: 17,
    amount: 78000,
    paidCommission: 39780,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 13260,
    status: "active",
    startDate: "2024-03-25",
  },
  {
    id: "9-4",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Belo Horizonte Boutique",
    commission: 20,
    amount: 95000,
    paidCommission: 57000,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 19000,
    status: "active",
    startDate: "2024-04-20",
  },
  {
    id: "9-5",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Salvador Fashion",
    commission: 18,
    amount: 88000,
    paidCommission: 47520,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 15840,
    status: "active",
    startDate: "2024-05-28",
  },
  {
    id: "9-6",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Fortaleza Retail",
    commission: 19,
    amount: 90000,
    paidCommission: 51300,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 17100,
    status: "pending",
    startDate: "2024-06-22",
  },
  {
    id: "9-7",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Curitiba Style",
    commission: 17,
    amount: 82000,
    paidCommission: 41820,
    nextPaymentDate: "2025-10-18",
    nextPaymentAmount: 13940,
    status: "active",
    startDate: "2024-07-15",
  },
  {
    id: "9-8",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Recife Fashion",
    commission: 21,
    amount: 98000,
    paidCommission: 61740,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 20580,
    status: "active",
    startDate: "2024-08-20",
  },
  {
    id: "9-9",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Manaus Boutique",
    commission: 18,
    amount: 86000,
    paidCommission: 46440,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 15480,
    status: "active",
    startDate: "2024-09-18",
  },
  {
    id: "9-10",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Porto Alegre Retail",
    commission: 19,
    amount: 94000,
    paidCommission: 53580,
    nextPaymentDate: "2025-11-06",
    nextPaymentAmount: 17860,
    status: "active",
    startDate: "2024-10-25",
  },
  {
    id: "9-11",
    partnerId: "9",
    partnerName: "Lucas Silva",
    clientName: "Goiania Fashion Co",
    commission: 20,
    amount: 100000,
    paidCommission: 60000,
    nextPaymentDate: "2025-11-08",
    nextPaymentAmount: 20000,
    status: "completed",
    startDate: "2024-12-01",
  },

  // Emma Wilson (Partner 10) - 11 clients
  {
    id: "10-1",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Sydney Tech Solutions",
    commission: 16,
    amount: 152000,
    paidCommission: 72960,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 24320,
    status: "active",
    startDate: "2024-01-20",
  },
  {
    id: "10-2",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Melbourne Software",
    commission: 17,
    amount: 165000,
    paidCommission: 84150,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 28050,
    status: "active",
    startDate: "2024-02-25",
  },
  {
    id: "10-3",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Brisbane Digital",
    commission: 15,
    amount: 142000,
    paidCommission: 63900,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 21300,
    status: "active",
    startDate: "2024-03-30",
  },
  {
    id: "10-4",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Perth Innovations",
    commission: 18,
    amount: 172000,
    paidCommission: 92880,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 30960,
    status: "active",
    startDate: "2024-04-18",
  },
  {
    id: "10-5",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Adelaide Tech",
    commission: 16,
    amount: 148000,
    paidCommission: 71040,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 23680,
    status: "active",
    startDate: "2024-05-22",
  },
  {
    id: "10-6",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Canberra Systems",
    commission: 17,
    amount: 158000,
    paidCommission: 80580,
    nextPaymentDate: "2025-10-31",
    nextPaymentAmount: 26860,
    status: "pending",
    startDate: "2024-06-28",
  },
  {
    id: "10-7",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Gold Coast Digital",
    commission: 15,
    amount: 145000,
    paidCommission: 65250,
    nextPaymentDate: "2025-10-19",
    nextPaymentAmount: 21750,
    status: "active",
    startDate: "2024-07-25",
  },
  {
    id: "10-8",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Newcastle Tech",
    commission: 19,
    amount: 178000,
    paidCommission: 101460,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 33820,
    status: "active",
    startDate: "2024-08-30",
  },
  {
    id: "10-9",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Hobart Solutions",
    commission: 16,
    amount: 150000,
    paidCommission: 72000,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 24000,
    status: "active",
    startDate: "2024-09-20",
  },
  {
    id: "10-10",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Darwin Innovations",
    commission: 17,
    amount: 162000,
    paidCommission: 82620,
    nextPaymentDate: "2025-11-07",
    nextPaymentAmount: 27540,
    status: "active",
    startDate: "2024-10-28",
  },
  {
    id: "10-11",
    partnerId: "10",
    partnerName: "Emma Wilson",
    clientName: "Wollongong Tech",
    commission: 18,
    amount: 168000,
    paidCommission: 90720,
    nextPaymentDate: "2025-11-09",
    nextPaymentAmount: 30240,
    status: "completed",
    startDate: "2024-12-05",
  },

  // Raj Patel (Partner 11) - 11 clients
  {
    id: "11-1",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Mumbai Automotive",
    commission: 17,
    amount: 135000,
    paidCommission: 68850,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 22950,
    status: "active",
    startDate: "2024-01-28",
  },
  {
    id: "11-2",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Delhi Motors",
    commission: 18,
    amount: 148000,
    paidCommission: 79920,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 26640,
    status: "active",
    startDate: "2024-02-22",
  },
  {
    id: "11-3",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Bangalore Auto Parts",
    commission: 16,
    amount: 128000,
    paidCommission: 61440,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 20480,
    status: "active",
    startDate: "2024-03-28",
  },
  {
    id: "11-4",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Chennai Vehicles",
    commission: 19,
    amount: 155000,
    paidCommission: 88350,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 29450,
    status: "active",
    startDate: "2024-04-25",
  },
  {
    id: "11-5",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Hyderabad Auto",
    commission: 17,
    amount: 142000,
    paidCommission: 72420,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 24140,
    status: "active",
    startDate: "2024-05-30",
  },
  {
    id: "11-6",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Pune Motors",
    commission: 18,
    amount: 150000,
    paidCommission: 81000,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 27000,
    status: "pending",
    startDate: "2024-06-18",
  },
  {
    id: "11-7",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Kolkata Automotive",
    commission: 16,
    amount: 132000,
    paidCommission: 63360,
    nextPaymentDate: "2025-10-20",
    nextPaymentAmount: 21120,
    status: "active",
    startDate: "2024-07-22",
  },
  {
    id: "11-8",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Ahmedabad Vehicles",
    commission: 20,
    amount: 162000,
    paidCommission: 97200,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 32400,
    status: "active",
    startDate: "2024-08-28",
  },
  {
    id: "11-9",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Jaipur Auto Parts",
    commission: 17,
    amount: 138000,
    paidCommission: 70380,
    nextPaymentDate: "2025-11-06",
    nextPaymentAmount: 23460,
    status: "active",
    startDate: "2024-09-25",
  },
  {
    id: "11-10",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Lucknow Motors",
    commission: 18,
    amount: 145000,
    paidCommission: 78300,
    nextPaymentDate: "2025-11-08",
    nextPaymentAmount: 26100,
    status: "active",
    startDate: "2024-10-30",
  },
  {
    id: "11-11",
    partnerId: "11",
    partnerName: "Raj Patel",
    clientName: "Surat Automotive",
    commission: 19,
    amount: 158000,
    paidCommission: 90060,
    nextPaymentDate: "2025-11-10",
    nextPaymentAmount: 30020,
    status: "completed",
    startDate: "2024-12-08",
  },

  // Sofia Rodriguez (Partner 12) - 11 clients
  {
    id: "12-1",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Mexico City Electronics",
    commission: 16,
    amount: 115000,
    paidCommission: 55200,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 18400,
    status: "active",
    startDate: "2024-01-25",
  },
  {
    id: "12-2",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Guadalajara Tech",
    commission: 17,
    amount: 125000,
    paidCommission: 63750,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 21250,
    status: "active",
    startDate: "2024-02-20",
  },
  {
    id: "12-3",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Monterrey Solutions",
    commission: 15,
    amount: 108000,
    paidCommission: 48600,
    nextPaymentDate: "2025-10-31",
    nextPaymentAmount: 16200,
    status: "active",
    startDate: "2024-03-18",
  },
  {
    id: "12-4",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Puebla Industries",
    commission: 18,
    amount: 132000,
    paidCommission: 71280,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 23760,
    status: "active",
    startDate: "2024-04-22",
  },
  {
    id: "12-5",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Tijuana Manufacturing",
    commission: 16,
    amount: 118000,
    paidCommission: 56640,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 18880,
    status: "active",
    startDate: "2024-05-28",
  },
  {
    id: "12-6",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Leon Tech",
    commission: 17,
    amount: 122000,
    paidCommission: 62220,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 20740,
    status: "pending",
    startDate: "2024-06-25",
  },
  {
    id: "12-7",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Queretaro Electronics",
    commission: 15,
    amount: 112000,
    paidCommission: 50400,
    nextPaymentDate: "2025-10-21",
    nextPaymentAmount: 16800,
    status: "active",
    startDate: "2024-07-30",
  },
  {
    id: "12-8",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Merida Solutions",
    commission: 19,
    amount: 138000,
    paidCommission: 78660,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 26220,
    status: "active",
    startDate: "2024-08-18",
  },
  {
    id: "12-9",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Cancun Tech",
    commission: 16,
    amount: 120000,
    paidCommission: 57600,
    nextPaymentDate: "2025-11-07",
    nextPaymentAmount: 19200,
    status: "active",
    startDate: "2024-09-22",
  },
  {
    id: "12-10",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "Aguascalientes Industries",
    commission: 17,
    amount: 128000,
    paidCommission: 65280,
    nextPaymentDate: "2025-11-09",
    nextPaymentAmount: 21760,
    status: "active",
    startDate: "2024-10-28",
  },
  {
    id: "12-11",
    partnerId: "12",
    partnerName: "Sofia Rodriguez",
    clientName: "San Luis Potosi Manufacturing",
    commission: 18,
    amount: 135000,
    paidCommission: 72900,
    nextPaymentDate: "2025-11-11",
    nextPaymentAmount: 24300,
    status: "completed",
    startDate: "2024-12-05",
  },

  // Hans Mueller (Partner 13) - 11 clients
  {
    id: "13-1",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Berlin Auto Group",
    commission: 17,
    amount: 185000,
    paidCommission: 94350,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 31450,
    status: "active",
    startDate: "2024-01-30",
  },
  {
    id: "13-2",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Munich Motors",
    commission: 18,
    amount: 198000,
    paidCommission: 106920,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 35640,
    status: "active",
    startDate: "2024-02-25",
  },
  {
    id: "13-3",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Hamburg Automotive",
    commission: 16,
    amount: 172000,
    paidCommission: 82560,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 27520,
    status: "active",
    startDate: "2024-03-22",
  },
  {
    id: "13-4",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Frankfurt Vehicles",
    commission: 19,
    amount: 205000,
    paidCommission: 116850,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 38950,
    status: "active",
    startDate: "2024-04-28",
  },
  {
    id: "13-5",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Cologne Auto Parts",
    commission: 17,
    amount: 178000,
    paidCommission: 90780,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 30260,
    status: "active",
    startDate: "2024-05-20",
  },
  {
    id: "13-6",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Stuttgart Motors",
    commission: 18,
    amount: 192000,
    paidCommission: 103680,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 34560,
    status: "pending",
    startDate: "2024-06-15",
  },
  {
    id: "13-7",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Dusseldorf Automotive",
    commission: 16,
    amount: 168000,
    paidCommission: 80640,
    nextPaymentDate: "2025-10-22",
    nextPaymentAmount: 26880,
    status: "active",
    startDate: "2024-07-20",
  },
  {
    id: "13-8",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Dresden Vehicles",
    commission: 20,
    amount: 212000,
    paidCommission: 127200,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 42400,
    status: "active",
    startDate: "2024-08-25",
  },
  {
    id: "13-9",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Leipzig Auto",
    commission: 17,
    amount: 182000,
    paidCommission: 92820,
    nextPaymentDate: "2025-11-08",
    nextPaymentAmount: 30940,
    status: "active",
    startDate: "2024-09-18",
  },
  {
    id: "13-10",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Nuremberg Motors",
    commission: 18,
    amount: 195000,
    paidCommission: 105300,
    nextPaymentDate: "2025-11-10",
    nextPaymentAmount: 35100,
    status: "active",
    startDate: "2024-10-22",
  },
  {
    id: "13-11",
    partnerId: "13",
    partnerName: "Hans Mueller",
    clientName: "Hanover Automotive",
    commission: 19,
    amount: 202000,
    paidCommission: 115140,
    nextPaymentDate: "2025-11-12",
    nextPaymentAmount: 38380,
    status: "completed",
    startDate: "2024-11-28",
  },

  // Isabella Rossi (Partner 14) - 11 clients
  {
    id: "14-1",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Milano Fashion House",
    commission: 21,
    amount: 92000,
    paidCommission: 57960,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 19320,
    status: "active",
    startDate: "2024-01-22",
  },
  {
    id: "14-2",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Roma Style Group",
    commission: 22,
    amount: 105000,
    paidCommission: 69300,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 23100,
    status: "active",
    startDate: "2024-02-18",
  },
  {
    id: "14-3",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Firenze Boutique",
    commission: 20,
    amount: 85000,
    paidCommission: 51000,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 17000,
    status: "active",
    startDate: "2024-03-25",
  },
  {
    id: "14-4",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Venezia Fashion",
    commission: 23,
    amount: 112000,
    paidCommission: 77280,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 25760,
    status: "active",
    startDate: "2024-04-20",
  },
  {
    id: "14-5",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Napoli Style",
    commission: 21,
    amount: 98000,
    paidCommission: 61740,
    nextPaymentDate: "2025-10-31",
    nextPaymentAmount: 20580,
    status: "active",
    startDate: "2024-05-15",
  },
  {
    id: "14-6",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Torino Fashion Co",
    commission: 22,
    amount: 108000,
    paidCommission: 71280,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 23760,
    status: "pending",
    startDate: "2024-06-22",
  },
  {
    id: "14-7",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Bologna Boutique",
    commission: 20,
    amount: 88000,
    paidCommission: 52800,
    nextPaymentDate: "2025-10-23",
    nextPaymentAmount: 17600,
    status: "active",
    startDate: "2024-07-18",
  },
  {
    id: "14-8",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Genova Style",
    commission: 24,
    amount: 118000,
    paidCommission: 84960,
    nextPaymentDate: "2025-11-06",
    nextPaymentAmount: 28320,
    status: "active",
    startDate: "2024-08-22",
  },
  {
    id: "14-9",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Palermo Fashion",
    commission: 21,
    amount: 95000,
    paidCommission: 59850,
    nextPaymentDate: "2025-11-09",
    nextPaymentAmount: 19950,
    status: "active",
    startDate: "2024-09-28",
  },
  {
    id: "14-10",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Verona Boutique",
    commission: 22,
    amount: 102000,
    paidCommission: 67320,
    nextPaymentDate: "2025-11-11",
    nextPaymentAmount: 22440,
    status: "active",
    startDate: "2024-10-30",
  },
  {
    id: "14-11",
    partnerId: "14",
    partnerName: "Isabella Rossi",
    clientName: "Catania Style House",
    commission: 23,
    amount: 115000,
    paidCommission: 79350,
    nextPaymentDate: "2025-11-13",
    nextPaymentAmount: 26450,
    status: "completed",
    startDate: "2024-12-08",
  },

  // Dmitri Volkov (Partner 15) - 11 clients
  {
    id: "15-1",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Moscow Tech Corp",
    commission: 16,
    amount: 142000,
    paidCommission: 68160,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 22720,
    status: "active",
    startDate: "2024-01-28",
  },
  {
    id: "15-2",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "St Petersburg Software",
    commission: 17,
    amount: 155000,
    paidCommission: 79050,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 26350,
    status: "active",
    startDate: "2024-02-22",
  },
  {
    id: "15-3",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Novosibirsk Solutions",
    commission: 15,
    amount: 132000,
    paidCommission: 59400,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 19800,
    status: "active",
    startDate: "2024-03-20",
  },
  {
    id: "15-4",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Yekaterinburg Industries",
    commission: 18,
    amount: 165000,
    paidCommission: 89100,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 29700,
    status: "active",
    startDate: "2024-04-25",
  },
  {
    id: "15-5",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Kazan Tech",
    commission: 16,
    amount: 138000,
    paidCommission: 66240,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 22080,
    status: "active",
    startDate: "2024-05-30",
  },
  {
    id: "15-6",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Nizhny Novgorod Systems",
    commission: 17,
    amount: 148000,
    paidCommission: 75480,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 25160,
    status: "pending",
    startDate: "2024-06-18",
  },
  {
    id: "15-7",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Chelyabinsk Manufacturing",
    commission: 15,
    amount: 128000,
    paidCommission: 57600,
    nextPaymentDate: "2025-10-24",
    nextPaymentAmount: 19200,
    status: "active",
    startDate: "2024-07-22",
  },
  {
    id: "15-8",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Samara Industries",
    commission: 19,
    amount: 172000,
    paidCommission: 98040,
    nextPaymentDate: "2025-11-07",
    nextPaymentAmount: 32680,
    status: "active",
    startDate: "2024-08-28",
  },
  {
    id: "15-9",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Omsk Tech Solutions",
    commission: 16,
    amount: 145000,
    paidCommission: 69600,
    nextPaymentDate: "2025-11-10",
    nextPaymentAmount: 23200,
    status: "active",
    startDate: "2024-09-25",
  },
  {
    id: "15-10",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Rostov Electronics",
    commission: 17,
    amount: 152000,
    paidCommission: 77520,
    nextPaymentDate: "2025-11-12",
    nextPaymentAmount: 25840,
    status: "active",
    startDate: "2024-10-30",
  },
  {
    id: "15-11",
    partnerId: "15",
    partnerName: "Dmitri Volkov",
    clientName: "Ufa Digital",
    commission: 18,
    amount: 162000,
    paidCommission: 87480,
    nextPaymentDate: "2025-11-14",
    nextPaymentAmount: 29160,
    status: "completed",
    startDate: "2024-12-08",
  },

  // Kim Min-Jun (Partner 16) - 11 clients
  {
    id: "16-1",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Seoul Electronics",
    commission: 17,
    amount: 192000,
    paidCommission: 97920,
    nextPaymentDate: "2025-10-27",
    nextPaymentAmount: 32640,
    status: "active",
    startDate: "2024-01-25",
  },
  {
    id: "16-2",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Busan Tech Corp",
    commission: 18,
    amount: 205000,
    paidCommission: 110700,
    nextPaymentDate: "2025-10-31",
    nextPaymentAmount: 36900,
    status: "active",
    startDate: "2024-02-20",
  },
  {
    id: "16-3",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Incheon Manufacturing",
    commission: 16,
    amount: 178000,
    paidCommission: 85440,
    nextPaymentDate: "2025-11-04",
    nextPaymentAmount: 28480,
    status: "active",
    startDate: "2024-03-18",
  },
  {
    id: "16-4",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Daegu Industries",
    commission: 19,
    amount: 218000,
    paidCommission: 124260,
    nextPaymentDate: "2025-10-29",
    nextPaymentAmount: 41420,
    status: "active",
    startDate: "2024-04-22",
  },
  {
    id: "16-5",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Daejeon Solutions",
    commission: 17,
    amount: 188000,
    paidCommission: 95880,
    nextPaymentDate: "2025-11-02",
    nextPaymentAmount: 31960,
    status: "active",
    startDate: "2024-05-28",
  },
  {
    id: "16-6",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Gwangju Tech",
    commission: 18,
    amount: 198000,
    paidCommission: 106920,
    nextPaymentDate: "2025-11-06",
    nextPaymentAmount: 35640,
    status: "pending",
    startDate: "2024-06-25",
  },
  {
    id: "16-7",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Suwon Electronics",
    commission: 16,
    amount: 182000,
    paidCommission: 87360,
    nextPaymentDate: "2025-10-25",
    nextPaymentAmount: 29120,
    status: "active",
    startDate: "2024-07-30",
  },
  {
    id: "16-8",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Ulsan Manufacturing",
    commission: 20,
    amount: 225000,
    paidCommission: 135000,
    nextPaymentDate: "2025-11-08",
    nextPaymentAmount: 45000,
    status: "active",
    startDate: "2024-08-18",
  },
  {
    id: "16-9",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Changwon Industries",
    commission: 17,
    amount: 195000,
    paidCommission: 99450,
    nextPaymentDate: "2025-11-11",
    nextPaymentAmount: 33150,
    status: "active",
    startDate: "2024-09-22",
  },
  {
    id: "16-10",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Jeju Tech",
    commission: 18,
    amount: 202000,
    paidCommission: 109080,
    nextPaymentDate: "2025-11-13",
    nextPaymentAmount: 36360,
    status: "active",
    startDate: "2024-10-28",
  },
  {
    id: "16-11",
    partnerId: "16",
    partnerName: "Kim Min-Jun",
    clientName: "Jeonju Solutions",
    commission: 19,
    amount: 212000,
    paidCommission: 120840,
    nextPaymentDate: "2025-11-15",
    nextPaymentAmount: 40280,
    status: "completed",
    startDate: "2024-12-05",
  },

  // Olivia Brown (Partner 17) - 11 clients
  {
    id: "17-1",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Toronto Retail Co",
    commission: 18,
    amount: 128000,
    paidCommission: 69120,
    nextPaymentDate: "2025-10-28",
    nextPaymentAmount: 23040,
    status: "active",
    startDate: "2024-01-30",
  },
  {
    id: "17-2",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Vancouver Fashion",
    commission: 19,
    amount: 138000,
    paidCommission: 78660,
    nextPaymentDate: "2025-11-01",
    nextPaymentAmount: 26220,
    status: "active",
    startDate: "2024-02-25",
  },
  {
    id: "17-3",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Montreal Style Group",
    commission: 17,
    amount: 118000,
    paidCommission: 60180,
    nextPaymentDate: "2025-11-05",
    nextPaymentAmount: 20060,
    status: "active",
    startDate: "2024-03-22",
  },
  {
    id: "17-4",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Calgary Boutique",
    commission: 20,
    amount: 145000,
    paidCommission: 87000,
    nextPaymentDate: "2025-10-30",
    nextPaymentAmount: 29000,
    status: "active",
    startDate: "2024-04-28",
  },
  {
    id: "17-5",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Ottawa Retail",
    commission: 18,
    amount: 132000,
    paidCommission: 71280,
    nextPaymentDate: "2025-11-03",
    nextPaymentAmount: 23760,
    status: "active",
    startDate: "2024-05-20",
  },
  {
    id: "17-6",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Edmonton Fashion Co",
    commission: 19,
    amount: 142000,
    paidCommission: 80940,
    nextPaymentDate: "2025-11-07",
    nextPaymentAmount: 26980,
    status: "pending",
    startDate: "2024-06-15",
  },
  {
    id: "17-7",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Winnipeg Style",
    commission: 17,
    amount: 122000,
    paidCommission: 62220,
    nextPaymentDate: "2025-10-26",
    nextPaymentAmount: 20740,
    status: "active",
    startDate: "2024-07-20",
  },
  {
    id: "17-8",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Quebec City Boutique",
    commission: 21,
    amount: 152000,
    paidCommission: 95760,
    nextPaymentDate: "2025-11-09",
    nextPaymentAmount: 31920,
    status: "active",
    startDate: "2024-08-25",
  },
  {
    id: "17-9",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Hamilton Retail",
    commission: 18,
    amount: 135000,
    paidCommission: 72900,
    nextPaymentDate: "2025-11-12",
    nextPaymentAmount: 24300,
    status: "active",
    startDate: "2024-09-18",
  },
  {
    id: "17-10",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "Kitchener Fashion",
    commission: 19,
    amount: 148000,
    paidCommission: 84360,
    nextPaymentDate: "2025-11-14",
    nextPaymentAmount: 28120,
    status: "active",
    startDate: "2024-10-22",
  },
  {
    id: "17-11",
    partnerId: "17",
    partnerName: "Olivia Brown",
    clientName: "London Style Group",
    commission: 20,
    amount: 155000,
    paidCommission: 93000,
    nextPaymentDate: "2025-11-16",
    nextPaymentAmount: 31000,
    status: "completed",
    startDate: "2024-11-28",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Deal[]>(mockDeals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Deal | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPartner, setSelectedPartner] = useState<string>("all")
  const itemsPerPage = 10
  const [formData, setFormData] = useState({
    partnerName: "",
    clientName: "",
    commission: "",
    amount: "",
    paidCommission: "",
    nextPaymentDate: "",
    nextPaymentAmount: "",
    status: "active" as Deal["status"],
    startDate: "",
  })

  const filteredClients =
    selectedPartner === "all" ? clients : clients.filter((client) => client.partnerId === selectedPartner)

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  const uniquePartners = Array.from(
    new Set(
      clients.map((client) => ({
        id: client.partnerId,
        name: client.partnerName,
      })),
    ),
  ).reduce(
    (acc, partner) => {
      if (!acc.find((p) => p.id === partner.id)) {
        acc.push(partner)
      }
      return acc
    },
    [] as Array<{ id: string; name: string }>,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newClient: Deal = {
      id: editingClient?.id || Date.now().toString(),
      partnerId: formData.partnerName.toLowerCase().replace(/\s+/g, "-"),
      partnerName: formData.partnerName,
      clientName: formData.clientName,
      commission: Number.parseFloat(formData.commission),
      amount: Number.parseFloat(formData.amount),
      paidCommission: Number.parseFloat(formData.paidCommission),
      nextPaymentDate: formData.nextPaymentDate,
      nextPaymentAmount: Number.parseFloat(formData.nextPaymentAmount),
      status: formData.status,
      startDate: formData.startDate,
    }

    if (editingClient) {
      setClients(clients.map((c) => (c.id === editingClient.id ? newClient : c)))
    } else {
      setClients([...clients, newClient])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (client: Deal) => {
    setEditingClient(client)
    setFormData({
      partnerName: client.partnerName,
      clientName: client.clientName,
      commission: client.commission.toString(),
      amount: client.amount.toString(),
      paidCommission: client.paidCommission.toString(),
      nextPaymentDate: client.nextPaymentDate,
      nextPaymentAmount: client.nextPaymentAmount.toString(),
      status: client.status,
      startDate: client.startDate,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((c) => c.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      partnerName: "",
      clientName: "",
      commission: "",
      amount: "",
      paidCommission: "",
      nextPaymentDate: "",
      nextPaymentAmount: "",
      status: "active",
      startDate: "",
    })
    setEditingClient(null)
  }

  const handlePartnerChange = (partnerId: string) => {
    setSelectedPartner(partnerId)
    setCurrentPage(1)
  }

  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.amount, 0)
  const activeClients = filteredClients.filter((c) => c.status === "active").length
  const totalPaid = filteredClients.reduce((sum, client) => sum + client.paidCommission, 0)
  const totalUpcoming = filteredClients.reduce((sum, client) => sum + client.nextPaymentAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground mt-1">Manage partner clients and commission tracking</p>
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
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
              <DialogDescription>
                {editingClient ? "Update client information below." : "Fill in the client information below."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="partnerName">Partner Name</Label>
                  <Input
                    id="partnerName"
                    placeholder="John Smith"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Acme Corporation"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="commission">Commission (%)</Label>
                    <Input
                      id="commission"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      placeholder="15"
                      value={formData.commission}
                      onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="125000"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paidCommission">Paid Commission ($)</Label>
                  <Input
                    id="paidCommission"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="56250"
                    value={formData.paidCommission}
                    onChange={(e) => setFormData({ ...formData, paidCommission: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nextPaymentDate">Next Payment Date</Label>
                    <Input
                      id="nextPaymentDate"
                      type="date"
                      value={formData.nextPaymentDate}
                      onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nextPaymentAmount">Next Payment Amount ($)</Label>
                    <Input
                      id="nextPaymentAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="18750"
                      value={formData.nextPaymentAmount}
                      onChange={(e) => setFormData({ ...formData, nextPaymentAmount: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Deal["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
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
                <Button type="submit">{editingClient ? "Update Client" : "Add Client"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Next Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalUpcoming.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Upcoming commission payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total paid commission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Badge variant="default" className="h-6">
              {activeClients}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Total clients</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Clients ({filteredClients.length})</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by Partner:</span>
              <Select value={selectedPartner} onValueChange={handlePartnerChange}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  {uniquePartners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Paid Commission</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.partnerName}</TableCell>
                  <TableCell>{client.clientName}</TableCell>
                  <TableCell>{client.commission}%</TableCell>
                  <TableCell>${client.paidCommission.toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold">${client.nextPaymentAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(client.nextPaymentDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status === "active" ? "default" : client.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(client.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredClients.length)} of {filteredClients.length}{" "}
                clients
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
        </CardContent>
      </Card>
    </div>
  )
}
