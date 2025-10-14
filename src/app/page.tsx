'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import GoogleLoginButton from '@/components/Auth/GoogleLoginButton';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${theme.colors.primary} 0%, 
    ${theme.colors.primaryLight} 50%,
    ${theme.colors.secondary} 100%
  );
  padding: ${theme.spacing.lg};
`;

const Card = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xxxl};
  border-radius: ${theme.borderRadius.xxl};
  box-shadow: ${theme.shadows.xl};
  max-width: 480px;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: ${theme.typography.fontSize.huge};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: ${theme.spacing.xl} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.sm};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${theme.colors.accent};
    border-radius: ${theme.borderRadius.full};
    flex-shrink: 0;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xl} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.border};
  }
  
  span {
    padding: 0 ${theme.spacing.md};
    color: ${theme.colors.text.light};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push('/dashboard');
            }
        };
        checkSession();
    }, [router]);

    return (
        <Container>
            <Card
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Logo>믿줄</Logo>
                <Tagline>중요한 내용을 자동으로 하이라이팅하고 요약합니다</Tagline>

                <FeatureList>
                    <FeatureItem>AI 기반 키워드 자동 추출</FeatureItem>
                    <FeatureItem>텍스트 & PDF 지원</FeatureItem>
                    <FeatureItem>어려운 용어 자동 설명</FeatureItem>
                    <FeatureItem>핵심 내용 요약</FeatureItem>
                </FeatureList>

                <Divider>
                    <span>시작하기</span>
                </Divider>

                <GoogleLoginButton />
            </Card>
        </Container>
    );
}