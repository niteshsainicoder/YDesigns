import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserDetail } from '../hooks/useUsers';
import { usersApi } from '../api/api';
import { EditUserModal } from '../components/EditUserModal';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useUserDetail(id || '');

  const updateMutation = useMutation({
    mutationFn: (updates: any) => usersApi.updateUser(id || '', updates),
    onSuccess: () => {
      // Invalidate and refetch both user detail and users list
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isError || !user) return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-xl text-gray-600 dark:text-gray-400">User not found</p>
      <Button onClick={() => navigate('/users')} variant="primary" className="mt-4">
        Back to Users
      </Button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/users')}>
          ← Back to Users
        </Button>
        <Button onClick={() => setShowModal(true)} variant="primary">
          Edit User
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Badge status={user.status} />
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Summary */}
      <Card>
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Activity Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Joined</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date(user.joinedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Login</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date(user.lastLogin).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.location || 'Not provided'}</p>
          </div>
        </div>
      </Card>

      {/* Recent Actions */}
      <Card>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Actions</h3>
        <ul className="space-y-3">
          {[
            'Logged in to dashboard',
            'Updated profile information',
            'Changed password',
            'Downloaded monthly report',
            'Invited new team member'
          ].map((action, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center">
                ✓
              </span>
              <span>{action}</span>
              <span className="ml-auto text-xs text-gray-500">
                {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Edit Modal */}
      <EditUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={user}
        onSubmit={(updates) => updateMutation.mutate(updates)}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
};
