import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Lucas Oliveira",
  description: "Welcome to my personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

