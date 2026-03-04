import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['500', '600'] 
});

export const metadata: Metadata = {
  title: "SIMPATia - Debates Inteligentes",
  description: "Treine sua argumentação com a SIMPATia, uma plataforma de debates com Inteligência Artificial.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-neutral-100 text-neutral-600 antialiased`}>
        {children}
      </body>
    </html>
  );
}