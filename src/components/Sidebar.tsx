import Link from 'next/link';
import { useRouter } from 'next/router'; // 1. Import the router
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Target, 
  CreditCard, 
  BarChart2, 
  MessageSquare, 
  Settings 
} from 'lucide-react';
import { BarChart } from 'recharts'; // Using BarChart from recharts as a placeholder logo icon

// 2. This is the complete list of nav items
const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Influencers', href: '/admin/influencers', icon: Users },
  { name: 'Brands', href: '/admin/brands', icon: Building },
  { name: 'Campaigns', href: '/admin/campaigns', icon: Target },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Support Chat', href: '/admin/support-chat', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const router = useRouter(); // 3. Get router info
  const activePath = router.pathname; // 4. Get the current path (e.g., "/influencers")

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-left p-4 h-16 border-b">
         <div className="bg-purple-600 p-2 rounded-lg mr-3">
           <BarChart2 className="text-white" size={24}  />
         </div>
         <h1 className="text-xl font-bold text-gray-800">Influencer Hub</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          // 5. Check if the current path matches the link href
          const isActive = item.href === '/' 
            ? activePath === '/' 
            : activePath.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? 'bg-purple-600 text-white' // Active link style
                    : 'text-gray-600 hover:bg-gray-100' // Inactive link style
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

