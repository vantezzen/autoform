import Link from "next/link";
import GithubIcon from "../icons/github-icon";
import Image from "next/image";
import icon from "@/app/icon.png";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Image src={icon} alt="AutoForm" width={24} height={24} />
          AutoForm
        </Link>

        <nav className="flex items-center gap-1 text-sm text-zinc-600">
          <Link
            href="/docs"
            className="rounded-md px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            Docs
          </Link>
          <Link
            aria-label="View on GitHub"
            href="https://github.com/vantezzen/autoform.git"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            <GithubIcon className="size-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
