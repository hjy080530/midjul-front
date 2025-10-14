'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Header from '@/components/Layout/Header';
import { useEffect, useState } from 'react';
import { getDocuments, deleteDocument } from '@/lib/api';
import { DocumentListItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  margin-bottom: ${theme.spacing.xl};
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const DocumentCard = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const DocumentTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
`;

const DocumentSummary = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DocumentDate = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.light};
`;

const BackButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.secondary};
  }
`;

export default function DocumentsPage() {
    const router = useRouter();
    const [documents, setDocuments] = useState<DocumentListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data);
            } catch (error) {
                console.error(error);
                toast.error('문서 목록을 불러올 수 없습니다');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) {
        return (
            <Container>
                <Header />
                <Main>로딩 중...</Main>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Main>
                <BackButton onClick={() => router.push('/dashboard')}>
                    ← 돌아가기
                </BackButton>

                <Title>📚 내 문서</Title>

                {documents.length === 0 ? (
                    <p>아직 문서가 없습니다.</p>
                ) : (
                    <DocumentGrid>
                        {documents.map((doc) => (
                            <DocumentCard
                                key={doc.id}
                                onClick={() => router.push(`/result/${doc.id}`)}
                            >
                                <DocumentTitle>{doc.title || '제목 없음'}</DocumentTitle>
                                <DocumentSummary>{doc.summary}</DocumentSummary>
                                <DocumentDate>
                                    {new Date(doc.created_at).toLocaleDateString('ko-KR')}
                                </DocumentDate>
                            </DocumentCard>
                        ))}
                    </DocumentGrid>
                )}
            </Main>
        </Container>
    );
}