"use client";

import * as React from "react";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";
import {
  CountrySelectField,
  CouponCodeFieldWrapper,
  GiftMessageField,
  PaymentFieldWrapper,
  StateSelectField,
} from "@/components/tanstack-ecommerce-checkout-fields";

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
        cardNumber: z
          .string()
          .optional()
          .describe("Card number")
          .check(
            fieldConfig({ inputProps: { placeholder: "1234 5678 9012 3456" } }),
          ),
        expiryDate: z
          .string()
          .optional()
          .describe("Expiry (MM/YY)")
          .check(fieldConfig({ inputProps: { placeholder: "MM/YY" } })),
        cvv: z
          .string()
          .min(3)
          .max(4)
          .optional()
          .describe("CVV")
          .check(fieldConfig({ inputProps: { placeholder: "123" } })),
      })
      .check(fieldConfig({ fieldWrapper: PaymentFieldWrapper })),
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
      if (!data.payment?.cardNumber?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Card number is required",
          path: ["payment", "cardNumber"],
        });
      }
      if (!data.payment?.expiryDate?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Expiry date is required",
          path: ["payment", "expiryDate"],
        });
      }
      if (!data.payment?.cvv?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "CVV is required",
          path: ["payment", "cvv"],
        });
      }
    }
  });

type CheckoutValues = z.infer<typeof schema>;

const schemaProvider = new ZodProvider(schema);

export function TanStackEcommerceCheckoutDemo() {
  const [result, setResult] = React.useState<CheckoutValues | null>(null);

  return (
    <div className="space-y-6 rounded-lg border bg-background p-6">
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
          <div className="mb-2 font-medium">Submitted value</div>
          <pre className="overflow-auto text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
