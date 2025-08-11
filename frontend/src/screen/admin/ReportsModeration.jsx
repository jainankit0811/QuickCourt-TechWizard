import { AlertTriangle, CheckCircle, Clock, Flag } from 'lucide-react';
import { useState } from 'react';
import { reportsData } from '../../data/mockData';

const ReportsModeration = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter reports based on selected filters
  const filteredReports = reportsData.filter((report) => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesStatus;
  });

  // Handle actions on reports
  const handleReportAction = (reportId, action) => {
    console.log(`${action} report ${reportId}`);
  };

  // Status icon
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

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-[#fff7ed] text-[#9a3412]';
      case 'investigating':
        return 'bg-[#e0f2fe] text-[#075985]';
      case 'resolved':
        return 'bg-[#dcfce7] text-[#166534]';
      default:
        return 'bg-[#fafafa] text-[#262626]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#212121]">Reports & Moderation</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredReports.filter((r) => r.status === 'pending').length} Pending
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
        <div className="grid grid-cols-1 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-[#f5f5f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] text-black"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Status */}
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{report.status}</span>
                  </div>
                  <span className="text-xs text-[#757575]">
                    {report.type.replace('_', ' ')}
                  </span>
                </div>

                {/* Reporter Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#212121]">Reporter</p>
                    <p className="text-[#616161]">{report.reporter}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#212121]">Reported</p>
                    <p className="text-[#616161]">{report.reported}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#212121]">Date</p>
                    <p className="text-[#616161]">
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#212121] mb-1">Description</p>
                  <p className="text-[#616161]">{report.description}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {report.status !== 'resolved' && (
              <div className="flex space-x-3 pt-4 border-t border-[#e5e5e5]">
                {report.status === 'pending' && (
                  <button
                    onClick={() => handleReportAction(report.id, 'investigate')}
                    className="bg-[#0284c7] text-white px-4 py-2 rounded-lg hover:bg-[#0369a1] transition-colors duration-200 text-sm font-medium"
                  >
                    Start Investigation
                  </button>
                )}

                {report.status === 'investigating' && (
                  <button
                    onClick={() => handleReportAction(report.id, 'resolve')}
                    className="bg-[#16a34a] text-white px-4 py-2 rounded-lg hover:bg-[#15803d] transition-colors duration-200 text-sm font-medium"
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  onClick={() => handleReportAction(report.id, 'escalate')}
                  className="bg-[#ea580c] text-white px-4 py-2 rounded-lg hover:bg-[#c2410c] transition-colors duration-200 text-sm font-medium"
                >
                  Escalate
                </button>
              </div>
            )}
          </div>
        ))}

        {/* No Reports Found */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Flag className="h-12 w-12 text-[#9e9e9e] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#212121] mb-2">No reports found</h3>
            <p className="text-[#757575]">Try adjusting your filters to see more reports.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsModeration;
