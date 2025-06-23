import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Download, 
  AlertCircle,
  CheckCircle,
  Users,
  FolderPlus,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'projects' | 'team';
}

const ExcelImportModal: React.FC<ExcelImportModalProps> = ({ isOpen, onClose, type }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserData, userData } = useAuth();

  const projectFields = [
    { field: 'name', description: 'Project Name (Required)', example: 'Website Redesign', required: true },
    { field: 'description', description: 'Project Description (Required)', example: 'Complete redesign of company website', required: true },
    { field: 'status', description: 'Status (Required): planning, in-progress, completed, on-hold', example: 'planning', required: true },
    { field: 'priority', description: 'Priority: low, medium, high', example: 'high', required: false },
    { field: 'progress', description: 'Progress Percentage (0-100)', example: '75', required: false },
    { field: 'completedTasks', description: 'Number of Completed Tasks', example: '8', required: false },
    { field: 'totalTasks', description: 'Total Number of Tasks', example: '12', required: false },
    { field: 'dueDate', description: 'Due Date (YYYY-MM-DD format)', example: '2024-03-15', required: false },
    { field: 'team', description: 'Team Members (comma-separated names)', example: 'John Doe, Jane Smith', required: false },
    { field: 'tags', description: 'Tags (comma-separated)', example: 'UI/UX, Frontend', required: false }
  ];

  const teamFields = [
    { field: 'firstName', description: 'First Name (Required)', example: 'John', required: true },
    { field: 'lastName', description: 'Last Name (Required)', example: 'Doe', required: true },
    { field: 'email', description: 'Email Address (Required)', example: 'john@company.com', required: true },
    { field: 'role', description: 'Job Title (Required)', example: 'Senior Developer', required: true },
    { field: 'department', description: 'Department (Required)', example: 'Engineering', required: true },
    { field: 'completedTasks', description: 'Number of Completed Tasks', example: '15', required: false },
    { field: 'totalTasks', description: 'Total Number of Tasks', example: '20', required: false },
    { field: 'phone', description: 'Phone Number (Optional)', example: '+1 (555) 123-4567', required: false },
    { field: 'location', description: 'Location (Optional)', example: 'New York, USA', required: false },
    { field: 'skills', description: 'Skills (comma-separated)', example: 'JavaScript, React, Node.js', required: false }
  ];

  const requiredFields = type === 'projects' ? projectFields : teamFields;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setError('');
    
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload a valid Excel (.xlsx, .xls) or CSV file');
      return;
    }

    setUploadedFile(file);
  };

  const processFile = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      const text = await uploadedFile.text();
      let data: any[] = [];
      
      if (uploadedFile.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',');
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index]?.trim();
            });
            data.push(row);
          }
        }
      } else {
        setError('Please convert your Excel file to CSV format for now. Full Excel support coming soon!');
        setIsProcessing(false);
        return;
      }
      
      if (type === 'projects') {
        await processProjects(data);
      } else {
        await processTeamMembers(data);
      }
      
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Error processing file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processProjects = async (data: any[]) => {
    const sampleRow = data[0];
    const missingFields = ['name', 'description', 'status'].filter(field => !sampleRow.hasOwnProperty(field));
    
    if (missingFields.length > 0) {
      setError(`Missing required columns: ${missingFields.join(', ')}`);
      return;
    }
    
    const processedProjects = data.map(row => ({
      id: Date.now() + Math.random(),
      name: row.name || 'Untitled Project',
      description: row.description || '',
      status: row.status || 'planning',
      priority: row.priority || 'medium',
      progress: Math.min(100, Math.max(0, parseInt(row.progress) || 0)),
      dueDate: row.duedate || row.due_date || '',
      team: row.team ? row.team.split(',').map((t: string) => t.trim()) : [],
      tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
      tasks: { 
        completed: Math.max(0, parseInt(row.completedtasks || row.completed_tasks) || 0), 
        total: Math.max(1, parseInt(row.totaltasks || row.total_tasks) || 1) 
      },
      lastActivity: 'Just imported',
      comments: 0,
      createdAt: new Date().toISOString()
    })).filter(project => project.name && project.name !== 'Untitled Project');
    
    if (processedProjects.length === 0) {
      setError('No valid project rows found. Please check your data format.');
      return;
    }
    
    updateUserData({
      projects: [...(userData?.projects || []), ...processedProjects]
    });
    
    setImportResults({
      type: 'projects',
      imported: processedProjects.length,
      items: processedProjects
    });
  };

  const processTeamMembers = async (data: any[]) => {
    const sampleRow = data[0];
    const missingFields = ['firstname', 'lastname', 'email', 'role', 'department'].filter(field => !sampleRow.hasOwnProperty(field));
    
    if (missingFields.length > 0) {
      setError(`Missing required columns: ${missingFields.join(', ')}`);
      return;
    }
    
    const processedMembers = data.map(row => ({
      id: Date.now() + Math.random(),
      name: `${row.firstname || ''} ${row.lastname || ''}`.trim(),
      firstName: row.firstname || '',
      lastName: row.lastname || '',
      email: row.email || '',
      role: row.role || '',
      department: row.department || '',
      phone: row.phone || '',
      location: row.location || '',
      bio: row.bio || '',
      skills: row.skills ? row.skills.split(',').map((s: string) => s.trim()) : [],
      avatar: `${(row.firstname || '')[0] || ''}${(row.lastname || '')[0] || ''}`,
      status: 'offline',
      joinDate: new Date().toISOString().split('T')[0],
      projects: [],
      lastActive: 'Just added',
      completedTasks: Math.max(0, parseInt(row.completedtasks || row.completed_tasks) || 0),
      totalTasks: Math.max(1, parseInt(row.totaltasks || row.total_tasks) || 1)
    })).filter(member => member.name.trim() && member.email);
    
    if (processedMembers.length === 0) {
      setError('No valid team member rows found. Please check your data format.');
      return;
    }
    
    updateUserData({
      team: [...(userData?.team || []), ...processedMembers]
    });
    
    setImportResults({
      type: 'team',
      imported: processedMembers.length,
      items: processedMembers
    });
  };

  const downloadTemplate = () => {
    let csvContent = '';
    
    if (type === 'projects') {
      csvContent = [
        'name,description,status,priority,progress,completedTasks,totalTasks,dueDate,team,tags',
        'Website Redesign,Complete redesign of company website,planning,high,25,3,12,2024-03-15,"John Doe, Jane Smith","UI/UX, Frontend"',
        'Mobile App,Develop mobile application,in-progress,medium,60,8,15,2024-04-20,"Alice Johnson, Bob Wilson","Mobile, React Native"',
        'Database Migration,Migrate to new database system,completed,low,100,5,5,2024-05-10,"Charlie Brown","Backend, Database"'
      ].join('\n');
    } else {
      csvContent = [
        'firstName,lastName,email,role,department,completedTasks,totalTasks,phone,location,skills',
        'John,Doe,john@company.com,Senior Developer,Engineering,15,20,+1 (555) 123-4567,"New York, USA","JavaScript, React, Node.js"',
        'Jane,Smith,jane@company.com,Product Manager,Product,8,12,+1 (555) 234-5678,"San Francisco, USA","Product Strategy, Analytics"',
        'Alice,Johnson,alice@company.com,UI/UX Designer,Design,12,18,+1 (555) 345-6789,"Los Angeles, USA","Figma, Sketch, Prototyping"'
      ].join('\n');
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleComplete = () => {
    setUploadedFile(null);
    setImportResults(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              {type === 'projects' ? <FolderPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" /> : <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Import {type === 'projects' ? 'Projects' : 'Team Members'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload Excel/CSV file to bulk import {type}
              </p>
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
          {!importResults ? (
            <>
              {/* Instructions */}
              <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">How to Import {type === 'projects' ? 'Projects' : 'Team Members'}</h3>
                <ol className="list-decimal list-inside text-blue-800 dark:text-blue-300 space-y-1 text-sm">
                  <li>Download our CSV template or prepare your own file</li>
                  <li>Include the required columns (see table below)</li>
                  <li>Upload your CSV file using the area below</li>
                  <li>Review and confirm the import</li>
                </ol>
              </div>

              {/* Required Fields */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Required CSV Column Names</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CSV Column Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {requiredFields.map((field, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm font-mono text-gray-900 dark:text-white">
                            {field.field}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{field.description}</td>
                          <td className="px-4 py-2 text-sm font-mono text-gray-500 dark:text-gray-500">{field.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="text-red-500">*</span> Required fields must be included in your CSV file
                </div>
              </div>

              {/* Download Template */}
              <div className="mb-6 text-center">
                <button
                  onClick={downloadTemplate}
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV Template</span>
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Template includes all required columns with sample data
                </p>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {uploadedFile ? uploadedFile.name : `Upload ${type === 'projects' ? 'Projects' : 'Team Members'} File`}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {uploadedFile 
                    ? `File ready: ${(uploadedFile.size / 1024).toFixed(1)} KB`
                    : 'Drag and drop your CSV file here, or click to browse'
                  }
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </button>
                  
                  {uploadedFile && (
                    <button
                      onClick={processFile}
                      disabled={isProcessing}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isProcessing ? 'Processing...' : `Import ${type === 'projects' ? 'Projects' : 'Team Members'}`}
                    </button>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <p className="text-sm text-blue-800 dark:text-blue-400">Processing your {type}...</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Import Results */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Import Successful!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Successfully imported {importResults.imported} {type === 'projects' ? 'projects' : 'team members'}.
              </p>
              
              {/* Import Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">Items Imported</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{importResults.imported}</div>
              </div>
              
              <button
                onClick={handleComplete}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View {type === 'projects' ? 'Projects' : 'Team'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelImportModal;