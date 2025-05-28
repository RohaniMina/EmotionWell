
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSession } from "@/lib/types";
import { Clock, Gift, Heart, Lightbulb } from "lucide-react";

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

  const wellbeingTips = [
    "Practice daily meditation for 5-10 minutes",
    "Keep a gratitude journal to focus on positive experiences",
    "Exercise regularly to boost your mood naturally",
    "Practice deep breathing when you feel stressed",
    "Connect with friends and family regularly",
    "Spend time in nature to reduce stress",
    "Limit social media and news consumption",
    "Set healthy boundaries in relationships",
    "Practice mindful eating and stay hydrated",
    "Maintain a consistent sleep schedule"
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-calm-400 to-healing-400" />
        
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 border-b border-calm-100">
          <CardTitle className="text-center text-2xl">
            {isCompleted 
              ? "🎉 Congratulations on Your Amazing Progress!" 
              : "✨ Session Complete - Great Job!"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-calm-50 rounded-full mb-4">
              {isCompleted ? (
                <Gift className="w-16 h-16 text-green-500" />
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
                  
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-center mb-3">
                      <Gift className="w-8 h-8 text-green-600 mr-2" />
                      <h4 className="font-bold text-lg text-green-700">Amazon Credits Earned!</h4>
                    </div>
                    <p className="text-green-800 mb-4">
                      Your Amazon credits will be processed and added to your account within 3-5 business days.
                      Thank you for investing in your wellbeing!
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex flex-col items-center">
                        <div className="text-gray-500">Initial Score</div>
                        <div className="text-red-500 font-bold text-xl">
                          {session.sessionHistory[0]?.angerScore.toFixed(1) || "4.2"}/5
                        </div>
                      </div>
                      <div className="text-gray-300">→</div>
                      <div className="flex flex-col items-center">
                        <div className="text-gray-500">Final Score</div>
                        <div className="text-green-500 font-bold text-xl">{session.angerScore.toFixed(1)}/5</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-healing-50 rounded-lg p-6 border border-healing-200">
                    <div className="flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-healing-600 mr-2" />
                      <h4 className="font-bold text-healing-700">Continue Your Wellbeing Journey</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-healing-800">
                      {wellbeingTips.slice(0, 6).map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <Lightbulb className="w-4 h-4 text-healing-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm">
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
                    <p className="text-sm text-calm-600 mt-2">
                      Complete all sessions to earn your Amazon credits!
                    </p>
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
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompletionScreen;
