'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { KeywordItem } from '@/lib/types';

const Container = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-top: ${theme.spacing.xl};
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.secondary};
`;

const SummaryText = styled.p`
  font-size: ${theme.typography.fontSize.md};
  line-height: 1.8;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const KeywordsSection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
`;

const KeywordsTitle = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const KeywordBadge = styled.span<{ importance: string }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  background: ${({ importance }) => {
    switch (importance) {
        case 'high': return theme.colors.highlight.high;
        case 'medium': return theme.colors.highlight.medium;
        default: return theme.colors.highlight.low;
    }
}};
`;

interface Props {
    summary: string;
    keywords: KeywordItem[];
}

export default function Summary({ summary, keywords }: Props) {
    return (
        <Container>
            <Title>📋 요약</Title>
            <SummaryText>{summary}</SummaryText>

            <KeywordsSection>
                <KeywordsTitle>🔑 주요 키워드</KeywordsTitle>
                <KeywordList>
                    {keywords.slice(0, 10).map((kw, idx) => (
                        <KeywordBadge key={idx} importance={kw.importance}>
                            {kw.word}
                        </KeywordBadge>
                    ))}
                </KeywordList>
            </KeywordsSection>
        </Container>
    );
}