"use client";

import TermsAndConditionForm from "@/components/forms/AddTermsAndcondition";

const DriverPage = () => {
  return (
    <div className="p-5">
      {/* <div className="mb-10">
        <h4 className="text-[36px]">Support </h4>
        <p>Manage and monitor all users on your platform</p>
      </div> */}

      <div className="mt-10">
        <TermsAndConditionForm />
      </div>
    </div>
  );
};

export default DriverPage;
