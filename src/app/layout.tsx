import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import { AccentProvider } from '@/components/AccentProvider';
import AccentPicker from '@/components/AccentPicker';
import CommandPalette from '@/components/CommandPalette';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Deepak K - Full Stack Developer | Data Analyst',
  description:
    'Passionate Full Stack Developer with experience in MERN & Next.js, fintech platforms, and data analytics. Strong in backend systems, secure authentication, REST APIs, and scalable architectures.',
  keywords: [
    'Full Stack Developer',
    'Data Analyst',
    'MERN Stack',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'FinTech',
    'JavaScript',
    'TypeScript',
    'Deepak K',
    'Deepak Karuppasamy',
    'Web Developer',
    'Software Engineer',
  ],
  authors: [{ name: 'Deepak K', url: 'https://github.com/Deepakkaruppasamy' }],
  creator: 'Deepak K',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepakkaruppasamy.vercel.app',
    title: 'Deepak K - Full Stack Developer | Data Analyst',
    description:
      'Passionate Full Stack Developer with experience in MERN & Next.js, fintech platforms, and data analytics.',
    siteName: 'Deepak K Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak K - Full Stack Developer | Data Analyst',
    description:
      'Passionate Full Stack Developer with experience in MERN & Next.js, fintech platforms, and data analytics.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased grain`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AccentProvider>
            <SmoothScroll>
              <CustomCursor />
              <AccentPicker />
              <CommandPalette />
              {children}
            </SmoothScroll>
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
