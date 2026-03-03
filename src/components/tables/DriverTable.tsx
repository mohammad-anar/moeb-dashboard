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
import { Skeleton } from "../ui/skeleton";
import { useBlockUserMutation, useDeleteDriverMutation } from "@/redux/service/driver/driverApi";
import { toast } from "sonner";

interface Driver {
  _id: string;
  name: string;
  status: "Active" | "Hold";
  joinDate: string;
  vehicleType: string;
  memberNumber: string;
}

interface DriversTableProps {
  drivers?: Driver[];
  isLoading?: boolean;
}

const tableHeaders = [
  "Name",
  "Member Number",
  "Status",
  "Vehicle Type",
  "Join Date",
  "Actions",
];

export function DriverTable({ drivers, isLoading = false }: DriversTableProps) {
  const [driverId, setDriverId] = useState<string>("");
  const [open, setOpen] = useState(false);

  // api
  const [blockUser] = useBlockUserMutation();
  const [deleteDriver] = useDeleteDriverMutation();

  const handleDelete = (id: string) => {
    try {
      toast.promise(deleteDriver(id).unwrap(), {
        loading: "Deleting driver...",
        success: "Driver deleted successfully.",
        error: "Failed to delete driver. Please try again.",
      });
    } catch (error) {
      toast.error("Failed to delete driver. Please try again.");
    }
  };

  const handleSuspend = (id: string) => {
    try {
      toast.promise(blockUser(id).unwrap(), {
        loading: "Blocking driver...",
        success: "Driver blocked successfully.",
        error: "Failed to block driver. Please try again.",
      });

      setOpen(false);
    } catch (error) {
      toast.error("Failed to block driver. Please try again.");
    }
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

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="border-b last:border-b-0">
                  {Array.from({ length: 6 }).map((_, colIndex) => (
                    <TableCell key={colIndex} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {drivers?.map((driver) => (
                <TableRow
                  key={driver._id}
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
                        onClick={() => {
                          setOpen(!open);
                          setDriverId(driver._id);
                        }}
                      >
                        <IconEye color="blue" size={25} />
                      </div>
                      <div
                        className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                        onClick={() => handleSuspend(driver._id)}
                      >
                        <IconBan color="red" size={16} />
                      </div>
                      <div
                        className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full"
                        onClick={() => handleDelete(driver._id)}
                      >
                        <IconTrash color="red" size={16} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <MyModal open={open} onOpenChange={(val: boolean) => setOpen(val)}>
        <DriverView setOpen={setOpen} driverId={driverId} />
      </MyModal>
    </div>
  );
}
