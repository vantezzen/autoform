export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "dual-autoform",
        type: "skill-md",
        description:
          "Install, use, and test Dual AutoForm with React Hook Form, TanStack Form, schema providers, shadcn/ui, and UI packages.",
        url: "https://raw.githubusercontent.com/adityacodepublic/autoform/tanstack-form-integration/skills/autoform/SKILL.md",
        digest:
          "sha256:c7b42a91c395cdb3cb9e509fbd41e2387043cf55a733c48aeb5f5cbae38f0ffa",
      },
    ],
  });
}
