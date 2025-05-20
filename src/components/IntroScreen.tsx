
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserSession } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

interface IntroScreenProps {
  session: UserSession;
  onStart: () => void;
  onDecline: () => void;
}

const IntroScreen = ({ session, onStart, onDecline }: IntroScreenProps) => {
  const [consent, setConsent] = useState(false);
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 rounded-t-lg border-b border-calm-100">
          <CardTitle className="text-xl sm:text-2xl">Taking Control of Your Wellbeing</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-4 text-base space-y-6">
          <p>
            <span className="font-medium">Hello!</span> We've identified that you may be experiencing some 
            frustration or disappointment with your purchase of <span className="font-medium">{session.productName}</span>.
          </p>
          
          <div>
            <h4 className="font-medium mb-2">Your Review Revealed Possible Negative Emotions:</h4>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100 italic text-sm">
              "{session.reviewComment}"
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <h4 className="font-medium mb-2">The Impact of Negative Emotions:</h4>
            <p>
              Research shows that holding onto negative emotions like anger and disappointment can:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Increase stress levels and affect your physical health</li>
              <li>Negatively impact your mood and personal relationships</li>
              <li>Lead to rumination and decreased overall happiness</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Our Approach:</h4>
            <p>
              Through a series of short journaling (expressive writing) sessions, we can help you 
              process these emotions in a healthy way. Each session takes only 15 minutes of your time.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">The Process:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Complete a brief 5-minute emotion assessment</li>
              <li>Engage in 10 minutes of guided expressive writing</li>
              <li>Receive personalized follow-up sessions as needed</li>
            </ol>
          </div>
          
          <div className="bg-calm-50 p-4 rounded-md border border-calm-100">
            <p className="text-calm-800">
              <strong>Research Backed:</strong> Expressive writing has been shown in numerous studies 
              to help people process negative emotions, reduce stress, and improve overall wellbeing.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
            <label
              htmlFor="consent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand that taking control of my emotions can improve my wellbeing, and I want to participate.
            </label>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onDecline}>
            Not Interested
          </Button>
          <Button 
            onClick={onStart}
            disabled={!consent}
            className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white font-medium px-8"
          >
            Begin Wellbeing Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntroScreen;
