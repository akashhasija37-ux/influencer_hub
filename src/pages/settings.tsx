import Head from 'next/head';
import { User, Bell, CreditCard } from 'lucide-react';

// A simple, reusable toggle switch component for this page
const ToggleSwitch = ({ label, description }: { label: string, description: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <label className="block text-sm font-medium text-gray-800" id={`toggle-label-${label}`}>
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        role="switch"
        aria-checked="false"
        aria-labelledby={`toggle-label-${label}`}
        // We'd add onClick state logic here in a real app
        // For now, it's just a static UI element
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        ></span>
      </button>
      {/* To show the "on" state, add "bg-purple-600" to the button and "translate-x-5" to the span */}
    </div>
  );
};

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* --- 1. Account Information --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Account Information
                </h2>
                <p className="text-sm text-gray-500">
                  Update your account details
                </p>
              </div>
            </div>

            <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full-name"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="Admin User"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="admin@influencerhub.com"
                />
              </div>
              <div>
                <label
                  htmlFor="payment-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payment Notification Email
                </label>
                <input
                  type="email"
                  id="payment-email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="payments@influencerhub.com"
                />
              </div>
              <div>
                <label
                  htmlFor="support-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Support Email
                </label>
                <input
                  type="email"
                  id="support-email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="support@influencerhub.com"
                />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-6 py-4 text-right">
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700">
              Save Changes
            </button>
          </div>
        </div>

        {/* --- 2. Notification Preferences --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Configure how you receive notifications
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <ToggleSwitch
                label="Payment Notifications"
                description="Get notified about payments and subscriptions"
              />
              <ToggleSwitch
                label="Support Notifications"
                description="Get notified about new support tickets"
              />
              <ToggleSwitch
                label="Campaign Alerts"
                description="Get notified about new campaigns and applications"
              />
              <ToggleSwitch
                label="Weekly Reports"
                description="Receive weekly platform performance reports"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 text-right">
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700">
              Save Preferences
            </button>
          </div>
        </div>

        {/* --- 3. Payment Settings --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Payment Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Configure payment gateway settings
                </p>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="stripe-key"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stripe API Key
                </label>
                <input
                  type="password"
                  id="stripe-key"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="sk_live_********************"
                />
              </div>
              <div>
                <label
                  htmlFor="paypal-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PayPal Business Email
                </label>
                <input
                  type="email"
                  id="paypal-email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  defaultValue="business@example.com"
                />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-6 py-4 text-right">
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700">
              Save Payment Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
