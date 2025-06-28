import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeamOverview } from '@/components/TeamOverview';
import { FeedbackTrends } from '@/components/FeedbackTrends';
import { ActionItems } from '@/components/ActionItems';
import { SmartNudges } from '@/components/SmartNudges';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardMetrics } from '@/lib/data';
import { TrendingUp, TrendingDown, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateCards(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-8 bg-slate-200 rounded animate-pulse mb-2 w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      <div className="mb-8">
        <h1 className={`text-3xl font-bold text-slate-900 mb-2 transition-all duration-700 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Welcome back, {user?.name || 'Manager'}!
        </h1>
        <p className={`text-slate-600 transition-all duration-700 delay-200 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Here's what's happening with your team today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Team Sentiment</p>
                <p className="text-3xl font-bold">{dashboardMetrics.teamSentiment.value}/10</p>
                <div className="flex items-center text-blue-100 text-sm">
                  {dashboardMetrics.teamSentiment.change > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {dashboardMetrics.teamSentiment.change > 0 ? '+' : ''}{dashboardMetrics.teamSentiment.change} this week
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">😊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-r from-green-500 to-green-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '400ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Feedback Collected</p>
                <p className="text-3xl font-bold">{dashboardMetrics.feedbackCollected}</p>
                <p className="text-green-100 text-sm">This week</p>
              </div>
              <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '500ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Action Items</p>
                <p className="text-3xl font-bold">{dashboardMetrics.actionItemsPending}</p>
                <p className="text-purple-100 text-sm">Pending</p>
              </div>
              <div className="w-12 h-12 bg-purple-400/30 rounded-full flex items-center justify-center animate-spin">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${
        animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '600ms' }}>
        <div className="space-y-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <TeamOverview />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <ActionItems />
          </div>
        </div>
        <div className="space-y-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <FeedbackTrends />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <SmartNudges />
          </div>
        </div>
      </div>
    </div>
  );
}
