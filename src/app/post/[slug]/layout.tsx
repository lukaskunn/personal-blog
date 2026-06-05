import ReadingProgress from "@/components/ReadingProgress";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  );
}
