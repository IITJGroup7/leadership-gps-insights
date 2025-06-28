
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Loader2, Users, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<UserRole>('manager');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password, activeTab);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome!",
        description: `Logged in successfully as ${activeTab}`,
      });
    }
  };

  const fillDemoCredentials = (role: UserRole) => {
    if (role === 'manager') {
      setEmail('manager@company.com');
    } else {
      setEmail('employee@company.com');
    }
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">MM</span>
          </div>
          <CardTitle className="text-2xl font-bold">Manager Mentor</CardTitle>
          <p className="text-slate-600">AI-Powered Feedback Management</p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manager" className="flex items-center space-x-2">
                <Users size={16} />
                <span>Manager</span>
              </TabsTrigger>
              <TabsTrigger value="employee" className="flex items-center space-x-2">
                <UserCheck size={16} />
                <span>Employee</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manager" className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Manager Access:</strong> Full dashboard, analytics, team feedback management, and AI insights.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => fillDemoCredentials('manager')}
                >
                  Use Demo Credentials
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="employee" className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Employee Access:</strong> Submit feedback, participate in peer reviews, and view personal insights.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => fillDemoCredentials('employee')}
                >
                  Use Demo Credentials
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                `Sign In as ${activeTab === 'manager' ? 'Manager' : 'Employee'}`
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <p className="mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <p><strong>Manager:</strong> manager@company.com / password123</p>
              <p><strong>Employee:</strong> employee@company.com / password123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
