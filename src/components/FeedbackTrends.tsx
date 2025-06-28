import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { feedbackTrends } from '@/lib/data';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

export function FeedbackTrends() {
  const [animateChart, setAnimateChart] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateChart(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...feedbackTrends.map(trend => trend.value));

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Feedback Trends</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-500">Last 6 months</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Average Score</span>
            </div>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {Math.round(feedbackTrends.reduce((sum, trend) => sum + trend.value, 0) / feedbackTrends.length * 10) / 10}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Trend</span>
            </div>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {feedbackTrends[feedbackTrends.length - 1].value > feedbackTrends[0].value ? '+' : ''}
              {Math.round((feedbackTrends[feedbackTrends.length - 1].value - feedbackTrends[0].value) * 10) / 10}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-900">Monthly Sentiment</h3>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                Sentiment Score
              </Badge>
            </div>
          </div>
          
          <div className="relative">
            {/* Chart Container */}
            <div className="h-48 flex items-end space-x-2 p-4 bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200">
              {feedbackTrends.map((trend, index) => {
                const height = (trend.value / maxValue) * 100;
                const isHovered = hoveredBar === index;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                    {/* Bar */}
                    <div 
                      className="relative w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-500 ease-out hover:from-blue-600 hover:to-blue-700 cursor-pointer group"
                      style={{ 
                        height: animateChart ? `${height}%` : '0%',
                        minHeight: '20px'
                      }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Hover Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 animate-in fade-in duration-200">
                          <div className="text-center">
                            <div className="font-medium">{trend.value}/10</div>
                            <div className="text-slate-300">{trend.month}</div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                        </div>
                      )}
                      
                      {/* Bar Animation */}
                      <div className="absolute inset-0 bg-white/20 rounded-t opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                    
                    {/* Month Label */}
                    <span className="text-xs text-slate-600 font-medium transition-all duration-300 group-hover:text-blue-600">
                      {trend.month}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 px-2">
              <span>10</span>
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="space-y-3">
          <h3 className="font-medium text-slate-900 flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>Trend Analysis</span>
          </h3>
          <div className="space-y-2">
            {feedbackTrends.slice(-3).map((trend, index) => {
              const prevTrend = feedbackTrends[feedbackTrends.length - 4 + index];
              const change = prevTrend ? trend.value - prevTrend.value : 0;
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      change > 0 ? 'bg-green-500' : change < 0 ? 'bg-red-500' : 'bg-slate-400'
                    }`}></div>
                    <span className="text-sm font-medium text-slate-900">{trend.month}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">{trend.value}/10</span>
                    {change !== 0 && (
                      <div className={`flex items-center text-xs ${
                        change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {change > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(change).toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
