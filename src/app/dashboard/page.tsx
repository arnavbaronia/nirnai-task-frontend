'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/dashboard/StatsCard';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { getTransactionStats } = useTransactions();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    recentUploads: 0,
    searchCount: 0
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }

    if (user) {
      // In a real app, we would fetch real stats
      const fetchStats = async () => {
        try {
          // This would be replaced with actual API calls
          // const stats = await getTransactionStats();
          setStats({
            totalTransactions: 154,
            recentUploads: 12,
            searchCount: 38
          });
        } catch (error) {
          console.error('Failed to fetch stats:', error);
        }
      };

      fetchStats();
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <div className="flex space-x-4">
          <Link href="/search">
            <Button variant="outline">Search Records</Button>
          </Link>
          <Link href="/upload">
            <Button>Upload Document</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon="DocumentText"
        />
        <StatsCard
          title="Recent Uploads"
          value={stats.recentUploads}
          icon="Upload"
        />
        <StatsCard
          title="Search Operations"
          value={stats.searchCount}
          icon="Search"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {stats.recentUploads > 0 ? (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">Document #123456 uploaded</p>
              <p className="text-sm text-gray-500">Today at 10:23 AM</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Search performed for "Survey #789"</p>
              <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">Document #123455 uploaded</p>
              <p className="text-sm text-gray-500">May 9, 2025 at 11:30 AM</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No recent activity to display</p>
        )}
      </div>
    </div>
  );
}