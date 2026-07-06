"use client";

import * as React from "react";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@autoform/zod";

import { AutoForm } from "@/components/ui/autoform/react-hook-form";
import {
  CountrySelectField,
  StateSelectField,
  CouponCodeFieldWrapper,
  GiftMessageField,
  PaymentFieldWrapper,
} from "@/components/ecommerce-checkout-fields";

const schema = z
  .object({
    country: z
      .string()
      .min(1, "Country is required")
      .describe("Country")
      .check(fieldConfig({ fieldType: "country" })),

    state: z
      .string()
      .min(1, "State / province is required")
      .describe("State / Province")
      .check(fieldConfig({ fieldType: "state" })),

    haveCoupon: z
      .boolean()
      .optional()
      .default(false)
      .describe("Have a coupon?"),

    couponCode: z
      .string()
      .optional()
      .describe("Coupon code")
      .check(
        fieldConfig({
          fieldWrapper: CouponCodeFieldWrapper,
          inputProps: { placeholder: "Try free100" },
        }),
      ),

    isGift: z.boolean().optional().default(false).describe("This is a gift"),

    giftMessage: z
      .string()
      .optional()
      .describe("Gift message")
      .check(fieldConfig({ fieldType: "giftMessage" })),

    payment: z
      .object({
        card: z
          .string()
          .optional()
          .describe("Card")
          .check(
            fieldConfig({ inputProps: { placeholder: "1234 5678 9012 3456" } }),
          ),

        expiryDate: z
          .string()
          .optional()
          .describe("Expiry (MM/YY)")
          .check(fieldConfig({ inputProps: { placeholder: "MM/YY" } })),

        code: z
          .string()
          .optional()
          .describe("code")
          .check(fieldConfig({ inputProps: { placeholder: "123" } })),
      })
      .check(fieldConfig({ fieldWrapper: PaymentFieldWrapper })), // for a discount banner when FREE100 is active.
  })
  .superRefine((data, ctx) => {
    if (data.haveCoupon && !data.couponCode?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Coupon code is required",
        path: ["couponCode"],
      });
    }

    const isFree =
      data.haveCoupon && data.couponCode?.toUpperCase() === "FREE100";

    if (!isFree) {
      if (!data.payment?.card?.trim())
        ctx.addIssue({
          code: "custom",
          message: "Payment card is required",
          path: ["payment", "card"],
        });
      if (!data.payment?.expiryDate?.trim())
        ctx.addIssue({
          code: "custom",
          message: "Expiry date is required",
          path: ["payment", "expiryDate"],
        });
      if (!data.payment?.code?.trim())
        ctx.addIssue({
          code: "custom",
          message: "code is required",
          path: ["payment", "code"],
        });
    }
  });

type CheckoutValues = z.infer<typeof schema>;

const schemaProvider = new ZodProvider(schema);

export function EcommerceCheckoutDemo() {
  const [result, setResult] = React.useState<CheckoutValues | null>(null);

  return (
    <div className="rounded-lg border bg-background p-6 space-y-6">
      <AutoForm
        schema={schemaProvider}
        formComponents={{
          country: CountrySelectField,
          state: StateSelectField,
          giftMessage: GiftMessageField,
        }}
        onSubmit={(data) => setResult(data as CheckoutValues)}
        withSubmit
      />

      {result && (
        <div className="rounded-md border bg-secondary/50 p-4 text-sm">
          <div className="font-medium mb-2">Submitted value</div>
          <pre className="overflow-auto text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
