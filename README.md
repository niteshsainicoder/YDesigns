# Modern React Dashboard App

A fully-featured dashboard application built with **React 19**, **TypeScript**, **Vite**, **Zustand**, **React Query**, and **TailwindCSS**, featuring user management, analytics dashboards, charts, reusable components, data caching, form validation, and dark mode support.

---

## 🚀 How to Run the Project

### **Prerequisites**
- Node.js v18+
- npm / yarn / pnpm

### **Install dependencies**
```bash
npm install
```

### **Run development server**
```bash
npm run dev
```

### **Build production**
```bash
npm run build
```

### **Preview production build**
```bash
npm run preview
```

---

## 📦 Full Libraries & Dependencies List

### **Core Framework**
| Package | Version | Purpose |
|--------|---------|---------|
| React | 19.2.0 | Core UI library |
| React DOM | 19.2.0 | DOM rendering |
| TypeScript | 5.9.3 | Type safety & DX |
| Vite | 7.2.4 | Build system & dev server |

---

### **Routing**
| Package | Version | Purpose |
|--------|---------|---------|
| React Router Dom | 7.9.6 | Client-side routing |

Used In:
- `src/app/Router.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/features/users/pages/UserDetailPage.tsx`
- `src/components/layout/Layout.tsx`

Key APIs: `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useParams`, `useNavigate`, `Outlet`

---

### **State Management**
| Package | Version | Purpose |
|--------|---------|---------|
| Zustand | 5.0.8 | Global UI state (theme & sidebar) |
| React Query | 5.90.11 | Server state, caching, mutations |

Reasons for Use:
- Lightweight, simple, persistent storage (Zustand)
- Automatic dedupe, caching, optimistic updates (React Query)

---

### **Styling**
| Package | Purpose |
|--------|---------|
| TailwindCSS | Utility-first styling |
| PostCSS & Autoprefixer | CSS transformation and compatibility |
| @tailwindcss/forms | Better default form UI |

Config includes:
- Custom colors & shadows
- Dark mode (class based)
- Responsive utilities

---

### **Form Handling**
| Package | Purpose |
|--------|---------|
| React Hook Form | Form control & validation |
| Zod | Schema validation |
| @hookform/resolvers | Zod-RHF integration |

Used In:
- `src/features/users/components/EditUserModal.tsx`

---

### **Charts**
| Package | Purpose |
|--------|---------|
| Recharts | Chart components & responsive visualizations |

Charts:
- **LineChart**: user signup trend
- **PieChart**: active vs inactive distribution

---

### **Testing & Quality**
| Package | Purpose |
|--------|---------|
| Vitest | Unit testing |
| React Testing Library | Component behavior tests |
| ESLint | Code linting |

---

## 🧩 Components Overview

### **Layout**
| Component | Path | Purpose |
|-----------|-------|----------|
| Layout | `/components/layout/Layout.tsx` | Main container & theme management |
| Sidebar | `/components/layout/Sidebar.tsx` | Navigation with collapse |
| Navbar | `/components/layout/Navbar.tsx` | User menu & theme toggle |

### **Reusable UI Components**
- `Button`
- `Card`
- `Modal`
- `Pagination`
- `Badge`
- `LoadingSpinner`
- `Skeleton`

---

## 🔌 API Layer

Mock backend with search, filter, sorting and pagination.

File: `src/features/users/api/api.ts`

Methods:
```js
getUsers()
getUserById()
updateUser()
```

---

## 📊 Data Flow Overview

### **User Editing Flow**
```txt
Open modal
↓
Validate with Zod
↓
Trigger mutation (React Query)
↓
Mock update performed
↓
Cache invalidated
↓
UI updated automatically
```

---

## 📁 Folder Structure
```txt
src/
 ├── app/
 ├── components/
 ├── features/
 ├── hooks/
 ├── lib/
 ├── styles/
 └── config/
```

---

## 🎨 Styling System

Tailwind utilities commonly used:
- `flex`, `grid`, `gap`, `space-*`
- `bg-*`, `text-*`, dark mode classes `dark:*`
- `animate-spin`, `animate-pulse`
- Custom shadows: `shadow-elegant`

---

## 📷 Screenshots (Optional)
Place inside:
```
/screenshots/dashboard.png
/screenshots/user-details.png
```

---

## 🧪 Testing
```bash
npm run test
```

---

## 📄 License
MIT License
