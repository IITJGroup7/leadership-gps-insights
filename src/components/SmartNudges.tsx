import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { nudges } from '@/lib/data';

export function SmartNudges() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
          <span>Smart Nudges & Insights</span>
          <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nudges.map((nudge) => (
          <div key={nudge.id} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
            nudge.priority === 'high' ? 'bg-red-50 border-red-200' :
            nudge.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{nudge.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{nudge.title}</h3>
                  <Badge variant={
                    nudge.priority === 'high' ? 'destructive' :
                    nudge.priority === 'medium' ? 'default' : 'secondary'
                  } className="text-xs">
                    {nudge.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-700 mb-3">{nudge.message}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {nudge.type}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-xs ${
                      nudge.priority === 'high' ? 'text-red-600 hover:text-red-700' :
                      'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    {nudge.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
