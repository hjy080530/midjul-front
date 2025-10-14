'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { DifficultyWord } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';

const Container = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  line-height: 2;
  font-size: ${theme.typography.fontSize.lg};
  position: relative;

  mark {
    padding: 2px 4px;
    border-radius: ${theme.borderRadius.sm};
    cursor: help;
    transition: all 0.2s;
    position: relative;

    &:hover {
      transform: scale(1.05);
      filter: brightness(0.9);
    }

    &.highlight-high {
      background-color: ${theme.colors.highlight.high};
      font-weight: ${theme.typography.fontWeight.semibold};
    }

    &.highlight-medium {
      background-color: ${theme.colors.highlight.medium};
      font-weight: ${theme.typography.fontWeight.medium};
    }

    &.highlight-low {
      background-color: ${theme.colors.highlight.low};
    }
  }

  .difficult {
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-color: ${theme.colors.error};
    cursor: help;
  }
`;

const Tooltip = styled.div<{ x: number; y: number; visible: boolean }>`
    position: fixed;
    left: ${({ x }) => x}px;
    top: ${({ y }) => y}px;
    transform: translate(-50%, calc(-100% - 15px));
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;ㄹㄹ
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.sm};
    max-width: 350px;
    min-width: 200px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 99999;
    pointer-events: none;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
    border: 2px solid rgba(255, 255, 255, 0.2);

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-top-color: #667eea;
    }
`;

const TooltipWord = styled.div`
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.md};
    color: #FFD700;
`;

const TooltipDefinition = styled.div`
    line-height: 1.5;
    font-size: ${theme.typography.fontSize.sm};
    word-break: keep-all;
`;

const TooltipScore = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.9;
  text-align: right;
  font-weight: ${theme.typography.fontWeight.medium};
`;

const TooltipSource = styled.div`
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.xs};
  opacity: 0.7;
  text-align: right;
  font-style: italic;
`;

interface Props {
    html: string;
    difficultWords: DifficultyWord[];
}

interface TooltipData {
    word: string;
    definition: string;
    score: string;
    x: number;
    y: number;
}

export default function HighlightedText({ html, difficultWords }: Props) {
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('keyword-tooltip')) {
                const word = target.getAttribute('data-word') || '';
                const definition = target.getAttribute('data-definition') || '';
                const score = target.getAttribute('data-score') || '';

                const rect = target.getBoundingClientRect();

                setTooltip({
                    word,
                    definition,
                    score,
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                });

                console.log('🔍 툴팁 표시:', {
                    word,
                    definition: definition.substring(0, 50) + '...',
                    fullLength: definition.length
                });
            }
            else if (target.classList.contains('difficult')) {
                const word = target.textContent || '';
                const difficulty = difficultWords.find(dw => dw.word === word);

                if (difficulty) {
                    const rect = target.getBoundingClientRect();

                    setTooltip({
                        word: difficulty.word,
                        definition: difficulty.definition,
                        score: `난이도: ${difficulty.level}/5`,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                    });
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('keyword-tooltip') ||
                target.classList.contains('difficult')) {
                setTooltip(null);
            }
        };

        container.addEventListener('mouseover', handleMouseOver);
        container.addEventListener('mouseout', handleMouseOut);

        return () => {
            container.removeEventListener('mouseover', handleMouseOver);
            container.removeEventListener('mouseout', handleMouseOut);
        };
    }, [difficultWords]);

    return (
        <>
            <Container
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: html }}
            />

            {tooltip && (
                <Tooltip x={tooltip.x} y={tooltip.y} visible={true}>
                    <TooltipWord>📖 {tooltip.word}</TooltipWord>
                    <TooltipDefinition>{tooltip.definition}</TooltipDefinition>
                    {tooltip.score && (
                        <>
                            <TooltipScore>
                                {tooltip.score.startsWith('난이도')
                                    ? `⚠️ ${tooltip.score}`
                                    : `⭐ 중요도: ${(parseFloat(tooltip.score) * 100).toFixed(0)}%`}
                            </TooltipScore>
                            {!tooltip.score.startsWith('난이도') && (
                                <TooltipSource>출처: 국립국어원 표준국어대사전</TooltipSource>
                            )}
                        </>
                    )}
                </Tooltip>
            )}
        </>
    );
}