// ✅ Strict TypeScript - no `any` types
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  role: 'Admin' | 'User' | 'Moderator';
  avatar?: string;
}

export interface UserDetail extends User {
  phone?: string;
  location?: string;
  joinedAt: string;
  lastLogin: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateUserInput {
  name?: string;
  status?: 'Active' | 'Inactive';
  role?: 'Admin' | 'User' | 'Moderator';
}
