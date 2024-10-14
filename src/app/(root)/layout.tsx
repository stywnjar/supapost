import { Navbar } from "@/components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="py-28 max-w-lg mx-auto">{children}</div>
    </div>
  );
}
