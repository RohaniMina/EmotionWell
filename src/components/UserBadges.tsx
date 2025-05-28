
import { Badge } from "@/components/ui/badge";
import { UserSession } from "@/lib/types";

interface UserBadgesProps {
  sessions: UserSession[];
}

const UserBadges = ({ sessions }: UserBadgesProps) => {
  const completedSessions = sessions.filter(s => s.completed);
  const totalSessions = sessions.length;
  const completionRate = totalSessions > 0 ? (completedSessions.length / totalSessions) * 100 : 0;
  
  // Check for expressive writing badge (user completed 10+ minutes of writing)
  const hasExpressiveWritingBadge = sessions.some(session => 
    session.sessionHistory.some(history => 
      history.expressiveWriting && history.expressiveWriting.length > 500 // Assuming ~500 chars = good engagement
    )
  );
  
  const getBadgeForCompletion = () => {
    if (completionRate >= 80) return { variant: "gold" as const, text: "Gold Achiever" };
    if (completionRate >= 60) return { variant: "silver" as const, text: "Silver Progress" };
    if (completionRate >= 30) return { variant: "bronze" as const, text: "Bronze Starter" };
    return null;
  };
  
  const completionBadge = getBadgeForCompletion();
  
  return (
    <div className="flex gap-2 flex-wrap">
      {completionBadge && (
        <Badge variant={completionBadge.variant}>
          {completionBadge.text}
        </Badge>
      )}
      {hasExpressiveWritingBadge && (
        <Badge variant="writer">
          Expressive Writer
        </Badge>
      )}
      {completedSessions.length > 0 && (
        <Badge variant="secondary">
          {completedSessions.length} Sessions Completed
        </Badge>
      )}
    </div>
  );
};

export default UserBadges;
