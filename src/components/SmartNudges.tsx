import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { nudges } from '@/lib/data';

export function SmartNudges() {
  const [completedActions, setCompletedActions] = useState<Set<number>>(new Set());

  const handleAction = (nudgeId: number, action: string) => {
    // Mark action as completed
    setCompletedActions(prev => new Set([...prev, nudgeId]));
    
    // Show appropriate feedback based on action type
    switch (action) {
      case 'Schedule Team Sync':
        alert('Team sync scheduled! Check your calendar for the meeting invitation.');
        break;
      case 'View Details':
        alert('Opening detailed insights and recommendations...');
        break;
      case 'Learn More':
        alert('Opening STAR method coaching guide...');
        break;
      case 'Schedule 1:1':
        alert('Redirecting to 1:1 scheduling page...');
        break;
      default:
        alert(`Action "${action}" completed successfully!`);
    }
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
          <span>Smart Nudges & Insights</span>
          <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nudges.map((nudge) => {
          const isCompleted = completedActions.has(nudge.id);
          return (
            <div key={nudge.id} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
              isCompleted ? 'bg-green-50 border-green-200' :
              nudge.priority === 'high' ? 'bg-red-50 border-red-200' :
              nudge.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{nudge.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${isCompleted ? 'text-green-900' : 'text-slate-900'}`}>
                      {nudge.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                          Completed
                        </Badge>
                      )}
                      <Badge variant={
                        nudge.priority === 'high' ? 'destructive' :
                        nudge.priority === 'medium' ? 'default' : 'secondary'
                      } className="text-xs">
                        {nudge.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 ${isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                    {nudge.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {nudge.type}
                    </Badge>
                    {!isCompleted && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`text-xs ${
                          nudge.priority === 'high' ? 'text-red-600 hover:text-red-700' :
                          'text-blue-600 hover:text-blue-700'
                        }`}
                        onClick={() => handleAction(nudge.id, nudge.action)}
                      >
                        {nudge.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
