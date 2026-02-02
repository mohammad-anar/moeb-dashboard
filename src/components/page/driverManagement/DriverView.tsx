"use client";

import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DriverView() {
  return (
    <div className="bg-white  w-full max-w-xl ">
      {/* Header */}
      <div className="p-6 pb-4 border-b">
        <h2 className="text-xl font-bold text-foreground">
          Driver Verification
        </h2>
        <div className="mt-2">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded">
            pending
          </span>
        </div>
      </div>

      {/* Status Badge */}

      {/* Driver Info */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-lg font-bold text-foreground">Michael Chen</h3>
        <p className="text-sm text-muted-foreground">michael.chen@gmail.com</p>
        <p className="text-sm text-muted-foreground">Elite Transport Inc.</p>
      </div>

      {/* Metadata */}
      <div className="px-6 py-4 border-t border-b grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Created
          </p>
          <p className="text-sm font-semibold text-foreground">Jan 2, 2026</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Status
          </p>
          <p className="text-sm font-semibold text-foreground">Pending</p>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="px-6 pt-6 pb-4">
        <h4 className="text-sm font-bold text-foreground mb-4">
          Vehicle Details
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-sm text-foreground">Make & Model</p>
              <p className="text-sm font-semibold text-amber-600">Sedan X</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-sm text-foreground">Color</p>
              <p className="text-sm font-semibold text-amber-600">Black</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-sm text-foreground">Year</p>
              <p className="text-sm font-semibold text-amber-600">2024</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-sm text-foreground">License Plate</p>
              <p className="text-sm font-semibold text-amber-600">ABC-1234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="px-6 pt-6 pb-4 border-t">
        <h4 className="text-sm font-bold text-foreground mb-4">Documents</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-100 rounded-lg aspect-[3/4] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">ID</div>
              <p className="text-xs text-blue-600 mt-1">CARD</p>
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg aspect-[3/4] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">DL</div>
              <p className="text-xs text-blue-600 mt-1">LICENSE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Photos */}
      <div className="px-6 pt-6 pb-6 border-t">
        <h4 className="text-sm font-bold text-foreground mb-4">
          Vehicle Photos
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg aspect-video"></div>
          <div className="bg-gray-800 rounded-lg aspect-video"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
        >
          Reject
        </Button>
        <Button className="flex-1 bg-black text-white hover:bg-gray-900 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Approve
        </Button>
      </div>
    </div>
  );
}
