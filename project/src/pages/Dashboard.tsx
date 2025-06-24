import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign,
  Activity,
  Calendar,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Mic,
  Video,
  Bot,
  Settings,
  Building
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navigation from '../components/Navigation';
import Chatbot from '../components/Chatbot';
import NewProjectModal from '../components/NewProjectModal';
import AIConsultantModal from '../components/AIConsultantModal';
import { useAuth } from '../contexts/AuthContext';
import { useAI } from '../contexts/AIContext';

const Dashboard: React.FC = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isAIConsultantModalOpen, setIsAIConsultantModalOpen] = useState(false);
  const { user, userData, updateUserData } = useAuth();
  const { isListening, lastResponse, startListening, stopListening } = useAI();

  // Generate dynamic data based on user's actual data
  const generateRevenueData = () => {
    if (!userData || userData.business.revenue === 0) {
      return Array.from({ length: 6 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        revenue: 0,
        users: 0
      }));
    }

    const baseRevenue = userData.business.revenue;
    const baseUsers = userData.business.users;
    
    return Array.from({ length: 6 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
      revenue: Math.round(baseRevenue * (0.7 + (i * 0.1) + Math.random() * 0.2)),
      users: Math.round(baseUsers * (0.8 + (i * 0.05) + Math.random() * 0.1))
    }));
  };

  const generateProjectData = () => {
    const totalProjects = userData?.projects?.length ?? 0;
    if (totalProjects === 0) {
      return [
        { name: 'No Projects', value: 100, color: '#9CA3AF' }
      ];
    }

    const completed = Math.floor(totalProjects * 0.6);
    const inProgress = Math.floor(totalProjects * 0.3);
    const pending = totalProjects - completed - inProgress;

    return [
      { name: 'Completed', value: completed, color: '#10B981' },
      { name: 'In Progress', value: inProgress, color: '#3B82F6' },
      { name: 'Pending', value: pending, color: '#F59E0B' },
    ].filter(item => item.value > 0);
  };

  const revenueData = generateRevenueData();
  const projectData = generateProjectData();

  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleNewProject = (projectData: any) => {
    if (!userData) return;
    
    const newProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    updateUserData({
      projects: [...userData.projects, newProject]
    });
  };

  const getWelcomeMessage = () => {
    if (!userData || userData.business.revenue === 0) {
      return "Welcome! Let's set up your business metrics to get started with AI insights.";
    }
    return `Welcome back, ${user?.firstName}! Your business is performing well with $${userData.business.revenue.toLocaleString()} in revenue.`;
  };

  const getCompanyInfo = () => {
    const companyName = user?.company || 'Your Company';
    const industry = userData?.business?.industry || 'Technology';
    const businessModel = userData?.business?.businessModel || 'SaaS';
    
    return {
      name: companyName,
      description: `${industry} company focused on ${businessModel} solutions`,
      industry,
      businessModel
    };
  };

  const companyInfo = getCompanyInfo();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* AI Response Banner */}
          {lastResponse && (
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-3">
                <Bot className="w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">AI Assistant Response</h4>
                  <p className="text-blue-100">{lastResponse}</p>
                </div>
              </div>
            </div>
          )}

          {/* Company Header */}
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{companyInfo.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{companyInfo.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    {companyInfo.industry}
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                    {companyInfo.businessModel}
                  </span>
                  {userData?.business?.revenue > 0 && (
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                      ${userData.business.revenue.toLocaleString()}/month
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{getWelcomeMessage()}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                {/* Setup Business Button */}
                {(!userData || userData.business.revenue === 0) && (
                  <button
                    onClick={() => window.location.href = '/setup'}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Setup Business</span>
                  </button>
                )}
                
                {/* Quick Voice Command */}
                <button
                  onClick={handleVoiceCommand}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isListening ? 'Stop Listening' : 'Quick Ask'}</span>
                </button>
                
                {/* AI Video Consultant */}
                <button 
                  onClick={() => setIsAIConsultantModalOpen(true)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>AI Consultant</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${userData?.business.revenue.toLocaleString() ?? '0'}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">
                      {userData?.business.revenue > 0 ? '+12.5%' : 'Set up metrics'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {userData?.business.users.toLocaleString() ?? '0'}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">
                      {userData?.business.users > 0 ? '+8.2%' : 'Add users'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {userData?.business.conversionRate.toFixed(1) ?? '0.0'}%
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">
                      {userData?.business.conversionRate > 0 ? '-2.1%' : 'Set rate'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Interactions</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {userData?.business.aiInteractions.toLocaleString() ?? '0'}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">
                      {userData?.business.aiInteractions > 0 ? '+24.3%' : 'Start using AI'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} - Monthly Performance</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">6M</button>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg">1Y</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Project Status */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} - Active Projects</p>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {projectData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} - Latest Updates</p>
              </div>
              <div className="space-y-4">
                {userData?.projects?.length > 0 ? (
                  userData.projects.slice(0, 5).map((project: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Project created: {project.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Create your first project to get started</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
              <div className="mb-6">
                <h3 className="text-lg font-semibold">AI Insights</h3>
                <p className="text-sm text-blue-100">Personalized recommendations for {companyInfo.name}</p>
              </div>
              <div className="space-y-4">
                {userData?.business.revenue > 0 ? (
                  <>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-5 h-5" />
                        <span className="font-medium">Revenue Analysis</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        Your {companyInfo.industry.toLowerCase()} company's revenue of ${userData.business.revenue.toLocaleString()} shows strong performance. 
                        Consider expanding your successful {companyInfo.businessModel.toLowerCase()} strategies.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-medium">Growth Opportunity</span>
                      </div>
                      <p className="text-sm text-blue-100">
                        With {userData.business.users} users in the {companyInfo.industry.toLowerCase()} sector, 
                        focus on improving your {userData.business.conversionRate}% conversion rate through targeted optimization.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="w-5 h-5" />
                      <span className="font-medium">Getting Started</span>
                    </div>
                    <p className="text-sm text-blue-100">
                      Complete your {companyInfo.name} business setup to unlock personalized AI insights and recommendations 
                      tailored for the {companyInfo.industry.toLowerCase()} industry.
                    </p>
                  </div>
                )}
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <p className="text-sm text-blue-100">
                    Use voice commands, chat, or video consultations to get instant business insights and recommendations 
                    specifically for {companyInfo.name}'s {companyInfo.businessModel.toLowerCase()} model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Components */}
      <Chatbot />
      <NewProjectModal 
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleNewProject}
      />
      <AIConsultantModal 
        isOpen={isAIConsultantModalOpen}
        onClose={() => setIsAIConsultantModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;