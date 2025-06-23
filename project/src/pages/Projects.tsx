import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Star,
  GitBranch,
  MessageSquare,
  Upload
} from 'lucide-react';
import Navigation from '../components/Navigation';
import NewProjectModal from '../components/NewProjectModal';
import ExcelImportModal from '../components/ExcelImportModal';
import ProjectDropdownMenu from '../components/ProjectDropdownMenu';
import { useAuth } from '../contexts/AuthContext';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isExcelImportModalOpen, setIsExcelImportModalOpen] = useState(false);
  const { userData, updateUserData } = useAuth();

  // Only use user's actual projects, no default data
  const projects = userData?.projects || [];

  const handleNewProject = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastActivity: 'Just created',
      comments: 0
    };

    if (userData) {
      updateUserData({
        projects: [...(userData.projects || []), newProject]
      });
    }
  };

  const handleUpdateProgress = (project: any, progress: number) => {
    if (userData) {
      const updatedProjects = userData.projects.map(p => 
        p.id === project.id ? { ...p, progress } : p
      );
      updateUserData({
        projects: updatedProjects
      });
    }
  };

  const handleDeleteProject = (project: any) => {
    if (userData && window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      const updatedProjects = userData.projects.filter(p => p.id !== project.id);
      updateUserData({
        projects: updatedProjects
      });
    }
  };

  const handleEditProject = (project: any) => {
    // For now, just show an alert. You can implement a proper edit modal later
    alert(`Edit functionality for "${project.name}" - Coming soon!`);
  };

  const handleViewProject = (project: any) => {
    alert(`View details for "${project.name}" - Coming soon!`);
  };

  const handleDuplicateProject = (project: any) => {
    if (userData) {
      const duplicatedProject = {
        ...project,
        id: Date.now(),
        name: `${project.name} (Copy)`,
        createdAt: new Date().toISOString(),
        lastActivity: 'Just created',
        progress: 0
      };
      
      updateUserData({
        projects: [...userData.projects, duplicatedProject]
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'on-hold': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <GitBranch className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Get started by creating your first project or importing projects from Excel/CSV files.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setIsNewProjectModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Project</span>
        </button>
        <button 
          onClick={() => setIsExcelImportModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="w-5 h-5" />
          <span>Import from Excel</span>
        </button>
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {projects.length === 0 
                    ? 'Create and manage your projects' 
                    : `Manage and track your ${projects.length} project${projects.length === 1 ? '' : 's'}`
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button 
                  onClick={() => setIsExcelImportModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Excel</span>
                </button>
                <button 
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Project</span>
                </button>
              </div>
            </div>
          </div>

          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Filters and Search */}
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                    >
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                    >
                      <div className="w-4 h-4 flex flex-col space-y-1">
                        <div className="bg-current h-0.5 rounded"></div>
                        <div className="bg-current h-0.5 rounded"></div>
                        <div className="bg-current h-0.5 rounded"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Grid/List */}
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className={`w-4 h-4 ${getPriorityColor(project.priority)}`} />
                            <ProjectDropdownMenu 
                              project={project}
                              onEdit={handleEditProject}
                              onDelete={handleDeleteProject}
                              onView={handleViewProject}
                              onDuplicate={handleDuplicateProject}
                              onUpdateProgress={handleUpdateProgress}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {project.tasks.completed}/{project.tasks.total} tasks
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.dueDate || 'No deadline'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{project.comments}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {project.team?.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-medium"
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                            )) || (
                              <div className="text-xs text-gray-500 dark:text-gray-400">No team assigned</div>
                            )}
                            {project.team?.length > 3 && (
                              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-medium">
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewProject(project)}
                              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditProject(project)}
                              className="text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{project.description}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {project.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex -space-x-2">
                                {project.team?.slice(0, 3).map((member, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-medium"
                                  >
                                    {member.split(' ').map(n => n[0]).join('')}
                                  </div>
                                )) || (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">No team</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                              {project.dueDate || 'No deadline'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleViewProject(project)}
                                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditProject(project)}
                                  className="text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <ProjectDropdownMenu 
                                  project={project}
                                  onEdit={handleEditProject}
                                  onDelete={handleDeleteProject}
                                  onView={handleViewProject}
                                  onDuplicate={handleDuplicateProject}
                                  onUpdateProgress={handleUpdateProgress}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <NewProjectModal 
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleNewProject}
      />
      <ExcelImportModal 
        isOpen={isExcelImportModalOpen}
        onClose={() => setIsExcelImportModalOpen(false)}
        type="projects"
      />
    </div>
  );
};

export default Projects;