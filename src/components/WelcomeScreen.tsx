
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-calm-600 to-healing-600 bg-clip-text text-transparent">
          Transform Negative Product Experiences into Personal Growth
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Our research-backed approach helps you process negative emotions and move toward better wellbeing.
        </p>
      </div>
      
      <Card className="w-full max-w-3xl border-calm-100 shadow-lg hover:shadow-xl transition-all-300">
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 rounded-t-lg border-b border-calm-100">
          <CardTitle>Feeling disappointed or angry about a product purchase?</CardTitle>
          <CardDescription>
            Many consumers experience lingering negative emotions after unsatisfactory purchases
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p>
              When we have negative experiences with products or services, we often hold onto those 
              negative emotions - which can affect our wellbeing and mental health over time.
            </p>
            
            {expanded && (
              <div className="space-y-4 animate-fade-in">
                <div className="rounded-lg bg-calm-50 p-4 border border-calm-100">
                  <h4 className="font-medium text-lg mb-2 text-calm-700">How it works:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-calm-800">
                    <li>Share your negative product experience</li>
                    <li>Complete a brief emotional assessment</li>
                    <li>Engage in guided expressive writing sessions</li>
                    <li>Track your progress over time with weekly check-ins</li>
                    <li>Experience improved emotional wellbeing</li>
                  </ol>
                </div>
                
                <div className="rounded-lg bg-healing-50 p-4 border border-healing-100">
                  <h4 className="font-medium text-lg mb-2 text-healing-700">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-2 text-healing-800">
                    <li>Process and release negative emotions</li>
                    <li>Reduce stress and rumination</li>
                    <li>Gain perspective on negative experiences</li>
                    <li>Improve overall emotional wellbeing</li>
                    <li>Develop healthy coping strategies</li>
                  </ul>
                </div>
              </div>
            )}
            
            <Button
              variant="link"
              onClick={() => setExpanded(!expanded)}
              className="p-0 text-calm-600 hover:text-calm-700"
            >
              {expanded ? "Show less" : "Learn more"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white font-medium rounded-full px-8"
          >
            Begin Your Wellbeing Journey
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white/70 rounded-lg shadow p-6 text-center">
          <div className="w-12 h-12 bg-calm-100 text-calm-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold">1</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Research-Based</h3>
          <p className="text-muted-foreground">
            Our approach is based on proven expressive writing techniques studied by psychologists.
          </p>
        </div>
        
        <div className="bg-white/70 rounded-lg shadow p-6 text-center">
          <div className="w-12 h-12 bg-calm-100 text-calm-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold">2</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Confidential</h3>
          <p className="text-muted-foreground">
            Your writings and emotional data are private and stored securely.
          </p>
        </div>
        
        <div className="bg-white/70 rounded-lg shadow p-6 text-center">
          <div className="w-12 h-12 bg-calm-100 text-calm-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold">3</span>
          </div>
          <h3 className="text-lg font-medium mb-2">Transformative</h3>
          <p className="text-muted-foreground">
            Users report significant reductions in negative emotions after completing our program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
