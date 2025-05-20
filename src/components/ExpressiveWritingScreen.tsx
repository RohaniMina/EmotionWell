
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = 100 - ((timeRemaining / (10 * 60)) * 100);
  
  // Mock speech-to-text function
  const toggleSpeechToText = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, we would stop the speech recognition here
    } else {
      setIsRecording(true);
      setIsActive(true);
      // In a real app, we would start speech recognition and append to text
      
      // For demo: Simulate speech recognition by adding text periodically
      const phrases = [
        " I was really disappointed when I received this product. ",
        " It didn't work as advertised and the quality was poor. ",
        " I felt like I wasted my money and time. ",
        " The customer service wasn't helpful either. ",
        " I wish companies would be more honest about their products. "
      ];
      
      let phraseIndex = 0;
      const speechInterval = setInterval(() => {
        if (phraseIndex < phrases.length && isRecording) {
          setText(prev => prev + phrases[phraseIndex]);
          phraseIndex++;
        } else {
          clearInterval(speechInterval);
          setIsRecording(false);
        }
      }, 5000);
    }
  };
  
  const handleStart = () => {
    setIsActive(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };
  
  const handleComplete = () => {
    onComplete(text);
  };
  
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
                  className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white px-8"
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
              
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start writing or click the microphone button to speak..."
                  className="min-h-[200px] p-4 resize-y focus:border-calm-300 focus:ring focus:ring-calm-200 focus:ring-opacity-50"
                />
                
                <Button
                  type="button"
                  onClick={toggleSpeechToText}
                  variant="outline"
                  size="icon"
                  className={`absolute bottom-3 right-3 ${isRecording ? 'bg-red-100 text-red-500 border-red-200' : ''}`}
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
              className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white"
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
