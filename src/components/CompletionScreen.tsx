
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSession } from "@/lib/types";
import { Clock } from "lucide-react";

interface CompletionScreenProps {
  session: UserSession;
  onFinish: () => void;
}

const CompletionScreen = ({ session, onFinish }: CompletionScreenProps) => {
  const isCompleted = session.completed;
  const nextDate = session.nextSessionDate ? new Date(session.nextSessionDate) : new Date();
  
  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-calm-400 to-healing-400" />
        
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 border-b border-calm-100">
          <CardTitle className="text-center text-2xl">
            {isCompleted 
              ? "Congratulations on Your Progress!" 
              : "Session Complete - Great Job!"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-calm-50 rounded-full mb-4">
              {isCompleted ? (
                <div className="w-16 h-16 text-healing-500">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path d="M8 12l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              ) : (
                <Clock className="w-16 h-16 text-calm-500" />
              )}
            </div>
            
            <h3 className="text-2xl font-medium">
              {isCompleted
                ? "You've Successfully Completed the Program!"
                : "Thank You for Participating"}
            </h3>
            
            <div className="max-w-xl mx-auto text-center">
              {isCompleted ? (
                <div className="space-y-6">
                  <p>
                    You've made incredible progress in managing your emotions related to your experience with {" "}
                    <span className="font-medium">{session.productName}</span>. Your dedication to emotional wellbeing
                    has paid off!
                  </p>
                  
                  <div className="bg-healing-50 rounded-lg p-6 border border-healing-100">
                    <h4 className="font-medium text-lg mb-3 text-healing-700">Your Achievement:</h4>
                    <p className="text-healing-800 mb-4">
                      You've reduced your emotional response from an initial high level to below our threshold,
                      indicating significant improvement in how you process this negative experience.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex flex-col items-center">
                        <div className="text-gray-500">Initial Session</div>
                        <div className="text-red-500 font-bold text-xl">4.2/5</div>
                      </div>
                      <div className="text-gray-300">→</div>
                      <div className="flex flex-col items-center">
                        <div className="text-gray-500">Final Session</div>
                        <div className="text-green-500 font-bold text-xl">2.1/5</div>
                      </div>
                    </div>
                  </div>
                  
                  <p>
                    Remember the techniques you've learned through this process. You can apply expressive
                    writing to other challenging situations in your life.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p>
                    You've completed today's wellbeing session focusing on your experience with {" "}
                    <span className="font-medium">{session.productName}</span>. Your commitment to processing
                    these emotions is a significant step toward improved wellbeing.
                  </p>
                  
                  <div className="bg-calm-50 rounded-lg p-6 border border-calm-100">
                    <h4 className="font-medium text-lg mb-2 text-calm-700">Your Next Session:</h4>
                    <p className="text-calm-800">
                      We've scheduled your follow-up session for:
                    </p>
                    <div className="text-xl font-medium text-calm-600 mt-3">
                      {formatDate(nextDate)}
                    </div>
                  </div>
                  
                  <p>
                    In the meantime, notice any changes in how you think or feel about your experience.
                    Each session builds on the previous one to help you process your emotions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2 pb-8">
          <Button 
            onClick={onFinish}
            className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white px-8"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompletionScreen;
