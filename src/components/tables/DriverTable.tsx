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
import { IconBan, IconEye, IconTrash } from "@tabler/icons-react";
import { Download, Search, Sliders } from "lucide-react";
import { useState } from "react";
import { DriverView } from "../page/driverManagement/DriverView";
import { MyModal } from "../shared/MyModal";

interface Driver {
  id: string;
  name: string;
  status: "Active" | "Hold";
  joinDate: string;
  vehicleType: string;
  memberNumber: string;
}

interface DriversTableProps {
  drivers?: Driver[];
  handleSuspend: (id: string) => void;
  handleView: (id: string) => void;
}

const tableHeaders = [
  "Name",
  "Member Number",
  "Status",
  "Vehicle Type",
  "Join Date",
  "Actions",
];

const defaultDrivers: Driver[] = [
  {
    id: "1",
    name: "Driver1",
    status: "Active",
    memberNumber: "FL-26001",
    joinDate: "10 Feb 2026",
    vehicleType: "SUV-21",
  },
  {
    id: "2",
    name: "Driver2",
    status: "Hold",
    memberNumber: "FL-26002",
    joinDate: "12 Feb 2026",
    vehicleType: "Sedan-11",
  },
  {
    id: "3",
    name: "Driver3",
    status: "Active",
    memberNumber: "FL-26003",
    joinDate: "15 Feb 2026",
    vehicleType: "Truck-05",
  },
  {
    id: "4",
    name: "Driver4",
    status: "Hold",
    memberNumber: "FL-26004",
    joinDate: "18 Feb 2026",
    vehicleType: "SUV-22",
  },
  {
    id: "5",
    name: "Driver5",
    status: "Active",
    memberNumber: "FL-26005",
    joinDate: "20 Feb 2026",
    vehicleType: "Sedan-12",
  },
  {
    id: "6",
    name: "Driver6",
    status: "Hold",
    memberNumber: "FL-26006",
    joinDate: "22 Feb 2026",
    vehicleType: "Truck-06",
  },
  {
    id: "7",
    name: "Driver7",
    status: "Active",
    memberNumber: "FL-26007",
    joinDate: "24 Feb 2026",
    vehicleType: "SUV-23",
  },
  {
    id: "8",
    name: "Driver8",
    status: "Hold",
    memberNumber: "FL-26008",
    joinDate: "26 Feb 2026",
    vehicleType: "Sedan-13",
  },
  {
    id: "9",
    name: "Driver9",
    status: "Active",
    memberNumber: "FL-26009",
    joinDate: "28 Feb 2026",
    vehicleType: "Truck-07",
  },
  {
    id: "10",
    name: "Driver10",
    status: "Hold",
    memberNumber: "FL-26010",
    joinDate: "02 Mar 2026",
    vehicleType: "SUV-24",
  },
];

export function DriverTable({
  drivers = defaultDrivers,
  handleView,
  handleSuspend,
}: DriversTableProps) {
  const [open, setOpen] = useState(false);
  const handleDelete = (id: string) => {
    console.log({ id });
  };
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
                  className={`text-gray-700 uppercase font-semibold text-sm px-4 py-3 ${idx === 0 ? "text-left" : "text-center"}`}
                >
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {drivers?.map((driver) => (
              <TableRow
                key={driver.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{driver.name}</TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {driver.memberNumber}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    className={
                      driver.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-orange-50 text-orange-700 border-orange-200"
                    }
                    variant="outline"
                  >
                    {driver.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {driver.vehicleType}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {driver.joinDate}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-5">
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => setOpen(!open)}
                    >
                      <IconEye color="blue" size={25} />
                    </div>
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => handleSuspend(driver.id)}
                    >
                      <IconBan color="red" size={16} />
                    </div>
                    <div
                      className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                      onClick={() => handleDelete(driver.id)}
                    >
                      <IconTrash color="red" size={16} />
                    </div>
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
