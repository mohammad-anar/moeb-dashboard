/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useApproveUserMutation,
  useBlockUserMutation,
  useGetUserDetailsByIdQuery,
} from "@/redux/service/driver/driverApi";
import { toast } from "sonner";

export function DriverView({ driverId, setOpen }: any) {
  const { data, isLoading } = useGetUserDetailsByIdQuery(driverId, {
    skip: !driverId,
  });

  const [approveUser] = useApproveUserMutation();
  const [blockUser] = useBlockUserMutation();
  const driver = data?.data;

  const handleBlock = (id: string) => {
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

  const handleApprove = (id: string) => {
    try {
      toast.promise(approveUser(id).unwrap(), {
        loading: "Approving driver...",
        success: "Driver approved successfully.",
        error: "Failed to approve driver. Please try again.",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to approve driver. Please try again.");
    }
  };

  return (
    <div className="bg-white w-full max-w-xl">
      {/* Header */}
      <div className="p-6 pb-4 border-b">
        <h2 className="text-xl font-bold text-foreground">
          Driver Verification
        </h2>
        <div className="mt-2">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded">
            {driver?.status ?? "Pending"}
          </span>
        </div>
      </div>

      {/* Driver Info */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-lg font-bold text-foreground">
          {driver?.name ?? "N/A"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {driver?.email ?? "N/A"}
        </p>
        <p className="text-sm text-muted-foreground">
          {driver?.company ?? "N/A"}
        </p>
      </div>

      {/* Metadata */}
      <div className="px-6 py-4 border-t border-b grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Created
          </p>
          <p className="text-sm font-semibold text-foreground">
            {driver?.createdAt
              ? new Date(driver.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Status
          </p>
          <p className="text-sm font-semibold text-foreground">
            {driver?.status ?? "Pending"}
          </p>
        </div>
      </div>

      {/* Vehicles Loop */}
      <div className="space-y-4">
        {driver?.vehicles?.map((vehicle: any, index: number) => (
          <div key={index} className="border-t first:border-none last:pb-6">
            {/* Vehicle Header */}
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">
                Vehicle #{index + 1} - {vehicle?.carType ?? "N/A"}
              </h4>

            </div>

            {/* Vehicle Details */}
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">Make & Model</p>
                  <p className="text-sm font-semibold text-amber-600">
                    {vehicle ? `${vehicle.make} ${vehicle.model}` : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">Color</p>
                  <p className="text-sm font-semibold text-amber-600">
                    {vehicle?.colorInside ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">Year</p>
                  <p className="text-sm font-semibold text-amber-600">
                    {vehicle?.year ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">License Plate</p>
                  <p className="text-sm font-semibold text-amber-600">
                    {vehicle?.licensePlate ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="px-6 py-4 border-t border-b border-dashed">
              <p className="text-xs font-bold text-foreground mb-3">Verification Documents</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">Vehicle Registration</p>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden aspect-[4/3] group relative shadow-sm">
                    <img
                      src={vehicle?.vehicleRegistration?.image}
                      alt="Vehicle Registration"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {vehicle?.vehicleRegistration?.expiryDate && (
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 text-white text-[9px] backdrop-blur-sm">
                        Expires: {new Date(vehicle.vehicleRegistration.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">Commercial Insurance</p>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden aspect-[4/3] group relative shadow-sm">
                    <img
                      src={vehicle?.commercialInsurance?.image}
                      alt="Commercial Insurance"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {vehicle?.commercialInsurance?.expiryDate && (
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 text-white text-[9px] backdrop-blur-sm">
                        Expires: {new Date(vehicle.commercialInsurance.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="px-6 py-4">
              <p className="text-xs font-bold text-foreground mb-3">Vehicle Photos</p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Front View", src: vehicle?.photos?.frontView },
                  { label: "Interior View", src: vehicle?.photos?.interiorView },
                  { label: "Rear View", src: vehicle?.photos?.rearView },
                ].map((photo, pIdx) => (
                  <div key={pIdx} className="space-y-1">
                    <p className="text-[9px] text-muted-foreground text-center uppercase font-medium">{photo.label}</p>
                    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden aspect-square shadow-sm group">
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt={photo.label}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[9px] text-gray-300">No Image</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <Button
          variant="outline"
          onClick={() => handleBlock(driver?._id)}
          className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
        >
          Reject
        </Button>
        <Button
          onClick={() => handleApprove(driver?._id)}
          className="flex-1 bg-black text-white hover:bg-gray-900 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Approve
        </Button>
      </div>
    </div>
  );
}
