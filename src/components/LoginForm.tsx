import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, Sparkles, AlertCircle, CheckCircle, Users, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<UserRole>('manager');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    const newValid = { ...isValid };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
          newValid.email = false;
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Please enter a valid email';
          newValid.email = false;
        } else {
          delete newErrors.email;
          newValid.email = true;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
          newValid.password = false;
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
          newValid.password = false;
        } else {
          delete newErrors.password;
          newValid.password = true;
        }
        break;
      case 'name':
        if (!value) {
          newErrors.name = 'Name is required';
          newValid.name = false;
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
          newValid.name = false;
        } else {
          delete newErrors.name;
          newValid.name = true;
        }
        break;
    }

    setErrors(newErrors);
    setIsValid(newValid);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    if (Object.keys(errors).length === 0) {
      const success = await login(formData.email, formData.password, activeTab);
      
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
    }
  };

  const fillDemoCredentials = (role: UserRole) => {
    if (role === 'manager') {
      setFormData({
        email: 'manager@company.com',
        password: 'password123',
        name: 'John Manager'
      });
    } else {
      setFormData({
        email: 'employee@company.com',
        password: 'password123',
        name: 'Jane Employee'
      });
    }
    // Clear validation errors when filling demo credentials
    setErrors({});
    setIsValid({
      email: true,
      password: true,
      name: true
    });
  };

  const isFormValid = Object.values(isValid).every(Boolean) && formData.email && formData.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to Leadership GPS
            </CardTitle>
            <p className="text-slate-600">
              Sign in to access your AI-powered leadership insights
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manager" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Manager</span>
                </TabsTrigger>
                <TabsTrigger value="employee" className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Employee</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manager" className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Manager Access:</strong> Full dashboard, analytics, team feedback management, and AI insights.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 hover:scale-105 transition-transform duration-200"
                    onClick={() => fillDemoCredentials('manager')}
                  >
                    Use Demo Credentials
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="employee" className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Employee Access:</strong> Submit feedback, participate in peer reviews, and view personal insights.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 hover:scale-105 transition-transform duration-200"
                    onClick={() => fillDemoCredentials('employee')}
                  >
                    Use Demo Credentials
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : isValid.name 
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {isValid.name && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                  {errors.name && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : isValid.email 
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {isValid.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                  {errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : isValid.password 
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full transition-all duration-300 ${
                  isFormValid 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In as {activeTab === 'manager' ? 'Manager' : 'Employee'}</span>
                )}
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                💡 <strong>Demo Mode:</strong> Use the demo credentials above or any valid email/password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
