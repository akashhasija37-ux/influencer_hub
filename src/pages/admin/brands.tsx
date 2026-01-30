import Head from "next/head";
import { useEffect, useState } from "react";
import { Download, ChevronDown, MoreHorizontal } from "lucide-react";

type Brand = {
  id: string;
  name: string;
  avatarInitial: string;
  industry: string;
  campaigns: number;
  applications: number;
  engagement: number;
  totalSpend: string;
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/brands", {
      credentials: "include", // 🔥 REQUIRED
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Brand Management - Influencer Hub</title>
      </Head>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Brand Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage brand accounts
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Industries
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Spend
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center text-gray-500">
                    Loading brands...
                  </td>
                </tr>
              )}

              {!loading && brands.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center text-gray-500">
                    No brands found
                  </td>
                </tr>
              )}

              {brands?.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                        {brand.avatarInitial}
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-900">
                        {brand.name}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    {brand.industry}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {brand.campaigns}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {brand.applications}
                  </td>

                  <td className="px-6 py-4 text-sm text-green-600 font-medium">
                    {brand.engagement}%
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {brand.totalSpend}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
