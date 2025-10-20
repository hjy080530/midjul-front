import type { Metadata } from 'next';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: 'midjul',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body>
        <GlobalStyles />
        {children}
        <Toaster position="top-right" />
        </body>
        </html>
    );
}