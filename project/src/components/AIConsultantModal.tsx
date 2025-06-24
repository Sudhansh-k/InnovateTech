import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Video, 
  VideoOff, 
  Phone, 
  Settings,
  Maximize2,
  Minimize2,
  Download,
  Clock,
  User,
  BarChart3,
  Play,
  Pause,
  Mic,
  MicOff
} from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConsultantModal: React.FC<AIConsultantModalProps> = ({ isOpen, onClose }) => {
  const [consultantState, setConsultantState] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('🤖');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Array<{id: string, speaker: 'user' | 'ai', message: string, timestamp: Date}>>([]);
  const [currentTopic, setCurrentTopic] = useState('Getting Started');
  const [aiMood, setAiMood] = useState<'thinking' | 'speaking' | 'listening' | 'idle'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentExpression, setCurrentExpression] = useState('😊');
  const [isListening, setIsListening] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [tavusError, setTavusError] = useState<string | null>(null);
  const [micPressed, setMicPressed] = useState(false);
  
  const { generateBusinessInsight } = useAI();
  const { user, userData } = useAuth();
  const sessionStartTime = useRef<Date | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCleaningUpRef = useRef(false);
  const isModalOpenRef = useRef(isOpen);

  // Update modal open ref when isOpen changes
  useEffect(() => {
    isModalOpenRef.current = isOpen;
  }, [isOpen]);

  // AI Expressions for different moods
  const expressions = {
    idle: '😊',
    thinking: '🤔',
    speaking: '😄',
    listening: '👂',
    analyzing: '🧐',
    excited: '🤩',
    questioning: '🤨',
    waiting: '⏳'
  };

  // Comprehensive cleanup function
  const cleanupSession = useCallback(() => {
    if (isCleaningUpRef.current) return;
    isCleaningUpRef.current = true;
    
    console.log('🛑 Starting comprehensive AI Consultant cleanup...');
    
    try {
      // 1. Stop speech synthesis immediately and forcefully
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        speechSynthesis.cancel();
        speechSynthesis.pause();
        // Force stop any queued speech multiple times to ensure it stops
        setTimeout(() => speechSynthesis.cancel(), 50);
        setTimeout(() => speechSynthesis.cancel(), 100);
        setTimeout(() => speechSynthesis.cancel(), 200);
        console.log('✅ Speech synthesis stopped');
      }
      
      // 2. Stop voice recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          recognitionRef.current.stop();
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current = null;
          console.log('✅ Voice recognition stopped');
        } catch (error) {
          console.log('Voice recognition already stopped');
        }
      }
      
      // 3. Clear all timeouts and intervals
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
        console.log('✅ Silence timeout cleared');
      }
      
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
        sessionIntervalRef.current = null;
        console.log('✅ Session interval cleared');
      }
      
      // 4. Reset all states
      setConsultantState('connecting');
      setAiResponse('');
      setEmoji('🤖');
      setSessionStarted(false);
      setSessionDuration(0);
      setConversationHistory([]);
      setAiMood('idle');
      setCurrentExpression(expressions.idle);
      setIsSpeaking(false);
      setIsListening(false);
      setWaitingForResponse(false);
      sessionStartTime.current = null;
      speechRef.current = null;
      
      console.log('✅ All states reset');
      
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      // Reset cleanup flag after a delay to allow for any pending operations
      setTimeout(() => {
        isCleaningUpRef.current = false;
        console.log('✅ AI Consultant session fully cleaned up');
      }, 500);
    }
  }, []);

  // Session timer
  useEffect(() => {
    if (consultantState === 'connected' && sessionStarted && !isCleaningUpRef.current && isModalOpenRef.current) {
      sessionIntervalRef.current = setInterval(() => {
        if (sessionStartTime.current && isModalOpenRef.current) {
          const duration = Math.floor((Date.now() - sessionStartTime.current.getTime()) / 1000);
          setSessionDuration(duration);
        }
      }, 1000);
    } else {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
        sessionIntervalRef.current = null;
      }
    }

    return () => {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
      }
    };
  }, [consultantState, sessionStarted]);

  // Initialize AI Consultant when modal opens
  useEffect(() => {
    if (isOpen) {
      setConsultantState('connecting');
      setAiResponse('');
      setEmoji('🤖');
      setTimeout(() => {
        setConsultantState('connected');
        setEmoji('😊');
        const greetingMessage = 'Hello! I am your AI Business Consultant. How can I help you today?';
        setAiResponse(greetingMessage);
        speakMessage(greetingMessage, () => {
          setTimeout(() => {
            startListeningForUser();
          }, 1000);
        });
      }, 2000);
    }
  }, [isOpen]);

  // Cleanup when modal closes or component unmounts
  useEffect(() => {
    if (!isOpen) {
      cleanupSession();
    }
    
    // Cleanup when component unmounts
    return () => {
      cleanupSession();
    };
  }, [isOpen, cleanupSession]);

  // Ensure session timer starts when AI is connected
  useEffect(() => {
    if (consultantState === 'connected' && !sessionStarted && !isCleaningUpRef.current && isModalOpenRef.current) {
      setSessionStarted(true);
      sessionStartTime.current = new Date();
    }
  }, [consultantState]);

  const speakMessage = (message: string, onComplete?: () => void) => {
    if (isCleaningUpRef.current || !isModalOpenRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }

    // Cancel any ongoing speech first
    speechSynthesis.cancel();
    
    setIsSpeaking(true);
    setAiMood('speaking');
    setCurrentExpression(expressions.speaking);
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Find a good voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.includes('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) {
        speechSynthesis.cancel();
        return;
      }
      setIsSpeaking(true);
      setAiMood('speaking');
      setCurrentExpression(expressions.speaking);
    };
    
    utterance.onend = () => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      setIsSpeaking(false);
      if (onComplete) onComplete();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      setIsSpeaking(false);
      if (onComplete) onComplete();
    };
    
    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const startListeningForUser = () => {
    if (typeof window === 'undefined' || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
      setTimeout(() => {
        if (!isCleaningUpRef.current && isModalOpenRef.current) {
          const fallbackMessage = "I notice your browser doesn't support voice recognition. Please click on any topic below or type your question, and I'll be happy to help!";
          speakMessage(fallbackMessage);
        }
      }, 1000);
      return;
    }

    if (isCleaningUpRef.current || !isModalOpenRef.current) return;

    setIsListening(true);
    setWaitingForResponse(true);
    setAiMood('listening');
    setCurrentExpression(expressions.listening);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) {
        recognition.stop();
        return;
      }
      console.log('🎤 Voice recognition started - listening for user...');
      setIsListening(true);
      setAiMood('listening');
      setCurrentExpression(expressions.listening);
      
      // Set a timeout for silence
      silenceTimeoutRef.current = setTimeout(() => {
        if (recognition && !isCleaningUpRef.current && isModalOpenRef.current) {
          recognition.stop();
        }
        if (!isCleaningUpRef.current && isModalOpenRef.current) {
          handleNoResponse();
        }
      }, 10000); // 10 seconds timeout
    };

    recognition.onresult = (event: any) => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      
      const userInput = event.results[0][0].transcript;
      console.log('👤 User said:', userInput);
      
      setIsListening(false);
      setWaitingForResponse(false);
      
      // Add user input to conversation
      addToConversation('user', userInput);
      
      // Process the user input and respond
      processUserInput(userInput);
    };

    recognition.onerror = (event: any) => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      
      console.error('🚨 Speech recognition error:', event.error);
      setIsListening(false);
      setWaitingForResponse(false);
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      
      if (event.error === 'no-speech') {
        handleNoResponse();
      } else if (event.error === 'not-allowed') {
        const permissionMessage = "I need microphone permission to hear you. Please click on any topic below, and I'll provide insights on that area.";
        speakMessage(permissionMessage);
      } else {
        const errorMessage = "I didn't catch that. Could you please repeat your question, or click on one of the topics below?";
        speakMessage(errorMessage, () => {
          if (!isCleaningUpRef.current && isModalOpenRef.current) {
            setTimeout(() => startListeningForUser(), 2000);
          }
        });
      }
    };

    recognition.onend = () => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      console.log('🎤 Voice recognition ended');
      setIsListening(false);
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    };

    recognitionRef.current = recognition;
    // Set aiMood to listening right before starting recognition
    setAiMood('listening');
    setCurrentExpression(expressions.listening);
    recognition.start();
  };

  // If no user response, say a friendly prompt and listen again
  const handleNoResponse = () => {
    if (isCleaningUpRef.current || !isModalOpenRef.current) return;
    setIsListening(false);
    setWaitingForResponse(false);
    setAiMood('speaking');
    setCurrentExpression(expressions.questioning);
    const noResponseMessages = [
      "I didn't hear anything. Could you please repeat your question or try clicking a topic?",
      "Are you still there? Feel free to ask me about revenue growth, team scaling, or any business challenge.",
      "No worries if you're thinking! You can also click on any topic below, and I'll share insights on that area.",
      "Take your time! When you're ready, ask me about any aspect of your business, or choose a topic from the sidebar."
    ];
    const randomMessage = noResponseMessages[Math.floor(Math.random() * noResponseMessages.length)];
    speakMessage(randomMessage, () => {
      if (!isCleaningUpRef.current && isModalOpenRef.current) {
        setTimeout(() => startListeningForUser(), 2000);
      }
    });
  };

  // After every AI response, always call startListeningForUser()
  const processUserInput = (userInput: string) => {
    if (isCleaningUpRef.current || !isModalOpenRef.current) return;
    setAiMood('thinking');
    setCurrentExpression(expressions.analyzing);
    setTimeout(() => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      const response = generateContextualResponse(userInput);
      addToConversation('ai', response);
      speakMessage(response, () => {
        if (!isCleaningUpRef.current && isModalOpenRef.current) {
          setTimeout(() => startListeningForUser(), 1000);
        }
      });
    }, 1500);
  };

  const generateContextualResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Revenue-related queries
    if (input.includes('revenue') || input.includes('money') || input.includes('sales') || input.includes('income')) {
      if (userData?.business?.revenue && userData.business.revenue > 0) {
        return `Great question about revenue! With your current $${userData.business.revenue.toLocaleString()}, I see several growth opportunities. You could focus on increasing your average order value, expanding to new customer segments, or optimizing your pricing strategy. Which of these areas interests you most?`;
      } else {
        return `Revenue growth is crucial! Since I don't see your current revenue data, let's start with the basics. What's your primary revenue source right now? Are you selling products, services, or subscriptions? Understanding this will help me give you targeted advice.`;
      }
    }
    
    // Team and scaling queries
    if (input.includes('team') || input.includes('hire') || input.includes('staff') || input.includes('employee')) {
      if (userData?.team && userData.team.length > 0) {
        return `Your team of ${userData.team.length} members is a great foundation! For scaling, I recommend focusing on clear role definitions, efficient communication systems, and performance tracking. What's your biggest team challenge right now - communication, productivity, or finding the right talent?`;
      } else {
        return `Building the right team is essential for growth! I suggest starting with roles that directly impact revenue generation. What's the most critical position you need to fill first - sales, marketing, or technical development?`;
      }
    }
    
    // Customer and marketing queries
    if (input.includes('customer') || input.includes('marketing') || input.includes('acquisition') || input.includes('conversion')) {
      if (userData?.business?.conversionRate && userData.business.conversionRate > 0) {
        return `Your ${userData.business.conversionRate}% conversion rate has room for improvement! I recommend A/B testing your landing pages, optimizing your sales funnel, and creating targeted content. Would you like me to elaborate on any of these strategies?`;
      } else {
        return `Customer acquisition is vital! I suggest developing a multi-channel approach including content marketing, social media, and strategic partnerships. What's your current customer acquisition strategy, and where do most of your customers come from?`;
      }
    }
    
    // General business questions
    if (input.includes('grow') || input.includes('scale') || input.includes('expand')) {
      return `Excellent question about growth! Based on successful businesses I've consulted with, the key is focusing on three pillars: optimizing your current operations, expanding your market reach, and building scalable systems. Which of these areas would you like to dive deeper into?`;
    }
    
    // Competition queries
    if (input.includes('competitor') || input.includes('competition') || input.includes('market')) {
      return `Understanding your competitive landscape is crucial! I recommend conducting a thorough competitive analysis to identify gaps in the market and your unique value proposition. Who do you consider your main competitors, and what makes your solution different?`;
    }
    
    // Financial planning
    if (input.includes('finance') || input.includes('budget') || input.includes('cash flow') || input.includes('investment')) {
      return `Financial planning is the backbone of sustainable growth! I suggest implementing cash flow forecasting, setting up key financial metrics tracking, and creating scenario planning. Are you looking for help with budgeting, fundraising, or financial projections?`;
    }
    
    // Technology and AI
    if (input.includes('technology') || input.includes('ai') || input.includes('automation') || input.includes('digital')) {
      return `Technology and AI can be game-changers for your business! I recommend starting with automating repetitive tasks, implementing data analytics for better decision-making, and exploring AI tools for customer service. What business processes are currently taking up most of your time?`;
    }
    
    // Vague or unclear input
    if (input.length < 10 || input.includes('help') || input.includes('what') || input.includes('how')) {
      return `I'd love to help you with that! To give you the most valuable advice, could you be more specific? For example, are you looking to increase revenue, improve operations, scale your team, or something else? The more details you share, the better I can assist you.`;
    }
    
    // Default response for unrecognized input
    return `That's an interesting point about ${userInput}. Let me think about how this applies to your business context. Based on your current metrics, I'd recommend focusing on sustainable growth strategies. Could you tell me more about what specific outcome you're hoping to achieve? This will help me provide more targeted advice.`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const consultantTopics = [
    'Revenue Growth',
    'Team Scaling', 
    'Market Strategy',
    'Operational Efficiency',
    'Customer Acquisition',
    'Product Development',
    'Competitive Analysis',
    'Financial Planning'
  ];

  const addToConversation = (speaker: 'user' | 'ai', message: string) => {
    if (isCleaningUpRef.current || !isModalOpenRef.current) return;
    
    setConversationHistory(prev => [...prev, {
      id: Date.now().toString(),
      speaker,
      message,
      timestamp: new Date()
    }]);
  };

  const handleTopicChange = (topic: string) => {
    if (isCleaningUpRef.current || !isModalOpenRef.current) return;
    
    // Stop any current listening
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setWaitingForResponse(false);
    
    setCurrentTopic(topic);
    setAiMood('thinking');
    setCurrentExpression(expressions.thinking);
    
    setTimeout(() => {
      if (isCleaningUpRef.current || !isModalOpenRef.current) return;
      
      let topicMessage = '';
      
      // Generate specific advice based on topic and user data
      switch (topic) {
        case 'Revenue Growth':
          topicMessage = userData?.business.revenue 
            ? `Excellent choice! With $${userData.business.revenue.toLocaleString()} in current revenue, I see several opportunities. Let's focus on optimizing your pricing strategy and expanding your customer base. I recommend implementing a tiered pricing model and exploring upselling opportunities with your existing ${userData.business.users} users. What's your current average customer value?`
            : `Revenue growth is crucial for any business! Let's start by analyzing your current business model and identifying the most profitable revenue streams. What's your primary source of income right now, and what's your target revenue for the next quarter?`;
          break;
        case 'Team Scaling':
          topicMessage = userData?.team?.length 
            ? `Your team of ${userData.team.length} members shows good momentum! As you scale, I recommend focusing on clear role definitions, efficient communication channels, and implementing performance tracking systems. What's your biggest team challenge right now - finding talent, managing productivity, or improving communication?`
            : `Building the right team is essential for growth! I suggest starting with key roles that directly impact revenue generation. What positions do you need to fill first, and what's your budget for new hires?`;
          break;
        case 'Market Strategy':
          topicMessage = `Market positioning is key to sustainable growth! I recommend conducting a competitive analysis and identifying your unique value proposition. Understanding your target market's pain points will help you position your solution effectively. Who are your main competitors, and what makes your offering unique?`;
          break;
        case 'Customer Acquisition':
          topicMessage = userData?.business.conversionRate 
            ? `Your ${userData.business.conversionRate}% conversion rate has room for improvement! I suggest implementing A/B testing on your landing pages, optimizing your sales funnel, and creating targeted content marketing campaigns. Let's work on increasing that conversion rate to 5-7%. What's your current customer acquisition cost?`
            : `Customer acquisition is the lifeblood of any business! I recommend developing a multi-channel approach including content marketing, social media, and strategic partnerships. What's your current customer acquisition strategy, and which channels are performing best?`;
          break;
        case 'Financial Planning':
          topicMessage = `Financial planning is crucial for sustainable growth! I recommend implementing cash flow forecasting, setting up key financial metrics tracking, and creating scenario planning for different growth trajectories. Are you looking for help with budgeting, fundraising, or financial projections? What's your biggest financial challenge right now?`;
          break;
        default:
          topicMessage = `Let's dive deep into ${topic.toLowerCase()}! Based on your business metrics, I have specific recommendations that can help you optimize this area. What specific aspect of ${topic.toLowerCase()} would you like to focus on first?`;
      }
      
      addToConversation('ai', topicMessage);
      speakMessage(topicMessage, () => {
        if (!isCleaningUpRef.current && isModalOpenRef.current) {
          setTimeout(() => startListeningForUser(), 2000);
        }
      });
      
    }, 1500);
  };

  const handleEndCall = () => {
    console.log('📞 User clicked end call - initiating immediate cleanup...');
    
    // Immediately cleanup everything
    cleanupSession();
    
    // Close the modal
    onClose();
  };

  const downloadTranscript = () => {
    const transcript = conversationHistory.map(item => 
      `[${item.timestamp.toLocaleTimeString()}] ${item.speaker.toUpperCase()}: ${item.message}`
    ).join('\n\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-consultation-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getAiMoodIndicator = () => {
    switch (aiMood) {
      case 'thinking':
        return (
          <div className="flex items-center space-x-2 text-yellow-300">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Analyzing your business...</span>
          </div>
        );
      case 'speaking':
        return (
          <div className="flex items-center space-x-2 text-blue-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Speaking...</span>
          </div>
        );
      case 'listening':
        return (
          <div className="flex items-center space-x-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm">{waitingForResponse ? 'Waiting for your response...' : 'Ready to help'}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm">Ready</span>
          </div>
        );
    }
  };

  // Update emoji background to glassy, semi-transparent white with colored border/glow by mood
  const getEmojiBorderColor = () => {
    if (aiMood === 'speaking') return '#2563eb'; // blue
    if (aiMood === 'thinking') return '#facc15'; // yellow
    if (aiMood === 'listening') return '#22c55e'; // green
    return '#cbd5e1'; // gray for idle/connecting
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-50`}>
      <div className={`bg-[#181c23]/95 rounded-2xl shadow-2xl flex flex-col w-full max-w-6xl h-[90vh] border border-gray-700/50`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 ${consultantState === 'connected' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full animate-pulse`}></div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Business Consultant</h2>
              <div className="flex items-center space-x-4 text-sm">
                {getAiMoodIndicator()}
                {consultantState === 'connected' && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(sessionDuration)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEndCall}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Video Area */}
          <div className="flex-1 relative rounded-lg m-4 overflow-y-auto" style={{
            background: 'rgba(10, 14, 20, 0.92)',
            position: 'relative',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(20,30,60,0.55)',
              zIndex: 1,
              borderRadius: 'inherit',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              {consultantState === 'connecting' && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <div style={{
                    fontSize: 140,
                    margin: '0 auto',
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa',
                    fontWeight: 800,
                    background: 'radial-gradient(circle at 60% 40%, #3b82f6 0%, #1e40af 100%)',
                    boxShadow: '0 8px 32px 0 #1e40af33',
                    transition: 'color 0.3s, transform 0.1s',
                    animation: aiMood === 'listening' ? 'pulse 1.2s infinite, scaleUp 0.2s' : 'pulse 1.5s infinite',
                  }}>{expressions[aiMood] || expressions.idle}</div>
                  <div style={{ marginTop: 24, fontWeight: 700, fontSize: 28, letterSpacing: 0.5, color: '#60a5fa' }}>Connecting to AI Consultant...</div>
                  <div style={{ fontSize: 14, color: '#e0e7ef', marginTop: 8 }}>Analyzing your business data and preparing insights...</div>
                </div>
              )}
              {consultantState === 'connected' && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <div style={{
                    fontSize: 140,
                    margin: '0 auto',
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa',
                    fontWeight: 800,
                    background: 'radial-gradient(circle at 60% 40%, #3b82f6 0%, #1e40af 100%)',
                    boxShadow: '0 8px 32px 0 #1e40af33',
                    transition: 'color 0.3s, transform 0.1s',
                    animation: aiMood === 'listening' ? 'pulse 1.2s infinite, scaleUp 0.2s' : 'pulse 1.5s infinite',
                  }}>{expressions[aiMood] || expressions.idle}</div>
                  <div style={{ marginTop: 24, fontWeight: 700, fontSize: 28, letterSpacing: 0.5, color: '#60a5fa' }}>{aiResponse}</div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-l border-blue-700/30 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-800" style={{ maxHeight: '100%' }}>
            {/* Topics */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold mb-3">Discussion Topics</h3>
              <div className="space-y-2">
                {consultantTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicChange(topic)}
                    disabled={aiMood === 'thinking' || isSpeaking || isCleaningUpRef.current}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 ${
                      currentTopic === topic
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-blue-900/30 hover:text-white'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Metrics */}
            {userData && (
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Your Metrics
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-white">${userData.business.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Users:</span>
                    <span className="text-white">{userData.business.users.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversion:</span>
                    <span className="text-white">{userData.business.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Projects:</span>
                    <span className="text-white">{userData.projects.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl border-t border-blue-700/30">
          <div className="flex items-center space-x-4">
            {/* Microphone Control */}
            <button
              onClick={() => {
                if (isCleaningUpRef.current || !isModalOpenRef.current) return;
                if (isListening) {
                  if (recognitionRef.current) recognitionRef.current.stop();
                  setIsListening(false);
                  setWaitingForResponse(false);
                } else {
                  startListeningForUser();
                }
              }}
              disabled={isCleaningUpRef.current}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
                isListening ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 animate-pulse' : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
              } ${micPressed ? 'scale-90 ring-4 ring-blue-400/40' : ''}`}
              onMouseDown={() => setMicPressed(true)}
              onMouseUp={() => setMicPressed(false)}
              onMouseLeave={() => setMicPressed(false)}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            {/* Speech Control */}
            <button
              onClick={() => {
                if (isCleaningUpRef.current || !isModalOpenRef.current) return;
                if (isSpeaking) {
                  speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else {
                  // Replay last message if available
                  const lastAiMessage = conversationHistory.filter(item => item.speaker === 'ai').pop();
                  if (lastAiMessage) {
                    speakMessage(lastAiMessage.message);
                  }
                }
              }}
              disabled={isCleaningUpRef.current}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
                isSpeaking ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
              } ${micPressed ? 'scale-90 ring-4 ring-blue-400/40' : ''}`}
              onMouseDown={() => setMicPressed(true)}
              onMouseUp={() => setMicPressed(false)}
              onMouseLeave={() => setMicPressed(false)}
            >
              {isSpeaking ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
          </div>
          
          {/* End Call - moved to the right */}
          <button
            onClick={handleEndCall}
            className={`w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full flex items-center justify-center hover:from-red-700 hover:to-red-800 transition-colors`}
            onMouseDown={() => setMicPressed(true)}
            onMouseUp={() => setMicPressed(false)}
            onMouseLeave={() => setMicPressed(false)}
          >
            <Phone className="w-6 h-6 transform rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultantModal;