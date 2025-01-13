type PriorityType = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type KeywordBase = {
    word: string;
    priority: PriorityType;
   
};
export type KeywordType = {
    id: bigint;
    created_at: Date;
    active: boolean;
} & KeywordSubmitType;

export type KeywordSubmitType = {
    active: boolean | null;
} & KeywordBase;

export type KeywordUpdateType = {
    id: number;
} & KeywordSubmitType;