export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}
