export const theme = {
    colors: {
        // 주요 색상 - 차분한 네이비/베이지
        primary: '#2C3E50',          // 깊은 네이비
        primaryLight: '#34495E',     // 밝은 네이비
        primaryDark: '#1A252F',      // 어두운 네이비

        secondary: '#95A5A6',        // 차분한 그레이
        accent: '#E8DCC4',           // 따뜻한 베이지
        accentDark: '#D4C5A9',       // 진한 베이지

        // 배경
        background: '#F5F6F7',       // 연한 그레이
        surface: '#FFFFFF',
        surfaceHover: '#FAFAFA',

        // 텍스트
        text: {
            primary: '#2C3E50',
            secondary: '#5D6D7E',
            light: '#95A5A6',
            white: '#FFFFFF',
        },

        // 하이라이트 - 차분한 톤
        highlight: {
            high: '#FFE8A3',           // 부드러운 노란색
            medium: '#B8D4E8',         // 차분한 하늘색
            low: '#E8E8E8',            // 연한 회색
        },

        // 상태 색상
        success: '#52A675',          // 차분한 녹색
        error: '#C85250',            // 차분한 빨강
        warning: '#D4A574',          // 차분한 주황
        info: '#5499C7',             // 차분한 파랑

        // 테두리
        border: '#E1E4E8',
        borderHover: '#BDC3C7',
    },

    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
    },

    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        full: '9999px',
    },

    shadows: {
        sm: '0 1px 3px rgba(44, 62, 80, 0.08)',
        md: '0 4px 6px rgba(44, 62, 80, 0.1)',
        lg: '0 10px 20px rgba(44, 62, 80, 0.12)',
        xl: '0 20px 40px rgba(44, 62, 80, 0.15)',
    },

    typography: {
        fontFamily: {
            sans: '-apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif',
            serif: '"Noto Serif KR", Georgia, serif',
            mono: '"JetBrains Mono", "Fira Code", monospace',
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px',
            xxl: '24px',
            xxxl: '32px',
            huge: '48px',
        },
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
            loose: 2,
        },
    },
};

export type Theme = typeof theme;