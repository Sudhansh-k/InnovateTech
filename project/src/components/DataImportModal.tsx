import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Download, 
  AlertCircle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataImportModal: React.FC<DataImportModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserData, userData } = useAuth();

  const requiredFields = [
    { field: 'date', description: 'Date (YYYY-MM-DD format)', example: '2024-01-15' },
    { field: 'revenue', description: 'Daily Revenue (USD)', example: '1250.50' },
    { field: 'users', description: 'Active Users', example: '150' },
    { field: 'sessions', description: 'User Sessions', example: '320' },
    { field: 'pageviews', description: 'Page Views', example: '850' },
    { field: 'conversions', description: 'Conversions (optional)', example: '12' }
  ];

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
    
    // Validate file type
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
        // Parse CSV
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
        // For Excel files, we'd need a library like xlsx
        // For now, show instructions for CSV format
        setError('Please convert your Excel file to CSV format for now. Full Excel support coming soon!');
        setIsProcessing(false);
        return;
      }
      
      // Validate required fields
      const sampleRow = data[0];
      const missingFields = requiredFields
        .filter(field => field.field !== 'conversions') // conversions is optional
        .filter(field => !sampleRow.hasOwnProperty(field.field));
      
      if (missingFields.length > 0) {
        setError(`Missing required columns: ${missingFields.map(f => f.field).join(', ')}`);
        setIsProcessing(false);
        return;
      }
      
      // Process and validate data
      const processedData = data.map(row => ({
        date: row.date,
        revenue: parseFloat(row.revenue) || 0,
        users: parseInt(row.users) || 0,
        sessions: parseInt(row.sessions) || 0,
        pageviews: parseInt(row.pageviews) || 0,
        conversions: parseInt(row.conversions) || 0
      })).filter(row => row.date && !isNaN(new Date(row.date).getTime()));
      
      if (processedData.length === 0) {
        setError('No valid data rows found. Please check your date format and numeric values.');
        setIsProcessing(false);
        return;
      }
      
      // Calculate summary metrics
      const totalRevenue = processedData.reduce((sum, row) => sum + row.revenue, 0);
      const avgUsers = Math.round(processedData.reduce((sum, row) => sum + row.users, 0) / processedData.length);
      const totalConversions = processedData.reduce((sum, row) => sum + row.conversions, 0);
      const totalSessions = processedData.reduce((sum, row) => sum + row.sessions, 0);
      const conversionRate = totalSessions > 0 ? (totalConversions / totalSessions * 100) : 0;
      
      // Store analytics data
      const analyticsData = {
        historicalData: processedData,
        summary: {
          totalRevenue,
          avgUsers,
          conversionRate: parseFloat(conversionRate.toFixed(2)),
          dataPoints: processedData.length,
          dateRange: {
            start: processedData[0].date,
            end: processedData[processedData.length - 1].date
          }
        },
        lastImported: new Date().toISOString()
      };
      
      // Update user data
      updateUserData({
        analytics: analyticsData,
        business: {
          ...userData?.business,
          revenue: Math.round(totalRevenue / processedData.length), // Average daily revenue
          users: avgUsers,
          conversionRate: parseFloat(conversionRate.toFixed(2)),
          aiInteractions: userData?.business?.aiInteractions ?? 0
        }
      });
      
      setImportResults({
        rowsProcessed: processedData.length,
        totalRevenue,
        avgUsers,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        dateRange: `${processedData[0].date} to ${processedData[processedData.length - 1].date}`
      });

      // Automatically close modal and trigger refresh after import
      setTimeout(() => {
        onClose();
      }, 500);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Error processing file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = [
      'date,revenue,users,sessions,pageviews,conversions',
      '2024-01-01,1250.50,150,320,850,12',
      '2024-01-02,1180.25,145,298,780,10',
      '2024-01-03,1420.75,165,355,920,15',
      '2024-01-04,1350.00,160,340,890,13',
      '2024-01-05,1500.25,175,380,950,18'
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-template.csv';
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
              <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Import Analytics Data</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload your historical business data</p>
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
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">How to Import Your Data</h3>
                <ol className="list-decimal list-inside text-blue-800 dark:text-blue-300 space-y-1 text-sm">
                  <li>Download our CSV template or prepare your own file</li>
                  <li>Include the required columns (see table below)</li>
                  <li>Upload your CSV file using the area below</li>
                  <li>Review and confirm the import</li>
                </ol>
              </div>

              {/* Required Fields */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Required Data Fields</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Column Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {requiredFields.map((field, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm font-mono text-gray-900 dark:text-white">{field.field}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{field.description}</td>
                          <td className="px-4 py-2 text-sm font-mono text-gray-500 dark:text-gray-500">{field.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                  {uploadedFile ? uploadedFile.name : 'Upload Your Analytics Data'}
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
                      {isProcessing ? 'Processing...' : 'Import Data'}
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
                    <p className="text-sm text-blue-800 dark:text-blue-400">Processing your data...</p>
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
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your analytics data has been imported and processed.</p>
              
              {/* Import Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Data Points</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{importResults.rowsProcessed}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">${importResults.totalRevenue.toLocaleString()}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Users</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{importResults.avgUsers}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{importResults.conversionRate}%</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Date Range: {importResults.dateRange}
              </div>
              
              <button
                onClick={handleComplete}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Analytics Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataImportModal;