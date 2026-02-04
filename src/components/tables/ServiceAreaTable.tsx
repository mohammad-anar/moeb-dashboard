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
import { MapPin, Pencil, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddServiceAreaForm } from "../forms/AddServiceAreaForm";
import { MyModal } from "../shared/MyModal";
import { Switch } from "../ui/switch";
import { EditServiceAreaForm } from "../forms/EditServiceAreaForm";
import SwitchWithState from "../shared/SwitchWithState";

interface Service {
  id: string;
  areaName: string;
  status: "Open" | "Close";
  city: string;
  isActive: boolean;
}

interface ServiceAreaProps {
  areas?: Service[];
  handleSuspend: (id: string) => void;
  handleView: (id: string) => void;
}

const tableHeaders = ["Area Name", "Status", "City", "Actions"];

const defaultServices: Service[] = [
  {
    id: "1",
    areaName: "Florida",
    status: "Open",
    city: "Miami, Orlando, Palm Beach, Fort Lauderdale, Naples, Tampa",
    isActive: true,
  },
  {
    id: "2",
    areaName: "Texas",
    status: "Close",
    city: "Austin, Dallas, Houston",
    isActive: true,
  },
  {
    id: "3",
    areaName: "New York",
    status: "Close",
    city: "New York",
    isActive: true,
  },
  {
    id: "4",
    areaName: "Massachusetts",
    status: "Close",
    city: "Boston",
    isActive: true,
  },
  {
    id: "5",
    areaName: "District of Columbia",
    status: "Close",
    city: "Washington DC",
    isActive: false,
  },
  {
    id: "6",
    areaName: "Georgia",
    status: "Close",
    city: "Atlanta",
    isActive: true,
  },
  {
    id: "7",
    areaName: "Nevada",
    status: "Close",
    city: "Las Vegas",
    isActive: false,
  },
  {
    id: "8",
    areaName: "Washington",
    status: "Close",
    city: "Seattle",
    isActive: true,
  },
];

export function ServiceAreaTable({
  areas = defaultServices,
  handleView,
  handleSuspend,
}: ServiceAreaProps) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
          onClick={() => setOpen(!open)}
          className="gap-2 text-white border-gray-200 bg-light-black cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          Add Service Area
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
            {areas.map((area) => (
              <TableRow
                key={area.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-3">{area.areaName}</TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    className={
                      area.status === "Open"
                        ? "bg-green-50 text-green-700 border-green-300"
                        : "bg-red-100 text-orange-700 border-orange-600"
                    }
                    variant="outline"
                  >
                    {area.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-700 text-center">
                  {area.city}
                </TableCell>

                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Toggle Switch */}
                    <SwitchWithState isActive={area.isActive} />

                    {/* Edit Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditOpen(!editOpen)}
                      className="h-8 w-8 p-0 cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4 text-gray-700" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-orange-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <AddServiceAreaForm />
      </MyModal>
      <MyModal
        open={editOpen}
        onOpenChange={(val: boolean) => setEditOpen(val)}
      >
        <EditServiceAreaForm />
      </MyModal>
    </div>
  );
}
