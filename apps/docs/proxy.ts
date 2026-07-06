import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextResponse, type NextRequest } from "next/server";

const { rewrite: rewriteLLM } = rewritePath(
  "/docs{/*path}",
  "/docs.mdx{/*path}",
);

export function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*"],
};
