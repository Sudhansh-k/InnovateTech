import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Trash2, 
  Save,
  Moon,
  Sun,
  AlertTriangle,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Clock,
  Languages,
  DollarSign,
  CreditCard,
  FileText,
  HelpCircle,
  Settings as SettingsIcon,
  Database,
  Wifi,
  Volume2,
  VolumeX,
  Camera,
  Mic,
  Keyboard,
  MousePointer,
  Accessibility,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Star,
  Heart,
  Bookmark,
  Filter,
  Search,
  Tag,
  Link,
  Share2,
  Copy,
  Archive,
  Folder,
  File,
  Image,
  Video,
  Music,
  Code,
  Terminal,
  GitBranch,
  Package,
  Layers,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Edit,
  Paintbrush,
  Pipette,
  Ruler,
  Move,
  MousePointer2,
  Hand,
  Grab,
  ZoomIn,
  ZoomOut,
  Focus,
  Scan,
  QrCode,
  Fingerprint,
  ShieldCheck,
  Key,
  Unlock,
  UserCheck,
  UserX,
  Users,
  UserPlus,
  UserMinus,
  Crown,
  Badge,
  Medal,
  Trophy,
  Gift,
  PartyPopper,
  Cake,
  Coffee,
  Pizza,
  Utensils,
  Car,
  Plane,
  Train,
  Ship,
  Bike,
  Truck,
  Bus,
  Taxi,
  Fuel,
  MapPin as Location,
  Navigation as NavigationIcon,
  Compass,
  Map,
  Route,
  Signpost,
  Flag,
  Bookmark as BookmarkIcon,
  Pin,
  PinOff,
  Paperclip,
  Link2,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  ChevronsDown,
  CornerDownLeft,
  CornerDownRight,
  CornerUpLeft,
  CornerUpRight,
  CornerLeftDown,
  CornerLeftUp,
  CornerRightDown,
  CornerRightUp,
  Move3d,
  RotateCw as Rotate,
  Scale,
  Shuffle,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Plus,
  Minus,
  X,
  Check,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle as Help,
  MessageCircle,
  MessageSquare,
  MessageSquarePlus,
  MessageSquareX,
  MessageSquareMore,
  MessageSquareDot,
  MessageSquareHeart,
  MessageSquareReply,
  MessageSquareShare,
  MessageSquareCode,
  MessageSquareText,
  MessageSquareOff,
  MessageSquareWarning,
  MessageSquareCheck,
  MessageSquareDashed,
  MessageSquareQuote,
  Inbox,
  Send,
  SendHorizontal,
  Reply,
  ReplyAll,
  Forward,
  Archive as ArchiveIcon,
  Trash,
  Spam,
  MailOpen,
  MailX,
  MailWarning,
  MailCheck,
  MailMinus,
  MailPlus,
  MailSearch,
  AtSign,
  Hash,
  Percent,
  DollarSign as Dollar,
  Euro,
  PoundSterling,
  Yen,
  IndianRupee,
  Bitcoin,
  Banknote,
  Coins,
  Wallet,
  CreditCard as Card,
  Receipt,
  Calculator,
  PiggyBank,
  TrendingDown,
  LineChart,
  PieChart,
  BarChart,
  BarChart2,
  BarChart4,
  Candlestick,
  Stock,
  Briefcase,
  Building2,
  Factory,
  Store,
  ShoppingBag,
  ShoppingCart,
  Package2,
  PackageOpen,
  PackageCheck,
  PackageX,
  PackagePlus,
  PackageMinus,
  PackageSearch,
  Truck as Delivery,
  ShipWheel,
  Anchor,
  Sailboat,
  Waves,
  Mountain,
  TreePine,
  Flower,
  Leaf,
  Sprout,
  Sun as SunIcon,
  Moon as MoonIcon,
  Star as StarIcon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  CloudFog,
  Wind,
  Tornado,
  Snowflake,
  Droplets,
  Umbrella,
  Rainbow,
  Sunrise,
  Sunset,
  Thermometer,
  Gauge,
  Timer,
  Stopwatch,
  AlarmClock,
  Watch,
  Hourglass,
  CalendarDays,
  CalendarClock,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarSearch,
  CalendarHeart,
  CalendarRange,
  CalendarFold,
  CalendarCog,
  CalendarArrowUp,
  CalendarArrowDown,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, userData, updateUserData, updateUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    company: user?.company || '',
    bio: userData?.profile?.bio || '',
    phone: userData?.profile?.phone || '',
    location: userData?.profile?.location || '',
    website: userData?.profile?.website || '',
    jobTitle: '',
    department: '',
    timezone: 'UTC',
    language: 'English'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: userData?.settings?.notifications?.emailNotifications ?? true,
    pushNotifications: userData?.settings?.notifications?.pushNotifications ?? false,
    smsNotifications: userData?.settings?.notifications?.smsNotifications ?? true,
    marketingEmails: userData?.settings?.notifications?.marketingEmails ?? false,
    securityAlerts: userData?.settings?.notifications?.securityAlerts ?? true,
    projectUpdates: userData?.settings?.notifications?.projectUpdates ?? true,
    teamMentions: userData?.settings?.notifications?.teamMentions ?? true,
    weeklyReports: userData?.settings?.notifications?.weeklyReports ?? true,
    mobileNotifications: true,
    desktopNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    notificationFrequency: 'immediate',
    digestFrequency: 'daily'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: userData?.settings?.privacy?.profileVisibility || 'public',
    showEmail: userData?.settings?.privacy?.showEmail ?? false,
    showPhone: userData?.settings?.privacy?.showPhone ?? false,
    allowAnalytics: userData?.settings?.privacy?.allowAnalytics ?? true,
    allowCookies: userData?.settings?.privacy?.allowCookies ?? true,
    twoFactorAuth: userData?.settings?.privacy?.twoFactorAuth ?? false,
    loginAlerts: true,
    dataSharing: false,
    thirdPartyIntegrations: true,
    locationTracking: false,
    activityTracking: true,
    advertisingPersonalization: false,
    dataRetention: '2-years',
    downloadData: false,
    deleteData: false
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: isDark ? 'dark' : 'light',
    accentColor: 'blue',
    fontSize: 'medium',
    fontFamily: 'inter',
    compactMode: false,
    animations: true,
    reducedMotion: false,
    highContrast: false,
    colorBlindMode: 'none',
    sidebarPosition: 'left',
    layoutDensity: 'comfortable',
    showAvatars: true,
    showIcons: true,
    customCSS: ''
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    skipLinks: true,
    altText: true,
    captionsEnabled: false,
    audioDescriptions: false,
    textToSpeech: false,
    speechRate: 'normal',
    speechPitch: 'normal',
    speechVolume: 'normal',
    magnification: 100,
    cursorSize: 'normal',
    clickSounds: false,
    errorSounds: true,
    successSounds: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    googleWorkspace: false,
    microsoftOffice: false,
    slack: false,
    discord: false,
    zoom: false,
    teams: false,
    github: false,
    gitlab: false,
    jira: false,
    trello: false,
    asana: false,
    notion: false,
    airtable: false,
    zapier: false,
    webhooks: [],
    apiKeys: [],
    connectedApps: []
  });

  const [billingSettings, setBillingSettings] = useState({
    plan: 'Pro',
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    paymentMethod: 'card',
    cardLast4: '4242',
    autoRenew: true,
    invoiceEmail: user?.email || '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'US'
    },
    taxId: '',
    companyName: user?.company || '',
    usageAlerts: true,
    spendingLimit: 1000
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    sessionTimeout: 30,
    loginHistory: [],
    activeDevices: [],
    trustedDevices: [],
    securityQuestions: [],
    backupCodes: [],
    auditLog: true,
    ipWhitelist: [],
    apiTokens: [],
    webhookSecurity: true,
    encryptionLevel: 'high'
  });

  const [advancedSettings, setAdvancedSettings] = useState({
    developerMode: false,
    betaFeatures: false,
    experimentalFeatures: false,
    debugMode: false,
    performanceMode: false,
    cacheSettings: 'auto',
    dataSync: 'real-time',
    offlineMode: false,
    compressionLevel: 'medium',
    bandwidthLimit: 'unlimited',
    serverRegion: 'auto',
    cdnEnabled: true,
    analyticsLevel: 'standard',
    errorReporting: true,
    crashReporting: true,
    usageStatistics: true,
    featureTelemetry: false
  });

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }

    setIsDeleting(true);
    
    try {
      // Simulate account deletion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear all user data
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      
      // Remove user from users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = existingUsers.filter((u: any) => u.id !== user?.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear user-specific data
      if (user?.id) {
        localStorage.removeItem(`userData_${user.id}`);
      }
      
      // Logout and redirect
      logout();
      navigate('/');
      
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simulate save process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      updateUser({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        company: profileForm.company
      });

      updateUserData({
        profile: {
          bio: profileForm.bio,
          phone: profileForm.phone,
          location: profileForm.location,
          website: profileForm.website,
          avatar: userData?.profile?.avatar || `${profileForm.firstName[0]}${profileForm.lastName[0]}`
        },
        settings: {
          notifications: notificationSettings,
          privacy: privacySettings,
          preferences: {
            language: profileForm.language,
            timezone: profileForm.timezone,
            currency: 'USD'
          }
        }
      });

      // Show success message
      alert('Settings saved successfully!');
      
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Personal information and bio' },
    { id: 'account', label: 'Account', icon: SettingsIcon, description: 'Account settings and preferences' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Manage notification preferences' },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, description: 'Privacy settings and security options' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme and display settings' },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility, description: 'Accessibility and usability options' },
    { id: 'integrations', label: 'Integrations', icon: Zap, description: 'Connected apps and services' },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard, description: 'Subscription and payment settings' },
    { id: 'security', label: 'Security', icon: Lock, description: 'Password and security settings' },
    { id: 'advanced', label: 'Advanced', icon: Terminal, description: 'Developer and advanced options' },
    { id: 'data', label: 'Data & Storage', icon: Database, description: 'Data management and storage' },
    { id: 'support', label: 'Help & Support', icon: HelpCircle, description: 'Get help and contact support' },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, description: 'Dangerous actions and account deletion' }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Information</h3>
        <p className="text-gray-600 dark:text-gray-400">Update your personal information and profile details.</p>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {profileForm.firstName[0]}{profileForm.lastName[0]}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Picture</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Update your profile picture</p>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileForm.firstName}
            onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileForm.lastName}
            onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company
          </label>
          <input
            type="text"
            value={profileForm.company}
            onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={profileForm.location}
            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={profileForm.bio}
          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website
        </label>
        <input
          type="url"
          value={profileForm.website}
          onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://yourwebsite.com"
        />
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and regional settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={profileForm.language}
            onChange={(e) => setProfileForm({ ...profileForm, language: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
            <option value="Italian">Italiano</option>
            <option value="Portuguese">Português</option>
            <option value="Russian">Русский</option>
            <option value="Chinese">中文</option>
            <option value="Japanese">日本語</option>
            <option value="Korean">한국어</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select
            value={profileForm.timezone}
            onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Paris">Paris (CET)</option>
            <option value="Europe/Berlin">Berlin (CET)</option>
            <option value="Asia/Tokyo">Tokyo (JST)</option>
            <option value="Asia/Shanghai">Shanghai (CST)</option>
            <option value="Asia/Kolkata">Mumbai (IST)</option>
            <option value="Australia/Sydney">Sydney (AEDT)</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Account Status</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-blue-800 dark:text-blue-300">Account Type:</span>
            <span className="font-semibold text-blue-900 dark:text-blue-200">Pro Plan</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-800 dark:text-blue-300">Member Since:</span>
            <span className="font-semibold text-blue-900 dark:text-blue-200">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-800 dark:text-blue-300">Account ID:</span>
            <span className="font-mono text-sm text-blue-900 dark:text-blue-200">{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
        <p className="text-gray-600 dark:text-gray-400">Control how and when you receive notifications.</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h4>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'projectUpdates', label: 'Project Updates', description: 'Get notified about project changes' },
            { key: 'teamMentions', label: 'Team Mentions', description: 'When someone mentions you' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary of your activity' },
            { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product updates and tips' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                  onChange={(e) => setNotificationSettings({...notificationSettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Push Notifications</h4>
        <div className="space-y-4">
          {[
            { key: 'pushNotifications', label: 'Browser Push Notifications', description: 'Receive push notifications in your browser' },
            { key: 'mobileNotifications', label: 'Mobile Notifications', description: 'Notifications on mobile devices' },
            { key: 'desktopNotifications', label: 'Desktop Notifications', description: 'Desktop notification alerts' },
            { key: 'soundEnabled', label: 'Sound Notifications', description: 'Play sound for notifications' },
            { key: 'vibrationEnabled', label: 'Vibration', description: 'Vibrate for mobile notifications' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                  onChange={(e) => setNotificationSettings({...notificationSettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quiet Hours</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">Enable Quiet Hours</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Disable notifications during specified hours</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationSettings.quietHours}
                onChange={(e) => setNotificationSettings({...notificationSettings, quietHours: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {notificationSettings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                <input
                  type="time"
                  value={notificationSettings.quietStart}
                  onChange={(e) => setNotificationSettings({...notificationSettings, quietStart: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
                <input
                  type="time"
                  value={notificationSettings.quietEnd}
                  onChange={(e) => setNotificationSettings({...notificationSettings, quietEnd: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your privacy settings and account security.</p>
      </div>

      {/* Profile Privacy */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Privacy</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Visibility</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="public">Public - Anyone can see your profile</option>
              <option value="team">Team Only - Only team members can see your profile</option>
              <option value="private">Private - Only you can see your profile</option>
            </select>
          </div>

          {[
            { key: 'showEmail', label: 'Show Email Address', description: 'Display your email on your profile' },
            { key: 'showPhone', label: 'Show Phone Number', description: 'Display your phone number on your profile' },
            { key: 'allowAnalytics', label: 'Allow Analytics', description: 'Help us improve by sharing usage data' },
            { key: 'allowCookies', label: 'Allow Cookies', description: 'Enable cookies for better experience' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                  onChange={(e) => setPrivacySettings({...privacySettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h4>
        <div className="space-y-4">
          {[
            { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
            { key: 'loginAlerts', label: 'Login Alerts', description: 'Get notified of new login attempts' },
            { key: 'activityTracking', label: 'Activity Tracking', description: 'Track account activity for security' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                  onChange={(e) => setPrivacySettings({...privacySettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Retention Period</label>
            <select
              value={privacySettings.dataRetention}
              onChange={(e) => setPrivacySettings({...privacySettings, dataRetention: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="1-year">1 Year</option>
              <option value="2-years">2 Years</option>
              <option value="5-years">5 Years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download My Data</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Request Data Deletion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appearance & Display</h3>
        <p className="text-gray-600 dark:text-gray-400">Customize the look and feel of your interface.</p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'auto', label: 'Auto', icon: Monitor }
            ].map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.value}
                  onClick={() => {
                    setAppearanceSettings({...appearanceSettings, theme: theme.value});
                    if (theme.value !== 'auto') {
                      if ((theme.value === 'dark') !== isDark) {
                        toggleTheme();
                      }
                    }
                  }}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    appearanceSettings.theme === theme.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{theme.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Accent Color</h4>
        <div className="grid grid-cols-8 gap-3">
          {[
            { name: 'blue', color: 'bg-blue-500' },
            { name: 'purple', color: 'bg-purple-500' },
            { name: 'pink', color: 'bg-pink-500' },
            { name: 'red', color: 'bg-red-500' },
            { name: 'orange', color: 'bg-orange-500' },
            { name: 'yellow', color: 'bg-yellow-500' },
            { name: 'green', color: 'bg-green-500' },
            { name: 'teal', color: 'bg-teal-500' }
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => setAppearanceSettings({...appearanceSettings, accentColor: color.name})}
              className={`w-10 h-10 rounded-full ${color.color} ${
                appearanceSettings.accentColor === color.name ? 'ring-4 ring-gray-300 dark:ring-gray-600' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Typography</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
            <select
              value={appearanceSettings.fontFamily}
              onChange={(e) => setAppearanceSettings({...appearanceSettings, fontFamily: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="opensans">Open Sans</option>
              <option value="lato">Lato</option>
              <option value="poppins">Poppins</option>
              <option value="montserrat">Montserrat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
            <select
              value={appearanceSettings.fontSize}
              onChange={(e) => setAppearanceSettings({...appearanceSettings, fontSize: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout Options */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout Options</h4>
        <div className="space-y-4">
          {[
            { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing for more content' },
            { key: 'animations', label: 'Enable Animations', description: 'Show smooth transitions and animations' },
            { key: 'showAvatars', label: 'Show Avatars', description: 'Display user avatars throughout the interface' },
            { key: 'showIcons', label: 'Show Icons', description: 'Display icons next to menu items' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={appearanceSettings[item.key as keyof typeof appearanceSettings] as boolean}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccessibilityTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Accessibility Options</h3>
        <p className="text-gray-600 dark:text-gray-400">Configure accessibility features to improve your experience.</p>
      </div>

      {/* Visual Accessibility */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visual Accessibility</h4>
        <div className="space-y-4">
          {[
            { key: 'highContrast', label: 'High Contrast Mode', description: 'Increase contrast for better visibility' },
            { key: 'reducedMotion', label: 'Reduce Motion', description: 'Minimize animations and transitions' },
            { key: 'focusIndicators', label: 'Enhanced Focus Indicators', description: 'Show clear focus outlines' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accessibilitySettings[item.key as keyof typeof accessibilitySettings] as boolean}
                  onChange={(e) => setAccessibilitySettings({...accessibilitySettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Blind Support</label>
            <select
              value={accessibilitySettings.colorBlindMode}
              onChange={(e) => setAccessibilitySettings({...accessibilitySettings, colorBlindMode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="none">None</option>
              <option value="protanopia">Protanopia (Red-blind)</option>
              <option value="deuteranopia">Deuteranopia (Green-blind)</option>
              <option value="tritanopia">Tritanopia (Blue-blind)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Magnification: {accessibilitySettings.magnification}%</label>
            <input
              type="range"
              min="75"
              max="200"
              step="25"
              value={accessibilitySettings.magnification}
              onChange={(e) => setAccessibilitySettings({...accessibilitySettings, magnification: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Audio Accessibility */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Audio Accessibility</h4>
        <div className="space-y-4">
          {[
            { key: 'textToSpeech', label: 'Text-to-Speech', description: 'Enable text-to-speech functionality' },
            { key: 'captionsEnabled', label: 'Captions', description: 'Show captions for audio content' },
            { key: 'audioDescriptions', label: 'Audio Descriptions', description: 'Enable audio descriptions for visual content' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accessibilitySettings[item.key as keyof typeof accessibilitySettings] as boolean}
                  onChange={(e) => setAccessibilitySettings({...accessibilitySettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyboard & Navigation</h4>
        <div className="space-y-4">
          {[
            { key: 'keyboardNavigation', label: 'Keyboard Navigation', description: 'Enable full keyboard navigation' },
            { key: 'skipLinks', label: 'Skip Links', description: 'Show skip navigation links' },
            { key: 'clickSounds', label: 'Click Sounds', description: 'Play sounds for button clicks' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accessibilitySettings[item.key as keyof typeof accessibilitySettings] as boolean}
                  onChange={(e) => setAccessibilitySettings({...accessibilitySettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Integrations & Connected Apps</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your connected applications and services.</p>
      </div>

      {/* Popular Integrations */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Integrations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: 'googleWorkspace', name: 'Google Workspace', description: 'Gmail, Drive, Calendar', icon: '🔗' },
            { key: 'microsoftOffice', name: 'Microsoft 365', description: 'Outlook, OneDrive, Teams', icon: '🔗' },
            { key: 'slack', name: 'Slack', description: 'Team communication', icon: '💬' },
            { key: 'discord', name: 'Discord', description: 'Voice and text chat', icon: '🎮' },
            { key: 'zoom', name: 'Zoom', description: 'Video conferencing', icon: '📹' },
            { key: 'github', name: 'GitHub', description: 'Code repository', icon: '🐙' },
            { key: 'jira', name: 'Jira', description: 'Project management', icon: '📋' },
            { key: 'trello', name: 'Trello', description: 'Task management', icon: '📝' },
            { key: 'notion', name: 'Notion', description: 'Notes and docs', icon: '📄' }
          ].map((integration) => (
            <div key={integration.key} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">{integration.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{integration.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={integrationSettings[integration.key as keyof typeof integrationSettings] as boolean}
                    onChange={(e) => setIntegrationSettings({...integrationSettings, [integration.key]: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {integrationSettings[integration.key as keyof typeof integrationSettings] && (
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Configure
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">Manage your API keys for custom integrations</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate New Key
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">No API keys generated yet.</p>
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Webhooks</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">Configure webhooks for real-time notifications</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Add Webhook
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">No webhooks configured yet.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Billing & Subscription</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">Pro Plan</h4>
            <p className="text-blue-700 dark:text-blue-400">$29/month • Billed monthly</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">$29</div>
            <div className="text-sm text-blue-700 dark:text-blue-400">per month</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-blue-800 dark:text-blue-300">
            Next billing: February 15, 2024
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Change Plan
            </button>
            <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h4>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</div>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing History</h4>
        <div className="space-y-3">
          {[
            { date: '2024-01-15', amount: '$29.00', status: 'Paid', invoice: 'INV-001' },
            { date: '2023-12-15', amount: '$29.00', status: 'Paid', invoice: 'INV-002' },
            { date: '2023-11-15', amount: '$29.00', status: 'Paid', invoice: 'INV-003' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{bill.date}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{bill.invoice}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">{bill.amount}</div>
                  <div className="text-sm text-green-600">{bill.status}</div>
                </div>
                <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage & Limits */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage & Limits</h4>
        <div className="space-y-4">
          {[
            { label: 'AI Interactions', used: 1250, limit: 5000, unit: 'requests' },
            { label: 'Storage', used: 2.3, limit: 10, unit: 'GB' },
            { label: 'Team Members', used: 6, limit: 25, unit: 'members' },
            { label: 'Projects', used: 12, limit: 100, unit: 'projects' }
          ].map((usage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{usage.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {usage.used} / {usage.limit} {usage.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your account security and authentication.</p>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={securitySettings.currentPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={securitySettings.newPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securitySettings.confirmPassword}
              onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h4>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white">Enable 2FA</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h4>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'New York, US', current: true, lastActive: 'Active now' },
            { device: 'Safari on iPhone', location: 'New York, US', current: false, lastActive: '2 hours ago' },
            { device: 'Firefox on macOS', location: 'San Francisco, US', current: false, lastActive: '1 day ago' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${session.current ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {session.device} {session.current && <span className="text-green-600">(Current)</span>}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{session.location} • {session.lastActive}</div>
                </div>
              </div>
              {!session.current && (
                <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Login Activity</h4>
        <div className="space-y-3">
          {[
            { date: '2024-01-15 14:30', location: 'New York, US', device: 'Chrome on Windows', status: 'Success' },
            { date: '2024-01-14 09:15', location: 'New York, US', device: 'Safari on iPhone', status: 'Success' },
            { date: '2024-01-13 16:45', location: 'Unknown', device: 'Firefox on Linux', status: 'Failed' }
          ].map((login, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{login.date}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{login.device} • {login.location}</div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                login.status === 'Success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {login.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advanced Settings</h3>
        <p className="text-gray-600 dark:text-gray-400">Advanced configuration options for power users.</p>
      </div>

      {/* Developer Options */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Developer Options</h4>
        <div className="space-y-4">
          {[
            { key: 'developerMode', label: 'Developer Mode', description: 'Enable developer tools and debugging' },
            { key: 'betaFeatures', label: 'Beta Features', description: 'Access experimental features' },
            { key: 'debugMode', label: 'Debug Mode', description: 'Show detailed error information' },
            { key: 'errorReporting', label: 'Error Reporting', description: 'Send error reports to help improve the platform' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{item.label}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={advancedSettings[item.key as keyof typeof advancedSettings] as boolean}
                  onChange={(e) => setAdvancedSettings({...advancedSettings, [item.key]: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cache Settings</label>
            <select
              value={advancedSettings.cacheSettings}
              onChange={(e) => setAdvancedSettings({...advancedSettings, cacheSettings: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="auto">Auto</option>
              <option value="aggressive">Aggressive</option>
              <option value="conservative">Conservative</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Sync</label>
            <select
              value={advancedSettings.dataSync}
              onChange={(e) => setAdvancedSettings({...advancedSettings, dataSync: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="real-time">Real-time</option>
              <option value="every-5-minutes">Every 5 minutes</option>
              <option value="every-15-minutes">Every 15 minutes</option>
              <option value="manual">Manual only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Server Region</label>
            <select
              value={advancedSettings.serverRegion}
              onChange={(e) => setAdvancedSettings({...advancedSettings, serverRegion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="auto">Auto (Recommended)</option>
              <option value="us-east">US East</option>
              <option value="us-west">US West</option>
              <option value="eu-west">Europe West</option>
              <option value="asia-pacific">Asia Pacific</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Export</h4>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">Export your data in various formats for backup or migration purposes.</p>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export All Data</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Export Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Data & Storage</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage your data, storage, and backup settings.</p>
      </div>

      {/* Storage Usage */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage Usage</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Total Storage Used</span>
            <span className="font-semibold text-gray-900 dark:text-white">2.3 GB of 10 GB</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '23%' }}></div>
          </div>
          
          <div className="space-y-3 mt-6">
            {[
              { type: 'Projects', size: '1.2 GB', percentage: 52 },
              { type: 'Files & Documents', size: '680 MB', percentage: 30 },
              { type: 'Images & Media', size: '320 MB', percentage: 14 },
              { type: 'Other', size: '100 MB', percentage: 4 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-900 dark:text-white">{item.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 dark:text-white font-medium">{item.size}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Backup Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">Automatic Backups</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically backup your data daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Backup Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Create Backup Now</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Restore from Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Retention</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delete old data after</label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="never">Never</option>
              <option value="1-year">1 Year</option>
              <option value="2-years">2 Years</option>
              <option value="5-years">5 Years</option>
            </select>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-yellow-800 dark:text-yellow-300">Data Retention Policy</h5>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  Deleted data cannot be recovered. Make sure to backup important data before enabling automatic deletion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h3>
        <p className="text-gray-600 dark:text-gray-400">Get help, report issues, and access resources.</p>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Documentation', description: 'Comprehensive guides and tutorials', icon: FileText, color: 'blue' },
          { title: 'Video Tutorials', description: 'Step-by-step video guides', icon: Video, color: 'purple' },
          { title: 'Community Forum', description: 'Connect with other users', icon: Users, color: 'green' },
          { title: 'Contact Support', description: 'Get help from our team', icon: MessageCircle, color: 'orange' },
          { title: 'Feature Requests', description: 'Suggest new features', icon: Zap, color: 'pink' },
          { title: 'Report Bug', description: 'Report issues and bugs', icon: AlertTriangle, color: 'red' }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h4>
        <div className="space-y-3">
          {[
            { service: 'API Services', status: 'Operational', uptime: '99.9%' },
            { service: 'AI Processing', status: 'Operational', uptime: '99.8%' },
            { service: 'File Storage', status: 'Operational', uptime: '100%' },
            { service: 'Authentication', status: 'Operational', uptime: '99.9%' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">{service.service}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">{service.status}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{service.uptime} uptime</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Support Email</h5>
            <p className="text-blue-600 dark:text-blue-400">support@innovatetech.ai</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Response Time</h5>
            <p className="text-gray-600 dark:text-gray-400">Usually within 24 hours</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Business Hours</h5>
            <p className="text-gray-600 dark:text-gray-400">Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Support</h5>
            <p className="text-gray-600 dark:text-gray-400">Available for Pro+ plans</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDangerTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
        <p className="text-gray-600 dark:text-gray-400">These actions are irreversible. Please proceed with caution.</p>
      </div>

      {/* Reset Settings */}
      <div className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-2">Reset All Settings</h4>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              Reset all your settings to default values. This will not delete your data or projects.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Reset Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete All Data */}
      <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Delete All Data</h4>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Permanently delete all your projects, files, and data. This will keep your account active but remove all content.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Database className="w-4 h-4" />
              <span>Delete All Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Delete Account</h4>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800">
                  <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Confirm Account Deletion</h5>
                  <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                    This will permanently delete your account, all your data, projects, and team information. 
                    This action cannot be undone.
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                    Type <strong>DELETE</strong> to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full px-3 py-2 border border-red-300 dark:border-red-600 rounded-lg bg-white dark:bg-red-900/20 text-red-900 dark:text-red-100 placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isDeleting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{isDeleting ? 'Deleting...' : 'Permanently Delete Account'}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                    disabled={isDeleting}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'account' && renderAccountTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
                {activeTab === 'privacy' && renderPrivacyTab()}
                {activeTab === 'appearance' && renderAppearanceTab()}
                {activeTab === 'accessibility' && renderAccessibilityTab()}
                {activeTab === 'integrations' && renderIntegrationsTab()}
                {activeTab === 'billing' && renderBillingTab()}
                {activeTab === 'security' && renderSecurityTab()}
                {activeTab === 'advanced' && renderAdvancedTab()}
                {activeTab === 'data' && renderDataTab()}
                {activeTab === 'support' && renderSupportTab()}
                {activeTab === 'danger' && renderDangerTab()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;