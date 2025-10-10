// file: src/types/question.ts
export type QuestionItem = {
  id: string;
  question: string;
  intent: string;
  recommended_structure: string[];
  notes_for_interviewer_meaning: string[];
  illegal_question_flag: boolean;
};
