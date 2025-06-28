import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react';
import { teamFeedbackStats, recentFeedback, topStrengths, growthAreas } from '@/lib/data';

export default function TeamFeedback() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Team Feedback</h1>
        <p className="text-slate-600">Collect, analyze, and act on feedback from your team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Total Feedback</p>
                <p className="text-2xl font-bold">{teamFeedbackStats.totalFeedback}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Team Members</p>
                <p className="text-2xl font-bold">{teamFeedbackStats.teamMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                <p className="text-2xl font-bold">{teamFeedbackStats.avgRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold">{teamFeedbackStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="collect" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collect">Collect Feedback</TabsTrigger>
          <TabsTrigger value="analyze">Analyze Trends</TabsTrigger>
          <TabsTrigger value="reports">Generate Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="collect" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Feedback Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Team Members</label>
                  <div className="p-3 border rounded-lg bg-slate-50">
                    <p className="text-sm text-slate-600">8 team members selected</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Topic</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Communication Skills</option>
                    <option>Leadership Qualities</option>
                    <option>Technical Expertise</option>
                    <option>Team Collaboration</option>
                  </select>
                </div>
                <Button className="w-full">Send Feedback Request</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{feedback.name}</p>
                        <p className="text-sm text-slate-600">{feedback.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{feedback.rating}/5</p>
                        <p className="text-xs text-slate-500">{feedback.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Trends Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Top Strengths</h3>
                  <div className="space-y-2">
                    {topStrengths.map((strength, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{strength.label}</span>
                        <span className="text-green-600 font-medium">{strength.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Growth Areas</h3>
                  <div className="space-y-2">
                    {growthAreas.map((area, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{area.label}</span>
                        <span className="text-orange-600 font-medium">{area.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="font-medium">Individual Performance Report</span>
                  <span className="text-sm text-slate-600">Detailed analysis per team member</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="font-medium">Team Health Report</span>
                  <span className="text-sm text-slate-600">Overall team dynamics & culture</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="font-medium">Growth Recommendations</span>
                  <span className="text-sm text-slate-600">AI-suggested development plans</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="font-medium">Feedback Trends</span>
                  <span className="text-sm text-slate-600">Historical analysis & patterns</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
