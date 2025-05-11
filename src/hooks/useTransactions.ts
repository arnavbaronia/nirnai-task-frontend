import { useState } from 'react';
import { SearchTransactionsParams, Transaction, UploadResponse } from '@/types';
import { pdfApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface UseTransactionsReturn {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  searchTransactions: (params: SearchTransactionsParams) => Promise<void>;
  uploadPdf: (file: File) => Promise<UploadResponse | null>;
  clearTransactions: () => void;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Search for transactions based on filters
  const searchTransactions = async (params: SearchTransactionsParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await pdfApi.searchTransactions(params);
      setTransactions(data);
      return data;
    } catch (err: any) {
      setError(err);
      toast.error(err.response?.data?.message || 'Failed to search transactions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload PDF file
  const uploadPdf = async (file: File): Promise<UploadResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await pdfApi.uploadPdf(file);
      if (data.data) {
        setTransactions(prevTransactions => [...data.data, ...prevTransactions]);
      }
      toast.success(`Successfully processed ${data.count} transactions`);
      return data;
    } catch (err: any) {
      setError(err);
      toast.error(err.response?.data?.message || 'Failed to upload PDF');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear transactions
  const clearTransactions = () => {
    setTransactions([]);
  };

  return {
    transactions,
    isLoading,
    error,
    searchTransactions,
    uploadPdf,
    clearTransactions,
  };
};