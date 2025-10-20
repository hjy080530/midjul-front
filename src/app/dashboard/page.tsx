'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Header from '@/components/Layout/Header';
import TextInput from '@/components/Input/TextInput';
import PDFUpload from '@/components/Input/PDFUpload';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.xxxl};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text.primary};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${({ active }) => active ? theme.colors.secondary : theme.colors.surface};
  color: ${({ active }) => active ? 'white' : theme.colors.text.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DocumentsLink = styled.button`
  display: block;
  margin: ${theme.spacing.xl} auto 0;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.surface};
  color: ${theme.colors.secondary};
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.secondary};
    color: white;
  }
`;

export default function Dashboard() {
    const [tab, setTab] = useState<'text' | 'pdf'>('text');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            console.log('🔐 Dashboard 세션 확인:', {
                session: session ? '있음' : '없음',
                user: session?.user?.email,
                token: session?.access_token ? '있음' : '없음',
                error
            });

            if (!session) {
                console.warn('⚠️ 세션 없음 - 로그인 페이지로 이동');
                router.push('/');
            }
        };

        checkAuth();

        // 인증 상태 구독
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('🔄 Auth 상태 변경:', event, session?.user?.email);

            if (event === 'SIGNED_OUT') {
                router.push('/');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);


    return (
        <Container>
            <Header />
            <Main>
                <Title>무엇을 분석할까요?</Title>

                <TabContainer>
                    <Tab active={tab === 'text'} onClick={() => setTab('text')}>
                        텍스트 입력
                    </Tab>
                    <Tab active={tab === 'pdf'} onClick={() => setTab('pdf')}>
                        PDF 업로드
                    </Tab>
                </TabContainer>

                <ContentContainer>
                    {tab === 'text' ? <TextInput /> : <PDFUpload />}
                </ContentContainer>

                <DocumentsLink onClick={() => router.push('/documents')}>
                    📚 내 문서 보기
                </DocumentsLink>
            </Main>
        </Container>
    );
}