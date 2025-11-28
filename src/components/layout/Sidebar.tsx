import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../app/store';

export const Sidebar: React.FC = () => {
    const { sidebarOpen } = useAppStore();

    const navItems = [
        { name: 'Users', path: '/users', icon: '👥', description: 'Manage users' },
        { name: 'Analytics', path: '/analytics', icon: '📊', description: 'View insights' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-r border-gray-700 dark:border-gray-800 transition-all duration-300 shadow-elegant-xl ${sidebarOpen ? 'w-64' : 'w-20'
                }`}
        >
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-gray-700 dark:border-gray-800 bg-gradient-to-r from-primary-900 to-primary-800">
                <div className={`transition-all duration-300 ${!sidebarOpen && 'scale-90'}`}>
                    {sidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">Y</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">YDesigns</h1>
                                <p className="text-xs text-primary-200">Dashboard</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">Y</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `group relative flex items-center p-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/50'
                                : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800/50 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-2xl transition-transform group-hover:scale-110">{item.icon}</span>
                        {sidebarOpen && (
                            <div className="ml-4 flex-1">
                                <span className="font-semibold text-sm block">{item.name}</span>
                                <span className="text-xs opacity-75">{item.description}</span>
                            </div>
                        )}
                        {!sidebarOpen && (
                            <div className="absolute left-full ml-6 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-elegant-lg z-50">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-xs opacity-75">{item.description}</div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-800"></div>
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            {sidebarOpen && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 dark:border-gray-800 bg-gray-900/50">
                    <div className="text-xs text-gray-400 text-center">
                        <p className="font-semibold text-gray-300">YDesigns © 2024</p>
                        <p className="mt-1">Premium Dashboard</p>
                    </div>
                </div>
            )}
        </aside>
    );
};
