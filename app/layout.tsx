import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/styles/globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Events Platform",
  description: "Events Platform is a platform for event management.",
  icons: { icon: "/icons/logo.svg" },
};

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <html>
      <body className={font.variable}>{children}</body>
    </html>
  );
};

export default AppLayout;
