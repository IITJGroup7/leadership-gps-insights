import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamOverview } from '@/components/TeamOverview';
import { FeedbackTrends } from '@/components/FeedbackTrends';
import { ActionItems } from '@/components/ActionItems';
import { SmartNudges } from '@/components/SmartNudges';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardMetrics } from '@/lib/data';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name || 'Manager'}!</h1>
        <p className="text-slate-600">Here's what's happening with your team today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Team Sentiment</p>
                <p className="text-3xl font-bold">{dashboardMetrics.teamSentiment.value}/10</p>
                <p className="text-blue-100 text-sm">↗ {dashboardMetrics.teamSentiment.change} this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Feedback Collected</p>
                <p className="text-3xl font-bold">{dashboardMetrics.feedbackCollected}</p>
                <p className="text-green-100 text-sm">This week</p>
              </div>
              <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Action Items</p>
                <p className="text-3xl font-bold">{dashboardMetrics.actionItemsPending}</p>
                <p className="text-purple-100 text-sm">Pending</p>
              </div>
              <div className="w-12 h-12 bg-purple-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TeamOverview />
          <ActionItems />
        </div>
        <div className="space-y-6">
          <FeedbackTrends />
          <SmartNudges />
        </div>
      </div>
    </div>
  );
}
