import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAppStore } from '../../app/store';

export const Layout: React.FC = () => {
    const { sidebarOpen, isDarkMode } = useAppStore();

    // Apply dark mode class to html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />

            <div
                className={`transition-all duration-300 flex flex-col min-h-screen ${sidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                <Navbar />

                <main className="flex-1 p-8 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 px-8 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>© 2024 YDesigns. All rights reserved.</p>
                        </div>
                        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
