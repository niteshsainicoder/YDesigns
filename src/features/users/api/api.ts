import { type User, type  UserDetail, type  PaginatedResponse, type  UpdateUserInput } from '../types';

// 📌 Mock data - in production, this would come from an API
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', createdAt: '2024-01-15', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive', createdAt: '2024-02-20', role: 'User' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', createdAt: '2024-03-10', role: 'Moderator' },
  { id: '4', name: 'Diana Martinez', email: 'diana@example.com', status: 'Active', createdAt: '2024-01-25', role: 'User' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', status: 'Inactive', createdAt: '2024-04-05', role: 'User' },
  { id: '6', name: 'Frank Wilson', email: 'frank@example.com', status: 'Active', createdAt: '2024-02-14', role: 'User' },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', status: 'Active', createdAt: '2024-03-22', role: 'Admin' },
  { id: '8', name: 'Henry Taylor', email: 'henry@example.com', status: 'Active', createdAt: '2024-05-01', role: 'User' },
  { id: '9', name: 'Ivy Chen', email: 'ivy@example.com', status: 'Inactive', createdAt: '2024-01-30', role: 'Moderator' },
  { id: '10', name: 'Jack Anderson', email: 'jack@example.com', status: 'Active', createdAt: '2024-04-18', role: 'User' },
];

// ⏱️ Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔍 API Service with proper error handling
export const usersApi = {
  // Fetch paginated users with filters and sorting
  getUsers: async (
    page: number = 1,
    limit: number = 5,
    search: string = '',
    status: string = 'All',
    sortBy: 'name' | 'createdAt' = 'name'
  ): Promise<PaginatedResponse<User>> => {
    await delay(600); // Simulate network lag

    let filtered = MOCK_USERS.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (status !== 'All') {
      filtered = filtered.filter(u => u.status === status);
    }

    // Sorting
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'createdAt') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    return {
      data: paginatedData,
      total,
      page,
      limit,
    };
  },

  // Fetch single user details
  getUserById: async (id: string): Promise<UserDetail> => {
    await delay(500);
    const user = MOCK_USERS.find(u => u.id === id);
    if (!user) throw new Error('User not found');

    return {
      ...user,
      phone: '+1234567890',
      location: 'San Francisco, CA',
      joinedAt: user.createdAt,
      lastLogin: new Date().toISOString(),
    };
  },

  // Update user (local state, no backend)
  updateUser: async (id: string, updates: UpdateUserInput): Promise<User> => {
    await delay(800);
    const userIndex = MOCK_USERS.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');

    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
    return MOCK_USERS[userIndex];
  },
};
