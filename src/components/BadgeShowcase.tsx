
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSession } from "@/lib/types";
import { Trophy, Star, Award, Medal } from "lucide-react";

interface BadgeShowcaseProps {
  sessions: UserSession[];
}

const BadgeShowcase = ({ sessions }: BadgeShowcaseProps) => {
  const completedSessions = sessions.filter(s => s.completed);
  const totalSessions = sessions.length;
  const completionRate = totalSessions > 0 ? (completedSessions.length / totalSessions) * 100 : 0;
  
  // Check for expressive writing badge
  const hasExpressiveWritingBadge = sessions.some(session => 
    session.sessionHistory.some(history => 
      history.expressiveWriting && history.expressiveWriting.length > 500
    )
  );
  
  const getBadgeInfo = () => {
    if (completionRate >= 80) return { 
      variant: "gold" as const, 
      text: "Gold Achiever", 
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      description: "Outstanding commitment to wellbeing!",
      earned: true
    };
    if (completionRate >= 60) return { 
      variant: "silver" as const, 
      text: "Silver Progress", 
      icon: <Medal className="w-8 h-8 text-gray-500" />,
      description: "Great progress on your journey!",
      earned: true
    };
    if (completionRate >= 30) return { 
      variant: "bronze" as const, 
      text: "Bronze Starter", 
      icon: <Award className="w-8 h-8 text-orange-500" />,
      description: "You've taken the first steps!",
      earned: true
    };
    return null;
  };
  
  const completionBadge = getBadgeInfo();
  
  const allBadges = [
    {
      variant: "bronze" as const,
      text: "Bronze Starter",
      icon: <Award className="w-8 h-8 text-orange-500" />,
      description: "Complete 30% of your sessions",
      requirement: "30% completion rate",
      earned: completionRate >= 30
    },
    {
      variant: "silver" as const,
      text: "Silver Progress",
      icon: <Medal className="w-8 h-8 text-gray-500" />,
      description: "Complete 60% of your sessions",
      requirement: "60% completion rate",
      earned: completionRate >= 60
    },
    {
      variant: "gold" as const,
      text: "Gold Achiever",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      description: "Complete 80% of your sessions",
      requirement: "80% completion rate",
      earned: completionRate >= 80
    },
    {
      variant: "writer" as const,
      text: "Expressive Writer",
      icon: <Star className="w-8 h-8 text-purple-500" />,
      description: "Deep emotional expression in writing",
      requirement: "Complete a 10+ minute writing session",
      earned: hasExpressiveWritingBadge
    }
  ];
  
  return (
    <Card className="border-calm-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-calm-50 to-healing-50 rounded-t-lg border-b border-calm-100">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Achievement Badges
        </CardTitle>
        <CardDescription>
          Celebrate your wellbeing journey milestones
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Your Current Progress</h3>
            <div className="text-3xl font-bold text-calm-600 mb-1">
              {Math.round(completionRate)}%
            </div>
            <p className="text-sm text-muted-foreground">
              {completedSessions.length} of {totalSessions} sessions completed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allBadges.map((badge, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.earned 
                    ? 'border-green-200 bg-green-50 shadow-md' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={badge.earned ? '' : 'grayscale'}>
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{badge.text}</h4>
                      {badge.earned && (
                        <Badge variant={badge.variant} className="text-xs">
                          Earned!
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground border-t pt-2">
                  Requirement: {badge.requirement}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-calm-50 p-4 rounded-lg border border-calm-200">
            <h4 className="font-medium mb-2 text-calm-700">🎯 How Badges Work</h4>
            <ul className="text-sm text-calm-600 space-y-1">
              <li>• Complete sessions to unlock achievement badges</li>
              <li>• Special badges reward deep emotional expression</li>
              <li>• Higher completion rates unlock premium badges</li>
              <li>• All badges count toward your Amazon credit rewards</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeShowcase;
