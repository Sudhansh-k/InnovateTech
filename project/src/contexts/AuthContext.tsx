import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  createdAt: string;
}

interface UserData {
  profile: {
    bio: string;
    phone: string;
    location: string;
    website: string;
    avatar: string;
  };
  business: {
    revenue: number;
    users: number;
    conversionRate: number;
    aiInteractions: number;
    industry?: string;
    companySize?: string;
    businessModel?: string;
    primaryGoal?: string;
    targetRevenue?: number;
    timeframe?: string;
  };
  projects: any[];
  team: any[];
  settings: {
    notifications: any;
    privacy: any;
    preferences: any;
    appearance?: any;
    accessibility?: any;
    integrations?: any;
    billing?: any;
    security?: any;
    advanced?: any;
    data?: any;
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedUser && savedUserData) {
      setUser(JSON.parse(savedUser));
      setUserData(JSON.parse(savedUserData));
    }
    setLoading(false);
  }, []);

  const register = async (formData: any): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find((u: any) => u.email === formData.email);
      
      if (userExists) {
        throw new Error('User already exists');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        createdAt: new Date().toISOString()
      };

      const newUserData: UserData = {
        profile: {
          bio: '',
          phone: '',
          location: '',
          website: '',
          avatar: `${formData.firstName[0]}${formData.lastName[0]}`
        },
        business: {
          revenue: 0,
          users: 0,
          conversionRate: 0,
          aiInteractions: 0
        },
        projects: [],
        team: [],
        settings: {
          notifications: {
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: true,
            marketingEmails: false,
            securityAlerts: true,
            projectUpdates: true,
            teamMentions: true,
            weeklyReports: true
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
            allowAnalytics: true,
            allowCookies: true,
            twoFactorAuth: false
          },
          preferences: {
            language: 'English',
            timezone: 'UTC',
            currency: 'USD'
          }
        }
      };

      // Save user to "database"
      existingUsers.push({ ...newUser, password: formData.password });
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Set current session
      setUser(newUser);
      setUserData(newUserData);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('userData', JSON.stringify(newUserData));

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Get user data
      const savedUserData = localStorage.getItem(`userData_${foundUser.id}`);
      let currentUserData: UserData;
      
      if (savedUserData) {
        currentUserData = JSON.parse(savedUserData);
      } else {
        // Create default user data for existing user
        currentUserData = {
          profile: {
            bio: '',
            phone: '',
            location: '',
            website: '',
            avatar: `${foundUser.firstName[0]}${foundUser.lastName[0]}`
          },
          business: {
            revenue: 0,
            users: 0,
            conversionRate: 0,
            aiInteractions: 0
          },
          projects: [],
          team: [],
          settings: {
            notifications: {
              emailNotifications: true,
              pushNotifications: false,
              smsNotifications: true,
              marketingEmails: false,
              securityAlerts: true,
              projectUpdates: true,
              teamMentions: true,
              weeklyReports: true
            },
            privacy: {
              profileVisibility: 'public',
              showEmail: false,
              showPhone: false,
              allowAnalytics: true,
              allowCookies: true,
              twoFactorAuth: false
            },
            preferences: {
              language: 'English',
              timezone: 'UTC',
              currency: 'USD'
            }
          }
        };
      }

      setUser(userWithoutPassword);
      setUserData(currentUserData);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('userData', JSON.stringify(currentUserData));
      localStorage.setItem(`userData_${foundUser.id}`, JSON.stringify(currentUserData));

      const loginRecord = {
        date: new Date().toLocaleString(),
        device: navigator.userAgent,
        status: 'Success',
        location: 'Local device'
      };
      const loginHistoryKey = `loginHistory_${foundUser.id}`;
      const prevHistory = JSON.parse(localStorage.getItem(loginHistoryKey) || '[]');
      localStorage.setItem(loginHistoryKey, JSON.stringify([loginRecord, ...prevHistory]));

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (!user || !userData) return;
    
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
    localStorage.setItem(`userData_${user.id}`, JSON.stringify(updatedData));
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update in users array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...data };
      localStorage.setItem('users', JSON.stringify(existingUsers));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      login,
      register,
      logout,
      updateUserData,
      updateUser,
      isAuthenticated: !!user,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};