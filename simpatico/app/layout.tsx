import ThemeRegistry from "@/components/ThemeResistry/ThemeResistry";
import "./globals.css";
import { Inter } from "next/font/google";
import { CourseProvider } from "@/lib/context/useCourse";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIMPATICO IA",
  description: "Plataforma de Tutoria Inteligente para Estudantes Universitários",
  icons: {
    icon: "https://scjmnsuidsjcnerccxhe.supabase.co/storage/v1/object/public/images/public/2hwlg68xd6b.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <CourseProvider>{children}</CourseProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
