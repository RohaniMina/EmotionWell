
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import WelcomeScreen from "@/components/WelcomeScreen";
import ReviewScannerScreen from "@/components/ReviewScannerScreen";
import IntroScreen from "@/components/IntroScreen";
import SurveyScreen from "@/components/SurveyScreen";
import ExpressiveWritingScreen from "@/components/ExpressiveWritingScreen";
import CompletionScreen from "@/components/CompletionScreen";
import DashboardScreen from "@/components/DashboardScreen";
import { UserSession, SurveyResponse } from "@/lib/types";
import { useUserSessions, completeSession } from "@/lib/dataService";
import { useToast } from "@/components/ui/use-toast";

// App flow states
type AppState = 
  | "welcome"
  | "dashboard"
  | "review-scanner"
  | "intro"
  | "survey"
  | "writing"
  | "completion";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);
  const { toast } = useToast();
  
  // Get sessions from our data service
  const { sessions, addSession, updateSession } = useUserSessions();
  
  // Check if there are existing sessions to show dashboard instead of welcome
  useEffect(() => {
    if (sessions.length > 0 && appState === "welcome") {
      setAppState("dashboard");
    }
  }, [sessions, appState]);
  
  // Handler for starting from welcome screen
  const handleStart = () => {
    setAppState("review-scanner");
  };
  
  // Handler for when a review is found
  const handleReviewFound = (session: UserSession) => {
    setCurrentSession(session);
    setAppState("intro");
  };
  
  // Handler for starting a wellbeing session
  const handleStartSession = () => {
    if (currentSession) {
      setAppState("survey");
    }
  };
  
  // Handler for declining a wellbeing session
  const handleDeclineSession = () => {
    setCurrentSession(null);
    if (sessions.length > 0) {
      setAppState("dashboard");
    } else {
      setAppState("welcome");
    }
  };
  
  // Handler for completing the survey
  const handleSurveyComplete = (responses: SurveyResponse[]) => {
    setSurveyResponses(responses);
    setAppState("writing");
  };
  
  // Handler for completing the writing session
  const handleWritingComplete = (text: string) => {
    if (currentSession) {
      // Update the session with the survey and writing data
      const updatedSession = completeSession(currentSession, surveyResponses, text);
      
      // Add or update the session
      if (sessions.some(s => s.id === updatedSession.id)) {
        updateSession(updatedSession);
      } else {
        addSession(updatedSession);
      }
      
      // Update current session for the completion screen
      setCurrentSession(updatedSession);
      setAppState("completion");
      
      if (updatedSession.completed) {
        toast({
          title: "Congratulations!",
          description: "You've successfully completed your wellbeing journey!",
          duration: 5000,
        });
      }
    }
  };
  
  // Handler for finishing the complete process
  const handleFinish = () => {
    setCurrentSession(null);
    setSurveyResponses([]);
    setAppState("dashboard");
  };
  
  // Handler for starting a new session from dashboard
  const handleStartNewSession = () => {
    setAppState("review-scanner");
  };
  
  // Handler for continuing an existing session
  const handleContinueSession = (session: UserSession) => {
    setCurrentSession(session);
    
    if (session.completed) {
      setAppState("completion");
    } else {
      setAppState("survey");
    }
  };
  
  // Render different screens based on app state
  const renderScreen = () => {
    switch (appState) {
      case "welcome":
        return <WelcomeScreen onStart={handleStart} />;
      case "dashboard":
        return (
          <DashboardScreen 
            sessions={sessions}
            onStartNewSession={handleStartNewSession}
            onContinueSession={handleContinueSession}
          />
        );
      case "review-scanner":
        return <ReviewScannerScreen onReviewFound={handleReviewFound} />;
      case "intro":
        return currentSession ? (
          <IntroScreen 
            session={currentSession}
            onStart={handleStartSession}
            onDecline={handleDeclineSession}
          />
        ) : null;
      case "survey":
        return currentSession ? (
          <SurveyScreen 
            session={currentSession}
            onComplete={handleSurveyComplete}
          />
        ) : null;
      case "writing":
        return currentSession ? (
          <ExpressiveWritingScreen 
            session={currentSession}
            onComplete={handleWritingComplete}
          />
        ) : null;
      case "completion":
        return currentSession ? (
          <CompletionScreen 
            session={currentSession}
            onFinish={handleFinish}
          />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };
  
  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
};

export default Index;
