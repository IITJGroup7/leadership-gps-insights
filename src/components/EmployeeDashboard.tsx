import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, Clock, CheckCircle, Star, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { employeeDashboardStats, feedbackRequests, peerFeedbackOpportunities } from '@/lib/data';

export function EmployeeDashboard() {
  const { user } = useAuth();
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${
        animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Employee Dashboard</h1>
        <p className="text-slate-600">Track your feedback contributions and growth opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Feedback Given</p>
                <p className="text-3xl font-bold">{employeeDashboardStats.feedbackGiven}</p>
                <p className="text-blue-100 text-sm">This quarter</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center animate-pulse">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-r from-green-500 to-green-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Your Rating</p>
                <p className="text-3xl font-bold">{employeeDashboardStats.yourRating}/5</p>
                <div className="flex items-center text-green-100 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +0.2 this month
                </div>
              </div>
              <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center animate-bounce">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '400ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Peer Reviews</p>
                <p className="text-3xl font-bold">{employeeDashboardStats.peerReviews}</p>
                <p className="text-purple-100 text-sm">Completed</p>
              </div>
              <div className="w-12 h-12 bg-purple-400/30 rounded-full flex items-center justify-center animate-spin">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '500ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold">{employeeDashboardStats.pendingRequests}</p>
                <p className="text-orange-100 text-sm">Awaiting response</p>
              </div>
              <div className="w-12 h-12 bg-orange-400/30 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="h-6 w-6" />
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
          <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Feedback Requests</span>
                </div>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {feedbackRequests.length} pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackRequests.map((request, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer group ${
                    hoveredCard === `request-${index}`
                      ? 'bg-blue-50 border-blue-200 shadow-md scale-105'
                      : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                  onMouseEnter={() => setHoveredCard(`request-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium transition-colors duration-300 ${
                        hoveredCard === `request-${index}` ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {request.requester}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{request.topic}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">Due: {request.dueDate}</span>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                    >
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
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
          <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Peer Feedback</span>
                </div>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {peerFeedbackOpportunities.length} opportunities
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {peerFeedbackOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer group ${
                    hoveredCard === `opportunity-${index}`
                      ? 'bg-green-50 border-green-200 shadow-md scale-105'
                      : 'bg-white border-slate-200 hover:border-green-200 hover:bg-green-50'
                  }`}
                  onMouseEnter={() => setHoveredCard(`opportunity-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium transition-colors duration-300 ${
                        hoveredCard === `opportunity-${index}` ? 'text-green-900' : 'text-slate-900'
                      }`}>
                        {opportunity.colleague}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{opportunity.project}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          opportunity.collaboration === 'High' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-xs text-slate-500">
                          Collaboration: {opportunity.collaboration}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-100 hover:scale-105 transition-all duration-200"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Provide Feedback
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
