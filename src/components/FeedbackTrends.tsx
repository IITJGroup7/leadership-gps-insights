import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { sentimentData, themeData } from '@/lib/data';

export function FeedbackTrends() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">Feedback Trends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-slate-700 mb-4">Team Sentiment Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis domain={[6, 10]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sentiment" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-slate-700 mb-4">Top Feedback Themes</h3>
          <div className="space-y-3">
            {themeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-slate-900">{item.theme}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.trend === 'up' ? 'bg-green-100 text-green-700' :
                    item.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'} {item.trend}
                  </span>
                </div>
                <span className="font-semibold text-slate-600">{item.mentions} mentions</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
