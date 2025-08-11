import { Bell, Menu, Search, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
    return (
        <header className="bg-white text-black shadow-sm border-b border-[#e5e5e5] h-16">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="text-[#616161] hover:text-[#212121] lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9e9e9e] h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-lg bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative text-[#616161] hover:text-[#212121]">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#f97316]rounded-full"></span>
                    </button>

                    <div className="flex items-center space-x-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-[#212121]">Admin User</p>
                            <p className="text-xs text-[#757575]">admin@urbanathelete.com</p>
                        </div>
                        <div className="h-8 w-8 bg-[#d4d4d4] rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-[#616161]" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;