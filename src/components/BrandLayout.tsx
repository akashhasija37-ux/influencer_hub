import React from 'react';
import BrandSidebar from './BrandSidebar';
import BrandTopbar from './BrandTopbar';

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <BrandSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <BrandTopbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children} {/* This renders the brand page */}
        </main>
      </div>
    </div>
  );
}