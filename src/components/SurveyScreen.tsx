
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
      setSelectedOption(null); // Reset selection for next question
    } else {
      onComplete([...responses, newResponse]);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-0">
      <Card className="border-calm-100 shadow-lg">
        <CardHeader className="border-b border-calm-100 p-4 sm:p-6">
          <CardTitle className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
            <div className="text-lg sm:text-xl">Emotional Assessment</div>
            <div className="text-sm sm:text-base font-normal text-muted-foreground">
              Question {currentQuestionIndex + 1} of {surveyQuestions.length}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="mb-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Think about your experience with <span className="font-medium">{session.productName}</span> as you answer:
            </p>
            
            <h3 className="text-lg sm:text-xl font-medium mb-6 leading-relaxed">{currentQuestion.question}</h3>
            
            <RadioGroup 
              value={selectedOption?.toString() || ""} 
              onValueChange={(value) => setSelectedOption(parseInt(value) + 1)} 
              className="space-y-3 sm:space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all touch-manipulation">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className="cursor-pointer mt-1 min-h-[20px] min-w-[20px]"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-sm sm:text-base cursor-pointer flex-1 leading-relaxed min-h-[44px] flex items-center"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 sm:h-3" />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 pb-6 p-4 sm:p-6">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setResponses(responses.slice(0, -1));
                // Set the previous response as selected
                const previousResponse = responses[responses.length - 1];
                setSelectedOption(previousResponse ? previousResponse.response : null);
              }
            }}
            disabled={currentQuestionIndex === 0}
            className="w-full sm:w-auto min-h-[48px]"
          >
            Back
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 w-full sm:w-auto min-h-[48px]"
          >
            {currentQuestionIndex < surveyQuestions.length - 1 ? "Next Question" : "Complete Survey"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SurveyScreen;
