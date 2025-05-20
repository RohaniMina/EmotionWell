
import { useState, useEffect } from 'react';
import { UserSession, SessionHistory, SurveyResponse } from './types';

// Local storage key for user sessions
const USER_SESSIONS_KEY = 'emotion_well_sessions';

// Get sessions from local storage
const getStoredSessions = (): UserSession[] => {
  const storedData = localStorage.getItem(USER_SESSIONS_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Save sessions to local storage
const saveSessions = (sessions: UserSession[]) => {
  localStorage.setItem(USER_SESSIONS_KEY, JSON.stringify(sessions));
};

// Calculate anger score from survey responses
export const calculateAngerScore = (responses: SurveyResponse[]): number => {
  if (responses.length === 0) return 0;
  
  // Calculate average score, focusing more on emotional responses
  const emotionalResponses = responses.filter(r => r.type === 'emotional');
  const cognitiveResponses = responses.filter(r => r.type === 'cognitive');
  
  const emotionalWeight = 0.7; // 70% weight to emotional responses
  const cognitiveWeight = 0.3; // 30% weight to cognitive responses
  
  const emotionalAvg = emotionalResponses.reduce((sum, r) => sum + r.response, 0) / 
                      (emotionalResponses.length || 1);
  
  const cognitiveAvg = cognitiveResponses.reduce((sum, r) => sum + r.response, 0) / 
                      (cognitiveResponses.length || 1);
  
  return (emotionalAvg * emotionalWeight) + (cognitiveAvg * cognitiveWeight);
};

// Create a new session
export const createSession = (
  productName: string, 
  reviewComment: string, 
  initialAngerScore = 0
): UserSession => {
  return {
    id: Date.now().toString(),
    productName,
    reviewComment,
    angerScore: initialAngerScore,
    currentSessionNumber: 1,
    completed: false,
    sessionHistory: [],
  };
};

// Save a completed session
export const completeSession = (
  session: UserSession, 
  surveyResponses: SurveyResponse[], 
  expressiveWriting: string
): UserSession => {
  const angerScore = calculateAngerScore(surveyResponses);
  
  const newHistory: SessionHistory = {
    sessionNumber: session.currentSessionNumber,
    date: new Date(),
    angerScore,
    surveyResponses,
    expressiveWriting,
  };
  
  const updatedSession: UserSession = {
    ...session,
    angerScore,
    sessionHistory: [...session.sessionHistory, newHistory],
  };

  // Determine if more sessions are needed
  if (angerScore < 2.5) {
    updatedSession.completed = true;
  } else {
    updatedSession.currentSessionNumber += 1;
    // Schedule next session for one week from now
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);
    updatedSession.nextSessionDate = nextDate;
  }

  return updatedSession;
};

// Custom hook to work with user sessions
export const useUserSessions = () => {
  const [sessions, setSessions] = useState<UserSession[]>([]); 
  
  // Load sessions on first render
  useEffect(() => {
    setSessions(getStoredSessions());
  }, []);
  
  // Save whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      saveSessions(sessions);
    }
  }, [sessions]);

  const addSession = (session: UserSession) => {
    setSessions(prev => [...prev, session]);
  };

  const updateSession = (updatedSession: UserSession) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => 
      prev.filter(session => session.id !== sessionId)
    );
  };

  const getSession = (sessionId: string): UserSession | undefined => {
    return sessions.find(session => session.id === sessionId);
  };

  return {
    sessions,
    addSession,
    updateSession,
    deleteSession,
    getSession
  };
};

// Survey questions for the wellbeing app
export const surveyQuestions = [
  {
    id: 1,
    question: "How often do you find yourself thinking about your negative experience with this product?",
    type: "cognitive",
    options: ["Rarely", "Occasionally", "Sometimes", "Often", "Very frequently"]
  },
  {
    id: 2,
    question: "How angry do you feel when recalling your experience with this product?",
    type: "emotional",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 3,
    question: "To what extent do you blame the company for your negative experience?",
    type: "cognitive",
    options: ["Not at all", "Slightly", "Moderately", "Considerably", "Entirely"]
  },
  {
    id: 4,
    question: "How frustrated do you feel about not getting what you expected from this purchase?",
    type: "emotional",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 5,
    question: "How often do you want to warn others about this product?",
    type: "cognitive",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 6,
    question: "How disappointed do you feel about this purchase?",
    type: "emotional",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 7,
    question: "To what extent do you think about getting compensation or revenge?",
    type: "cognitive",
    options: ["Not at all", "Slightly", "Moderately", "Considerably", "Extensively"]
  },
  {
    id: 8,
    question: "How betrayed do you feel by this company?",
    type: "emotional",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 9,
    question: "How much do you dwell on the money you lost on this purchase?",
    type: "cognitive",
    options: ["Not at all", "Slightly", "Moderately", "Considerably", "Extensively"]
  },
  {
    id: 10,
    question: "How tense do you feel when thinking about this experience?",
    type: "emotional",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  }
];
