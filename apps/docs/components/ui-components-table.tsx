"use client";

import Link from "fumadocs-core/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { useEffect, useState, type ReactNode } from "react";

const fieldVariants = cva("text-fd-muted-foreground not-prose pe-2");
const headerGrid = "grid gap-x-4 items-center";
const rowGrid = "grid gap-x-4 items-start";
const tableGridTemplate = "minmax(0,1.2fr) minmax(0,1.5fr) minmax(0,1.5fr)";

export interface UIComponentEntry {
  /** Component name, e.g. "Form" */
  name: string;
  /** Short description of purpose */
  purpose: string;
  /** Example implementation link label */
  exampleLabel: string;
  /** Example implementation link URL */
  exampleHref: string;
  /** Type signature of the component */
  type: ReactNode;
  /** Detailed props content rendered inside the collapsible dropdown */
  propsContent?: ReactNode;
}

export function UIComponentsTypeTable({
  id,
  entries,
  className,
}: {
  id: string;
  entries: UIComponentEntry[];
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "px-3 pe-8 py-1 not-prose text-fd-muted-foreground font-medium",
          headerGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <p>Component</p>
        <p>Purpose</p>
        <p>Example implementation</p>
      </div>
      {entries.map((entry) => (
        <UIComponentItem key={entry.name} parentId={id} entry={entry} />
      ))}
    </div>
  );
}

function UIComponentItem({
  parentId,
  entry,
}: {
  parentId: string;
  entry: UIComponentEntry;
}) {
  const [open, setOpen] = useState(false);
  const id = `${parentId}-${entry.name}`;

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    if (`#${id}` === hash) setOpen(true);
  }, [id]);

  return (
    <Collapsible
      id={id}
      open={open}
      onOpenChange={(value) => {
        if (value) window.history.replaceState(null, "", `#${id}`);
        setOpen(value);
      }}
      className={cn(
        "rounded-xl border overflow-hidden scroll-m-20 transition-all",
        open
          ? "shadow-sm bg-fd-background not-last:mb-2"
          : "border-transparent",
      )}
    >
      <CollapsibleTrigger
        className={cn(
          "group relative w-full text-start px-3 pe-8 py-2 not-prose hover:bg-fd-accent",
          rowGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <code className="text-fd-primary min-w-fit font-mono font-medium">
          {entry.name}
        </code>
        <span className="text-sm text-fd-muted-foreground">
          {entry.purpose}
        </span>
        <span className="text-sm">
          <Link
            href={entry.exampleHref}
            className="underline text-fd-primary"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {entry.exampleLabel}
          </Link>
        </span>
        <ChevronDown className="absolute end-2 top-3 size-4 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="text-sm overflow-auto fd-scroll-container border-t">
          <div className="grid grid-cols-[1fr_3fr] gap-y-4 p-3">
            <p className={cn(fieldVariants())}>Type</p>
            <p className="my-auto not-prose">{entry.type}</p>
          </div>
          {entry.propsContent && (
            <div className="px-3 pb-3">
              <p className={cn(fieldVariants(), "mb-2")}>Props</p>
              {entry.propsContent}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
