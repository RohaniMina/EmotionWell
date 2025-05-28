
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff } from "lucide-react";
import { UserSession } from "@/lib/types";

interface ExpressiveWritingScreenProps {
  session: UserSession;
  onComplete: (text: string) => void;
}

const ExpressiveWritingScreen = ({ session, onComplete }: ExpressiveWritingScreenProps) => {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showEncouragement, setShowEncouragement] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Handle timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);
  
  // Monitor for inactivity
  useEffect(() => {
    if (!isActive) return;
    
    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 30000) { // 30 seconds
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 5000);
        setLastActivity(Date.now()); // Reset to avoid continuous encouragement
      }
    }, 5000);
    
    return () => clearInterval(checkInactivity);
  }, [isActive, lastActivity]);
  
  // Handle text changes to track activity
  const handleTextChange = (newText: string) => {
    setText(newText);
    setLastActivity(Date.now());
    setShowEncouragement(false);
  };
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = 100 - ((timeRemaining / (10 * 60)) * 100);
  
  // Enhanced speech-to-text function
  const toggleSpeechToText = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Safari.');
      return;
    }

    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsRecording(true);
          setIsActive(true);
          setLastActivity(Date.now());
        };
        
        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            setText(prev => prev + finalTranscript);
            setLastActivity(Date.now());
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognitionRef.current = recognition;
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        alert('Failed to start speech recognition. Please try again or use the text input.');
      }
    }
  };
  
  const handleStart = () => {
    setIsActive(true);
    setLastActivity(Date.now());
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };
  
  const handleComplete = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    onComplete(text);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const encouragementMessages = [
    "Keep exploring your feelings about this experience...",
    "What else comes to mind when you think about this situation?",
    "How did this experience make you feel? Continue expressing...",
    "You're doing great! Keep writing about your thoughts and emotions...",
    "What impact did this experience have on you? Continue sharing..."
  ];
  
  const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 rounded-t-lg border-b border-calm-100">
          <CardTitle>Expressive Writing Session</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 pb-4">
          {!isActive ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Ready to express yourself?</h3>
                <p className="text-muted-foreground mb-4">
                  In this 10-minute writing exercise, you'll have the opportunity to freely express your thoughts 
                  and feelings about your experience with <span className="font-medium">{session.productName}</span>.
                </p>
                
                <div className="bg-calm-50 p-4 rounded-md border border-calm-100 mb-4">
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Write continuously for the full 10 minutes</li>
                    <li>Focus on both your thoughts AND feelings about the experience</li>
                    <li>Don't worry about spelling, grammar, or organization</li>
                    <li>Be completely honest and open in your writing</li>
                    <li>This is for your wellbeing - your responses are private and confidential</li>
                  </ul>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  You can either type your thoughts or use the speech-to-text feature to speak them aloud.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleStart}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8"
                >
                  Begin Writing Session
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Write about your experience with {session.productName}
                </h3>
                <div className="text-lg font-mono">{formatTime(timeRemaining)}</div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Express both your thoughts and feelings freely. Don't worry about typos or grammar.
              </p>
              
              {showEncouragement && (
                <div className="bg-healing-50 border border-healing-200 rounded-lg p-3 animate-fade-in">
                  <p className="text-healing-700 text-sm font-medium">
                    💡 {randomEncouragement}
                  </p>
                </div>
              )}
              
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Start writing or click the microphone button to speak..."
                  className="min-h-[200px] p-4 resize-y focus:border-calm-300 focus:ring focus:ring-calm-200 focus:ring-opacity-50"
                />
                
                <Button
                  type="button"
                  onClick={toggleSpeechToText}
                  variant="outline"
                  size="icon"
                  className={`absolute bottom-3 right-3 ${isRecording ? 'bg-red-100 text-red-500 border-red-200 animate-pulse' : ''}`}
                  title={isRecording ? "Stop recording" : "Start voice input"}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Time remaining</span>
                  <span>{Math.round(progressPercentage)}% complete</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="text-sm text-muted-foreground italic">
                {text.length < 50 ? (
                  "Start writing about how this experience made you feel..."
                ) : text.length < 200 ? (
                  "Good start! Try to go deeper into your emotions and thoughts..."
                ) : (
                  "Great expression! Continue exploring your feelings about this experience..."
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        {isActive && (
          <CardFooter className="flex justify-end pt-2 pb-6">
            <Button 
              onClick={handleComplete}
              disabled={text.length < 50 || timeRemaining > 9 * 60}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6"
            >
              {timeRemaining === 0 ? "Finish Session" : "Complete Early"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ExpressiveWritingScreen;
