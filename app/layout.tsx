import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/public/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bestman Luxe Studio",
    template: "%s | Bestman Luxe Studio",
  },
  description: "Bestman Luxe Studio — precision, craft, and quiet confidence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
