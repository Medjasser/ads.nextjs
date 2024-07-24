"use client";
import VerticalPicker from "@/components/dali/vertical/VerticalPicker";

export default function LayoutDali({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex min-h-screen flex-col justify-between p-8">
        <span className="font-bold">DALI</span>
        {/* Choix de la verticale */}
        <VerticalPicker />
        {children}
      </main>
    </>
  );
}
