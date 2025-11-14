import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Static data for the chart
const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          wrapperClassName="rounded-md border border-gray-200 shadow-sm"
          contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem' }}
          labelStyle={{ color: '#1f2937', fontWeight: '600' }}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}