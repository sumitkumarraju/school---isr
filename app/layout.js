import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://ishwarinternationalschool.com'),
  title: {
    default: 'Ishwar International School | Best CBSE School in Gohana',
    template: '%s | Ishwar International School',
  },
  description: 'Ishwar International School is a premier CBSE-affiliated institution in Gohana, focused on holistic development, academic excellence, and ethical values.',
  keywords: ['Ishwar International School', 'CBSE School Gohana', 'Best School in Gohana', 'Holistic Education', 'K12 School', 'Sonepat Road School'],
  openGraph: {
    title: 'Ishwar International School',
    description: 'Nurturing energy, excellence, and evolution in every student.',
    url: 'https://ishwarinternationalschool.com',
    siteName: 'Ishwar International School',
    images: [
      {
        url: '/building.png',
        width: 1200,
        height: 630,
        alt: 'Ishwar International School Campus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishwar International School',
    description: 'Premier CBSE School in Gohana.',
    images: ['/building.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" async strategy="afterInteractive"></script>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans text-slate-800 bg-white`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
