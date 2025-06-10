import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// NB https://github.com/vercel/next.js/discussions/58693#discussioncomment-8024154
const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Infinite Scroll Challenge',
  description: 'Infinite Scroll Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
