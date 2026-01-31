import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Save, UploadCloud } from 'lucide-react';

/* ===================== HELPERS ===================== */

const FormField = ({ label, id, value, type = 'text', placeholder = '', onChange }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value || ''}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    />
  </div>
);

const TextareaField = ({ label, id, value, rows = 3, onChange }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      value={value || ''}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    />
  </div>
);

const SelectField = ({ label, id, value, children, onChange }: any) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      value={value || ''}
      onChange={onChange}
      className="w-full appearance-none rounded-lg border border-gray-300 p-2.5 text-sm bg-white"
    >
      {children}
    </select>
    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-9 pointer-events-none" />
  </div>
);

const SocialLinkInput = ({ icon, value, onChange }: any) => (
  <div className="flex items-center space-x-3">
    <span className="text-xl">{icon}</span>
    <input
      type="text"
      value={value || ''}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
    />
    <button
      type="button"
      className="text-sm font-medium text-purple-600 hover:text-purple-800 flex-shrink-0"
    >
      Connect
    </button>
  </div>
);

/* ===================== PAGE ===================== */

export default function MyProfilePage() {
  const [brand, setBrand] = useState<any>({});
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH PROFILE ---------- */
  useEffect(() => {
    fetch('/api/brand/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setBrand(data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------- HANDLE CHANGE ---------- */
  const handleChange = (key: string) => (e: any) => {
    setBrand((prev: any) => ({ ...prev, [key]: e.target.value }));
  };

  /* ---------- SAVE PROFILE ---------- */
  const saveProfile = async () => {
    await fetch('/api/brand/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(brand),
    });

    alert('Profile updated successfully');
  };

  if (loading) return null;

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

        {/* Brand Logo */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Brand Logo</h2>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl font-bold">
              {brand.avatarInitial || brand.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <UploadCloud className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-purple-600">Upload New Logo</span>
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG or SVG. Max 2MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Company Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Company Name" value={brand.name} onChange={handleChange('name')} />
            <SelectField label="Industry" value={brand.industry} onChange={handleChange('industry')}>
              <option value="">Select industry</option>
              <option>Fashion & Apparel</option>
              <option>Technology</option>
              <option>Health & Fitness</option>
            </SelectField>

            <FormField label="Email" value={brand.email} onChange={handleChange('email')} />
            <FormField label="Phone" value={brand.phone} onChange={handleChange('phone')} />

            <div className="md:col-span-2">
              <FormField label="Website" value={brand.website} onChange={handleChange('website')} />
            </div>

            <div className="md:col-span-2">
              <TextareaField
                label="Company Description"
                value={brand.description}
                onChange={handleChange('description')}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Company Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField label="Street Address" value={brand.addressLine1} onChange={handleChange('addressLine1')} />
            </div>
            <FormField label="City" value={brand.city} onChange={handleChange('city')} />
            <FormField label="State / Province" value={brand.state} onChange={handleChange('state')} />
            <FormField label="Country" value={brand.country} onChange={handleChange('country')} />
            <FormField label="Postal Code" value={brand.postalCode} onChange={handleChange('postalCode')} />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={saveProfile}
            className="flex items-center bg-purple-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Company Info
          </button>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Social Media Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialLinkInput icon="📷" value={brand.instagramUrl} onChange={handleChange('instagramUrl')} />
            <SocialLinkInput icon="👍" value={brand.facebookUrl} onChange={handleChange('facebookUrl')} />
            <SocialLinkInput icon="🌀" value={brand.threadsUrl} onChange={handleChange('threadsUrl')} />
            <SocialLinkInput icon="🐦" value={brand.twitterUrl} onChange={handleChange('twitterUrl')} />
            <SocialLinkInput icon="🔗" value={brand.linkedinUrl} onChange={handleChange('linkedinUrl')} />
            <SocialLinkInput icon="▶️" value={brand.youtubeUrl} onChange={handleChange('youtubeUrl')} />
          </div>
        </div>

      </div>
    </>
  );
}
