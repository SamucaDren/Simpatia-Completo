import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIMPATia - Debates Inteligentes",
  description:
    "Treine sua argumentação com a SIMPATia, uma plataforma de debates com Inteligência Artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-100 text-neutral-600 antialiased">
        {children}
      </body>
    </html>
  );
}
