import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { teamMembers } from '@/lib/data';

export function TeamOverview() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">Team Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Sentiment:</span>
                    <Badge variant={member.sentiment >= 8.5 ? "default" : member.sentiment >= 7.5 ? "secondary" : "destructive"}>
                      {member.sentiment}/10
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                <p className="text-sm text-slate-700 mb-3 italic">"{member.recentFeedback}"</p>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1">
                    {member.strengths.map((strength, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        💪 {strength}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.growthAreas.map((area, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        🌱 {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
