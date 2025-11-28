import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading }) => {
  if (isLoading && users.length === 0) {
    return (
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4"><Skeleton /></td>
              <td className="py-4 px-4"><Skeleton /></td>
              <td className="py-4 px-4"><Skeleton /></td>
              <td className="py-4 px-4"><Skeleton /></td>
              <td className="py-4 px-4"><Skeleton /></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Name</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Created</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
              <td className="py-4 px-4">
                <Badge status={user.status} />
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 text-center">
                <Link to={`/users/${user.id}`}>
                  <Button variant="primary" size="sm">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
