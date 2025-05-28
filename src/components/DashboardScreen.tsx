
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSession } from "@/lib/types";
import UserBadges from "./UserBadges";
import BadgeShowcase from "./BadgeShowcase";

interface DashboardScreenProps {
  sessions: UserSession[];
  onStartNewSession: () => void;
  onContinueSession: (session: UserSession) => void;
}

const DashboardScreen = ({ sessions, onStartNewSession, onContinueSession }: DashboardScreenProps) => {
  const pendingSessions = sessions.filter(s => !s.completed);
  const completedSessions = sessions.filter(s => s.completed);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Your Wellbeing Dashboard</h2>
          <p className="text-muted-foreground mt-1">Track and manage your emotional wellbeing sessions</p>
          {sessions.length > 0 && (
            <div className="mt-3">
              <UserBadges sessions={sessions} />
            </div>
          )}
        </div>
        
        <Button 
          onClick={onStartNewSession}
          className="bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          Start New Journey
        </Button>
      </div>
      
      {sessions.length > 0 && (
        <BadgeShowcase sessions={sessions} />
      )}
      
      {sessions.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="py-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-calm-100 p-4">
                <svg className="w-8 h-8 text-calm-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">No Sessions Yet</h3>
              <p className="text-muted-foreground max-w-md">
                Start your first wellbeing journey by identifying a negative product experience you'd like to process.
                Earn Amazon credits and achievement badges!
              </p>
              <Button 
                onClick={onStartNewSession}
                className="bg-green-600 hover:bg-green-700 text-white font-bold mt-2"
              >
                Begin Your First Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active sessions */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Active Journeys</h3>
            
            {pendingSessions.length === 0 ? (
              <Card className="border-dashed border bg-muted/50">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">No active sessions at the moment</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-calm-400 to-calm-500" />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{session.productName}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {session.reviewComment.substring(0, 100)}
                        {session.reviewComment.length > 100 ? '...' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Next Session</div>
                          <div className="font-medium">
                            {session.nextSessionDate 
                              ? formatDate(session.nextSessionDate) 
                              : "Not scheduled"}
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="text-muted-foreground">Current Progress</div>
                          <div className="font-medium">Session {session.currentSessionNumber}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => onContinueSession(session)}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold"
                        >
                          Continue Journey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Completed sessions */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Completed Journeys</h3>
            
            {completedSessions.length === 0 ? (
              <Card className="border-dashed border bg-muted/50">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">No completed journeys yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-healing-400 to-healing-500" />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{session.productName}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        Completed in {session.sessionHistory.length} sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Initial Score</div>
                          <div className="font-medium">
                            {session.sessionHistory[0]?.angerScore.toFixed(1) || "N/A"}/5
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="text-muted-foreground">Final Score</div>
                          <div className="font-medium text-healing-600">
                            {session.angerScore.toFixed(1)}/5
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => onContinueSession(session)}
                          variant="outline"
                          className="text-healing-600 border-healing-200 hover:bg-healing-50"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
