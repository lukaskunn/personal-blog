import type { Metadata } from "next";

import "../../app/global.scss";

export const metadata: Metadata = {
  title: "Blog - Lucas Oliveira",
  description: "Welcome to my personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
