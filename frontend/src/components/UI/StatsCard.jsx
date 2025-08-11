
const StatsCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm border border-[#e5e5e5] ${className || ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[#757575]">{title}</p>
                    <p className="text-2xl font-bold text-[#212121] mt-1">{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-secondary-600' : 'text-accent-600'
                            }`}>
                            <span>{trendValue}</span>
                            <span className="ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 bg-[#e0f2fe] rounded-lg">
                        <Icon className="h-6 w-6 text-[#0284c7]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;