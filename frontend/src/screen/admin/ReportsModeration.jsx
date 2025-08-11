import { AlertTriangle, CheckCircle, Clock, Flag } from 'lucide-react';
import { useState } from 'react';
import { reportsData } from '../../data/mockData';

const ReportsModeration = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredReports = reportsData.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;

    return matchesStatus && matchesPriority;
  });

  const handleReportAction = (reportId, action) => {
    console.log(`${action} report ${reportId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'investigating':
        return <AlertTriangle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Flag className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-accent-100 text-accent-800';
      case 'investigating':
        return 'bg-primary-100 text-primary-800';
      case 'resolved':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-accent-100 text-accent-800';
      case 'low':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-urbanGray-800">Reports & Moderation</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredReports.filter(r => r.status === 'pending').length} Pending
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-urbanGray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-urbanGray-700 mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{report.status}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                    {report.priority} priority
                  </div>
                  <span className="text-xs text-urbanGray-500">
                    {report.type.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-urbanGray-800">Reporter</p>
                    <p className="text-urbanGray-600">{report.reporter}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-urbanGray-800">Reported</p>
                    <p className="text-urbanGray-600">{report.reported}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-urbanGray-800">Date</p>
                    <p className="text-urbanGray-600">{new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-urbanGray-800 mb-1">Description</p>
                  <p className="text-urbanGray-600">{report.description}</p>
                </div>
              </div>
            </div>

            {report.status !== 'resolved' && (
              <div className="flex space-x-3 pt-4 border-t border-neutral-200">
                {report.status === 'pending' && (
                  <button
                    onClick={() => handleReportAction(report.id, 'investigate')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Start Investigation
                  </button>
                )}

                {report.status === 'investigating' && (
                  <button
                    onClick={() => handleReportAction(report.id, 'resolve')}
                    className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  onClick={() => handleReportAction(report.id, 'escalate')}
                  className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors duration-200 text-sm font-medium"
                >
                  Escalate
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Flag className="h-12 w-12 text-urbanGray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-urbanGray-800 mb-2">No reports found</h3>
            <p className="text-urbanGray-500">Try adjusting your filters to see more reports.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsModeration;