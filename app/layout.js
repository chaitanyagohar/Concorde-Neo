import { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// In app/layout.js

export const metadata = {
  title: 'Concorde Neo | Modern Luxury Apartments in Bangalore',
  description: 'Discover unparalleled luxury and comfort at Concorde Neo. Explore spacious 2 & 3 BHK homes with world-class amenities in a prime Bangalore location.',
  keywords: 'Concorde Neo, luxury apartments, 2 BHK Bangalore, 3 BHK Bangalore, real estate, property in Bangalore',
  
  // Open Graph tags for social media sharing
  openGraph: {
    title: 'Concorde Neo | Modern Luxury Apartments in Bangalore',
    description: 'Experience a new standard of urban living. Meticulously designed homes with premium finishes and a vibrant community.',
    url: 'https://concordegroup-neo.com', // Replace with your actual live site URL
    siteName: 'Concorde Neo',
    images: [
      {
        url: '/Club_Cam.jpg.jpg', // An attractive image of the property
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    title: 'Concorde Neo | Modern Luxury Apartments in Bangalore',
    description: 'Discover your dream home at Concorde Neo, where modern design meets unparalleled comfort.',
    images: ['/aerial-cam.jpg'], // A compelling image for Twitter
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  author: 'Concorde Group',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense >
        <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
