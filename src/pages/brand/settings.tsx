import Head from 'next/head';
import React, { useState } from 'react';
import { Save, Lock, MessageSquare, AlertTriangle, Send } from 'lucide-react';

// --- Internal Component: ToggleSwitch ---
const ToggleSwitch = ({ label, description, isChecked }: { label: string, description: string, isChecked: boolean }) => {
  // In a real app, this state would be managed higher up
  const [on, setOn] = useState(isChecked);

  return (
    <div className="flex justify-between items-center">
      <div>
        <label className="block text-sm font-semibold text-gray-800" id={`toggle-label-${label}`}>
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
          ${on ? 'bg-purple-600' : 'bg-gray-200'}
        `}
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        aria-labelledby={`toggle-label-${label}`}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
            ${on ? 'translate-x-5' : 'translate-x-0'}
          `}
        ></span>
      </button>
    </div>
  );
};

// --- Internal Component: PasswordField ---
const PasswordField = ({ label, id, placeholder }: { label: string, id: string, placeholder: string }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type="password"
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 p-3 pl-10 text-sm"
      />
      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

// --- Main Page Component ---
export default function AccountSettingsPage() {
  return (
    <>
      <Head>
        <title>Account Settings - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* --- 1. Notification Preferences --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-5">
            <ToggleSwitch
              label="Influencer which matches your niche update on campaign application"
              description="Get notified when influencers matching your niche apply on campaigns (3 notifications)"
              isChecked={true}
            />
            <ToggleSwitch
              label="Updates on your campaign applications"
              description="Get notified when brands respond to your applications"
              isChecked={true}
            />
            <ToggleSwitch
              label="New message from influencer"
              description="Stay updated when influencers send you messages"
              isChecked={true}
            />
            <ToggleSwitch
              label="Platform updates and tips for brands"
              description="Receive valuable updates and best practices"
              isChecked={true}
            />
          </div>
          <div className="flex justify-end mt-6 pt-6 border-t">
            <button className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </button>
          </div>
        </div>

        {/* --- 2. Security Settings --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Security Settings
          </h2>
          <div className="space-y-4">
            <PasswordField
              label="Current Password"
              id="current-password"
              placeholder="Enter current password"
            />
            <PasswordField
              label="New Password"
              id="new-password"
              placeholder="Enter new password"
            />
            <PasswordField
              label="Confirm New Password"
              id="confirm-password"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex justify-end mt-6 pt-6 border-t">
            <button className="bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700">
              Change Password
            </button>
          </div>
        </div>

        {/* --- 3. Contact Admin Support --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Contact Admin Support
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="What do you need help with?"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Describe your issue or question..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              ></textarea>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message to Admin
              </button>
            </div>
          </form>
        </div>

        {/* --- 4. Danger Zone --- */}
        <div className="bg-white rounded-lg shadow-sm border border-red-300">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Danger Zone
            </h2>
            <p className="text-sm text-gray-600">
              Irreversible account actions
            </p>

            <div className="mt-6 space-y-4">
              {/* Deactivate Account */}
              <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Deactivate Account</h3>
                  <p className="text-sm text-gray-500">Temporarily disable your account</p>
                </div>
                <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  Deactivate
                </button>
              </div>

              {/* Warning */}
              <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p className="text-sm">Warning: This action cannot be undone</p>
              </div>

              {/* Delete Account */}
              <div className="flex justify-between items-center p-4 border border-red-300 rounded-lg bg-red-50">
                <div>
                  <h3 className="font-semibold text-red-700">Delete Account</h3>
                  <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                </div>
                <button className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}