"use client";
import { MyPagination } from "@/components/shared/MyPagination";
import { ServiceAreaTable } from "@/components/tables/ServiceAreaTable";

const ServiceAreaPage = () => {
  const handleView = () => {
    console.log("click");
  };
  const handleSuspend = () => {
    console.log("click");
  };
  return (
    <div className="p-5">
      <div className="mb-10">
        <h4 className="text-[36px]">Service Area</h4>
        <p>Manage your service area here</p>
      </div>

      {/* tables */}
      <div className="mt-10">
        <ServiceAreaTable
          handleView={handleView}
          handleSuspend={handleSuspend}
        />
        <MyPagination />
      </div>
    </div>
  );
};

export default ServiceAreaPage;
