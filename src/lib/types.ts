
export interface UserSession {
  id: string;
  productName: string;
  reviewComment: string;
  angerScore: number;
  currentSessionNumber: number;
  completed: boolean;
  sessionHistory: SessionHistory[];
  nextSessionDate?: Date;
}

export interface SessionHistory {
  sessionNumber: number;
  date: Date;
  angerScore: number;
  surveyResponses: SurveyResponse[];
  expressiveWriting: string;
}

export interface SurveyResponse {
  questionId: number;
  question: string;
  response: number;
  type: 'cognitive' | 'emotional';
}

export interface SurveyQuestion {
  id: number;
  question: string;
  type: 'cognitive' | 'emotional';
  options: string[];
}
