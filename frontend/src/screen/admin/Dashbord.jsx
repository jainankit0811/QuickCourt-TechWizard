import { Building2, Calendar, MapPin, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatsCard from '../../components/UI/StatsCard';
import { chartData, statsData } from '../../data/mockData';

const Dashboard = () => {
    const COLORS = ['#0ea5e9', '#22c55e', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-black font-bold text-urbanGray-800">Dashboard</h1>
                <p className="text-urbanGray-500 text-black">Welcome back, Admin!</p>
            </div>

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
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                    <h3 className="text-lg font-semibold text-urbanGray-800 mb-4">Booking Activity</h3>
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
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                    <h3 className="text-lg font-semibold text-urbanGray-800 mb-4">User Registration Trends</h3>
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
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                    <h3 className="text-lg font-semibold text-urbanGray-800 mb-4">Most Active Sports</h3>
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
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                    <h3 className="text-lg font-semibold text-urbanGray-800 mb-4">Earnings Simulation</h3>
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
        </div>
    );
};

export default Dashboard;