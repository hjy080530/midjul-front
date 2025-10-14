export interface KeywordItem {
    word: string;
    score: number;
    importance: 'high' | 'medium' | 'low';
}

export interface DifficultyWord {
    word: string;
    definition: string;
    level: number;
}

export interface ProcessResponse {
    id: string;
    original_text: string;
    highlighted_html: string;
    highlighted_markdown: string;
    keywords: KeywordItem[];
    difficult_words: DifficultyWord[];
    summary: string;
    processing_time: number;
    created_at: string;
}

export interface DocumentListItem {
    id: string;
    title: string | null;
    summary: string;
    created_at: string;
}

export interface User {
    id: string;
    email?: string;
    nickname?: string;
    profile_image?: string;
}