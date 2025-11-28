import React, { useState, useCallback } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../../../hooks/useDebounce';
import { UsersTable } from '../components/UserTable';
import { Pagination } from '../../../components/ui/Pagination';
import { Card } from '../../../components/ui/Card';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import type { User } from '../types';

export const UsersPage: React.FC = () => {
  // 📌 Local state for filters
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');

  // ⏱️ Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500);

  // 🔍 Fetch users with React Query
  const { data, isLoading, isError, error } = useUsers({
    page,
    limit: 5,
    search: debouncedSearch,
    status: statusFilter,
    sortBy,
  });

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback(() => {
    setPage(1);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <p className="text-red-700">Error: {error?.message || 'Failed to load users'}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and monitor user accounts</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-elegant">
            <div className="text-sm font-medium opacity-90">Total Users</div>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
          </div>
          <div className="px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-elegant">
            <div className="text-sm font-medium opacity-90">Active</div>
            <div className="text-2xl font-bold">
              {data?.data?.filter((u: User) => u.status === 'Active').length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Refine your search results</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterChange();
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              handleFilterChange();
            }}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all"
          >
            <option value="All">📋 All Status</option>
            <option value="Active">✅ Active</option>
            <option value="Inactive">⏸️ Inactive</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              handleFilterChange();
            }}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all"
          >
            <option value="name">🔤 Sort by Name</option>
            <option value="createdAt">📅 Sort by Date</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <UsersTable users={data?.data || []} isLoading={isLoading} />

      {/* Pagination */}
      {data && (
        <Pagination
          page={page}
          total={data.total}
          limit={data.limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
