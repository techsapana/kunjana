import type { Metadata } from "next";
import {
  DM_Sans,
  Playfair_Display,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { LanguageProvider } from "@/src/context/LanguageContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "NaturePure Co. | Organic Poultry Supplements | नेचरप्योर कम्पनी | जैविक कुखुरा पूरक",
  description:
    "NaturePure Co. develops organic poultry supplements focused on flock health, immunity, and sustainable farm performance. नेचरप्योर कम्पनीले बगाल स्वास्थ्य, प्रतिरक्षा र दिगो फार्म कार्यक्षमतामा केन्द्रित जैविक कुखुरा पूरक विकास गर्छ।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${notoSansDevanagari.variable} antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
