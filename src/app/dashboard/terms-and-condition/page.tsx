"use client";
import { Suspense } from "react";

import TermsForm from "./component/TermsFormk";
import { getLegalDocumentsData } from "./component/data";
import TermsSkeleton from "./component/TermsSkeleton";
import {
  useGetAllTermsQuery,
  useGetTermsBySlugQuery,
} from "@/redux/service/terms&conditions/termsApi";

// async function TermsLoader() {
//   const data = await getLegalDocumentsData();

//   return <TermsForm data={data} />;
// }

export default function TermsAndConditionsPage() {
  const { data: termsData } = useGetAllTermsQuery({});
  const { data: slugData } = useGetTermsBySlugQuery(termsData?.data[0]?.slug, {
    skip: !termsData?.data[0]?.slug,
  });
  return (
    <section className="flex flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Legal Documents
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage privacy policies, terms, and other legal documents.
        </p>
      </div>

      <Suspense fallback={<TermsSkeleton />}>
        <TermsForm data={slugData?.data} />
      </Suspense>
    </section>
  );
}
