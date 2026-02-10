import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs - AnsiPress",
  description: "Documentation for AnsiPress - Coming Soon",
};

export default function DocsPage() {
  return (
    <ComingSoon 
      title="Documentation" 
      description="We are currently writing comprehensive documentation to help you get started with AnsiPress."
    />
  );
}
