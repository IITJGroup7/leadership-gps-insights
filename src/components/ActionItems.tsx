import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { actionItems as initialActionItems } from '@/lib/data';

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
    setItems([
      ...items,
      {
        id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
        title: form.title,
        priority: form.priority,
        dueDate: form.dueDate,
        type: form.type,
        completed: false,
      },
    ]);
    setForm({ title: '', priority: 'medium', dueDate: '', type: 'manual' });
    setShowForm(false);
  };

  const handleComplete = (itemId: number) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-900">AI-Generated Action Items</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => setShowForm(v => !v)}
        >
          + Add Manual Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <form onSubmit={handleAdd} className="p-4 border rounded-lg bg-slate-50 space-y-3">
            <input
              className="w-full p-2 border rounded"
              placeholder="Action title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <div className="flex space-x-2">
              <select
                className="p-2 border rounded"
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input
                type="date"
                className="p-2 border rounded"
                value={form.dueDate}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" size="sm" className="text-blue-600">Add</Button>
          </form>
        )}
        {items.map((item) => (
          <div key={item.id} className={`p-4 border rounded-lg transition-all ${
            item.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-slate-200 hover:border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <Checkbox 
                checked={item.completed}
                className="mt-1"
                disabled 
                onCheckedChange={() => handleComplete(item.id)}
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => handleComplete(item.id)}
                    >
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
