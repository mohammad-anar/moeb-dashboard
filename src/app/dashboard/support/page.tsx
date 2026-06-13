/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ChatComponent from "@/components/page/support/ChatComponent";
import { MyModal } from "@/components/shared/MyModal";
import { MyPagination } from "@/components/shared/MyPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setSelectedRoom } from "@/redux/features/messageSlice";
import { useCreateChatMutation } from "@/redux/service/chat/chatApi";

import { useDeleteSupportMutation, useGetAllSupportQuery } from "@/redux/service/support/supportApi";

import { IconFilter2, IconMessage2 } from "@tabler/icons-react";
import { MoreHorizontal, RotateCcw, Search, Trash2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export type SupportMessage = {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
};

export type SupportUser = {
  _id: string;
  name: string;
  email: string;
};

export type SupportChat = {
  _id: string;
  supportId: string;
};

export type SupportTicket = {
  _id: string;
  id: string;
  subject: string;
  user: SupportUser;
  messages: SupportMessage[];
  chat: SupportChat;
  createdAt: string;
  updatedAt: string;
};

const SupportPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: any = {
    page: currentPage,
    limit: 10,
  };

  if (debouncedSearchTerm) {
    params.searchTerm = debouncedSearchTerm;
  }

  const { data, isLoading, refetch } = useGetAllSupportQuery(params);
  const [createChat] = useCreateChatMutation();

  const [deleteSupport] = useDeleteSupportMutation();

  const supportData: SupportTicket[] = data?.data || [];


  const toggleSelectAll = () => {
    if (selectedEmails.length === supportData.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(supportData.map((e: any) => e._id));
    }
  };

  const toggleSelectEmail = (id: string) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    if (selectedEmails.length === 0) return;

    try {
      await Promise.all(
        selectedEmails.map((id) => deleteSupport(id).unwrap())
      );
      toast.success("Support ticket(s) deleted successfully");
      setSelectedEmails([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete support ticket(s)");
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const dispatch = useDispatch();

  const handleChatClick = (support: SupportTicket) => {
    try {
      if (support?.chat?._id) {
        // open chat
        dispatch(setSelectedRoom(support?.chat?._id));
        setOpen(true);
      } else {
        // create chat
        toast.promise(
          createChat({
            supportId: support._id,
            participantId: support?.user?._id,
          }).unwrap(),
          {
            loading: "Chat creating...",
            success: (data) => {
              dispatch(setSelectedRoom(data?.data?._id));
              setOpen(true);
              return "Chat created successfully";
            },
            error: (err) => {
              return err?.data?.message || "Failed to create chat";
            },
          },
        );
      }
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      {/* Page Header */}
      <div className="mb-10">
        <h4 className="text-[36px] font-semibold">Support</h4>
        <p className="text-muted-foreground">
          Manage and monitor all users on your platform
        </p>
      </div>

      {/* Table Section */}
      <div className="mt-10">
        {/* Toolbar */}
        <div className="border-b border-border">
          <div className="flex items-center justify-between px-6 py-4 gap-6">
            {/* Left Actions */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  selectedEmails.length === supportData.length &&
                  supportData.length > 0
                }
                onChange={toggleSelectAll}
                className="w-4 h-4 cursor-pointer"
              />

              <Button variant="ghost" size="icon" onClick={handleDelete} disabled={selectedEmails.length === 0}>
                <Trash2 className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleRefresh}>
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 w-[420px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Search for user, email address..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button variant="ghost" size="icon">
                <IconFilter2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Message</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && supportData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No support tickets found
                  </TableCell>
                </TableRow>
              )}

              {supportData.map((ticket: SupportTicket) => (
                <TableRow
                  key={ticket._id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  {/* Checkbox */}
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(ticket._id)}
                      onChange={() => toggleSelectEmail(ticket._id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </TableCell>

                  {/* Sender */}
                  <TableCell className="font-medium">
                    {ticket?.user?.name}
                  </TableCell>

                  {/* Subject */}
                  <TableCell className="text-muted-foreground">
                    {ticket?.subject}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-muted-foreground">
                    {new Date(ticket?.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleChatClick(ticket)}
                    >
                      <IconMessage2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <MyPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={data?.pagination?.totalPage || 1}
        />
      </div>

      {/* Chat Modal */}
      <MyModal
        open={open}
        contentClassName="min-w-[60vw]"
        onOpenChange={setOpen}
      >
        <ChatComponent />
      </MyModal>
    </div>
  );
};

export default SupportPage;
