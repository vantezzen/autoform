"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeRevealProps = {
  code: string;
  filename?: string;
};

export function CodeReveal({ code, filename = "schema.ts" }: CodeRevealProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2">
        <span className="font-mono text-xs text-zinc-500">{filename}</span>
        {open && (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-950"
            onClick={() => setOpen(false)}
            aria-expanded={open}
          >
            Hide code
            <ChevronDown className="size-3 rotate-180" />
          </button>
        )}
      </div>

      <div className="relative">
        <pre
          className={cn(
            "overflow-hidden p-4 font-mono text-xs leading-5 text-zinc-700 transition-[max-height]",
            open ? "max-h-[680px]" : "max-h-24",
          )}
        >
          <code>{code}</code>
        </pre>
        {!open && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-zinc-50 via-zinc-50/95 to-transparent pb-4 pt-12">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 border-zinc-300 bg-white text-zinc-800 shadow-sm hover:bg-zinc-100"
              onClick={() => setOpen(true)}
              aria-expanded={open}
            >
              View code
              <ChevronDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
