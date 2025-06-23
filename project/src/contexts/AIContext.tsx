import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface AIContextType {
  isListening: boolean;
  isProcessing: boolean;
  lastResponse: string;
  startListening: () => void;
  stopListening: () => void;
  processVoiceCommand: (command: string) => Promise<string>;
  processTextCommand: (command: string) => Promise<string>;
  generateBusinessInsight: () => string;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData, updateUserData } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  const generateBusinessInsight = useCallback(() => {
    if (!userData) return "Please complete your profile to get personalized insights.";

    const { business, projects, team } = userData;
    
    if (business.revenue === 0) {
      return "Start by adding your business metrics in the dashboard to get AI-powered insights about your performance.";
    }

    const insights = [
      `Based on your current revenue of $${business.revenue.toLocaleString()}, you're performing well in your market segment.`,
      `With ${business.users} active users, your user engagement could be optimized further.`,
      `Your ${projects.length} active projects show good momentum. Consider prioritizing high-impact initiatives.`,
      `Your team of ${team.length} members has great potential for scaling operations.`,
      `Your conversion rate of ${business.conversionRate}% suggests room for optimization in your sales funnel.`
    ];

    return insights[Math.floor(Math.random() * insights.length)];
  }, [userData]);

  const processTextCommand = useCallback(async (command: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const lowerCommand = command.toLowerCase();
      
      if (!userData) {
        return "Please log in to access personalized AI assistance.";
      }

      // Business metrics queries
      if (lowerCommand.includes('revenue') || lowerCommand.includes('money') || lowerCommand.includes('sales')) {
        if (userData.business.revenue === 0) {
          return "I don't see any revenue data yet. Would you like me to help you set up your business metrics? You can add this information in your dashboard settings.";
        }
        return `Your current revenue is $${userData.business.revenue.toLocaleString()}. Based on this data, I recommend focusing on customer retention strategies to increase recurring revenue.`;
      }

      if (lowerCommand.includes('project') || lowerCommand.includes('task')) {
        if (userData.projects.length === 0) {
          return "You don't have any projects yet. Would you like me to help you create your first project? I can guide you through setting up project goals and timelines.";
        }
        return `You have ${userData.projects.length} active projects. Your most recent project needs attention. Would you like me to help prioritize your tasks?`;
      }

      if (lowerCommand.includes('team') || lowerCommand.includes('member')) {
        if (userData.team.length === 0) {
          return "You haven't added any team members yet. Building a strong team is crucial for growth. Would you like tips on hiring or team management?";
        }
        return `Your team has ${userData.team.length} members. Based on current workload, I suggest reviewing task distribution to optimize productivity.`;
      }

      if (lowerCommand.includes('analytics') || lowerCommand.includes('data') || lowerCommand.includes('insight')) {
        return generateBusinessInsight();
      }

      if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
        return `I'm your AI business assistant! I can help you with:
        
• Analyzing your business metrics and revenue
• Managing projects and tasks
• Team coordination and productivity tips
• Growth strategies and recommendations
• Setting up business goals and KPIs

What would you like to work on today?`;
      }

      if (lowerCommand.includes('grow') || lowerCommand.includes('scale') || lowerCommand.includes('increase')) {
        if (userData.business.revenue === 0) {
          return "To provide growth strategies, I need to understand your current business metrics. Please add your revenue, user count, and other key metrics in the dashboard.";
        }
        return `Based on your current metrics, here are 3 growth strategies:
        
1. Focus on increasing your conversion rate from ${userData.business.conversionRate}% to 5%
2. Implement customer retention programs to boost recurring revenue
3. Optimize your AI interactions (currently ${userData.business.aiInteractions}) for better user engagement

Would you like me to elaborate on any of these strategies?`;
      }

      // Default response for unrecognized commands
      return `I understand you're asking about "${command}". I'm here to help with your business management needs. You can ask me about:

• Your revenue and financial metrics
• Project management and task prioritization  
• Team performance and coordination
• Business growth strategies
• Analytics and insights

Try asking something like "How can I increase my revenue?" or "Show me my project status."`;

    } finally {
      setIsProcessing(false);
    }
  }, [userData, generateBusinessInsight]);

  const processVoiceCommand = useCallback(async (command: string): Promise<string> => {
    // Increment AI interactions
    if (userData) {
      updateUserData({
        business: {
          ...userData.business,
          aiInteractions: userData.business.aiInteractions + 1
        }
      });
    }
    
    return processTextCommand(command);
  }, [userData, updateUserData, processTextCommand]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setLastResponse("Speech recognition is not supported in your browser. Please try using Chrome or Edge.");
      return;
    }

    setIsListening(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = async (event: any) => {
      const command = event.results[0][0].transcript;
      console.log('Voice command:', command);
      
      const response = await processVoiceCommand(command);
      setLastResponse(response);
      
      // Use speech synthesis to respond
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        setLastResponse("I didn't hear anything. Could you please repeat your question?");
      } else if (event.error === 'not-allowed') {
        setLastResponse("Please allow microphone access to use voice commands.");
      } else {
        setLastResponse("Sorry, I couldn't understand that. Could you please try again or type your question?");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [processVoiceCommand]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return (
    <AIContext.Provider value={{
      isListening,
      isProcessing,
      lastResponse,
      startListening,
      stopListening,
      processVoiceCommand,
      processTextCommand,
      generateBusinessInsight
    }}>
      {children}
    </AIContext.Provider>
  );
};