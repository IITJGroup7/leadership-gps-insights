
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  User, 
  Briefcase, 
  Heart, 
  FileText, 
  Save, 
  X,
  Mail,
  Target,
  Brain,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  Plus
} from 'lucide-react';
import { TeamMember } from '@/components/TeamProfiles';
import { useToast } from '@/hooks/use-toast';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}

// Smart suggestions data
const conflictStyles = [
  { value: 'collaborative', label: 'Collaborative Problem-Solver', description: 'Works together to find solutions that benefit everyone' },
  { value: 'direct', label: 'Direct Communicator', description: 'Addresses conflicts head-on with clear communication' },
  { value: 'mediator', label: 'Mediator/Peacemaker', description: 'Helps others resolve conflicts and find middle ground' },
  { value: 'avoidant', label: 'Avoids Confrontation', description: 'Prefers to avoid conflict when possible' },
  { value: 'seeks-guidance', label: 'Seeks Guidance', description: 'Looks to supervisors or team leads for conflict resolution' },
  { value: 'competitive', label: 'Competitive/Assertive', description: 'Stands firm on positions and competes to win' },
  { value: 'custom', label: 'Custom', description: 'Enter a custom conflict style' }
];

const personalityCategories = {
  workStyle: [
    { id: 'detail-oriented', label: 'Detail-oriented', description: 'Focuses on accuracy and thoroughness' },
    { id: 'big-picture', label: 'Big-picture thinker', description: 'Sees the broader vision and long-term goals' },
    { id: 'analytical', label: 'Analytical', description: 'Uses data and logic to make decisions' },
    { id: 'creative', label: 'Creative', description: 'Brings innovative ideas and artistic thinking' },
    { id: 'methodical', label: 'Methodical', description: 'Follows systematic approaches to work' },
    { id: 'flexible', label: 'Flexible', description: 'Adapts easily to changing requirements' }
  ],
  social: [
    { id: 'introverted', label: 'Introverted', description: 'Gains energy from quiet, focused work' },
    { id: 'extroverted', label: 'Extroverted', description: 'Gains energy from social interaction' },
    { id: 'team-oriented', label: 'Team-oriented', description: 'Thrives in collaborative environments' },
    { id: 'independent', label: 'Independent', description: 'Works well with minimal supervision' },
    { id: 'collaborative', label: 'Collaborative', description: 'Enjoys working closely with others' },
    { id: 'leadership-oriented', label: 'Leadership-oriented', description: 'Natural tendency to guide and lead others' }
  ],
  learning: [
    { id: 'curious', label: 'Curious', description: 'Always eager to learn new things' },
    { id: 'teaching-oriented', label: 'Teaching-oriented', description: 'Enjoys sharing knowledge with others' },
    { id: 'hands-on', label: 'Hands-on learner', description: 'Learns best by doing and experimenting' },
    { id: 'research-focused', label: 'Research-focused', description: 'Prefers to thoroughly research before acting' },
    { id: 'mentoring-focused', label: 'Mentoring-focused', description: 'Values guidance from experienced colleagues' }
  ]
};

const culturalQuestions = [
  { 
    key: 'communication', 
    label: 'Communication Preference', 
    options: ['Direct & Explicit', 'Indirect & Contextual', 'Mixed depending on situation'],
    description: 'How they prefer to give and receive information'
  },
  { 
    key: 'hierarchy', 
    label: 'Authority & Hierarchy', 
    options: ['Formal hierarchy respected', 'Casual, egalitarian approach', 'Context-dependent'],
    description: 'Comfort level with formal vs informal organizational structures'
  },
  { 
    key: 'workLife', 
    label: 'Work-Life Balance', 
    options: ['Strict separation', 'Integrated approach', 'Flexible boundaries'],
    description: 'How they manage personal and professional time'
  },
  { 
    key: 'timeZone', 
    label: 'Time Zone Considerations', 
    options: ['Standard business hours', 'Flexible timing', 'Specific timezone constraints'],
    description: 'Preferred working hours and availability'
  }
];

export function AddMemberModal({ isOpen, onClose, onSave }: AddMemberModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    yearsExperience: 0,
    keySkills: '',
    currentProjects: '',
    careerGoals: '',
    workStyle: 'Hybrid' as const,
    learningInterests: '',
    communicationStyle: 'Direct' as const,
    workPreferences: '',
    motivationDrivers: '',
    stressManagement: '',
    conflictStyle: '',
    customConflictStyle: '',
    personalityTraits: [] as string[],
    feedbackStyle: 'Immediate' as const,
    culturalConsiderations: {
      communication: '',
      hierarchy: '',
      workLife: '',
      timeZone: '',
      notes: ''
    },
    managerNotes: ''
  });

  const [showAdvancedPersonality, setShowAdvancedPersonality] = useState(false);

  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const calculateProfileCompletion = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => 
      field !== '' && field !== 0
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Name, email, and role are required fields.",
        variant: "destructive"
      });
      return;
    }

    const conflictStyleValue = formData.conflictStyle === 'custom' 
      ? formData.customConflictStyle 
      : conflictStyles.find(cs => cs.value === formData.conflictStyle)?.label || formData.conflictStyle;

    const culturalNotes = [
      formData.culturalConsiderations.communication && `Communication: ${formData.culturalConsiderations.communication}`,
      formData.culturalConsiderations.hierarchy && `Hierarchy: ${formData.culturalConsiderations.hierarchy}`,
      formData.culturalConsiderations.workLife && `Work-Life: ${formData.culturalConsiderations.workLife}`,
      formData.culturalConsiderations.timeZone && `Timezone: ${formData.culturalConsiderations.timeZone}`,
      formData.culturalConsiderations.notes
    ].filter(Boolean).join('; ');

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      initials: generateInitials(formData.name),
      profileCompletion: calculateProfileCompletion(),
      lastUpdated: 'Just now',
      professionalDetails: {
        yearsExperience: formData.yearsExperience,
        keySkills: formData.keySkills.split(',').map(s => s.trim()).filter(s => s),
        currentProjects: formData.currentProjects.split(',').map(s => s.trim()).filter(s => s),
        careerGoals: formData.careerGoals,
        workStyle: formData.workStyle,
        learningInterests: formData.learningInterests.split(',').map(s => s.trim()).filter(s => s)
      },
      personalDetails: {
        communicationStyle: formData.communicationStyle,
        workPreferences: formData.workPreferences.split(',').map(s => s.trim()).filter(s => s),
        motivationDrivers: formData.motivationDrivers.split(',').map(s => s.trim()).filter(s => s),
        stressManagement: formData.stressManagement,
        conflictStyle: conflictStyleValue,
        personalityTraits: formData.personalityTraits,
        feedbackStyle: formData.feedbackStyle,
        culturalConsiderations: culturalNotes
      },
      managerNotes: formData.managerNotes
    };

    onSave(newMember);
    onClose();
    
    toast({
      title: "Success",
      description: `${formData.name} has been added to the team.`,
    });

    // Reset form
    setFormData({
      name: '',
      role: '',
      department: '',
      email: '',
      yearsExperience: 0,
      keySkills: '',
      currentProjects: '',
      careerGoals: '',
      workStyle: 'Hybrid',
      learningInterests: '',
      communicationStyle: 'Direct',
      workPreferences: '',
      motivationDrivers: '',
      stressManagement: '',
      conflictStyle: '',
      customConflictStyle: '',
      personalityTraits: [],
      feedbackStyle: 'Immediate',
      culturalConsiderations: {
        communication: '',
        hierarchy: '',
        workLife: '',
        timeZone: '',
        notes: ''
      },
      managerNotes: ''
    });
    setShowAdvancedPersonality(false);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateCulturalConsiderations = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      culturalConsiderations: {
        ...prev.culturalConsiderations,
        [key]: value
      }
    }));
  };

  const togglePersonalityTrait = (traitId: string) => {
    setFormData(prev => ({
      ...prev,
      personalityTraits: prev.personalityTraits.includes(traitId)
        ? prev.personalityTraits.filter(t => t !== traitId)
        : [...prev.personalityTraits, traitId]
    }));
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Add New Team Member</h2>
                  <p className="text-sm text-slate-600">Create a comprehensive profile</p>
                </div>
              </DialogTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Member
                </Button>
              </div>
            </div>
          </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="professional">
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="personal">
              <Heart className="h-4 w-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role *</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => updateFormData('role', e.target.value)}
                      placeholder="Enter job role"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      value={formData.department}
                      onChange={(e) => updateFormData('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                      {formData.name ? generateInitials(formData.name) : 'NA'}
                    </div>
                    <div>
                      <p className="font-semibold">{formData.name || 'New Member'}</p>
                      <p className="text-sm text-slate-600">{formData.role || 'Role'}</p>
                      <p className="text-xs text-slate-500">{formData.department || 'Department'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Completion</p>
                    <p className="text-2xl font-bold text-blue-600">{calculateProfileCompletion()}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Skills & Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Years of Experience</label>
                    <Input
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Key Skills</label>
                    <Input
                      value={formData.keySkills}
                      onChange={(e) => updateFormData('keySkills', e.target.value)}
                      placeholder="React, TypeScript, Node.js (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Work Style</label>
                    <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Goals & Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Career Goals</label>
                    <Textarea
                      value={formData.careerGoals}
                      onChange={(e) => updateFormData('careerGoals', e.target.value)}
                      placeholder="Describe career aspirations..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Current Projects</label>
                    <Input
                      value={formData.currentProjects}
                      onChange={(e) => updateFormData('currentProjects', e.target.value)}
                      placeholder="Project A, Project B (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Learning Interests</label>
                    <Input
                      value={formData.learningInterests}
                      onChange={(e) => updateFormData('learningInterests', e.target.value)}
                      placeholder="AI/ML, System Design (comma-separated)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Communication & Work Style */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Communication & Work Style</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Understanding communication preferences helps tailor management approach</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Communication Style</label>
                    <Select value={formData.communicationStyle} onValueChange={(value) => updateFormData('communicationStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct">Direct</SelectItem>
                        <SelectItem value="Diplomatic">Diplomatic</SelectItem>
                        <SelectItem value="Visual">Visual</SelectItem>
                        <SelectItem value="Analytical">Analytical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Feedback Style</label>
                    <Select value={formData.feedbackStyle} onValueChange={(value) => updateFormData('feedbackStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Written">Written</SelectItem>
                        <SelectItem value="Verbal">Verbal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Work Preferences</label>
                    <Input
                      value={formData.workPreferences}
                      onChange={(e) => updateFormData('workPreferences', e.target.value)}
                      placeholder="Morning person, Independent work"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Conflict Resolution Style */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Conflict Resolution Style</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>How they typically handle disagreements and challenging situations affects team dynamics</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Conflict Style</label>
                    <Select value={formData.conflictStyle} onValueChange={(value) => updateFormData('conflictStyle', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose conflict resolution style..." />
                      </SelectTrigger>
                      <SelectContent>
                        {conflictStyles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{style.label}</span>
                              <span className="text-xs text-muted-foreground">{style.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.conflictStyle === 'custom' && (
                    <div>
                      <label className="text-sm font-medium">Custom Conflict Style</label>
                      <Input
                        value={formData.customConflictStyle}
                        onChange={(e) => updateFormData('customConflictStyle', e.target.value)}
                        placeholder="Describe their unique conflict resolution approach..."
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Personality Traits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Personality Traits</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Understanding personality traits helps in task assignment and team collaboration</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(personalityCategories).map(([categoryKey, traits]) => (
                    <div key={categoryKey}>
                      <h4 className="text-sm font-medium mb-2 capitalize">
                        {categoryKey === 'workStyle' ? 'Work Style' : categoryKey} Traits
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {traits.map((trait) => (
                          <div key={trait.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={trait.id}
                              checked={formData.personalityTraits.includes(trait.id)}
                              onCheckedChange={() => togglePersonalityTrait(trait.id)}
                            />
                            <div className="flex-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <label
                                    htmlFor={trait.id}
                                    className="text-sm font-medium cursor-pointer hover:text-primary"
                                  >
                                    {trait.label}
                                  </label>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p className="max-w-xs">{trait.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Selected traits preview */}
                  {formData.personalityTraits.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm font-medium mb-2">Selected Traits:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.personalityTraits.map((traitId) => {
                          const trait = Object.values(personalityCategories).flat().find(t => t.id === traitId);
                          return trait ? (
                            <Badge key={traitId} variant="secondary">
                              {trait.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cultural Considerations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>Cultural Considerations</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Cultural awareness helps create an inclusive and effective working environment</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {culturalQuestions.map((question) => (
                    <div key={question.key}>
                      <div className="flex items-center space-x-2 mb-2">
                        <label className="text-sm font-medium">{question.label}</label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{question.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Select
                        value={formData.culturalConsiderations[question.key as keyof typeof formData.culturalConsiderations]}
                        onValueChange={(value) => updateCulturalConsiderations(question.key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference..." />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium">Additional Cultural Notes</label>
                    <Textarea
                      value={formData.culturalConsiderations.notes}
                      onChange={(e) => updateCulturalConsiderations('notes', e.target.value)}
                      placeholder="Religious observances, language preferences, specific cultural practices..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Motivation & Stress Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Motivation & Stress Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Motivation Drivers</label>
                    <Input
                      value={formData.motivationDrivers}
                      onChange={(e) => updateFormData('motivationDrivers', e.target.value)}
                      placeholder="Recognition, Growth, Technical challenges"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Stress Management</label>
                    <Textarea
                      value={formData.stressManagement}
                      onChange={(e) => updateFormData('stressManagement', e.target.value)}
                      placeholder="How they handle stress and pressure..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Manager Notes & Observations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.managerNotes}
                  onChange={(e) => updateFormData('managerNotes', e.target.value)}
                  placeholder="Add your observations, notes about performance, behavior patterns, strengths, areas for development, etc."
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
