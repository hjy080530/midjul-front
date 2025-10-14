'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
`;

const LoadingText = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
`;

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('🔄 OAuth 콜백 처리 중...');

                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('❌ 세션 가져오기 실패:', error);
                    router.push('/');
                    return;
                }

                if (session) {
                    console.log('✅ 로그인 성공:', {
                        user: session.user.email,
                        token: session.access_token ? '있음' : '없음'
                    });

                    // 세션이 제대로 설정될 때까지 잠시 대기
                    await new Promise(resolve => setTimeout(resolve, 500));

                    router.push('/dashboard');
                } else {
                    console.warn('⚠️ 세션 없음');
                    router.push('/');
                }
            } catch (error) {
                console.error('❌ 콜백 처리 중 오류:', error);
                router.push('/');
            }
        };

        handleCallback();
    }, [router]);

    return (
        <Container>
            <LoadingText>로그인 처리 중...</LoadingText>
        </Container>
    );
}