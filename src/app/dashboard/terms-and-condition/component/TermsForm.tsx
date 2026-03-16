"use client";

import { useEffect, useMemo, useState } from "react";

import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  addLegalSchema,
  termsSchema,
  type AddLegalFormData,
  type TermsFormData
} from "../schema/terms.schema";
import {
  useCreateTermsMutation,
  useDeleteTermsMutation,
  useGetAllTermsQuery,
  useGetTermsBySlugQuery,
  useUpdateTermsMutation
} from "@/redux/service/terms&conditions/termsApi";
import Editor from "@/components/terms/Editor";

export default function TermsForm() {
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const form = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      slug: "",
      content: ""
    }
  });

  const addLegalForm = useForm<AddLegalFormData>({
    resolver: zodResolver(addLegalSchema),
    defaultValues: {
      title: ""
    }
  });

  const selectedSlug = useWatch({
    control: form.control,
    name: "slug"
  });

  const { data: getAllLegalQuery, isLoading: isAllLegalLoading } = useGetAllTermsQuery({});
  const { data: detailsLegalQuery, isFetching: isDetailsFetching } = useGetTermsBySlugQuery(
    selectedSlug || undefined,
    {
      skip: !selectedSlug
    }
  );
  const [createTermsMutation, { isLoading: isCreating }] = useCreateTermsMutation();
  const [updateTermsMutation, { isLoading: isUpdating }] = useUpdateTermsMutation();
  const [deleteTermsMutation, { isLoading: isDeleting }] = useDeleteTermsMutation();

  const legalOptions = useMemo(
    () => getAllLegalQuery?.data ?? [],
    [getAllLegalQuery?.data]
  );

  useEffect(() => {
    if (legalOptions.length === 0) {
      if (selectedSlug) {
        form.setValue("slug", "");
      }
      form.setValue("content", "");
      return;
    }

    const hasSelectedDocument = legalOptions.some((option:any) => option.slug === selectedSlug);

    if (!selectedSlug || !hasSelectedDocument) {
      form.setValue("slug", legalOptions[0].slug);
    }
  }, [form, legalOptions, selectedSlug]);

  useEffect(() => {
    const nextContent = detailsLegalQuery?.data?.content ?? "";
    form.setValue("content", nextContent, { shouldValidate: true });
  }, [detailsLegalQuery?.data?.content, form]);

  const onSubmit = async (values: TermsFormData) => {
    try {
      if (!selectedSlug) {
        toast.error("Select a legal document before saving.");
        return;
      }

      const response = await updateTermsMutation({
        slug: values.slug,
        data: { content: values.content }
      }).unwrap();

      if (response.data?.slug && response.data.slug !== values.slug) {
        form.setValue("slug", response.data.slug);
      }

      toast.success(response.message || "Legal document updated successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to save the document. Try again.");
    }
  };

  const handleCreateLegal = async (values: AddLegalFormData) => {
    try {
      const response = await createTermsMutation({
        title: values.title,
        content: ""
      }).unwrap();

      form.setValue("slug", response.data.slug);
      setIsAddModalOpen(false);
      addLegalForm.reset();
      toast.success(response.message || "Legal page created successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to create legal page. Try again.");
    }
  };

  const handleDeleteLegal = async () => {
    if (!selectedSlug) {
      toast.error("Select a legal document to delete.");
      return;
    }

    try {
      const selectedIndex = legalOptions.findIndex((option:any) => option.slug === selectedSlug);
      const remainingOptions = legalOptions.filter((option:any) => option.slug !== selectedSlug);
      const fallbackIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
      const nextSlug = remainingOptions[fallbackIndex]?.slug ?? "";

      const response = await deleteTermsMutation(selectedSlug).unwrap();

      form.setValue("slug", nextSlug);

      if (!nextSlug) {
        form.setValue("content", "");
      }

      toast.success(response.message || "Legal page deleted successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to delete legal page. Try again.");
    }
  };

  const selectedDocument = legalOptions.find((option:any) => option.slug === selectedSlug);
  const isBusy = isAllLegalLoading || isDetailsFetching || isUpdating;

  return (
    <>
      <Card>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <FormLabel>Document Type</FormLabel>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={() => setIsAddModalOpen(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Add Legal
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={handleDeleteLegal}
                          disabled={!selectedSlug || isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <FormControl>
                      <DropdownMenu open={typeDropdownOpen} onOpenChange={setTypeDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-auto gap-2 border-primary bg-white"
                            disabled={legalOptions.length === 0 || isAllLegalLoading}
                          >
                            {selectedDocument?.title || "Select document type"}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-full">
                          <DropdownMenuRadioGroup
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              setTypeDropdownOpen(false);
                            }}
                          >
                            {legalOptions.map((option:any) => (
                              <DropdownMenuRadioItem key={option.slug} value={option.slug}>
                                <div className="flex flex-col items-start">
                                  <p className="text-sm font-medium">{option.title}</p>
                                  <p className="text-xs text-muted-foreground">/{option.slug}</p>
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

              <Button type="submit" className="min-w-[160px]" disabled={!selectedSlug || isBusy}>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) {
            addLegalForm.reset();
          }
        }}
      >
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Legal Page</DialogTitle>
            <DialogDescription>
              Add a title for the legal page. Content will be created as empty.
            </DialogDescription>
          </DialogHeader>

          <Form {...addLegalForm}>
            <form onSubmit={addLegalForm.handleSubmit(handleCreateLegal)} className="space-y-4">
              <FormField
                control={addLegalForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Terms of Service" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="min-w-[140px]"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
