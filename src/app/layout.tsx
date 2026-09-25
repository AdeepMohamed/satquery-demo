import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SatQuery AI — Earth Observation Intelligence",
  description: "An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries. SIH 2026 | SIH26167 | Space Technology | Code for Nation",
  keywords: ["satellite", "remote sensing", "AI", "VQA", "change detection", "SAR", "optical", "earth observation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#050510] text-white">
        {children}
      </body>
    </html>
  );
}
