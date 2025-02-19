import type { Metadata } from "next";
// import "./globals.css";
// import { ColorSchemeScript } from "@mantine/core";


export const metadata: Metadata = {
  title: "AutoForm Demo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
