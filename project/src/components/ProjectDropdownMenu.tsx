import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface ProjectDropdownMenuProps {
  project: any;
  onEdit?: (project: any) => void;
  onDelete?: (project: any) => void;
  onView?: (project: any) => void;
  onDuplicate?: (project: any) => void;
  onUpdateProgress?: (project: any, progress: number) => void;
  onToggleFavorite?: (project: any) => void;
  onSetDeadline?: (project: any, deadline: string) => void;
}

const ProjectDropdownMenu: React.FC<ProjectDropdownMenuProps> = ({
  project,
  onEdit,
  onDelete,
  onView,
  onDuplicate,
  onUpdateProgress,
  onToggleFavorite,
  onSetDeadline
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const [progressValue, setProgressValue] = useState(project.progress || 0);
  const [deadlineValue, setDeadlineValue] = useState(project.dueDate || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowProgressInput(false);
        setShowDeadlineInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: () => void, shouldClose = true) => {
    action();
    if (shouldClose) setIsOpen(false);
  };

  const handleProgressUpdate = () => {
    if (onUpdateProgress) {
      onUpdateProgress(project, Math.min(100, Math.max(0, progressValue)));
    }
    setShowProgressInput(false);
    setIsOpen(false);
  };

  const handleDeadlineUpdate = () => {
    if (onSetDeadline) {
      onSetDeadline(project, deadlineValue);
    }
    setShowDeadlineInput(false);
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: Eye,
      label: 'View Details',
      action: () => onView?.(project),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Edit,
      label: 'Edit Project',
      action: () => onEdit?.(project),
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: TrendingUp,
      label: 'Update Progress',
      action: () => setShowProgressInput(true),
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: Calendar,
      label: 'Set Deadline',
      action: () => setShowDeadlineInput(true),
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Star,
      label: project.isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
      action: () => onToggleFavorite?.(project),
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: Copy,
      label: 'Duplicate',
      action: () => onDuplicate?.(project),
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: Trash2,
      label: 'Delete Project',
      action: () => onDelete?.(project),
      color: 'text-red-600 dark:text-red-400',
      separator: true
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {showProgressInput ? (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Update Progress
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(parseInt(e.target.value) || 0)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">%</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleProgressUpdate}
                  className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowProgressInput(false)}
                  className="flex-1 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : showDeadlineInput ? (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Set Deadline
                </label>
                <input
                  type="date"
                  value={deadlineValue}
                  onChange={(e) => setDeadlineValue(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleDeadlineUpdate}
                  className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Set
                </button>
                <button
                  onClick={() => setShowDeadlineInput(false)}
                  className="flex-1 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            menuItems.map((item, index) => {
              const Icon = item.icon;
              const shouldClose = !['Update Progress', 'Set Deadline'].includes(item.label);
              return (
                <div key={index}>
                  {item.separator && <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>}
                  <button
                    onClick={() => handleAction(item.action, shouldClose)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDropdownMenu;