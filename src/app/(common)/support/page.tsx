"use client";
import ChatComponent from "@/components/page/support/ChatComponent";
import { MyModal } from "@/components/shared/MyModal";
import { MyPagination } from "@/components/shared/MyPagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconFilter, IconFilter2 } from "@tabler/icons-react";
import {
  MoreHorizontal,
  RotateCcw,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const emails = [
  {
    id: 1,
    sender: "Sheikh Muhammad Ashik",
    subject: "Lorem available alteration in some form.",
    date: "23 Oct, 2026",
  },
  {
    id: 2,
    sender: "Siam Ashrafi Sumon",
    subject: "Lorem Ipsum available in form.",
    date: "22 Oct, 2025",
  },
  {
    id: 3,
    sender: "Siam Ashrafi Sumon",
    subject: "Lorem available alteration in some form.",
    date: "20 Oct, 2025",
  },
  {
    id: 4,
    sender: "Nishat Tasnim",
    subject: "Lorem ipsum available in form.",
    date: "19 Oct, 2025",
  },
  {
    id: 5,
    sender: "Sheikh Muhammad Ashik",
    subject: "Lorem available alteration in some form.",
    date: "19 Oct, 2025",
  },
  {
    id: 6,
    sender: "Sheikh Muhammad Ashik",
    subject: "Lorem available alteration in some form.",
    date: "19 Oct, 2025",
  },
  {
    id: 7,
    sender: "Nishat Tasnim",
    subject: "Lorem ipsum available in form.",
    date: "18 Oct, 2025",
  },
  {
    id: 8,
    sender: "Nishat Tasnim",
    subject: "available alteration in some Ipsum",
    date: "11 Oct, 2025",
  },
  {
    id: 9,
    sender: "Sheikh Muhammad Ashik",
    subject: "Lorem ipsum available in form.",
    date: "10 Oct, 2025",
  },
];

const DriverPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((e) => e.id));
    }
  };

  const toggleSelectEmail = (id: number) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  return (
    <div className="p-5">
      <div className="mb-10">
        <h4 className="text-[36px]">Support </h4>
        <p>Manage and monitor all users on your platform</p>
      </div>

      {/* tables */}
      <div className="mt-10">
        <div>
          <div className="min-h-screen bg-background">
            {/* Header Toolbar */}
            <div className="border-b border-border">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={
                      selectedEmails.length === emails.length &&
                      emails.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for user, email address..."
                      className="pl-10 pr-4 bg-background border-border"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <IconFilter2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Email List */}
            <div className="px-6 pt-6">
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground mb-4">
                <div className="col-span-1"></div>
                <div className="col-span-3">Sender</div>
                <div className="col-span-6">Subject</div>
                <div className="col-span-2 text-right">Date</div>
              </div>

              {/* Email Rows */}
              <div className="space-y-4">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setOpen(!open)}
                    className="hover:bg-gray-50 cursor-pointer duration-300 grid grid-cols-12 gap-4 items-center pb-4 border-b border-border/50 last:border-b-0"
                  >
                    <div className="flex items-center gap-5">
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedEmails.includes(email.id)}
                          onChange={() => toggleSelectEmail(email.id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <div className="col-span-1">
                        <button className="text-muted-foreground hover:text-foreground mt-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="col-span-10 grid grid-cols-10">
                      <div className="col-span-2 text-sm font-medium text-foreground">
                        {email.sender}
                      </div>
                      <div className="col-span-6">
                        <p className="text-sm text-muted-foreground">
                          {email.subject}
                        </p>
                      </div>
                      <div className="col-span-2 text-right text-sm text-muted-foreground">
                        {email.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <MyPagination />
      </div>
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

export default DriverPage;
