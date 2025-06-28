// Centralized data for the Leadership GPS Insights app

// Action Items
export const actionItems = [
  {
    id: 1,
    title: "Schedule 1:1 with Alex about communication skills",
    priority: "high",
    dueDate: "Today",
    type: "coaching",
    completed: false
  },
  {
    id: 2,
    title: "Follow up on Maya's time management goals",
    priority: "medium",
    dueDate: "Tomorrow",
    type: "follow-up",
    completed: false
  },
  {
    id: 3,
    title: "Team sync on project clarity (based on feedback)",
    priority: "high",
    dueDate: "This week",
    type: "team",
    completed: false
  },
  {
    id: 4,
    title: "Recognize Jordan's innovative campaign ideas",
    priority: "low",
    dueDate: "This week",
    type: "recognition",
    completed: true
  }
];

// Team Members
export const teamMembers = [
  {
    name: "Alex Chen",
    role: "Senior Developer",
    sentiment: 8.5,
    recentFeedback: "Excellent technical leadership on the API project",
    strengths: ["Technical Skills", "Mentoring"],
    growthAreas: ["Communication"],
    initials: "AC"
  },
  {
    name: "Maya Patel",
    role: "Product Designer",
    sentiment: 9.2,
    recentFeedback: "Outstanding collaboration with cross-functional teams",
    strengths: ["Creativity", "Collaboration"],
    growthAreas: ["Time Management"],
    initials: "MP"
  },
  {
    name: "Jordan Smith",
    role: "Marketing Specialist",
    sentiment: 7.8,
    recentFeedback: "Great campaign ideas, could improve on execution speed",
    strengths: ["Strategy", "Innovation"],
    growthAreas: ["Execution", "Prioritization"],
    initials: "JS"
  }
];

// Feedback Trends
export const sentimentData = [
  { month: 'Jan', sentiment: 7.2 },
  { month: 'Feb', sentiment: 7.8 },
  { month: 'Mar', sentiment: 8.1 },
  { month: 'Apr', sentiment: 7.9 },
  { month: 'May', sentiment: 8.2 },
  { month: 'Jun', sentiment: 8.5 }
];

export const themeData = [
  { theme: 'Communication', mentions: 15, trend: 'up' },
  { theme: 'Leadership', mentions: 12, trend: 'up' },
  { theme: 'Technical Skills', mentions: 18, trend: 'stable' },
  { theme: 'Collaboration', mentions: 14, trend: 'up' },
  { theme: 'Time Management', mentions: 8, trend: 'down' }
];

// Smart Nudges
export const nudges = [
  {
    id: 1,
    type: "insight",
    title: "Communication Pattern Detected",
    message: "Your team's feedback shows a 15% increase in requests for clearer direction. Consider scheduling a team alignment meeting.",
    action: "Schedule Team Sync",
    priority: "medium",
    icon: "💡"
  },
  {
    id: 2,
    type: "celebration",
    title: "Leadership Growth Spotted!",
    message: "You've received 3 mentions for improved mentoring this week. Your coaching approach is making an impact!",
    action: "View Details",
    priority: "low",
    icon: "🎉"
  },
  {
    id: 3,
    type: "coaching",
    title: "Micro-Coaching Tip",
    message: "When giving feedback on 'time management,' try the STAR method: Situation, Task, Action, Result for more specific guidance.",
    action: "Learn More",
    priority: "low",
    icon: "🧠"
  },
  {
    id: 4,
    type: "urgent",
    title: "Engagement Alert",
    message: "Jordan's engagement score dropped 20% this week. Previous feedback mentioned workload concerns - time for a check-in?",
    action: "Schedule 1:1",
    priority: "high",
    icon: "⚠️"
  }
];

// Dashboard Metrics
export const dashboardMetrics = {
  teamSentiment: { value: 8.2, change: 0.5 },
  feedbackCollected: 24,
  actionItemsPending: 7
};

// Employee Dashboard Data
export const employeeDashboardStats = {
  feedbackGiven: 12,
  pendingRequests: 3,
  peerReviews: 8,
  yourRating: 4.3
};

export const feedbackRequests = [
  { requester: "Sarah Johnson (Manager)", topic: "Q4 Performance Review", dueDate: "Dec 15, 2024", urgent: true },
  { requester: "Mike Torres (Peer)", topic: "Project Collaboration", dueDate: "Dec 18, 2024", urgent: false },
  { requester: "Sarah Johnson (Manager)", topic: "Leadership Skills", dueDate: "Dec 20, 2024", urgent: false },
];

export const peerFeedbackOpportunities = [
  { colleague: "Emily Rodriguez", project: "Mobile App Redesign", collaboration: "High" },
  { colleague: "David Kim", project: "API Integration", collaboration: "Medium" },
  { colleague: "Lisa Chang", project: "User Research", collaboration: "High" },
];

// Team Feedback Metrics
export const teamFeedbackStats = {
  totalFeedback: 142,
  teamMembers: 24,
  avgRating: 4.2,
  pending: 8
};

export const recentFeedback = [
  { name: "Alex Chen", topic: "Leadership", rating: 4.5, time: "2 hours ago" },
  { name: "Sarah Johnson", topic: "Communication", rating: 4.2, time: "5 hours ago" },
  { name: "Mike Torres", topic: "Technical", rating: 4.8, time: "1 day ago" },
];

export const topStrengths = [
  { label: "Technical Expertise", percent: 92 },
  { label: "Team Collaboration", percent: 88 },
  { label: "Problem Solving", percent: 85 },
];

export const growthAreas = [
  { label: "Public Speaking", percent: 68 },
  { label: "Delegation", percent: 72 },
  { label: "Time Management", percent: 75 },
];

// One-on-One Sessions Data
export const oneOnOneStats = {
  thisWeek: 8,
  completed: 5,
  upcoming: 3,
  overdue: 2
};

export const upcomingSessions = [
  { name: "Alex Chen", date: "Today", time: "2:00 PM", type: "Regular Check-in", status: "confirmed" },
  { name: "Sarah Johnson", date: "Tomorrow", time: "10:30 AM", type: "Goal Setting", status: "pending" },
  { name: "Mike Torres", date: "Friday", time: "3:30 PM", type: "Performance Review", status: "confirmed" },
];

export const sessionHistoryStats = {
  sessionsThisMonth: 24,
  avgSessionRating: 4.6,
  actionItemsCreated: 18
};

export const recentSessions = [
  { name: "Alex Chen", date: "Dec 15", type: "Performance Review", outcome: "2 goals set, promotion discussion" },
  { name: "Sarah Johnson", date: "Dec 14", type: "Regular Check-in", outcome: "Project feedback, skill development plan" },
  { name: "Mike Torres", date: "Dec 12", type: "Goal Setting", outcome: "Q1 objectives defined, mentoring assignment" },
];

// Mock Users (for AuthContext)
export const mockUsers = [
  {
    id: '1',
    email: 'manager@company.com',
    name: 'Sarah Johnson',
    role: 'manager',
    department: 'Engineering'
  },
  {
    id: '2',
    email: 'employee@company.com',
    name: 'Alex Chen',
    role: 'employee',
    department: 'Engineering'
  },
  {
    id: '3',
    email: 'john.doe@company.com',
    name: 'John Doe',
    role: 'employee',
    department: 'Engineering'
  }
]; 