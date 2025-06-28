import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { oneOnOneStats, upcomingSessions, sessionHistoryStats, recentSessions } from '@/lib/data';

export default function OneOnOneSessions() {
  const [scheduleForm, setScheduleForm] = useState({
    teamMember: '',
    date: '',
    time: '',
    sessionType: 'Regular Check-in'
  });

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scheduleForm.teamMember || !scheduleForm.date || !scheduleForm.time) {
      alert('Please fill in all required fields.');
      return;
    }

    // Show success message
    alert(`Session scheduled successfully!\n\nTeam Member: ${scheduleForm.teamMember}\nDate: ${scheduleForm.date}\nTime: ${scheduleForm.time}\nType: ${scheduleForm.sessionType}\n\nCheck your calendar for the meeting invitation.`);
    
    // Reset form
    setScheduleForm({
      teamMember: '',
      date: '',
      time: '',
      sessionType: 'Regular Check-in'
    });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">1:1 Sessions</h1>
        <p className="text-slate-600">Schedule, manage, and track your one-on-one meetings with team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">This Week</p>
                <p className="text-2xl font-bold">{oneOnOneStats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold">{oneOnOneStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Upcoming</p>
                <p className="text-2xl font-bold">{oneOnOneStats.upcoming}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Overdue</p>
                <p className="text-2xl font-bold">{oneOnOneStats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule & Calendar</TabsTrigger>
          <TabsTrigger value="templates">AI Templates</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleScheduleSession} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Team Member</label>
                    <select 
                      className="w-full p-3 border rounded-lg"
                      value={scheduleForm.teamMember}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, teamMember: e.target.value }))}
                      required
                    >
                      <option value="">Select team member...</option>
                      <option value="Alex Chen - Engineering">Alex Chen - Engineering</option>
                      <option value="Sarah Johnson - Design">Sarah Johnson - Design</option>
                      <option value="Mike Torres - Product">Mike Torres - Product</option>
                      <option value="Lisa Wang - Marketing">Lisa Wang - Marketing</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 border rounded-lg"
                        value={scheduleForm.date}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <input 
                        type="time" 
                        className="w-full p-3 border rounded-lg"
                        value={scheduleForm.time}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Type</label>
                    <select 
                      className="w-full p-3 border rounded-lg"
                      value={scheduleForm.sessionType}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, sessionType: e.target.value }))}
                    >
                      <option value="Regular Check-in">Regular Check-in</option>
                      <option value="Performance Review">Performance Review</option>
                      <option value="Goal Setting">Goal Setting</option>
                      <option value="Career Development">Career Development</option>
                      <option value="Feedback Discussion">Feedback Discussion</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Schedule Session</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="h-8 w-8 text-slate-400" />
                        <div>
                          <p className="font-medium">{session.name}</p>
                          <p className="text-sm text-slate-600">{session.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{session.date}</p>
                        <p className="text-sm text-slate-600">{session.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Session Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Performance-Based Templates</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <h4 className="font-medium">High Performer Check-in</h4>
                      <p className="text-sm text-slate-600">For team members exceeding expectations</p>
                      <div className="mt-2 text-xs text-blue-600">
                        • Career growth opportunities
                        • Leadership development
                        • Advanced project assignments
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <h4 className="font-medium">Improvement Focus</h4>
                      <p className="text-sm text-slate-600">For addressing performance gaps</p>
                      <div className="mt-2 text-xs text-orange-600">
                        • Specific improvement areas
                        • Support and resources needed
                        • Clear action steps
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Feedback-Driven Templates</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <h4 className="font-medium">Communication Focus</h4>
                      <p className="text-sm text-slate-600">Based on feedback about communication</p>
                      <div className="mt-2 text-xs text-purple-600">
                        • Communication style discussion
                        • Team interaction feedback
                        • Presentation skills development
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <h4 className="font-medium">Leadership Development</h4>
                      <p className="text-sm text-slate-600">For emerging leaders</p>
                      <div className="mt-2 text-xs text-green-600">
                        • Leadership opportunities
                        • Mentoring responsibilities
                        • Decision-making scenarios
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{sessionHistoryStats.sessionsThisMonth}</p>
                    <p className="text-sm text-slate-600">Sessions This Month</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{sessionHistoryStats.avgSessionRating}</p>
                    <p className="text-sm text-slate-600">Avg Session Rating</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{sessionHistoryStats.actionItemsCreated}</p>
                    <p className="text-sm text-slate-600">Action Items Created</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Sessions</h3>
                  {recentSessions.map((session, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{session.name}</p>
                          <p className="text-sm text-slate-600">{session.type}</p>
                        </div>
                        <p className="text-sm text-slate-500">{session.date}</p>
                      </div>
                      <p className="text-sm text-slate-700">{session.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
