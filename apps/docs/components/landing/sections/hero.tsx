import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CustomFieldsDemo } from "@/components/examples/faq/custom-fields-demo";
import NestedAutoFormDemo from "@/components/examples/faq/nested-autoform-demo";
import { RealtimeValidationDemo } from "@/components/examples/faq/realtime-validation-demo";
import { CodeReveal } from "@/components/landing/code-reveal";
import { Button } from "@/components/ui/button";
import InteractiveDemo from "../interactive-demo";

const features = [
  {
    eyebrow: "Validation",
    title: "Realtime validation from the schema",
    description:
      "Use your form library normally. AutoForm connects the rendered fields to schema validation and the form state you configure.",
    href: "/docs/react/faq-examples#realtime-validation",
    code: `const realtimeSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

const schemaProvider = new ZodProvider(realtimeSchema);

const { formControl } = createFormControl({
  mode: "all",
});`,
    Demo: RealtimeValidationDemo,
  },
  {
    eyebrow: "Customization",
    title: "Swap in richer fields when defaults are not enough",
    description:
      "Map schema fields to custom inputs such as steppers, date pickers, sliders, color pickers, and richer selection controls.",
    href: "/docs/react/faq-examples#custom-field-components",
    code: `const schema = z.object({
  quantity: z.number()
    .min(1)
    .max(99)
    .default(1)
    .check(fieldConfig({ fieldType: "numberStepper" })),

  themeColor: z.string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .default("#6366f1")
    .check(fieldConfig({ fieldType: "colorPicker" })),

  plan: z.enum(["starter", "pro", "enterprise"])
    .default("starter")
    .check(fieldConfig({ fieldType: "radioCard" })),
});

<AutoForm
  schema={new ZodProvider(schema)}
  formComponents={{
    numberStepper: NumberStepperField,
    colorPicker: ColorPickerField,
    radioCard: RadioCardField,
  }}
/>`,
    Demo: CustomFieldsDemo,
  },
  {
    eyebrow: "Composition",
    title: "Compose generated forms inside custom workflows",
    description:
      "AutoForm can sit inside dialogs and nested flows, so simple schema-driven forms can grow without replacing your app structure.",
    href: "/docs/react/faq-examples#nested-autoforms",
    code: `const colorsSchema = z.object({
  colors: z.array(z.string().min(1)).min(1),
});

const profileSchema = z.object({
  username: z.string().min(2),
  colors: z.array(z.string())
    .min(1)
    .default([])
    .describe("Favorite colors")
    .check(fieldConfig({ fieldType: "colorDialog" })),
});

<AutoForm
  schema={new ZodProvider(profileSchema)}
  formComponents={{ colorDialog: ColorDialogField }}
/>`,
    Demo: NestedAutoFormDemo,
  },
];

export const HeroSection = () => {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
          Instant forms from your existing schemas.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          AutoForm turns validation schemas into working forms with labels,
          defaults, field types, and validation wired in.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
            <Link href="/docs/react/getting-started">
              Quick start
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-zinc-300 text-zinc-800 hover:bg-zinc-100"
          >
            <Link href="/docs">Browse docs</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <InteractiveDemo />
      </section>

      <section className="mt-24">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              What AutoForm handles
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Keep the schema as the source of truth. Customize when the form
              needs it.
            </p>
          </div>
          <Link
            href="/docs/react/getting-started"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950"
          >
            Start building
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="space-y-20">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="grid gap-8 border-t border-zinc-200 pt-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12"
            >
              <div className="max-w-md">
                <p className="text-sm font-medium text-zinc-500">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-950"
                >
                  View docs
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="space-y-4">
                <feature.Demo />
                <CodeReveal code={feature.code} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Build your first schema-driven form.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Start with the React quick start, then customize only the fields that
          need more than the defaults.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
            <Link href="/docs/react/getting-started">
              Open quick start
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100"
          >
            <Link
              href="https://github.com/vantezzen/autoform"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};
