import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Static data for the chart
const data = [
  { name: 'Jan', applications: 400, campaigns: 24 },
  { name: 'Feb', applications: 300, campaigns: 13 },
  { name: 'Mar', applications: 600, campaigns: 48 },
  { name: 'Apr', applications: 780, campaigns: 39 },
  { name: 'May', applications: 500, campaigns: 28 },
  { name: 'Jun', applications: 700, campaigns: 34 },
];

export default function CampaignChart() {
  return (
    // ResponsiveContainer makes the chart fill its parent div
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          wrapperClassName="rounded-md border border-gray-200 shadow-sm"
          contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem' }}
          labelStyle={{ color: '#1f2937', fontWeight: '600' }}
        />
        <Bar dataKey="applications" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="campaigns" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
