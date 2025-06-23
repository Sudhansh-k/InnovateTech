import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Mail, 
  MessageCircle, 
  Share2, 
  Check,
  Users,
  Link as LinkIcon,
  Send
} from 'lucide-react';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamInviteModal: React.FC<TeamInviteModalProps> = ({ isOpen, onClose }) => {
  const [inviteMethod, setInviteMethod] = useState<'link' | 'email'>('link');
  const [emailList, setEmailList] = useState('');
  const [message, setMessage] = useState('Join our team on InnovateTech! We\'re building something amazing together.');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const inviteLink = `${window.location.origin}/invite?token=abc123xyz&team=innovatetech`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${message}\n\n${inviteLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Join our team on InnovateTech');
    const body = encodeURIComponent(`${message}\n\nClick here to join: ${inviteLink}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSendInvites = async () => {
    setSending(true);
    
    // Simulate sending invites
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would typically send the invites via your backend
    console.log('Sending invites to:', emailList.split(',').map(email => email.trim()));
    
    setSending(false);
    onClose();
    
    // Show success message (you could use a toast notification here)
    alert('Invitations sent successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Invite Team Members</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Grow your team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Method Selection */}
          <div className="mb-6">
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setInviteMethod('link')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  inviteMethod === 'link'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Share Link
              </button>
              <button
                onClick={() => setInviteMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  inviteMethod === 'email'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Send Email
              </button>
            </div>
          </div>

          {inviteMethod === 'link' ? (
            <div className="space-y-4">
              {/* Invite Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Invitation Link
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{inviteLink}</p>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`p-3 rounded-lg transition-colors flex-shrink-0 ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Add a personal message..."
                />
              </div>

              {/* Share Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Share via
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">WhatsApp</span>
                  </button>
                  <button
                    onClick={handleEmailShare}
                    className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Email</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LinkIcon className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Email List */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Addresses
                </label>
                <textarea
                  value={emailList}
                  onChange={(e) => setEmailList(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter email addresses separated by commas&#10;example@company.com, another@company.com"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Separate multiple emails with commas
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Invitation Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Add a personal message..."
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendInvites}
                disabled={!emailList.trim() || sending}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{sending ? 'Sending...' : 'Send Invitations'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-2xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Invited members will receive access to your team workspace and projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamInviteModal;