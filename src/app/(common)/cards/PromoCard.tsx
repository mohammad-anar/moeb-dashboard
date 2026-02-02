"use client";

import { useState } from "react";
import { Check, Copy, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromoCardProps {
  badge?: string;
  title: string;
  description: string;
  promoCode: string;
  expiresDate: string;
}

export function PromoCard({
  badge = "Service",
  title,
  description,
  promoCode,
  expiresDate,
}: PromoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full  rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-white">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-neutral-800/50 px-3 py-1.5">
        <Tag className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-medium text-neutral-300">{badge}</span>
      </div>

      {/* Title */}
      <h2 className="mb-3 text-3xl font-bold text-white">{title}</h2>

      {/* Description */}
      <p className="mb-6 text-neutral-400">{description}</p>

      {/* Promo Code Section */}
      <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800/40 p-6 backdrop-blur-sm">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
          Promo Code
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl font-bold text-amber-400">
            {promoCode}
          </span>
          <Button
            onClick={handleCopy}
            size="sm"
            variant="outline"
            className="gap-2 border-neutral-600 bg-white text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expiration Date */}
      <div className="flex items-center gap-2 text-neutral-500">
        <Calendar className="h-4 w-4" />
        <span className="text-sm">Expires {expiresDate}</span>
      </div>
    </div>
  );
}
