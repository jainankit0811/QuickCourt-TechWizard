import { Activity, Calendar, DollarSign, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import KPICard from '../components/KPICard';

const Dashboard = () => {
    // Sample data for charts
    const bookingTrends = [
        { name: 'Mon', bookings: 12 },
        { name: 'Tue', bookings: 19 },
        { name: 'Wed', bookings: 15 },
        { name: 'Thu', bookings: 22 },
        { name: 'Fri', bookings: 28 },
        { name: 'Sat', bookings: 35 },
        { name: 'Sun', bookings: 30 }
    ];

    const earningsData = [
        { month: 'Jan', earnings: 2400 },
        { month: 'Feb', earnings: 1398 },
        { month: 'Mar', earnings: 9800 },
        { month: 'Apr', earnings: 3908 },
        { month: 'May', earnings: 4800 },
        { month: 'Jun', earnings: 3800 }
    ];

    const peakHoursData = [
        { name: '6-8 AM', value: 15, fill: '#9E9E9E' },
        { name: '8-10 AM', value: 25, fill: '#757575' },
        { name: '10-12 PM', value: 20, fill: '#616161' },
        { name: '12-2 PM', value: 30, fill: '#424242' },
        { name: '2-4 PM', value: 35, fill: '#212121' },
        { name: '4-6 PM', value: 45, fill: '#424242' },
        { name: '6-8 PM', value: 40, fill: '#616161' },
        { name: '8-10 PM', value: 25, fill: '#757575' }
    ];

    const upcomingBookings = [
        { id: 1, court: 'Tennis Court A', user: 'John Smith', time: '2:00 PM - 3:00 PM', date: 'Today' },
        { id: 2, court: 'Basketball Court', user: 'Mike Johnson', time: '4:00 PM - 5:00 PM', date: 'Today' },
        { id: 3, court: 'Tennis Court B', user: 'Sarah Wilson', time: '6:00 PM - 7:00 PM', date: 'Today' },
        { id: 4, court: 'Badminton Court', user: 'Alex Brown', time: '10:00 AM - 11:00 AM', date: 'Tomorrow' }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
                <p className="text-gray-600">Here's what's happening with your facilities today.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <KPICard
                    title="Total Bookings"
                    value="156"
                    change="+12%"
                    icon={Calendar}
                    color="blue"
                />
                <KPICard
                    title="Active Courts"
                    value="8"
                    change="+2"
                    icon={Activity}
                    color="green"
                />
                <KPICard
                    title="Monthly Earnings"
                    value="$12,450"
                    change="+18%"
                    icon={DollarSign}
                    color="yellow"
                />
                <KPICard
                    title="Active Users"
                    value="89"
                    change="+5%"
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Booking Trends */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Booking Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookingTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="bookings" stroke="#212121" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Earnings Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="earnings" fill="#424242" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Peak Hours */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={peakHoursData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Upcoming Bookings */}
                <div className="xl:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
                    <div className="space-y-3">
                        {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{booking.court}</p>
                                    <p className="text-sm text-gray-600">{booking.user} • {booking.time}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-medium text-gray-900">{booking.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;