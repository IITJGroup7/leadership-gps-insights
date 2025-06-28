
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, Calendar, TrendingUp, User, CheckCircle } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Notifications</h1>
        <p className="text-slate-600">Stay updated with AI insights, feedback alerts, and team updates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Total</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Feedback</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">AI Insights</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Reminders</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Notifications</CardTitle>
              <Button variant="outline" size="sm">Mark All Read</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: 'ai-insight',
                    icon: TrendingUp,
                    title: 'AI Insight: Team Communication Trend',
                    message: 'Your team\'s communication scores have improved by 15% this month. Consider sharing this positive trend in your next team meeting.',
                    time: '2 hours ago',
                    unread: true,
                    color: 'text-purple-500'
                  },
                  {
                    type: 'feedback',
                    icon: MessageSquare,
                    title: 'New Feedback Received',
                    message: 'Alex Chen has submitted feedback about the recent project collaboration. 4.8/5 rating with detailed comments.',
                    time: '4 hours ago',
                    unread: true,
                    color: 'text-green-500'
                  },
                  {
                    type: 'reminder',
                    icon: Calendar,
                    title: '1:1 Session Reminder',
                    message: 'Upcoming 1:1 with Sarah Johnson tomorrow at 10:30 AM. AI-generated agenda is ready for review.',
                    time: '6 hours ago',
                    unread: false,
                    color: 'text-orange-500'
                  },
                  {
                    type: 'feedback',
                    icon: User,
                    title: 'Feedback Request Completed',
                    message: 'Mike Torres has completed the leadership assessment. View detailed results and AI recommendations.',
                    time: '1 day ago',
                    unread: false,
                    color: 'text-blue-500'
                  },
                  {
                    type: 'ai-insight',
                    icon: TrendingUp,
                    title: 'Weekly AI Summary Ready',
                    message: 'Your weekly team performance summary is ready. 3 key insights and 5 action recommendations included.',
                    time: '2 days ago',
                    unread: false,
                    color: 'text-purple-500'
                  }
                ].map((notification, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'} hover:shadow-sm transition-shadow`}>
                    <div className="flex items-start space-x-3">
                      <notification.icon className={`h-6 w-6 mt-1 ${notification.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${notification.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Nudges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-900">Schedule More 1:1s</p>
                    <p className="text-sm text-slate-600 mt-1">
                      You haven't had a 1:1 with Lisa Wang in 3 weeks. Consider scheduling one this week.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Schedule Now</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-900">Celebrate Success</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Your team's recent project received outstanding feedback. Share this win!
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Share Update</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-900">Follow Up Needed</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Alex Chen mentioned communication challenges. Consider a follow-up discussion.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Schedule Follow-up</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Insights</p>
                  <p className="text-sm text-slate-600">Weekly summaries and trends</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Feedback Alerts</p>
                  <p className="text-sm text-slate-600">New feedback submissions</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Reminders</p>
                  <p className="text-sm text-slate-600">1:1 meeting notifications</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Smart Nudges</p>
                  <p className="text-sm text-slate-600">AI-powered suggestions</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
