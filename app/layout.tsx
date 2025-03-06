import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noreen Event Planning System",
  description: "Noreen Event Planning System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Tiro+Gurmukhi:ital@0;1&display=swap');
          `}
        </style>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
