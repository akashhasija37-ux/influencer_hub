import Head from 'next/head';
import React from 'react';
import { Check, Lock, Zap, Crown, User, RefreshCw } from 'lucide-react';

// --- Internal Component: PricingCard ---
const PricingCard = ({ plan }: { plan: any }) => (
  <div
    className={`
      rounded-lg p-6 flex flex-col
      ${plan.isPopular ? 'border-2 border-purple-600 bg-white relative' : 'border border-gray-200 bg-white'}
    `}
  >
    {plan.isPopular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
          Most Popular
        </span>
      </div>
    )}

    <div className="flex-grow">
      <div className="text-center mb-4">
        <div className={`p-3 bg-${plan.color}-100 rounded-lg inline-block`}>
          <plan.icon className={`w-7 h-7 text-${plan.color}-600`} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mt-3">{plan.name}</h3>
      </div>
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
        <span className="text-gray-500">/{plan.period}</span>
      </div>

      <ul className="space-y-3">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Button at the bottom */}
    <div className="mt-8">
      {plan.isCurrent ? (
        <button
          disabled
          className="w-full bg-gray-200 text-gray-500 rounded-lg px-5 py-3 text-sm font-medium"
        >
          Current Plan
        </button>
      ) : (
        <button
          className={`w-full text-white rounded-lg px-5 py-3 text-sm font-medium ${plan.buttonClass}`}
        >
          {plan.buttonText}
        </button>
      )}
    </div>
  </div>
);

// --- Internal Component: HistoryItem ---
const HistoryItem = ({ item }: { item: any }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{item.plan}</p>
      <p className="text-sm text-gray-500">{item.date}</p>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm font-semibold text-gray-800">₹{item.amount}</span>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
        {item.status}
      </span>
    </div>
  </div>
);

// --- Static Data for the Page ---
const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    icon: User,
    color: 'gray',
    features: [
      'Up to 2 campaigns',
      'Basic influencer search',
      'Limited analytics',
      'Email support',
    ],
    isPopular: false,
    isCurrent: false,
    buttonText: 'Upgrade to Free',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    name: 'Pro',
    price: '2,999',
    period: 'month',
    icon: Zap,
    color: 'purple',
    features: [
      'Unlimited campaigns',
      'Advanced filters & AI matching',
      'Full analytics & insights',
      'Priority support',
      'Compare up to 5 influencers',
      'Export reports (PDF/CSV)',
    ],
    isPopular: true,
    isCurrent: true,
    buttonText: 'Upgrade to Pro',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    name: 'Pro Max',
    price: '6,999',
    period: 'month',
    icon: Crown,
    color: 'blue',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom AI recommendations',
      'White-label reports',
      'API access',
      'Bulk operations',
      'Advanced ROI tracking',
      'Team collaboration (up to 10 users)',
    ],
    isPopular: false,
    isCurrent: false,
    buttonText: 'Upgrade to Pro Max',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
  },
];

const paymentHistory = [
  { plan: 'Pro Plan', date: '2024-10-01', amount: '2,999', status: 'Paid' },
  { plan: 'Pro Plan', date: '2024-09-01', amount: '2,999', status: 'Paid' },
  { plan: 'Pro Plan', date: '2024-08-01', amount: '2,999', status: 'Paid' },
];


// --- Main Page Component ---
export default function SubscriptionPage() {
  return (
    <>
      <Head>
        <title>My Subscription - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Subscription</h1>
        <p className="text-gray-500 mt-1">
          Manage your plan, billing, and payment history.
        </p>
      </div>

      {/* Current Plan & Manage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Current Plan: Pro
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
              Active
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Subscription Start Date: October 1, 2024
          </p>
          <p className="text-sm text-gray-600">
            Next Billing Date: November 1, 2024
          </p>
          <p className="text-sm text-gray-600">
            Amount: ₹2,999/month
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Manage Subscription
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Auto-renewal enabled</p>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-600 transition-colors duration-200 ease-in-out"
              role="switch"
              aria-checked="true"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Plans
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>

      {/* Secure Payments Banner */}
      <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded-lg mb-8 flex items-center">
        <Lock className="w-5 h-5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Secure Payments</h3>
          <p className="text-sm">
            All payments are handled securely via Stripe / Razorpay. Your
            payment information is encrypted and never stored on our servers.
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment History
        </h2>
        <div>
          {paymentHistory.map((item) => (
            <HistoryItem key={item.date} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}