"use client";
import dynamic from "next/dynamic";

const InteractiveDemo = dynamic(() => import("./interactive-demo-content"), {
  ssr: false,
});

export default InteractiveDemo;
