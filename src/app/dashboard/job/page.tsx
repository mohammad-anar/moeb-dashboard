"use client";

import { MyPagination } from "@/components/shared/MyPagination";
import { JobTable } from "@/components/tables/JobTable";
import { useGetAllJobsQuery } from "@/redux/service/job/jobApi";
import { useGetAllServiceAreaQuery } from "@/redux/service/serviceArea/serviceAreaApi";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const JobManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceArea, setServiceArea] = useState<string | undefined>(undefined);
  const [companyName, setCompanyName] = useState<string | undefined>(undefined);
  const [rideStatus, setRideStatus] = useState<string | undefined>(undefined);

  const { data: jobsResponse, isLoading } = useGetAllJobsQuery({
    page: currentPage,
    limit: 10,
    searchTerm: searchTerm || undefined,
    serviceArea,
    companyName,
    rideStatus,
  });

  const { data: serviceAreasResponse } = useGetAllServiceAreaQuery({});
  const serviceAreas = serviceAreasResponse?.data;

  // Extract unique companies from the current job data for the filter
  // In a real app, you might have a dedicated API for this
  const companies = Array.from(new Set(jobsResponse?.data?.map((j: any) => j.companyName).filter(Boolean))) as string[];

  const jobs = jobsResponse?.data;
  const pagination = jobsResponse?.pagination;

  return (
    <div className="p-5">
      <div className="mb-10">
        <h1 className="text-[36px] font-semibold text-gray-900">Job Management</h1>
        <p className="text-gray-500">Manage and monitor all ride bookings across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="@container/card border-gray-200">
          <CardHeader>
            <CardDescription className="text-gray-500">Total Jobs</CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums text-gray-900">
              {pagination?.total || 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-10">
        <JobTable
          jobs={jobs}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          serviceAreaFilter={serviceArea}
          onServiceAreaChange={(val) => {
            setServiceArea(val);
            setCurrentPage(1);
          }}
          companyNameFilter={companyName}
          onCompanyNameChange={(val) => {
            setCompanyName(val);
            setCurrentPage(1);
          }}
          rideStatusFilter={rideStatus}
          onRideStatusChange={(val) => {
            setRideStatus(val);
            setCurrentPage(1);
          }}
          serviceAreas={serviceAreas}
          companies={companies}
        />
        <div className="mt-6 flex justify-center">
          <MyPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={pagination?.totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default JobManagementPage;
