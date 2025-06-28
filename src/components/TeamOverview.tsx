import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { teamMembers } from '@/lib/data';
import { ChevronRight, Star, TrendingUp, TrendingDown } from 'lucide-react';

export function TeamOverview() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const handleMemberClick = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
          <span>Team Overview</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">{teamMembers.length} members</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className={`p-4 border border-slate-100 rounded-lg transition-all duration-300 cursor-pointer group ${
              expandedMember === index 
                ? 'bg-blue-50 border-blue-200 shadow-md scale-105' 
                : 'hover:bg-slate-50 hover:border-blue-200 hover:shadow-sm'
            }`}
            onClick={() => handleMemberClick(index)}
          >
            <div className="flex items-start space-x-4">
              <Avatar className={`w-12 h-12 transition-transform duration-300 group-hover:scale-110 ${
                expandedMember === index ? 'ring-2 ring-blue-300' : ''
              }`}>
                <AvatarFallback className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition-all duration-300 ${
                  expandedMember === index ? 'scale-110' : ''
                }`}>
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    expandedMember === index ? 'text-blue-900' : 'text-slate-900'
                  }`}>
                    {member.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Sentiment:</span>
                    <Badge 
                      variant={member.sentiment >= 8.5 ? "default" : member.sentiment >= 7.5 ? "secondary" : "destructive"}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-1">
                        {member.sentiment >= 8.5 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : member.sentiment >= 7.5 ? (
                          <Star className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{member.sentiment}/10</span>
                      </div>
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                <p className={`text-sm mb-3 italic transition-all duration-300 ${
                  expandedMember === index ? 'text-blue-700' : 'text-slate-700'
                }`}>
                  "{member.recentFeedback}"
                </p>
                
                <div className={`flex flex-wrap gap-2 transition-all duration-500 ${
                  expandedMember === index ? 'opacity-100 max-h-20' : 'opacity-100 max-h-20'
                }`}>
                  <div className="flex flex-wrap gap-1">
                    {member.strengths.map((strength, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors duration-200"
                      >
                        💪 {strength}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.growthAreas.map((area, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                      >
                        🌱 {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {expandedMember === index && (
                  <div className="mt-4 pt-4 border-t border-blue-200 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-medium text-blue-900">Quick Actions</p>
                        <div className="space-y-1">
                          <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-100 transition-colors duration-200 text-blue-700">
                            📅 Schedule 1:1
                          </button>
                          <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-100 transition-colors duration-200 text-blue-700">
                            💬 Request Feedback
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-blue-900">Recent Activity</p>
                        <div className="space-y-1 text-xs text-slate-600">
                          <p>• Last feedback: 2 days ago</p>
                          <p>• 1:1 completed: 1 week ago</p>
                          <p>• Goals updated: 3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <ChevronRight 
                className={`h-5 w-5 text-slate-400 transition-all duration-300 ${
                  expandedMember === index ? 'rotate-90 text-blue-500' : 'group-hover:text-blue-500'
                }`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
