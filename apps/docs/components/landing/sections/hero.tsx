"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import InteractiveDemo from "../interactive-demo";

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="container w-full">
      <div className="grid w-full place-items-center gap-8 mx-auto md:py-16 py-20 ">
        <div className="w-full text-center space-y-6 sm:space-y-8">
          <Badge variant="outline" className="max-w-full text-sm py-2 px-3">
            <span>Fork of </span>
            <span className="pl-1.5 text-primary">
              {/* <Badge> */}
              <a
                className="underline underline-offset-2"
                href="https://github.com/vantezzen/autoform"
              >
                AutoForm
              </a>
              {/* </Badge> */}
            </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-3xl sm:text-4xl md:text-6xl font-bold">
            <h1>
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Instant forms
              </span>
              for your schemas
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-base sm:text-xl text-muted-foreground">
            Instantly transform your existing zod schemas into fully functional
            forms with zero configuration
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/docs">
              <Button className="w-5/6 md:w-[15%] font-bold group/arrow">
                Get Started
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-[15%] font-bold mt-4 md:mt-0"
            >
              <Link
                href="https://github.com/adityacodepublic/autoform"
                target="_blank"
              >
                Github
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-8 sm:mt-14 w-full max-w-[1200px] min-w-0">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <div className="w-full mx-auto rounded-lg relative leading-none flex items-center overflow-hidden border border-t-2 border-secondary border-t-primary/10">
            <InteractiveDemo />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
