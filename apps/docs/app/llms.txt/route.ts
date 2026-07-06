import { source } from "@/lib/source";
import { llms } from "fumadocs-core/source/llms";

export const revalidate = false;

export function GET() {
  return new Response(llms(source).index(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
