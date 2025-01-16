import { Icon } from 'lucide-react';

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon name={icon} className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  );
}