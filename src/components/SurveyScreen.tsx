
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { UserSession, SurveyResponse } from "@/lib/types";
import { surveyQuestions } from "@/lib/dataService";

interface SurveyScreenProps {
  session: UserSession;
  onComplete: (responses: SurveyResponse[]) => void;
}

const SurveyScreen = ({ session, onComplete }: SurveyScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
  
  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    // Save the response with the correct type
    const newResponse: SurveyResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      response: selectedOption,
      type: currentQuestion.type as 'cognitive' | 'emotional',
    };
    
    setResponses([...responses, newResponse]);
    
    // Move to next question or complete
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete([...responses, newResponse]);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg">
        <CardHeader className="border-b border-calm-100">
          <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>Emotional Assessment</div>
            <div className="text-base font-normal">
              Question {currentQuestionIndex + 1} of {surveyQuestions.length}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="mb-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Think about your experience with <span className="font-medium">{session.productName}</span> as you answer:
            </p>
            
            <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
            
            <RadioGroup value={selectedOption?.toString()} className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    onClick={() => setSelectedOption(index + 1)}
                  />
                  <Label htmlFor={`option-${index}`} className="text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4 pb-6">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setResponses(responses.slice(0, -1));
                setSelectedOption(responses[responses.length - 1]?.response || null);
              }
            }}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6"
          >
            {currentQuestionIndex < surveyQuestions.length - 1 ? "Next Question" : "Complete Survey"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SurveyScreen;
