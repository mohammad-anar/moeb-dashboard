"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconTrash } from "@tabler/icons-react";
import { Search, Sliders } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteJobMutation } from "@/redux/service/job/jobApi";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Job {
  _id: string;
  jobType: string;
  pickupLocation: string;
  dropoffLocation: string;
  serviceArea: string;
  companyName: string;
  status: string;
  rideStatus: string | null;
  paymentAmount: number;
  createdAt: string;
  createdBy: { name: string; company?: string };
  assignedTo?: { name: string; company?: string };
}

interface JobsTableProps {
  jobs?: Job[];
  isLoading?: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  serviceAreaFilter?: string;
  onServiceAreaChange: (value: string | undefined) => void;
  companyNameFilter?: string;
  onCompanyNameChange: (value: string | undefined) => void;
  rideStatusFilter?: string;
  onRideStatusChange: (value: string | undefined) => void;
  serviceAreas?: { _id: string; name: string }[];
  companies?: string[];
}

const tableHeaders = [
  "Company",
  "Posted By",
  "Assigned To",
  "Driver Company",
  "Service Area",
  "Pickup Location",
  "Dropoff Location",
  "Job Type",
  "Status",
  "Ride Status",
  "Amount",
  "Actions",
];

export function JobTable({
  jobs,
  isLoading = false,
  searchTerm,
  onSearchChange,
  serviceAreaFilter,
  onServiceAreaChange,
  companyNameFilter,
  onCompanyNameChange,
  rideStatusFilter,
  onRideStatusChange,
  serviceAreas = [],
  companies = [],
}: JobsTableProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [deleteJob] = useDeleteJobMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  const handleDelete = (id: string) => {
    try {
      toast.promise(deleteJob(id).unwrap(), {
        loading: "Deleting job...",
        success: "Job deleted successfully.",
        error: "Failed to delete job. Please try again.",
      });
    } catch (error) {
      toast.error("Failed to delete job. Please try again.");
    }
  };

  const rideStatusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "On The Way", value: "ON THE WAY" },
    { label: "At Pickup", value: "AT PICKUP" },
    { label: "In Progress", value: "IN PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <div className="space-y-6 rounded-xl">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-[2] flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Location or Company..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-gray-700 border-gray-200 bg-transparent h-[40px] px-4 font-semibold"
            >
              <Sliders className="w-4 h-4" />
              {serviceAreaFilter ? serviceAreaFilter : "Service Area"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 max-h-[300px] overflow-y-auto">
            <DropdownMenuRadioGroup
              value={serviceAreaFilter}
              onValueChange={(val) => onServiceAreaChange(val === "ALL" ? undefined : val)}
            >
              <DropdownMenuRadioItem value="ALL">All Service Areas</DropdownMenuRadioItem>
              {serviceAreas?.map((item) => (
                <DropdownMenuRadioItem key={item._id} value={item.name}>
                  {item.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-gray-700 border-gray-200 bg-transparent h-[40px] px-4 font-semibold"
            >
              <Sliders className="w-4 h-4" />
              {companyNameFilter ? companyNameFilter : "Company"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 overflow-y-auto max-h-[300px]">
            <DropdownMenuRadioGroup
              value={companyNameFilter}
              onValueChange={(val) => onCompanyNameChange(val === "ALL" ? undefined : val)}
            >
              <DropdownMenuRadioItem value="ALL">All Companies</DropdownMenuRadioItem>
              {companies?.map((company) => (
                <DropdownMenuRadioItem key={company} value={company}>
                  {company}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-gray-700 border-gray-200 bg-transparent h-[40px] px-4 font-semibold"
            >
              <Sliders className="w-4 h-4" />
              {rideStatusFilter
                ? rideStatusOptions.find((o) => o.value === rideStatusFilter)?.label
                : "Ride Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuRadioGroup
              value={rideStatusFilter}
              onValueChange={(val) => onRideStatusChange(val === "ALL" ? undefined : val)}
            >
              <DropdownMenuRadioItem value="ALL">All Status</DropdownMenuRadioItem>
              {rideStatusOptions.map((opt) => (
                <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                  {opt.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-x-auto bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {tableHeaders.map((title, idx) => (
                <TableHead
                  key={title}
                  className={`text-gray-700 uppercase font-semibold text-[11px] px-4 py-3 ${idx === 0 ? "text-left" : "text-center"}`}
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
                  {Array.from({ length: 12 }).map((_, colIndex) => (
                    <TableCell key={colIndex} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {jobs?.map((job) => (
                <TableRow
                  key={job?._id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-4 py-3 text-gray-700 font-medium">
                    {job?.companyName || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-600 font-semibold">
                    {job?.createdBy?.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-600 font-semibold">
                    {job?.assignedTo?.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-400 text-xs font-medium italic">
                    {job?.assignedTo?.company || "Not Assigned"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-600">
                    {job?.serviceArea}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-600">
                    {job?.pickupLocation}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-600">
                    {job?.dropoffLocation}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-[11px] font-semibold text-blue-600 bg-blue-50/50 rounded-md">
                    {job?.jobType}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    <Badge
                      className={
                        job?.status === "ASSIGNED"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : job?.status === "PENDING"
                            ? "bg-orange-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }
                      variant="outline"
                    >
                      {job?.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    {job?.rideStatus ? (
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200" variant="outline">
                        {job?.rideStatus}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Unstarted</span>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center font-bold text-gray-900">
                    ${job?.paymentAmount}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div className="bg-transparent cursor-pointer hover:bg-gray-200 p-2 duration-300 rounded-full transition-colors">
                            <IconTrash color="red" size={20} />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the job entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(job._id)}
                              className="bg-destructive text-white hover:bg-destructive/90 transition-colors"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
              {jobs?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="h-32 text-center text-gray-400">
                    No jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
