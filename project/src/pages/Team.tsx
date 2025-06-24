import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Users,
  MessageSquare,
  Video,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Activity,
  Upload
} from 'lucide-react';
import Navigation from '../components/Navigation';
import TeamInviteModal from '../components/TeamInviteModal';
import AddMemberModal from '../components/AddMemberModal';
import ExcelImportModal from '../components/ExcelImportModal';
import TeamMemberDropdownMenu from '../components/TeamMemberDropdownMenu';
import { useAuth } from '../contexts/AuthContext';

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isExcelImportModalOpen, setIsExcelImportModalOpen] = useState(false);
  const { userData, updateUserData } = useAuth();
  const [viewingMember, setViewingMember] = useState<any | null>(null);
  const [editingMember, setEditingMember] = useState<any | null>(null);

  // Only use user's actual team members, no default data
  const teamMembers = userData?.team || [];

  const handleAddMember = (memberData: any) => {
    if (userData) {
      updateUserData({
        team: [...(userData.team || []), memberData]
      });
    }
  };

  const handleUpdateProgress = (member: any, completedTasks: number, totalTasks: number) => {
    if (userData) {
      const updatedTeam = userData.team.map(m => 
        m.id === member.id ? { ...m, completedTasks, totalTasks } : m
      );
      updateUserData({
        team: updatedTeam
      });
    }
  };

  const handleDeleteMember = (member: any) => {
    if (userData && window.confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      const updatedTeam = userData.team.filter(m => m.id !== member.id);
      updateUserData({
        team: updatedTeam
      });
    }
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
  };

  const handleSaveEditMember = (updatedMember: any) => {
    if (userData) {
      const updatedTeam = userData.team.map((m: any) => m.id === updatedMember.id ? updatedMember : m);
      updateUserData({ team: updatedTeam });
      setEditingMember(null);
    }
  };

  const handleViewMember = (member: any) => {
    setViewingMember(member);
  };

  const handleMessageMember = (member: any) => {
    alert(`Send message to ${member.name} - Coming soon!`);
  };

  const handleVideoCall = (member: any) => {
    alert(`Video call with ${member.name} - Coming soon!`);
  };

  const handlePhoneCall = (member: any) => {
    if (member.phone) {
      window.open(`tel:${member.phone}`);
    } else {
      alert(`No phone number available for ${member.name}`);
    }
  };

  const handleEmail = (member: any) => {
    if (member.email) {
      window.open(`mailto:${member.email}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Leadership': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Engineering': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Product': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Analytics': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Marketing': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || member.department.toLowerCase() === filterRole;
    return matchesSearch && matchesFilter;
  });

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <Users className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No team members yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Start building your team by adding members, sending invitations, or importing from Excel/CSV files.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setIsAddMemberModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Team Member</span>
        </button>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Send Invitation</span>
        </button>
        <button 
          onClick={() => setIsExcelImportModalOpen(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {teamMembers.length === 0 
                    ? 'Build and manage your team' 
                    : `Manage your team of ${teamMembers.length} member${teamMembers.length === 1 ? '' : 's'}`
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button 
                  onClick={() => setIsExcelImportModalOpen(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Excel</span>
                </button>
                <button 
                  onClick={() => setIsInviteModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Invite Member</span>
                </button>
                <button 
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>
          </div>

          {teamMembers.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Team Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Online Now</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {teamMembers.filter(m => m.status === 'online').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {new Set(teamMembers.map(m => m.department)).size}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Completion</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {teamMembers.length > 0 
                          ? Math.round(teamMembers.reduce((acc, m) => acc + (m.totalTasks > 0 ? (m.completedTasks / m.totalTasks * 100) : 0), 0) / teamMembers.length)
                          : 0
                        }%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Departments</option>
                      <option value="leadership">Leadership</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="analytics">Analytics</option>
                      <option value="marketing">Marketing</option>
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

              {/* Team Members */}
              {filteredMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No team members found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {member.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-gray-800`}></div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                            </div>
                          </div>
                          <TeamMemberDropdownMenu 
                            member={member}
                            onEdit={handleEditMember}
                            onDelete={handleDeleteMember}
                            onView={handleViewMember}
                            onUpdateProgress={handleUpdateProgress}
                          />
                        </div>

                        <div className="mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(member.department)}`}>
                            {member.department}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{member.bio}</p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Task Completion</span>
                            <span>{member.totalTasks > 0 ? Math.round((member.completedTasks / member.totalTasks) * 100) : 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${member.totalTasks > 0 ? (member.completedTasks / member.totalTasks) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{member.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Activity className="w-4 h-4 mr-2" />
                            <span>{member.lastActive}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {member.skills && member.skills.map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {member.projects.length} active projects
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleMessageMember(member)}
                              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleVideoCall(member)}
                              className="text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                            >
                              <Video className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditMember(member)}
                              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {member.avatar}
                                  </div>
                                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border border-white dark:border-gray-800`}></div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{member.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(member.department)}`}>
                                {member.department}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 ${getStatusColor(member.status)} rounded-full mr-2`}></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{member.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${member.totalTasks > 0 ? (member.completedTasks / member.totalTasks) * 100 : 0}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {member.totalTasks > 0 ? Math.round((member.completedTasks / member.totalTasks) * 100) : 0}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                              <div>{member.email}</div>
                              <div>{member.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleMessageMember(member)}
                                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleVideoCall(member)}
                                  className="text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                >
                                  <Video className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditMember(member)}
                                  className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <TeamMemberDropdownMenu 
                                  member={member}
                                  onEdit={handleEditMember}
                                  onDelete={handleDeleteMember}
                                  onView={handleViewMember}
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
      <TeamInviteModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <AddMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMember}
      />
      <ExcelImportModal 
        isOpen={isExcelImportModalOpen}
        onClose={() => setIsExcelImportModalOpen(false)}
        type="team"
      />

      {viewingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setViewingMember(null)}
            >
              ×
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                {viewingMember.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{viewingMember.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{viewingMember.role}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(viewingMember.department)}`}>{viewingMember.department}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Email: </span>
              <span className="text-gray-600 dark:text-gray-400">{viewingMember.email}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Location: </span>
              <span className="text-gray-600 dark:text-gray-400">{viewingMember.location}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Bio: </span>
              <span className="text-gray-600 dark:text-gray-400">{viewingMember.bio}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Skills: </span>
              <span className="text-gray-600 dark:text-gray-400">{viewingMember.skills?.join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setEditingMember(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
            <form onSubmit={e => { e.preventDefault(); handleSaveEditMember(editingMember); }}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.name}
                  onChange={e => setEditingMember({ ...editingMember, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <input
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.role}
                  onChange={e => setEditingMember({ ...editingMember, role: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <input
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.department}
                  onChange={e => setEditingMember({ ...editingMember, department: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.email}
                  onChange={e => setEditingMember({ ...editingMember, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.location}
                  onChange={e => setEditingMember({ ...editingMember, location: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={editingMember.bio}
                  onChange={e => setEditingMember({ ...editingMember, bio: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                  onClick={() => setEditingMember(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;