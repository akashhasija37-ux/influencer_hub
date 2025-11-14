import Head from 'next/head';
import React from 'react';
import { ChevronDown, Save, UploadCloud } from 'lucide-react';

// --- Internal Helper: FormField ---
const FormField = ({ label, id, value, type = 'text', placeholder = '' }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      defaultValue={value}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    />
  </div>
);

// --- Internal Helper: TextareaField ---
const TextareaField = ({ label, id, value, rows = 3 }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      defaultValue={value}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    ></textarea>
  </div>
);

// --- Internal Helper: SelectField ---
const SelectField = ({ label, id, value, children }: any) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      defaultValue={value}
      className="w-full appearance-none rounded-lg border border-gray-300 p-2.5 text-sm bg-white"
    >
      {children}
    </select>
    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-9 pointer-events-none" />
  </div>
);

// --- Internal Helper: SocialLinkInput ---
const SocialLinkInput = ({ platform, value, icon }: any) => (
  <div className="flex items-center space-x-3">
    <span className="text-xl">{icon}</span>
    <input
      type="text"
      defaultValue={value}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    />
    <button className="text-sm font-medium text-purple-600 hover:text-purple-800 flex-shrink-0">
      Connect
    </button>
  </div>
);


// --- Main Page Component ---
export default function MyProfilePage() {
  return (
    <>
      <Head>
        <title>Brand Profile - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Brand Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your brand information and company details
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* --- Brand Logo Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Brand Logo</h2>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl font-bold">
              FB
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <UploadCloud className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-purple-600">Upload New Logo</span>
                  </p>
                  <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or SVG. Max size of 2MB. Recommended size: 512x512px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Company Information Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Company Name" id="company-name" value="Fashion Brand Co." />
            <SelectField label="Industry" id="industry" value="Fashion & Apparel">
              <option>Fashion & Apparel</option>
              <option>Technology</option>
              <option>Health & Fitness</option>
            </SelectField>
            <FormField label="Email" id="email" type="email" value="contact@fashionbrand.com" />
            <FormField label="Phone" id="phone" type="tel" value="+1 (555) 123-4567" />
            <div className="md:col-span-2">
              <FormField label="Website" id="website" value="https://fashionbrand.com" />
            </div>
            <div className="md:col-span-2">
              <TextareaField
                label="Company Description"
                id="description"
                value="Leading fashion brand focused on sustainable and ethical fashion. We collaborate with influencers to promote our eco-friendly collections."
              />
            </div>
          </div>
        </div>

        {/* --- Company Address Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Company Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField label="Street Address" id="street" value="123 Fashion Avenue" />
            </div>
            <FormField label="City" id="city" value="New York" />
            <FormField label="State / Province" id="state" value="New York" />
            <SelectField label="Country" id="country" value="United States">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </SelectField>
            <FormField label="Postal Code" id="postal" value="10001" />
          </div>
        </div>
        
        {/* --- Save Button for Profile Info --- */}
        <div className="flex justify-end">
          <button className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Company Info
          </button>
        </div>

        {/* --- Social Media Links Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Social Media Links</h2>
          <p className="text-sm text-gray-500 mb-6 -mt-4">
            Connect your brand's social media profiles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialLinkInput
              platform="Instagram"
              icon="📷"
              value="https://instagram.com/you..."
            />
            <SocialLinkInput
              platform="Facebook"
              icon="👍"
              value="https://facebook.com/you..."
            />
            <SocialLinkInput
              platform="Threads"
              icon="🌀"
              value="https://threads.net/@your..."
            />
            <SocialLinkInput
              platform="Twitter"
              icon="🐦"
              value="https://twitter.com/yourbr..."
            />
            <SocialLinkInput
              platform="LinkedIn"
              icon="🔗"
              value="https://linkedin.com/comp..."
            />
            <SocialLinkInput
              platform="YouTube"
              icon="▶️"
              value="https://youtube.com/@you..."
            />
          </div>
        </div>

      </div>
    </>
  );
}