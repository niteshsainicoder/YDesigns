# YDesigns - User Management + Analytics Dashboard

A modern, production-ready admin dashboard built with React, TypeScript, and TailwindCSS. This project demonstrates advanced React patterns, state management, and clean architecture principles.

![Dashboard Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)
![React](https://img.shields.io/badge/React-19.2+-61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

The app will be available at `http://localhost:5173/`

## 📋 Features

### ✅ Core Features Implemented

- **Users List Page** (`/users`)
  - ✅ Paginated table with 5 users per page
  - ✅ Search by name or email (debounced)
  - ✅ Filter by status (Active/Inactive)
  - ✅ Sort by name or creation date
  - ✅ Responsive design
  - ✅ Loading states with skeleton loaders

- **User Details Page** (`/users/:id`)
  - ✅ User profile card with avatar
  - ✅ Activity summary
  - ✅ Last 5 recent actions
  - ✅ Edit user modal with validation
  - ✅ Real-time UI updates after edit

- **Analytics Overview** (`/analytics`)
  - ✅ User Signup Trend (Line Chart - Last 7 Days)
  - ✅ Active vs Inactive Users (Pie Chart)
  - ✅ Stats cards with counts

### 🎨 Bonus Features Implemented

- ✅ **Dark Mode Toggle** - Persistent theme switching
- ✅ **React Query** - Advanced caching and state synchronization
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Form Validation** - Zod schema validation
- ✅ **Debounced Search** - Optimized search performance
- ✅ **Skeleton Loaders** - Better UX during data loading
- ✅ **Production-Ready Architecture** - Feature-based folder structure
- ✅ **Responsive Design** - Mobile, tablet, and desktop friendly
- ✅ **Code Splitting** - Optimized bundle size

## 🛠️ Tech Stack

### Core Dependencies
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Lightning-fast build tool
- **React Router Dom 7.9** - Client-side routing
- **TailwindCSS 3.4** - Utility-first CSS framework

### State Management
- **Zustand 5.0** - Lightweight global state (theme, sidebar)
- **React Query 5.90** - Server state management with caching
- **React Hook Form 7.66** - Performant form management

### Data Visualization
- **Recharts 3.5** - Composable charting library

### Validation
- **Zod 4.1** - TypeScript-first schema validation

### Build & Development
- **ESLint 9.39** - Code linting
- **PostCSS & Autoprefixer** - CSS processing
- **@tailwindcss/forms** - Better form styling

## 📁 Project Structure

```
src/
├── app/                      # Application core
│   ├── App.tsx              # Main app component
│   ├── Router.tsx           # Route definitions
│   └── store.ts             # Global state (Zustand)
│
├── features/                 # Feature modules
│   ├── users/
│   │   ├── api/
│   │   │   └── api.ts       # Mock API calls
│   │   ├── hooks/
│   │   │   └── useUsers.ts  # React Query hooks
│   │   ├── components/
│   │   │   ├── UserTable.tsx
│   │   │   └── EditUserModal.tsx
│   │   ├── pages/
│   │   │   ├── UserPage.tsx
│   │   │   └── UserDetailPage.tsx
│   │   └── types.ts         # TypeScript interfaces
│   │
│   └── analytics/
│       ├── pages/
│       │   └── AnalyticsPage.tsx
│       └── (charts with mock data)
│
├── components/              # Shared components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Badge.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Skeleton.tsx
│   │
│   └── layout/             # Layout components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── Navbar.tsx
│
├── hooks/                  # Custom hooks
│   └── useDebounce.ts      # Debounce implementation
│
├── lib/                    # Library configurations
│   └── queryClient.ts      # React Query setup
│
├── main.tsx               # Application entry point
└── index.css              # Global styles + Tailwind

```

## 🏗️ Architecture & Design Decisions

### 1. **Feature-Based Architecture**
   - Code organized by feature (users, analytics) rather than type
   - Each feature is self-contained with its own API, hooks, components
   - Easier to scale and maintain as the app grows

### 2. **State Management Strategy**
   - **Zustand** for global UI state (theme, sidebar)
   - **React Query** for server state (user data, caching)
   - **React Hook Form** for form state
   - Separation of concerns keeps each tool focused on what it does best

### 3. **Type Safety**
   - Strict TypeScript configuration
   - Interfaces defined in `types.ts` files
   - No `any` types except where absolutely necessary
   - Type-safe API responses and form submissions

### 4. **Performance Optimizations**
   - Debounced search (500ms delay)
   - React Query caching (5-minute stale time)
   - Lazy placeholderData for seamless pagination
   - Code splitting ready with Vite

### 5. **User Experience**
   - Loading states with spinners and skeletons
   - Optimistic UI updates
   - Clear error messages
   - Responsive design for all screen sizes
   - Dark mode support

## 🎯 Key Technical Highlights

### React Query Implementation
```typescript
// Automatic caching, refetching, and invalidation
export const useUsers = ({ page, limit, search, status, sortBy }) => {
  return useQuery<any>({
    queryKey: ['users', page, limit, search, status, sortBy],
    queryFn: () => usersApi.getUsers(page, limit, search, status, sortBy),
    staleTime: 1000 * 60 * 5,        // 5 minutes
    gcTime: 1000 * 60 * 10,          // 10 minutes
    placeholderData: keepPreviousData // Smooth pagination
  });
};
```

### Form Validation with Zod
```typescript
const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  status: z.enum(['Active', 'Inactive']),
});
```

### Zustand Store
```typescript
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      // ... more state
    }),
    { name: 'app-store' } // Persists to localStorage
  )
);
```

## 📊 Data Management

### Mock Data
- 10 sample users with realistic data
- Mock API with simulated network delays (500-800ms)
- Supports full CRUD operations (local state only)
- Data persists during session

### API Structure
```typescript
usersApi.getUsers(page, limit, search, status, sortBy)
usersApi.getUserById(id)
usersApi.updateUser(id, updates)
```

## 🎨 Styling Approach

- **TailwindCSS** for utility-first styling
- **Dark mode** with class-based toggle
- **Custom color palette** with semantic naming
- **Responsive breakpoints**: mobile, tablet, desktop
- **Consistent spacing** using Tailwind's spacing scale

## 🧪 Testing Strategy

- **Vitest** configured for unit testing
- **React Testing Library** for component testing
- **@testing-library/jest-dom** for enhanced assertions
- Test files should be colocated with components (`*.test.tsx`)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Collapsible sidebar on mobile
- Stacked layouts for small screens

## 🔒 Type Safety Examples

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  role: 'Admin' | 'User' | 'Moderator';
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

## 🚦 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect | Redirects to `/users` |
| `/users` | UserPage | Paginated users list with filters |
| `/users/:id` | UserDetailPage | Detailed user view with edit |
| `/analytics` | AnalyticsPage | Charts and statistics |

## 🔄 Data Flow

```
User Action → React Query → Mock API → Response
     ↓                                      ↓
Component Re-render ← Cache Update ← Invalidation
```

## 📦 Build & Deployment

```bash
# Development build with HMR
npm run dev

# Production build (optimized)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Build Output
- Optimized bundle with code splitting
- Assets hashed for cache busting
- Tree-shaking for smaller bundle size
- Modern browser targets (ES2022)

## 🎓 Learning Points

This project demonstrates:
1. Modern React patterns (hooks, context, composition)
2. TypeScript best practices  
3. State management strategies
4. Performance optimization techniques
5. Clean code architecture
6. Responsive design principles
7. Form handling and validation
8. Data fetching and caching
9. Dark mode implementation
10. Production-ready folder structure

## 📸 Screenshots

### Users List Page
- Filterable, searchable, sortable table
- Pagination controls
- Responsive design

### User Detail Page
- Profile information
- Activity metrics
- Edit functionality with modal

### Analytics Page
- Interactive charts
- Statistical overview
- Visual data representation

## 🤝 Contributing

This is a portfolio/assessment project, but feedback and suggestions are welcome!

## 📄 License

This project is created for assessment purposes.

## 👤 Author

Created as part of a frontend developer assessment.

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
#   Y D e s i g n s  
 