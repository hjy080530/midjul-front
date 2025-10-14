'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Header from '@/components/Layout/Header';
import HighlightedText from '@/components/Result/HighlightedText';
import Summary from '@/components/Result/Summary';
import { useEffect, useState } from 'react';
import { getDocument } from '@/lib/api';
import { ProcessResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { use } from 'react';  // React.use 추가

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl};
`;

const BackButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.lg};
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary};
    color: white;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
`;

const ProcessingInfo = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [data, setData] = useState<ProcessResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // React.use()로 params 언래핑
    const resolvedParams = use(params);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDocument(resolvedParams.id);
                setData(result);
            } catch (error) {
                console.error(error);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [resolvedParams.id, router]);

    if (loading) {
        return (
            <Container>
                <Header />
                <Main>
                    <LoadingContainer>로딩 중...</LoadingContainer>
                </Main>
            </Container>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Container>
            <Header />
            <Main>
                <BackButton onClick={() => router.push('/dashboard')}>
                    ← 돌아가기
                </BackButton>

                <ProcessingInfo>
                    처리 시간: {data.processing_time.toFixed(2)}초 |
                    생성일: {new Date(data.created_at).toLocaleString('ko-KR')}
                </ProcessingInfo>

                <HighlightedText
                    html={data.highlighted_html}
                    difficultWords={data.difficult_words}
                />

                <Summary
                    summary={data.summary}
                    keywords={data.keywords}
                />
            </Main>
        </Container>
    );
}