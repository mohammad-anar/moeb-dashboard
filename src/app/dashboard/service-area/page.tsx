"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { ServiceAreaTable } from "@/components/tables/ServiceAreaTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllServiceAreaQuery } from "@/redux/service/serviceArea/serviceAreaApi";
import { useState } from "react";

const ServiceAreaPage = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: { page: number; limit: number; searchTerm?: string } = {
    page: currentPage,
    limit: limit,
  };

  if (searchTerm) {
    params.searchTerm = debouncedSearchTerm;
  }

  // api
  const { data, isLoading } = useGetAllServiceAreaQuery(params);

  return (
    <div className="p-5">
      <div className="mb-10">
        <h4 className="text-[36px]">Service Area</h4>
        <p>Manage your service area here</p>
      </div>

      {/* tables */}
      <div className="mt-10">
        <ServiceAreaTable areas={data?.data} setSearchTerm={setSearchTerm} loading={isLoading} />
        <MyPagination
          currentPage={currentPage}
          onPageChange={setCurrentpage}
          totalPages={data?.pagination?.totalPage}
        />
      </div>
    </div>
  );
};

export default ServiceAreaPage;
