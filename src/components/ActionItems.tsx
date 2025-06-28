import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { actionItems } from '@/lib/data';

export function ActionItems() {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-900">AI-Generated Action Items</CardTitle>
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
          + Add Manual Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionItems.map((item) => (
          <div key={item.id} className={`p-4 border rounded-lg transition-all ${
            item.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-slate-200 hover:border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <Checkbox 
                checked={item.completed}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      item.priority === 'high' ? 'destructive' :
                      item.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {item.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <span className="text-sm text-slate-500">Due: {item.dueDate}</span>
                  </div>
                  {!item.completed && (
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
