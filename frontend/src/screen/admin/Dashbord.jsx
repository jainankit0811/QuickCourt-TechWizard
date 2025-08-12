import { Building2, Calendar, MapPin, Users, Printer, Download, X } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatsCard from '../../components/UI/StatsCard';
import { chartData, statsData } from '../../data/mockData';
import { useState } from 'react';

const Dashboard = () => {
    const COLORS = ['#0ea5e9', '#22c55e', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4'];
    const [showReport, setShowReport] = useState(false);

    const generateDetailedReport = () => {
        setShowReport(true);
    };

    const closeReport = () => {
        setShowReport(false);
    };

    const downloadReport = () => {
        const reportContent = document.getElementById('detailed-report');
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Dashboard Analytics Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .report-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                    .section { margin-bottom: 30px; }
                    .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
                    .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                    .data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    .data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .data-table th { background-color: #f2f2f2; }
                    .summary { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                ${reportContent.innerHTML}
            </body>
            </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-analytics-report-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const printDetailedReport = () => {
        const printWindow = window.open('', '_blank');
        
        // Create enhanced HTML with charts and graphs
        const enhancedHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Dashboard Analytics Report</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px;
                        color: #333;
                        line-height: 1.6;
                    }
                    .report-header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                        border-bottom: 2px solid #333; 
                        padding-bottom: 20px; 
                    }
                    .section { 
                        margin-bottom: 30px; 
                        page-break-inside: avoid;
                    }
                    .section h2 { 
                        color: #333; 
                        border-bottom: 1px solid #ccc; 
                        padding-bottom: 5px; 
                    }
                    .stats-grid { 
                        display: grid; 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 20px; 
                        margin: 20px 0; 
                    }
                    .stat-card { 
                        border: 1px solid #ddd; 
                        padding: 15px; 
                        border-radius: 5px; 
                        background: #f9f9f9;
                    }
                    .data-table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin: 15px 0; 
                    }
                    .data-table th, .data-table td { 
                        border: 1px solid #ddd; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    .data-table th { 
                        background-color: #f2f2f2; 
                        font-weight: bold;
                    }
                    .chart-container {
                        margin: 20px 0;
                        text-align: center;
                    }
                    .chart {
                        width: 100%;
                        max-width: 600px;
                        height: 300px;
                        margin: 0 auto;
                        border: 1px solid #ddd;
                        background: #fff;
                    }
                    .bar-chart {
                        display: flex;
                        align-items: end;
                        justify-content: space-around;
                        height: 250px;
                        padding: 20px;
                    }
                    .bar {
                        background: #0ea5e9;
                        width: 40px;
                        margin: 0 5px;
                        position: relative;
                    }
                    .bar-label {
                        position: absolute;
                        bottom: -25px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 12px;
                    }
                    .bar-value {
                        position: absolute;
                        top: -20px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .line-chart {
                        position: relative;
                        height: 250px;
                        padding: 20px;
                    }
                    .line-point {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #0ea5e9;
                        border-radius: 50%;
                    }
                    .pie-chart {
                        width: 250px;
                        height: 250px;
                        margin: 0 auto;
                        position: relative;
                    }
                    .pie-slice {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        clip: rect(0, 125px, 250px, 0);
                    }
                    .legend {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        margin-top: 20px;
                    }
                    .legend-item {
                        display: flex;
                        align-items: center;
                        margin: 5px 10px;
                    }
                    .legend-color {
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                        border-radius: 3px;
                    }
                    .summary { 
                        background-color: #f9f9f9; 
                        padding: 15px; 
                        border-radius: 5px; 
                        margin: 20px 0; 
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                        .section { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>Urban Athlete Analytics Report</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>

                <!-- Executive Summary -->
                <div class="section">
                    <h2>Executive Summary</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>Total Users</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #0ea5e9;">${statsData.totalUsers.toLocaleString()}</p>
                            <p>+12% from last month</p>
                        </div>
                        <div class="stat-card">
                            <h3>Facility Owners</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #22c55e;">${statsData.facilityOwners.toLocaleString()}</p>
                            <p>+8% from last month</p>
                        </div>
                        <div class="stat-card">
                            <h3>Total Bookings</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #f97316;">${statsData.bookings.toLocaleString()}</p>
                            <p>+15% from last month</p>
                        </div>
                        <div class="stat-card">
                            <h3>Active Courts</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #8b5cf6;">${statsData.activeCourts.toLocaleString()}</p>
                            <p>+5% from last month</p>
                        </div>
                    </div>
                </div>

                <!-- Booking Activity Chart -->
                <div class="section">
                    <h2>Booking Activity Analysis</h2>
                    <div class="chart-container">
                        <div class="bar-chart">
                            ${chartData.bookingActivity.map((item, index) => `
                                <div class="bar" style="height: ${(item.bookings / 1250) * 200}px; background-color: #0ea5e9;">
                                    <div class="bar-value">${item.bookings}</div>
                                    <div class="bar-label">${item.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Bookings</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${chartData.bookingActivity.map((item, index) => {
                                const prevValue = index > 0 ? chartData.bookingActivity[index - 1].bookings : 0;
                                const change = prevValue ? ((item.bookings - prevValue) / prevValue * 100).toFixed(1) : 'N/A';
                                return `
                                    <tr>
                                        <td>${item.month}</td>
                                        <td>${item.bookings.toLocaleString()}</td>
                                        <td>${change !== 'N/A' ? `${change}%` : 'N/A'}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- User Registration Chart -->
                <div class="section">
                    <h2>User Registration Trends</h2>
                    <div class="chart-container">
                        <div class="bar-chart">
                            ${chartData.userRegistration.map((item, index) => `
                                <div class="bar" style="height: ${(item.users / 420) * 200}px; background-color: #22c55e;">
                                    <div class="bar-value">${item.users}</div>
                                    <div class="bar-label">${item.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>New Users</th>
                                <th>Cumulative Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${chartData.userRegistration.map((item, index) => {
                                const cumulative = chartData.userRegistration
                                    .slice(0, index + 1)
                                    .reduce((sum, curr) => sum + curr.users, 0);
                                return `
                                    <tr>
                                        <td>${item.month}</td>
                                        <td>${item.users}</td>
                                        <td>${cumulative}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Sports Activity Pie Chart -->
                <div class="section">
                    <h2>Most Active Sports Breakdown</h2>
                    <div class="chart-container">
                        <div class="legend">
                            ${chartData.sportsActivity.map((item, index) => {
                                const total = chartData.sportsActivity.reduce((sum, curr) => sum + curr.bookings, 0);
                                const percentage = ((item.bookings / total) * 100).toFixed(1);
                                return `
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: ${COLORS[index % COLORS.length]};"></div>
                                        <span>${item.sport}: ${percentage}% (${item.bookings.toLocaleString()} bookings)</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Sport</th>
                                <th>Bookings</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${chartData.sportsActivity.map((item) => {
                                const total = chartData.sportsActivity.reduce((sum, curr) => sum + curr.bookings, 0);
                                const percentage = ((item.bookings / total) * 100).toFixed(1);
                                return `
                                    <tr>
                                        <td>${item.sport}</td>
                                        <td>${item.bookings.toLocaleString()}</td>
                                        <td>${percentage}%</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Earnings Chart -->
                <div class="section">
                    <h2>Earnings Analysis</h2>
                    <div class="chart-container">
                        <div class="bar-chart">
                            ${chartData.earnings.map((item, index) => `
                                <div class="bar" style="height: ${(item.earnings / 48000) * 200}px; background-color: #f97316;">
                                    <div class="bar-value">$${(item.earnings / 1000).toFixed(0)}k</div>
                                    <div class="bar-label">${item.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Earnings</th>
                                <th>Growth</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${chartData.earnings.map((item, index) => {
                                const prevValue = index > 0 ? chartData.earnings[index - 1].earnings : 0;
                                const growth = prevValue ? ((item.earnings - prevValue) / prevValue * 100).toFixed(1) : 'N/A';
                                return `
                                    <tr>
                                        <td>${item.month}</td>
                                        <td>$${item.earnings.toLocaleString()}</td>
                                        <td>${growth !== 'N/A' ? `${growth}%` : 'N/A'}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Summary -->
                <div class="summary">
                    <h3>Key Insights</h3>
                    <ul>
                        <li>Total platform users: ${statsData.totalUsers.toLocaleString()}</li>
                        <li>Total bookings processed: ${statsData.bookings.toLocaleString()}</li>
                        <li>Active sports facilities: ${statsData.activeCourts.toLocaleString()}</li>
                        <li>Platform facility owners: ${statsData.facilityOwners.toLocaleString()}</li>
                        <li>Most popular sport: ${chartData.sportsActivity[0].sport}</li>
                        <li>Peak booking month: ${chartData.bookingActivity.reduce((max, curr) => curr.bookings > max.bookings ? curr : max).month}</li>
                    </ul>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(enhancedHTML);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-black font-bold text-[#212121]">Dashboard</h1>
                <div className="flex gap-3">
                    <p className="text-[#757575] text-black">Welcome back, Admin!</p>
                    <button
                        onClick={generateDetailedReport}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Printer size={18} />
                        Generate Report
                    </button>
                </div>
            </div>

            <style jsx>{`
                /* Fix modal background and text colors using direct hex values */
                .bg-white {
                    background-color: #ffffff !important;
                }
                .text-gray-600 {
                    color: #757575 !important;
                }
                .text-gray-500 {
                    color: #9e9e9e !important;
                }
                .text-gray-700 {
                    color: #616161 !important;
                }
                .border-gray-300 {
                    border-color: #e0e0e0 !important;
                }
                .border-gray-500 {
                    border-color: #9e9e9e !important;
                }
                .hover\\:bg-gray-50:hover {
                    background-color: #fafafa !important;
                }
            `}</style>

            {/* Stats Cards */}
            <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={statsData.totalUsers.toLocaleString()}
                    icon={Users}
                    trend="up"
                    trendValue="+12%"
                />
                <StatsCard
                    title="Facility Owners"
                    value={statsData.facilityOwners.toLocaleString()}
                    icon={Building2}
                    trend="up"
                    trendValue="+8%"
                />
                <StatsCard
                    title="Total Bookings"
                    value={statsData.bookings.toLocaleString()}
                    icon={Calendar}
                    trend="up"
                    trendValue="+15%"
                />
                <StatsCard
                    title="Active Courts"
                    value={statsData.activeCourts.toLocaleString()}
                    icon={MapPin}
                    trend="up"
                    trendValue="+5%"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Activity Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">Booking Activity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData.bookingActivity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="month" stroke="#737373" />
                            <YAxis stroke="#737373" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line type="monotone" dataKey="bookings" stroke="#0ea5e9" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* User Registration Trends */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">User Registration Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData.userRegistration}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="month" stroke="#737373" />
                            <YAxis stroke="#737373" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="users" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Most Active Sports */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">Most Active Sports</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData.sportsActivity}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ sport, percent }) => `${sport} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="bookings"
                            >
                                {chartData.sportsActivity.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Earnings Simulation */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5]">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">Earnings Simulation</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData.earnings}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="month" stroke="#737373" />
                            <YAxis stroke="#737373" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                                formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']}
                            />
                            <Line type="monotone" dataKey="earnings" stroke="#f97316" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Report Modal */}
            {showReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold  text-black">Dashboard Analytics Report</h2>
                                <button
                                    onClick={closeReport}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div id="detailed-report">
                                {/* Report Header */}
                                <div className="report-header text-center mb-8">
                                    <h1 className="text-3xl font-bold mb-2  text-black">QuickCourt Analytics Report</h1>
                                    <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                                </div>

                                {/* Executive Summary */}
                                <div className="section mb-6">
                                    <h2 className="text-xl font-semibold mb-4  text-black">Executive Summary</h2>
                                    <div className="stats-grid">
                                        <div className="stat-card">
                                            <h3 className="font-semibold">Total Users</h3>
                                            <p className="text-2xl font-bold text-blue-600">{statsData.totalUsers.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">+12% from last month</p>
                                        </div>
                                        <div className="stat-card">
                                            <h3 className="font-semibold">Facility Owners</h3>
                                            <p className="text-2xl font-bold text-green-600">{statsData.facilityOwners.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">+8% from last month</p>
                                        </div>
                                        <div className="stat-card">
                                            <h3 className="font-semibold">Total Bookings</h3>
                                            <p className="text-2xl font-bold text-purple-600">{statsData.bookings.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">+15% from last month</p>
                                        </div>
                                        <div className="stat-card">
                                            <h3 className="font-semibold">Active Courts</h3>
                                            <p className="text-2xl font-bold text-orange-600">{statsData.activeCourts.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">+5% from last month</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Activity Details */}
                                <div className="section mb-6">
                                    <h2 className="text-xl font-semibold mb-4  text-black ">Booking Activity Analysis</h2>
                                    <table className="data-table  text-black">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Bookings</th>
                                                <th>Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartData.bookingActivity.map((item, index) => {
                                                const prevValue = index > 0 ? chartData.bookingActivity[index - 1].bookings : 0;
                                                const change = prevValue ? ((item.bookings - prevValue) / prevValue * 100).toFixed(1) : 'N/A';
                                                return (
                                                    <tr key={item.month}>
                                                        <td>{item.month}</td>
                                                        <td>{item.bookings.toLocaleString()}</td>
                                                        <td>{change !== 'N/A' ? `${change}%` : 'N/A'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* User Registration Details */}
                                <div className="section mb-6">
                                    <h2 className="text-xl font-semibold mb-4 text-black">User Registration Trends</h2>
                                    <table className="data-table  text-black">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>New Users</th>
                                                <th>Cumulative Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartData.userRegistration.map((item, index) => {
                                                const cumulative = chartData.userRegistration
                                                    .slice(0, index + 1)
                                                    .reduce((sum, curr) => sum + curr.users, 0);
                                                return (
                                                    <tr key={item.month}>
                                                        <td>{item.month}</td>
                                                        <td>{item.users}</td>
                                                        <td>{cumulative}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Sports Activity Details */}
                                <div className="section mb-6">
                                    <h2 className="text-xl font-semibold mb-4  text-black ">Most Active Sports Breakdown</h2>
                                    <table className="data-table  text-black">
                                        <thead>
                                            <tr>
                                                <th>Sport</th>
                                                <th>Bookings</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartData.sportsActivity.map((item) => {
                                                const total = chartData.sportsActivity.reduce((sum, curr) => sum + curr.bookings, 0);
                                                const percentage = ((item.bookings / total) * 100).toFixed(1);
                                                return (
                                                    <tr key={item.sport}>
                                                        <td>{item.sport}</td>
                                                        <td>{item.bookings.toLocaleString()}</td>
                                                        <td>{percentage}%</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Earnings Analysis */}
                                <div className="section mb-6">
                                    <h2 className="text-xl font-semibold mb-4  text-black">Earnings Analysis</h2>
                                    <table className="data-table  text-black">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Earnings</th>
                                                <th>Growth</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartData.earnings.map((item, index) => {
                                                const prevValue = index > 0 ? chartData.earnings[index - 1].earnings : 0;
                                                const growth = prevValue ? ((item.earnings - prevValue) / prevValue * 100).toFixed(1) : 'N/A';
                                                return (
                                                    <tr key={item.month}>
                                                        <td>{item.month}</td>
                                                        <td>${item.earnings.toLocaleString()}</td>
                                                        <td>{growth !== 'N/A' ? `${growth}%` : 'N/A'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Summary */}
                                <div className="summary  text-black">
                                    <h3 className="text-lg font-semibold mb-3  text-black">Key Insights</h3>
                                    <ul className="list-disc pl-5 space-y-2v text-black">
                                        <li>Total platform users: {statsData.totalUsers.toLocaleString()}</li>
                                        <li>Total bookings processed: {statsData.bookings.toLocaleString()}</li>
                                        <li>Active sports facilities: {statsData.activeCourts.toLocaleString()}</li>
                                        <li>Platform facility owners: {statsData.facilityOwners.toLocaleString()}</li>
                                        <li>Most popular sport: {chartData.sportsActivity[0].sport}</li>
                                        <li>Peak booking month: {chartData.bookingActivity.reduce((max, curr) => curr.bookings > max.bookings ? curr : max).month}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={downloadReport}
                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Download size={18} />
                                    Download Report
                                </button>
                                <button
                                    onClick={printDetailedReport}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Printer size={18} />
                                    Print Report
                                </button>
                                <button
                                    onClick={closeReport}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
