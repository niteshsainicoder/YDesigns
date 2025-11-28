import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-elegant border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 ${hover ? 'hover:shadow-elegant-lg hover:-translate-y-1' : ''} ${className}`}>
            {children}
        </div>
    );
};
