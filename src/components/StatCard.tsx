import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
 change?: string;       
  isPositive?: boolean;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  isPositive,
}: StatCardProps) {
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">{value}</span>
        </div>
        <div className="p-3 bg-purple-100 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className={`flex items-center text-sm font-medium ${changeColor}`}>
          <ChangeIcon className="w-4 h-4 mr-1" />
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}
