import {
    Activity,
    Building2,
    Home,
    MessageSquareWarning,
    User,
    Users,
    X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', name: 'Dashboard', icon: Home },
        { path: '/facilities', name: 'Facility Approval', icon: Building2 },
        { path: '/users', name: 'User Management', icon: Users },
        { path: '/reports', name: 'Reports & Moderation', icon: MessageSquareWarning },
        { path: '/profile', name: 'Profile', icon: User },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-grey shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
                    <div className="flex items-center space-x-2">
                        <Activity className="h-8 w-8 text-[#212121]" />
                        <span className="text-lg font-bold text-[#212121]">Quick court</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-[#616161] hover:text-[#212121]"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-8">
                    <div className="px-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path ||
                                (item.path === '/dashboard' && location.pathname === '/');

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive
                                            ? 'bg-[#000000] text-[#0369a1] border-r-2 border-[#0ea5e9]'
                                            : 'text-[#616161] hover:bg-[#f5f5f5] hover:text-[#212121]'
                                        }
                  `}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;