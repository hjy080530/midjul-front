'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { supabase, logout } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import toast from 'react-hot-toast';

const HeaderContainer = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.shadows.sm};
`;

const Logo = styled.h1`
  font-size: ${theme.typography.fontSize.xxl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.secondary};
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const LogoutButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.error};
  color: white;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser({
                    id: user.id,
                    email: user.email,
                    nickname: user.user_metadata?.name || user.email?.split('@')[0],
                    profile_image: user.user_metadata?.avatar_url,
                });
            }
        };

        fetchUser();

        // 인증 상태 구독
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
                router.push('/');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('로그아웃되었습니다');
            router.push('/');
        } catch (error) {
            toast.error('로그아웃 실패');
        }
    };

    return (
        <HeaderContainer>
            <Logo onClick={() => router.push('/dashboard')}>믿줄</Logo>
            {user && (
                <UserInfo>
                    {user.profile_image && <ProfileImage src={user.profile_image} alt="프로필" />}
                    <UserName>{user.nickname}</UserName>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </UserInfo>
            )}
        </HeaderContainer>
    );
}