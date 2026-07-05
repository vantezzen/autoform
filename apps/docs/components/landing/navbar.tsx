"use client";
import { ChevronsDown, Menu } from "lucide-react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GithubIcon from "../icons/github-icon";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "/docs",
    label: "Docs",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card relative">
      <Link href="/" className="font-bold text-lg flex items-center">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        AutoForm
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <Button
          asChild
          size="sm"
          variant="ghost"
          aria-label="View on GitHub"
          className="[&_svg]:!size-5"
        >
          <Link
            aria-label="View on GitHub"
            href="https://github.com/adityacodepublic/autoform.git"
            target="_blank"
          >
            <GithubIcon className="size-5" />
          </Link>
        </Button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full rounded-lg border border-secondary bg-card p-2 shadow-lg lg:hidden">
          {routeList.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setIsOpen(false)}
          >
            <Link
              href="https://github.com/adityacodepublic/autoform.git"
              target="_blank"
            >
              GitHub
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};
