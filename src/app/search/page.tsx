'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchForm from '@/components/pdf/SearchForm';
import TransactionTable from '@/components/pdf/TransactionTable';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';

export default function SearchPage() {
  const { user, isLoading } = useAuth();
  const { searchTransactions } = useTransactions();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  const handleSearch = async (searchParams) => {
    setIsSearching(true);
    try {
      const results = await searchTransactions(searchParams);
      setTransactions(results);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Property Records</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {isSearching ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : searchPerformed ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {transactions.length > 0 ? (
            <TransactionTable transactions={transactions} />
          ) : (
            <div className="bg-gray-50 p-10 text-center rounded-lg">
              <p className="text-gray-600">No matching records found</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}