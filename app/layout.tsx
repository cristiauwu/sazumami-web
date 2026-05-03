import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sazumami | Sazón de mar para todo uso',
  description: 'Sazonador artesanal en polvo a base de camarón, sal marina y especias seleccionadas. Hecho en México.',
  themeColor: '#0D1B2A',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body className={`${playfair.variable} ${jakarta.variable} antialiased`} style={{ background: '#0D1B2A', color: '#FAF8F5' }}>
        {children}
      </body>
    </html>
  );
}
