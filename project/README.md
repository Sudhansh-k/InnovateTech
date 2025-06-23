# InnovateTech Platform

A comprehensive AI-powered business management platform with voice assistants, video consultations, and real-time analytics.

## Features

- 🤖 **AI Voice Assistant** - Voice-controlled dashboard with natural language processing
- 🎥 **AI Video Consultants** - Real-time AI video agents powered by Tavus for personalized consultations
- 📊 **Real-time Analytics** - Advanced analytics dashboard with predictive insights
- 👥 **Team Collaboration** - Integrated collaboration tools with AI-powered project management
- 🔒 **Enterprise Security** - Bank-level security with end-to-end encryption
- 📱 **Responsive Design** - Works seamlessly across all devices

## Tavus Integration

This platform integrates with Tavus for realistic AI video consultations. To set up Tavus:

### 1. Get Tavus API Credentials

1. Sign up at [Tavus.io](https://tavus.io)
2. Create a new replica (AI avatar)
3. Get your API key and replica ID from the dashboard

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TAVUS_API_KEY=your_tavus_api_key_here
VITE_TAVUS_REPLICA_ID=your_replica_id_here
```

### 3. Tavus Features

- **Real-time Video Conversations**: Lifelike AI consultant that responds in real-time
- **Voice Recognition**: Speaks and listens naturally using advanced speech processing
- **Business Context**: AI understands your business metrics and provides personalized advice
- **Session Recording**: Optional recording and transcription of consultation sessions
- **Multi-language Support**: Supports multiple languages for global teams

### 4. Fallback Mode

If Tavus is not configured or fails to connect, the system automatically falls back to a static AI consultant with text-based interactions.

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Tavus account (for video AI features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd innovatetech-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Tavus credentials
```

4. Start the development server:
```bash
npm run dev
```

### Tavus Setup Guide

1. **Create Tavus Account**: Visit [tavus.io](https://tavus.io) and sign up
2. **Create AI Replica**: Upload photos/videos to create your business consultant avatar
3. **Configure Persona**: Set up the AI's personality, expertise, and speaking style
4. **Get API Credentials**: Copy your API key and replica ID from the dashboard
5. **Test Integration**: The AI consultant will automatically use Tavus when properly configured

### API Endpoints Used

- `POST /v2/conversations` - Create new consultation session
- `POST /v2/conversations/{id}/speak` - Send message to AI
- `POST /v2/conversations/{id}/listen` - Process user audio input
- `POST /v2/conversations/{id}/end` - End consultation session

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI Video**: Tavus API for realistic video consultations
- **Voice**: Web Speech API with Tavus audio processing
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify ready

## Key Components

### AI Consultant Modal (`AIConsultantModal.tsx`)
- Integrates with Tavus for video AI consultations
- Real-time voice recognition and response
- Business context awareness
- Session management and recording
- Fallback to static consultant if Tavus unavailable

### Voice Assistant (`VoiceAssistant.tsx`)
- Voice-controlled business insights
- Natural language processing
- Quick command shortcuts
- Audio feedback and responses

### Analytics Dashboard
- Real-time business metrics
- Interactive charts and graphs
- Export functionality
- Time range filtering

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
- Connect your repository to Netlify
- Set environment variables in Netlify dashboard
- Deploy automatically on push

### Environment Variables for Production

Make sure to set these in your deployment platform:

```
VITE_TAVUS_API_KEY=your_production_tavus_api_key
VITE_TAVUS_REPLICA_ID=your_production_replica_id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially Tavus integration)
5. Submit a pull request

## Support

For Tavus-specific issues:
- Check the [Tavus Documentation](https://docs.tavus.io)
- Contact Tavus support for API issues

For platform issues:
- Create an issue in this repository
- Include steps to reproduce
- Mention if it's related to Tavus integration

## License

This project is licensed under the MIT License.