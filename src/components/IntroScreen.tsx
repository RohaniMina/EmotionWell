
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserSession } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight, Gift, Heart, BookOpen, Trophy } from "lucide-react";

interface IntroScreenProps {
  session: UserSession;
  onStart: () => void;
  onDecline: () => void;
}

const IntroScreen = ({ session, onStart, onDecline }: IntroScreenProps) => {
  const [consent, setConsent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      icon: <Heart className="w-12 h-12 text-healing-500" />,
      title: "Taking Control of Your Wellbeing",
      content: (
        <div className="space-y-4">
          <p className="text-center">
            We've identified that you may be experiencing frustration with <span className="font-medium">{session.productName}</span>.
          </p>
          <div className="bg-gray-50 p-3 rounded-md border italic text-sm">
            "{session.reviewComment.substring(0, 150)}..."
          </div>
          <p className="text-sm text-center">
            Let's help you process these emotions for better wellbeing.
          </p>
        </div>
      )
    },
    {
      icon: <Gift className="w-12 h-12 text-green-500" />,
      title: "Earn Amazon Credits",
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-700 mb-2">🎁 Reward for Completion</h4>
            <p className="text-green-800">
              Complete all your wellbeing sessions and receive <span className="font-bold">Amazon credits</span> directly to your account!
            </p>
          </div>
          <p className="text-sm">
            Your emotional wellness journey is valuable - we believe in rewarding your commitment to better health.
          </p>
        </div>
      )
    },
    {
      icon: <BookOpen className="w-12 h-12 text-calm-500" />,
      title: "Research-Backed Approach",
      content: (
        <div className="space-y-4">
          <div className="bg-calm-50 p-4 rounded-lg border border-calm-200">
            <h4 className="font-medium mb-2">Why Expressive Writing Works:</h4>
            <ul className="text-sm space-y-2">
              <li>• Reduces stress and improves mood</li>
              <li>• Helps process negative emotions</li>
              <li>• Proven effective in psychological studies</li>
              <li>• Takes only 15 minutes of your time</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      title: "Earn Achievement Badges",
      content: (
        <div className="space-y-4 text-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <div className="text-orange-600 font-bold">🥉 Bronze</div>
              <div className="text-xs">30% completion</div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-gray-600 font-bold">🥈 Silver</div>
              <div className="text-xs">60% completion</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <div className="text-yellow-600 font-bold">🥇 Gold</div>
              <div className="text-xs">80% completion</div>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <div className="text-purple-600 font-bold">✍️ Writer</div>
              <div className="text-xs">Deep expression</div>
            </div>
          </div>
          <p className="text-sm">Track your progress and earn recognition!</p>
        </div>
      )
    }
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-calm-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 rounded-t-lg border-b border-calm-100">
          <CardTitle className="text-xl sm:text-2xl text-center">Your Wellbeing Journey Starts Here</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 pb-4">
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="text-center space-y-6 min-h-[300px] flex flex-col justify-center">
                    <div className="flex justify-center">
                      {slide.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{slide.title}</h3>
                    {slide.content}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="flex items-center space-x-2 mt-6">
            <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
            <label
              htmlFor="consent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand the benefits and want to participate in this wellbeing program to earn Amazon credits.
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
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8"
          >
            Begin Wellbeing Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntroScreen;
