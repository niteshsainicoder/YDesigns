// ✅ Custom hook to encapsulate React Query logic
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { usersApi } from '../api/api';


interface UseUsersProps {
  page: number;
  limit: number;
  search: string;
  status: string;
  sortBy: 'name' | 'createdAt';
}

export const useUsers = ({
  page,
  limit,
  search,
  status,
  sortBy,
}: UseUsersProps) => {
  return useQuery<any>({
    queryKey: ['users', page, limit, search, status, sortBy], // Auto-refetch when any changes
    queryFn: () => usersApi.getUsers(page, limit, search, status, sortBy),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in memory for 10 minutes
    placeholderData: keepPreviousData, // Prevents UI flicker when paginating
  });
};

export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id, // Only fetch if id exists
  });
};
