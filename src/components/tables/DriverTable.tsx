"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconBan, IconEye } from "@tabler/icons-react";
import { Download, Search, Sliders } from "lucide-react";
import { useState } from "react";
import { DriverView } from "../page/driverManagement/DriverView";
import { MyModal } from "../shared/MyModal";

interface Product {
  id: string;
  name: string;
  status: "Active" | "Suspended" | "Pending";
  joinDate: string;
  vehicleType: string;
}

interface ProductsTableProps {
  products?: Product[];
  handleSuspend: (id: string) => void;
  handleView: (id: string) => void;
}

const tableHeaders = ["Name", "Status", "Vehicle Type", "Join Date", "Actions"];

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Driver1",
    status: "Active",
    joinDate: "10 Feb 2026",
    vehicleType: "SUV-21",
  },
  {
    id: "2",
    name: "Driver2",
    status: "Suspended",
    joinDate: "11 Feb 2026",
    vehicleType: "Van-21",
  },
  {
    id: "3",
    name: "Driver3",
    status: "Pending",
    joinDate: "01 Feb 2026",
    vehicleType: "Truck-21",
  },
  {
    id: "4",
    name: "Driver4",
    status: "Active",
    joinDate: "15 Jan 2026",
    vehicleType: "Sedan-19",
  },
  {
    id: "5",
    name: "Driver5",
    status: "Active",
    joinDate: "18 Jan 2026",
    vehicleType: "SUV-20",
  },
  {
    id: "6",
    name: "Driver6",
    status: "Suspended",
    joinDate: "22 Jan 2026",
    vehicleType: "Van-18",
  },
  {
    id: "7",
    name: "Driver7",
    status: "Pending",
    joinDate: "25 Jan 2026",
    vehicleType: "Truck-22",
  },
  {
    id: "8",
    name: "Driver8",
    status: "Active",
    joinDate: "28 Jan 2026",
    vehicleType: "SUV-23",
  },
  {
    id: "9",
    name: "Driver9",
    status: "Active",
    joinDate: "30 Jan 2026",
    vehicleType: "Sedan-20",
  },
  {
    id: "10",
    name: "Driver10",
    status: "Suspended",
    joinDate: "02 Feb 2026",
    vehicleType: "Van-19",
  },
  {
    id: "11",
    name: "Driver11",
    status: "Pending",
    joinDate: "04 Feb 2026",
    vehicleType: "Truck-20",
  },
  {
    id: "12",
    name: "Driver12",
    status: "Active",
    joinDate: "06 Feb 2026",
    vehicleType: "SUV-22",
  },
  {
    id: "13",
    name: "Driver13",
    status: "Active",
    joinDate: "08 Feb 2026",
    vehicleType: "Sedan-21",
  },
  {
    id: "14",
    name: "Driver14",
    status: "Suspended",
    joinDate: "09 Feb 2026",
    vehicleType: "Van-20",
  },
  {
    id: "15",
    name: "Driver15",
    status: "Pending",
    joinDate: "10 Feb 2026",
    vehicleType: "Truck-23",
  },
  {
    id: "16",
    name: "Driver16",
    status: "Active",
    joinDate: "12 Feb 2026",
    vehicleType: "SUV-24",
  },
  {
    id: "17",
    name: "Driver17",
    status: "Active",
    joinDate: "13 Feb 2026",
    vehicleType: "Sedan-22",
  },
  {
    id: "18",
    name: "Driver18",
    status: "Suspended",
    joinDate: "14 Feb 2026",
    vehicleType: "Van-21",
  },
  {
    id: "19",
    name: "Driver19",
    status: "Pending",
    joinDate: "15 Feb 2026",
    vehicleType: "Truck-24",
  },
  {
    id: "20",
    name: "Driver20",
    status: "Active",
    joinDate: "16 Feb 2026",
    vehicleType: "SUV-25",
  },
];

export function DriverTable({
  products = defaultProducts,
  handleView,
  handleSuspend,
}: ProductsTableProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-gray-700 border-gray-200 bg-transparent"
        >
          <Sliders className="w-4 h-4" />
          Filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-gray-700 border-gray-200 bg-transparent"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {tableHeaders.map((title, idx) => (
                <TableHead
                  key={title}
                  className={`text-gray-700 font-semibold text-sm px-4 py-3 ${idx === 0 ? "text-left" : "text-center"}`}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{product.name}</TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    className={
                      product.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : product.status === "Suspended"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                    }
                    variant="outline"
                  >
                    {product.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {product.vehicleType}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {product.joinDate}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      className="bg-blue-700 cursor-pointer"
                      onClick={() => setOpen(!open)}
                    >
                      <IconEye size={16} />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-red-700 cursor-pointer"
                      onClick={() => handleSuspend(product.id)}
                    >
                      <IconBan size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <DriverView />
      </MyModal>
    </div>
  );
}
