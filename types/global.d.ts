declare global {
  export interface FormResponseState {
    ok: boolean;
    error: string;
    data?: T | null;
  }

  export interface ValidationError extends Error {
    validationErrors?: Record<string, boolean>;
  }

  export interface Photo {
    id: number;
    author: string;
    title: string;
    date: string;
    src: string;
    peso: string;
    idade: string;
    acessos: string;
    total_comments: string;
  }

  export interface Comment {
    comment_ID: string;
    comment_post_ID: string;
    comment_author: string;
    comment_content: string;
  }
}

export {};
