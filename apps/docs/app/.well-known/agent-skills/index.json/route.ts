export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "autoform",
        type: "skill-md",
        description:
          "Install, use, and test AutoForm with React Hook Form, TanStack Form, schema providers, shadcn/ui, and UI packages.",
        url: "https://raw.githubusercontent.com/vantezzen/autoform/main/skills/autoform/SKILL.md",
        digest:
          "sha256:6628d713c187f5c6db666bb5763b9be3bcd05d44d1a4fcd17979006245540cf5",
      },
    ],
  });
}
