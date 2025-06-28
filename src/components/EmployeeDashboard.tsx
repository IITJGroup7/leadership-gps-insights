import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, Clock, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { employeeDashboardStats, feedbackRequests, peerFeedbackOpportunities } from '@/lib/data';

export function EmployeeDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-slate-600">Here's your feedback dashboard and pending requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Feedback Given</p>
                <p className="text-2xl font-bold">{employeeDashboardStats.feedbackGiven}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Requests</p>
                <p className="text-2xl font-bold">{employeeDashboardStats.pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Peer Reviews</p>
                <p className="text-2xl font-bold">{employeeDashboardStats.peerReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-slate-600">Your Rating</p>
                <p className="text-2xl font-bold">{employeeDashboardStats.yourRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback-requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback-requests">Feedback Requests</TabsTrigger>
          <TabsTrigger value="self-feedback">Self Assessment</TabsTrigger>
          <TabsTrigger value="peer-feedback">Peer Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback-requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Feedback Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{request.topic}</h3>
                      <p className="text-sm text-slate-600">Requested by: {request.requester}</p>
                      <p className="text-sm text-slate-500">Due: {request.dueDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {request.urgent && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">Urgent</span>
                      )}
                      <Button size="sm">Provide Feedback</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Self Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">Reflect on your performance and growth areas.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <span className="font-medium">Weekly Self-Review</span>
                    <span className="text-sm text-slate-600">Quick weekly check-in</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <span className="font-medium">Goal Progress Update</span>
                    <span className="text-sm text-slate-600">Track your objectives</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <span className="font-medium">Skills Assessment</span>
                    <span className="text-sm text-slate-600">Evaluate your competencies</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <span className="font-medium">Career Development</span>
                    <span className="text-sm text-slate-600">Plan your growth path</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peer-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Peer Feedback Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">Provide feedback to your colleagues.</p>
                <div className="space-y-3">
                  {peerFeedbackOpportunities.map((peer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{peer.colleague}</h3>
                        <p className="text-sm text-slate-600">Project: {peer.project}</p>
                        <p className="text-sm text-slate-500">Collaboration Level: {peer.collaboration}</p>
                      </div>
                      <Button size="sm" variant="outline">Give Feedback</Button>
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
