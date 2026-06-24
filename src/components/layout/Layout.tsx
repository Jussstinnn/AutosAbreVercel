import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}
