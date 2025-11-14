import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  PlusSquare,
  Target,
  FileText,
  BarChart2,
  CreditCard,
  User,
  Users,
  Settings,
  Clock,
  MessageCircleIcon
} from 'lucide-react';
import Logo from '../../public/logo.jpeg'

const navItems = [
  { name: 'Dashboard Overview', href: '/brand/dashboard', icon: LayoutDashboard },
   { name: 'Find Influencers', href: '/brand/find-influencers', icon: Users },
  { name: 'Post a Campaign', href: '/brand/post-campaign', icon: PlusSquare },
  { name: 'My Campaigns', href: '/brand/my-campaigns', icon: Target },
  { name: 'Applications Received', href: '/brand/applications', icon: FileText },
  { name: 'Influencer Analytics', href: '/brand/analytics', icon: BarChart2 },
  { name: 'Activity History', href: '/brand/history', icon: Clock },
  { name: 'My Subscription', href: '/brand/subscription', icon: CreditCard },
   { name: 'Messages', href: '/brand/message', icon: MessageCircleIcon },
  { name: 'My Profile', href: '/brand/profile', icon: User },
  { name: 'Account Settings', href: '/brand/settings', icon: Settings },
];

export default function BrandSidebar() {
  const router = useRouter();
  const activePath = router.pathname;

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-300 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-left p-4 h-16 border-b border-gray-700">
       <img 
           src="/logo.jpeg" 
           alt="InfluencerHub Logo" 
           className="h-12 w-auto" // Control the size of your logo
         />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-3 py-2.5 rounded-lg transition-all text-sm
                ${
                  isActive
                    ? 'bg-purple-600 text-white' // Active link
                    : 'hover:bg-gray-800' // Inactive link
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}