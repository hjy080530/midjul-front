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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary};
  padding: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(15rem, 40vw, 35rem);
  font-weight: ${theme.typography.fontWeight.bold};
  color: rgba(255, 255, 255, 0.12);
  user-select: none;
  z-index: 2;
  white-space: nowrap;
  letter-spacing: -0.1em;
  line-height: 0.8;
  overflow: hidden;
`;

const Card = styled(motion.div)`
  background: ${theme.colors.surface};
    background: rgba(255, 255, 255, 0.95);
    padding: ${theme.spacing.xxxl};
  border-radius: ${theme.borderRadius.xxl};
  max-width: 480px;
  width: 100%;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  
  &::before
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
                <Logo>MIDJUL</Logo>
                <Tagline></Tagline>

                <Divider></Divider>

                <GoogleLoginButton />
            </Card>
        </Container>
    );
}