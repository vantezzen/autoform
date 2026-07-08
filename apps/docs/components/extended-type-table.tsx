"use client";

import Link from "fumadocs-core/link";
import { useTranslations } from "fumadocs-ui/contexts/i18n";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { TypeNode } from "fumadocs-ui/components/type-table";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { Fragment, useEffect, useState, type ComponentProps } from "react";

const fieldVariants = cva("text-fd-muted-foreground not-prose pe-2");
const headerGrid = "grid gap-x-4 items-center";
const rowGrid = "grid gap-x-4 items-start";
const tableGridTemplate = "minmax(0,1.2fr) 96px minmax(0,2fr)";

export function ExtendedTypeTable({
  id,
  type,
  className,
  ...props
}: {
  type: Record<string, TypeNode>;
} & ComponentProps<"div">) {
  const t = useTranslations();

  return (
    <div
      id={id}
      className={cn(
        "@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "px-3 py-1 not-prose text-fd-muted-foreground font-medium",
          headerGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <p>{t.typeTableProp}</p>
        <p>Required</p>
        <p>Description</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item key={key} parentId={id} name={key} item={value} />
      ))}
    </div>
  );
}

function Item({
  parentId,
  name,
  item: {
    parameters = [],
    description,
    required = false,
    deprecated,
    typeDescription,
    default: defaultValue,
    type,
    typeDescriptionLink,
    returns,
  },
}: {
  parentId?: string;
  name: string;
  item: TypeNode;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const id = parentId ? `${parentId}-${name}` : undefined;
  const resolvedDefault = defaultValue ?? "-";
  const typeValue = typeDescription ?? type;

  useEffect(() => {
    const hash = window.location.hash;
    if (!id || !hash) return;
    if (`#${id}` === hash) setOpen(true);
  }, [id]);

  return (
    <Collapsible
      id={id}
      open={open}
      onOpenChange={(value) => {
        if (value && id) window.history.replaceState(null, "", `#${id}`);
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
          "group relative w-full text-start px-3 py-2 not-prose hover:bg-fd-accent",
          rowGrid,
        )}
        style={{ gridTemplateColumns: tableGridTemplate }}
      >
        <code
          className={cn(
            "text-fd-primary min-w-fit font-mono font-medium",
            deprecated && "line-through text-fd-primary/50",
          )}
        >
          {name}
          {!required && "?"}
        </code>
        <span className="text-fd-muted-foreground">
          {required ? "Yes" : "No"}
        </span>
        <div className="text-sm prose prose-no-margin">
          {description || "-"}
        </div>
        <ChevronDown className="absolute end-2 top-3 size-4 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-sm p-3 overflow-auto fd-scroll-container border-t">
          <Fragment>
            <p className={cn(fieldVariants())}>{t.typeTableType}</p>
            <p className="my-auto not-prose">
              {typeDescriptionLink ? (
                <Link href={typeDescriptionLink} className="underline">
                  {typeValue}
                </Link>
              ) : (
                typeValue
              )}
            </p>
          </Fragment>
          <Fragment>
            <p className={cn(fieldVariants())}>Required</p>
            <p className="my-auto not-prose">{required ? "Yes" : "No"}</p>
          </Fragment>
          <Fragment>
            <p className={cn(fieldVariants())}>{t.typeTableDefault}</p>
            <p className="my-auto not-prose">{resolvedDefault}</p>
          </Fragment>
          {parameters.length > 0 && (
            <Fragment>
              <p className={cn(fieldVariants())}>{t.typeTableParameters}</p>
              <div className="flex flex-col gap-2">
                {parameters.map((param) => (
                  <div
                    key={param.name}
                    className="inline-flex items-center flex-wrap gap-1"
                  >
                    <p className="font-medium not-prose text-nowrap">
                      {param.name} -
                    </p>
                    <div className="text-sm prose prose-no-margin">
                      {param.description}
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          {returns && (
            <Fragment>
              <p className={cn(fieldVariants())}>{t.typeTableReturns}</p>
              <div className="my-auto text-sm prose prose-no-margin">
                {returns}
              </div>
            </Fragment>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
