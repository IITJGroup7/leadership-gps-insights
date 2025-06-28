import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { nudges } from '@/lib/data';
import { Lightbulb, Trophy, Brain, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export function SmartNudges() {
  const [dismissedNudges, setDismissedNudges] = useState<number[]>([]);
  const [hoveredNudge, setHoveredNudge] = useState<number | null>(null);

  const handleAction = (nudgeId: number, action: string) => {
    alert(`${action} clicked for nudge ${nudgeId}`);
  };

  const handleDismiss = (nudgeId: number) => {
    setDismissedNudges([...dismissedNudges, nudgeId]);
  };

  const getIconComponent = (type: string) => {
    switch (type) {
      case 'insight':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'celebration':
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 'coaching':
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const activeNudges = nudges.filter(nudge => !dismissedNudges.includes(nudge.id));

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
            <span>Smart Nudges</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-500">{activeNudges.length} active</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeNudges.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">All caught up! No nudges at the moment.</p>
          </div>
        ) : (
          activeNudges.map((nudge, index) => (
            <div
              key={nudge.id}
              className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer group ${
                hoveredNudge === nudge.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-lg scale-105'
                  : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredNudge(nudge.id)}
              onMouseLeave={() => setHoveredNudge(null)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  hoveredNudge === nudge.id ? 'scale-110' : ''
                }`}>
                  {getIconComponent(nudge.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        hoveredNudge === nudge.id ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {nudge.title}
                      </h3>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${
                        hoveredNudge === nudge.id ? 'text-blue-700' : 'text-slate-600'
                      }`}>
                        {nudge.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge 
                        variant="outline" 
                        className={`text-xs transition-all duration-200 hover:scale-105 ${getPriorityColor(nudge.priority)}`}
                      >
                        {nudge.priority}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(nudge.id);
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors duration-200 p-1 hover:scale-110"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{nudge.icon}</span>
                      <span className="text-xs text-slate-500 capitalize">{nudge.type}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`transition-all duration-200 hover:scale-105 ${
                        hoveredNudge === nudge.id 
                          ? 'text-blue-700 bg-blue-100' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(nudge.id, nudge.action);
                      }}
                    >
                      {nudge.action}
                      <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Animated border effect */}
              <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                hoveredNudge === nudge.id 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              </div>
            </div>
          ))
        )}
        
        {activeNudges.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>AI-powered insights to improve your leadership</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
