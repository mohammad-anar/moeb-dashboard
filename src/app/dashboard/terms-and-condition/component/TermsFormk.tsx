"use client";

import { useEffect, useState } from "react";


import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
  useGetAllTermsQuery,
    useGetTermsBySlugQuery,
    useUpdateTermsMutation
} from "@/redux/service/terms&conditions/termsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsFormData, termsSchema } from "../Terms.Schema";
import Editor from "./Editor";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import data from "./data.json"
import { ChevronDown } from "lucide-react";


const DEFAULT_TYPE = "privacy-policy";


export default function TermsForm() {
  const { data: termsData } = useGetAllTermsQuery({});
  
  const form = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      type: DEFAULT_TYPE,
      content: "Loading...",
    },
  });

  const selectedSlug = form.watch("type");

  const { data: slugData } = useGetTermsBySlugQuery(selectedSlug, {
    skip: !selectedSlug,
  });

  const FormData = slugData?.data;
  const [updateTerms] = useUpdateTermsMutation();
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  useEffect(() => {
    if (termsData?.data && !form.getValues("type")) {
      form.setValue("type", termsData.data[0]?.slug);
    }
  }, [termsData, form]);

  useEffect(() => {
    if (FormData?.content !== undefined) {
      form.setValue("content", FormData.content);
    }
  }, [FormData, form]);

  const onSubmit = async (values: TermsFormData) => {
    try {
      toast.promise(
        updateTerms({ slug: selectedSlug, data: { content: values?.content } }),
        {
          loading: "Updating the legal document",
          success: "Document updated successfully",
          error: "Failed to update the document",
        },
      );
    } catch {
      toast.error("Unable to save. Try again.");
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-card"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <FormControl>
                    <DropdownMenu
                      open={typeDropdownOpen}
                      onOpenChange={setTypeDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-auto gap-2 border-primary bg-white"
                        >
                          {termsData?.data?.find((item: any) => item.slug === field.value)?.title || "Select document type"}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-[200px]">
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setTypeDropdownOpen(false);
                          }}
                        >
                          {termsData?.data?.map((item: any) => (
                            <DropdownMenuRadioItem
                              key={item._id}
                              value={item.slug}
                              className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                              <div className="flex flex-col items-start text-black">
                                <p className="text-sm font-medium">
                                  {item.title}
                                </p>
                              </div>
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div>
                      <Editor value={field.value} onChange={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="min-w-[160px]">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
