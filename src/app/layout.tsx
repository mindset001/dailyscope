import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Daily Scope",
  description: "Amplifying diverse creative voices.",
  metadataBase: new URL("https://thedailyscope.com"), // Update with your domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
    <AuthProvider>
          <LayoutClient>{children}</LayoutClient>
    </AuthProvider>
      </body>
    </html>
  );
}
