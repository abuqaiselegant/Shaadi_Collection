import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "Shaadi Collection",
  description: "Celebration essentials — stage decor, gift wrappers, cash garlands, envelopes & reception items. Crafted in Gaya, Bihar since 2010.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
