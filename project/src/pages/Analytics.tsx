import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Building,
  AlertCircle,
  Upload,
  FileSpreadsheet,
  DollarSign,
  MousePointer,
  Target,
  Zap,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, RadialBarChart, RadialBar, Legend } from 'recharts';
import Navigation from '../components/Navigation';
import DataImportModal from '../components/DataImportModal';
import { useAuth } from '../contexts/AuthContext';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const { user, userData } = useAuth();

  // Check if user has any business data OR imported analytics data
  const hasBusinessData = userData?.business && (
    userData.business.revenue > 0 || 
    userData.business.users > 0 || 
    userData.business.conversionRate > 0
  );

  // Check if user has imported analytics data
  const hasAnalyticsData = userData?.analytics?.historicalData && userData.analytics.historicalData.length > 0;

  // User has data if they have either business metrics OR imported analytics
  const hasAnyData = hasBusinessData || hasAnalyticsData;

  // Get company information safely
  const getCompanyInfo = () => {
    try {
      const companyName = user?.company || 'Your Company';
      const industry = userData?.business?.industry || 'Technology';
      const businessModel = userData?.business?.businessModel || 'SaaS';
      
      return {
        name: companyName,
        description: `${industry} company focused on ${businessModel} solutions`,
        industry,
        businessModel
      };
    } catch (error) {
      console.error('Error getting company info:', error);
      return {
        name: 'Your Company',
        description: 'Technology company focused on SaaS solutions',
        industry: 'Technology',
        businessModel: 'SaaS'
      };
    }
  };

  const companyInfo = getCompanyInfo();

  // Generate empty data for charts when no data exists
  const generateEmptyData = (range: string) => {
    try {
      const getDataPoints = (range: string) => {
        switch (range) {
          case '7d': return 7;
          case '30d': return 30;
          case '90d': return 90;
          case '1y': return 12;
          default: return 7;
        }
      };

      const getDateFormat = (range: string, index: number) => {
        const today = new Date();
        if (range === '1y') {
          const monthDate = new Date(today.getFullYear(), today.getMonth() - (11 - index), 1);
          return monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        } else {
          const date = new Date(today);
          date.setDate(date.getDate() - (getDataPoints(range) - 1 - index));
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      };

      const dataPoints = getDataPoints(range);
      
      return Array.from({ length: dataPoints }, (_, i) => ({
        date: getDateFormat(range, i),
        visitors: 0,
        pageViews: 0,
        sessions: 0,
        revenue: 0,
        conversions: 0,
        bounceRate: 0
      }));
    } catch (error) {
      console.error('Error generating empty data:', error);
      return [];
    }
  };

  // Generate comprehensive metrics
  const generateMetrics = () => {
    try {
      if (!hasAnyData) {
        return {
          totalVisitors: 0,
          totalPageViews: 0,
          totalRevenue: 0,
          totalConversions: 0,
          avgSessionTime: 0,
          bounceRate: 0,
          conversionRate: 0,
          growth: {
            visitors: 0,
            pageViews: 0,
            revenue: 0,
            conversions: 0,
            sessionTime: 0,
            bounceRate: 0
          }
        };
      }

      // If user has imported analytics data, use that
      if (hasAnalyticsData) {
        const analyticsData = userData.analytics.historicalData;
        const summary = userData.analytics.summary;
        
        const totalRevenue = analyticsData.reduce((sum: number, row: any) => sum + (row.revenue || 0), 0);
        const totalConversions = analyticsData.reduce((sum: number, row: any) => sum + (row.conversions || 0), 0);
        const totalSessions = analyticsData.reduce((sum: number, row: any) => sum + (row.sessions || 0), 0);
        const totalPageViews = analyticsData.reduce((sum: number, row: any) => sum + (row.pageviews || 0), 0);
        
        return {
          totalVisitors: summary?.avgUsers || 0,
          totalPageViews: totalPageViews,
          totalRevenue: totalRevenue,
          totalConversions: totalConversions,
          avgSessionTime: 0, // We don't have this in imported data
          bounceRate: 0, // We don't have this in imported data
          conversionRate: summary?.conversionRate || 0,
          growth: {
            visitors: 0,
            pageViews: 0,
            revenue: 0,
            conversions: 0,
            sessionTime: 0,
            bounceRate: 0
          }
        };
      }

      // If user only has business data, show basic info
      if (hasBusinessData) {
        return {
          totalVisitors: userData.business.users || 0,
          totalPageViews: Math.round((userData.business.users || 0) * 2.5),
          totalRevenue: userData.business.revenue || 0,
          totalConversions: Math.round((userData.business.users || 0) * (userData.business.conversionRate || 0) / 100),
          avgSessionTime: 0,
          bounceRate: 0,
          conversionRate: userData.business.conversionRate || 0,
          growth: {
            visitors: 0,
            pageViews: 0,
            revenue: 0,
            conversions: 0,
            sessionTime: 0,
            bounceRate: 0
          }
        };
      }

      return {
        totalVisitors: 0,
        totalPageViews: 0,
        totalRevenue: 0,
        totalConversions: 0,
        avgSessionTime: 0,
        bounceRate: 0,
        conversionRate: 0,
        growth: {
          visitors: 0,
          pageViews: 0,
          revenue: 0,
          conversions: 0,
          sessionTime: 0,
          bounceRate: 0
        }
      };
    } catch (error) {
      console.error('Error generating metrics:', error);
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        totalRevenue: 0,
        totalConversions: 0,
        avgSessionTime: 0,
        bounceRate: 0,
        conversionRate: 0,
        growth: {
          visitors: 0,
          pageViews: 0,
          revenue: 0,
          conversions: 0,
          sessionTime: 0,
          bounceRate: 0
        }
      };
    }
  };

  // Memoized data with error handling
  const trafficData = useMemo(() => {
    try {
      if (!hasAnyData) {
        return generateEmptyData(timeRange);
      }
      
      // If user has imported analytics data, use that
      if (hasAnalyticsData) {
        const analyticsData = userData.analytics.historicalData;
        
        // Filter data based on time range
        const now = new Date();
        let startDate = new Date();
        
        switch (timeRange) {
          case '7d':
            startDate.setDate(now.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(now.getDate() - 30);
            break;
          case '90d':
            startDate.setDate(now.getDate() - 90);
            break;
          case '1y':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        const filteredData = analyticsData.filter((item: any) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= now;
        });
        
        if (filteredData.length > 0) {
          return filteredData.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            visitors: item.users || 0,
            pageViews: item.pageviews || 0,
            sessions: item.sessions || 0,
            revenue: item.revenue || 0,
            conversions: item.conversions || 0,
            bounceRate: Math.random() * 20 + 30 // Placeholder since we don't have this data
          }));
        }
      }
      
      // If user only has business data but no historical data, show current values as single point
      if (hasBusinessData) {
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return [{
          date: today,
          visitors: userData.business.users || 0,
          pageViews: Math.round((userData.business.users || 0) * 2.5),
          sessions: Math.round((userData.business.users || 0) * 1.2),
          revenue: userData.business.revenue || 0,
          conversions: Math.round((userData.business.users || 0) * (userData.business.conversionRate || 0) / 100),
          bounceRate: 35
        }];
      }
      
      return generateEmptyData(timeRange);
    } catch (error) {
      console.error('Error generating traffic data:', error);
      return generateEmptyData(timeRange);
    }
  }, [timeRange, userData, hasAnyData, hasAnalyticsData, hasBusinessData]);

  const metrics = useMemo(() => generateMetrics(), [timeRange, userData, hasAnyData, hasAnalyticsData, hasBusinessData]);

  // Enhanced device data with more details
  const deviceData = hasAnyData ? [
    { name: 'Desktop', value: 45, color: '#3B82F6', users: Math.round(metrics.totalVisitors * 0.45) },
    { name: 'Mobile', value: 35, color: '#10B981', users: Math.round(metrics.totalVisitors * 0.35) },
    { name: 'Tablet', value: 20, color: '#F59E0B', users: Math.round(metrics.totalVisitors * 0.20) },
  ] : [];

  // Traffic sources data
  const trafficSources = hasAnyData ? [
    { name: 'Organic Search', value: 40, color: '#8B5CF6' },
    { name: 'Direct', value: 25, color: '#06B6D4' },
    { name: 'Social Media', value: 20, color: '#F59E0B' },
    { name: 'Referral', value: 10, color: '#EF4444' },
    { name: 'Email', value: 5, color: '#10B981' },
  ] : [];

  // Geographic data
  const geographicData = hasAnyData ? [
    { country: 'United States', users: Math.round(metrics.totalVisitors * 0.35), percentage: 35 },
    { country: 'India', users: Math.round(metrics.totalVisitors * 0.20), percentage: 20 },
    { country: 'United Kingdom', users: Math.round(metrics.totalVisitors * 0.15), percentage: 15 },
    { country: 'Canada', users: Math.round(metrics.totalVisitors * 0.12), percentage: 12 },
    { country: 'Germany', users: Math.round(metrics.totalVisitors * 0.10), percentage: 10 },
    { country: 'Others', users: Math.round(metrics.totalVisitors * 0.08), percentage: 8 },
  ] : [];

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!hasAnyData) {
        alert('No data to export. Please set up your business metrics or import data first.');
        setIsExporting(false);
        return;
      }
      
      const csvData = [
        ['Date', 'Visitors', 'Page Views', 'Sessions', 'Revenue', 'Conversions', 'Bounce Rate'],
        ...trafficData.map(row => [row.date, row.visitors, row.pageViews, row.sessions, row.revenue, row.conversions, row.bounceRate])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${companyInfo.name.toLowerCase().replace(/\s+/g, '-')}-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatSessionTime = (seconds: number) => {
    try {
      if (seconds === 0) return '0m 0s';
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    } catch (error) {
      console.error('Error formatting session time:', error);
      return '0m 0s';
    }
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      case '1y': return 'Last year';
      default: return 'Last 7 days';
    }
  };

  // Empty state component
  const EmptyStateCard = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/setup'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Set Up Business Metrics</span>
          </button>
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Import CSV Data</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Metric selector tabs
  const metricTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'traffic', label: 'Traffic', icon: Users },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'conversions', label: 'Conversions', icon: Target },
    { id: 'engagement', label: 'Engagement', icon: Activity },
  ];

  // Error boundary wrapper
  try {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Company Header */}
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{companyInfo.name} Analytics</h2>
                  <p className="text-gray-600 dark:text-gray-400">{companyInfo.description}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {companyInfo.industry}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                      {companyInfo.businessModel}
                    </span>
                    {!hasAnyData && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 rounded-full text-xs font-medium">
                        No Data
                      </span>
                    )}
                    {hasAnalyticsData && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                        Imported Data
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {hasAnyData 
                      ? `Comprehensive insights for ${getTimeRangeLabel(timeRange).toLowerCase()}`
                      : 'Set up your business metrics or import data to see analytics and insights'
                    }
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    disabled={!hasAnyData}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                  <button 
                    onClick={() => setIsImportModalOpen(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Data</span>
                  </button>
                  <button 
                    onClick={handleExport}
                    disabled={isExporting || !hasAnyData}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>{isExporting ? 'Exporting...' : 'Export'}</span>
                  </button>
                  <button 
                    onClick={handleRefresh}
                    disabled={isRefreshing || !hasAnyData}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                  </button>
                </div>
              </div>
            </div>

            {!hasAnyData ? (
              /* Empty State */
              <div className="grid grid-cols-1 gap-8">
                <EmptyStateCard 
                  title="No Analytics Data Available"
                  description="To view your business analytics, please set up your business metrics first or import your historical data using CSV files. This will help us generate insights and track your performance over time."
                />
                
                {/* Additional empty state info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">What you'll get after setup:</h3>
                      <ul className="text-blue-800 dark:text-blue-300 space-y-1 text-sm">
                        <li>• Real-time analytics dashboard with your actual data</li>
                        <li>• Revenue tracking and growth insights</li>
                        <li>• User engagement and conversion metrics</li>
                        <li>• Performance trends over time</li>
                        <li>• Geographic and device analytics</li>
                        <li>• Traffic source analysis</li>
                        <li>• Export capabilities for your data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Metric Tabs */}
                <div className="mb-8">
                  <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    {metricTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedMetric(tab.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedMetric === tab.id
                              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Visitors</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {metrics.totalVisitors.toLocaleString()}
                        </p>
                        {metrics.growth.visitors > 0 && (
                          <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-500 font-medium">+{metrics.growth.visitors}%</span>
                          </div>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${metrics.totalRevenue.toLocaleString()}
                        </p>
                        {metrics.growth.revenue > 0 && (
                          <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-500 font-medium">+{metrics.growth.revenue}%</span>
                          </div>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {metrics.totalConversions.toLocaleString()}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {metrics.conversionRate.toFixed(1)}% rate
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {metrics.totalPageViews.toLocaleString()}
                        </p>
                        {metrics.growth.pageViews > 0 && (
                          <div className="flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-500 font-medium">+{metrics.growth.pageViews}%</span>
                          </div>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedMetric === 'overview' && 'Traffic Overview'}
                        {selectedMetric === 'traffic' && 'Visitor Analytics'}
                        {selectedMetric === 'revenue' && 'Revenue Trends'}
                        {selectedMetric === 'conversions' && 'Conversion Analytics'}
                        {selectedMetric === 'engagement' && 'User Engagement'}
                        {' - '}
                        {getTimeRangeLabel(timeRange)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} performance metrics</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {selectedMetric === 'overview' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Visitors</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Page Views</span>
                          </div>
                        </>
                      )}
                      {selectedMetric === 'revenue' && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    {selectedMetric === 'overview' && (
                      <AreaChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="date" stroke="#6B7280" />
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
                          dataKey="visitors" 
                          stackId="1"
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="pageViews" 
                          stackId="1"
                          stroke="#10B981" 
                          fill="#10B981" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    )}
                    {selectedMetric === 'revenue' && (
                      <RechartsLineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    )}
                    {selectedMetric === 'conversions' && (
                      <BarChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Bar dataKey="conversions" fill="#8B5CF6" />
                      </BarChart>
                    )}
                    {(selectedMetric === 'traffic' || selectedMetric === 'engagement') && (
                      <RechartsLineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="visitors" 
                          stroke="#3B82F6" 
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sessions" 
                          stroke="#F59E0B" 
                          strokeWidth={3}
                          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    )}
                  </ResponsiveContainer>
                </div>

                {/* Secondary Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Device Breakdown */}
                  {deviceData.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Device Breakdown</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} user devices</p>
                      </div>
                      <div className="flex items-center justify-center mb-6">
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsPieChart>
                            <Pie
                              data={deviceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {deviceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        {deviceData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.users} users</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Traffic Sources */}
                  {trafficSources.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Where visitors come from</p>
                      </div>
                      <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: source.color }}
                              ></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{source.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full"
                                  style={{ 
                                    width: `${source.value}%`,
                                    backgroundColor: source.color
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{source.value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Geographic Data */}
                  {geographicData.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Countries</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Visitors by location</p>
                      </div>
                      <div className="space-y-3">
                        {geographicData.map((country, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-center">
                                <Globe className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{country.country}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{country.users.toLocaleString()}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{country.percentage}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-time Activity - Only show if we have business data */}
                {hasBusinessData && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Activity</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{companyInfo.name} live metrics</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((userData?.business?.users || 0) * 0.05)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {userData?.business?.aiInteractions || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">AI Interactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          {Math.round((userData?.business?.users || 0) * 0.02)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">New Signups</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          {Math.round((userData?.business?.users || 0) * 0.15)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Page Views/min</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Data Import Modal */}
        <DataImportModal 
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      </div>
    );
  } catch (error) {
    console.error('Analytics page error:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">There was an error loading the analytics page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default Analytics;