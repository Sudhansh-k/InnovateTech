import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare,
  Video,
  Phone,
  Mail,
  UserMinus,
  UserPlus,
  Shield,
  Award,
  Calendar,
  Settings,
  Download,
  TrendingUp
} from 'lucide-react';

interface TeamMemberDropdownMenuProps {
  member: any;
  onEdit?: (member: any) => void;
  onDelete?: (member: any) => void;
  onView?: (member: any) => void;
  onMessage?: (member: any) => void;
  onVideoCall?: (member: any) => void;
  onPhoneCall?: (member: any) => void;
  onEmail?: (member: any) => void;
  onPromote?: (member: any) => void;
  onDemote?: (member: any) => void;
  onChangeRole?: (member: any) => void;
  onAssignProject?: (member: any) => void;
  onViewSchedule?: (member: any) => void;
  onMemberSettings?: (member: any) => void;
  onExportProfile?: (member: any) => void;
  onUpdateProgress?: (member: any, completedTasks: number, totalTasks: number) => void;
}

const TeamMemberDropdownMenu: React.FC<TeamMemberDropdownMenuProps> = ({
  member,
  onEdit,
  onDelete,
  onView,
  onMessage,
  onVideoCall,
  onPhoneCall,
  onEmail,
  onPromote,
  onDemote,
  onChangeRole,
  onAssignProject,
  onViewSchedule,
  onMemberSettings,
  onExportProfile,
  onUpdateProgress
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [completedValue, setCompletedValue] = useState(member.completedTasks || 0);
  const [totalValue, setTotalValue] = useState(member.totalTasks || 1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowTaskInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: () => void, shouldClose = true) => {
    action();
    if (shouldClose) setIsOpen(false);
  };

  const handleTaskUpdate = () => {
    if (onUpdateProgress) {
      onUpdateProgress(member, Math.max(0, completedValue), Math.max(1, totalValue));
    }
    setShowTaskInput(false);
    setIsOpen(false);
  };

  const isLeader = member.department === 'Leadership' || member.role.toLowerCase().includes('ceo') || member.role.toLowerCase().includes('cto');

  const menuItems = [
    {
      icon: Eye,
      label: 'View Profile',
      action: () => onView?.(member),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Edit,
      label: 'Edit Profile',
      action: () => onEdit?.(member),
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: TrendingUp,
      label: 'Update Tasks',
      action: () => {
        setCompletedValue(member.completedTasks || 0);
        setTotalValue(member.totalTasks || 1);
        setShowTaskInput(true);
      },
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const removeItem = {
    icon: UserMinus,
    label: 'Remove from Team',
    action: () => onDelete?.(member),
    color: 'text-red-600 dark:text-red-400',
    separator: true
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTaskInput(false);
        }}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {showTaskInput ? (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Update Task Progress
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Done:</label>
                  <input
                    type="number"
                    min="0"
                    value={completedValue}
                    onChange={(e) => setCompletedValue(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <label className="text-xs text-gray-600 dark:text-gray-400">Total:</label>
                  <input
                    type="number"
                    min="1"
                    value={totalValue}
                    onChange={(e) => setTotalValue(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleTaskUpdate}
                    className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowTaskInput(false)}
                    className="flex-1 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    <button
                      onClick={() => handleAction(item.action)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  </div>
                );
              })}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <button
                onClick={() => handleAction(removeItem.action)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <removeItem.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>{removeItem.label}</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberDropdownMenu;