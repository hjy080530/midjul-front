import type { Metadata } from 'next';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: '믿줄 - AI 텍스트 하이라이팅',
    description: '중요한 내용을 자동으로 하이라이팅하고 요약해드립니다',
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