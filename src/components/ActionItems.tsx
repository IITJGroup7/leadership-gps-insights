import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { actionItems as initialActionItems } from '@/lib/data';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function ActionItems() {
  const [items, setItems] = useState(initialActionItems);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
    type: 'manual',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.dueDate.trim()) return;
    
    const newItem = {
      id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
      title: form.title,
      priority: form.priority,
      dueDate: form.dueDate,
      type: form.type,
      completed: false,
    };
    
    setItems([...items, newItem]);
    setForm({ title: '', priority: 'medium', dueDate: '', type: 'manual' });
    setShowForm(false);
  };

  const handleComplete = (itemId: number) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = (completedCount / items.length) * 100;

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
          <span>AI-Generated Action Items</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-500">{completedCount}/{items.length} completed</span>
          </div>
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
          onClick={() => setShowForm(v => !v)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Manual Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 space-y-3 animate-in slide-in-from-top-2 duration-300">
            <input
              className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Action title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <div className="flex space-x-2">
              <select
                className="p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input
                type="date"
                className="p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.dueDate}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" size="sm" className="text-blue-600 hover:scale-105 transition-transform duration-200">
              Add
            </Button>
          </form>
        )}
        
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-md ${
              item.completed 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50'
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transform: item.completed ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <div className="flex items-start space-x-3">
              <Checkbox 
                checked={item.completed}
                className="mt-1 transition-all duration-200 hover:scale-110"
                onCheckedChange={() => handleComplete(item.id)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium transition-all duration-300 ${
                    item.completed 
                      ? 'text-green-700 line-through' 
                      : 'text-slate-900 hover:text-blue-700'
                  }`}>
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        item.priority === 'high' ? 'destructive' :
                        item.priority === 'medium' ? 'default' : 'secondary'
                      }
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {item.priority === 'high' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {item.priority === 'medium' && <Clock className="h-3 w-3 mr-1" />}
                      {item.priority === 'low' && <Calendar className="h-3 w-3 mr-1" />}
                      {item.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs transition-all duration-200 hover:scale-105 ${
                        item.completed ? 'bg-green-100 text-green-700 border-green-300' : ''
                      }`}
                    >
                      {item.type}
                    </Badge>
                    <span className={`text-sm transition-colors duration-300 ${
                      item.completed ? 'text-green-600' : 'text-slate-500'
                    }`}>
                      Due: {item.dueDate}
                    </span>
                  </div>
                  {!item.completed && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                      onClick={() => handleComplete(item.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  {item.completed && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
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
