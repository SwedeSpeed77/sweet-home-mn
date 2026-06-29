import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweet Home MN Cookie Co. | Award-Winning Homemade Bakery · Isanti, MN",
  description:
    "5× award-winning homemade cookies, cupcakes & dessert bars crafted from scratch by Shawn & Lisa Hodroff. Saturday pop-ups at the Isanti Farmers Market. Registered Minnesota Cottage Food Producer.",
  keywords: [
    "homemade cookies Isanti MN",
    "award-winning bakery Minnesota",
    "cottage food producer",
    "farmers market cookies",
    "custom cookie orders Minnesota",
  ],
  openGraph: {
    title: "Sweet Home MN Cookie Co.",
    description: "The cookies Isanti can't stop buying. Made from scratch, baked with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-dvh bg-espresso text-cream overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
