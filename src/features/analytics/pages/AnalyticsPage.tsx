import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../components/ui/Card';

// Mock data for charts
const signupTrendData = [
  { date: 'Mon', signups: 120 },
  { date: 'Tue', signups: 200 },
  { date: 'Wed', signups: 150 },
  { date: 'Thu', signups: 220 },
  { date: 'Fri', signups: 250 },
  { date: 'Sat', signups: 200 },
  { date: 'Sun', signups: 180 },
];

const activeInactiveData = [
  { name: 'Active', value: 8 },
  { name: 'Inactive', value: 2 },
];

const COLORS = ['#10b981', '#ef4444'];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">User statistics and trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-3xl font-bold">10</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-600 text-sm">Active Users</p>
          <p className="text-3xl font-bold text-green-600">8</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-600 text-sm">Inactive Users</p>
          <p className="text-3xl font-bold text-red-600">2</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signup Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Signup Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signupTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="signups"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Active vs Inactive */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activeInactiveData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {activeInactiveData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
