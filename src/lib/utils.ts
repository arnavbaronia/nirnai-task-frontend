import { Transaction } from '@/types';

// Format date
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

// Format currency
export const formatCurrency = (value: string | null): string => {
  if (!value) return 'N/A';
  
  try {
    const numValue = parseFloat(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numValue);
  } catch (error) {
    return value;
  }
};

// Truncate text
export const truncateText = (text: string | null, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return `${text.slice(0, maxLength)}...`;
};

// Format property transaction for display
export const formatTransaction = (transaction: Transaction): Record<string, string> => {
  return {
    'Document No.': transaction.documentNumber || 'N/A',
    'Serial No.': transaction.serialNumber || 'N/A',
    'Execution Date': formatDate(transaction.executionDate),
    'Registration Date': formatDate(transaction.registrationDate),
    'Nature': transaction.nature || 'N/A',
    'Seller(s)': transaction.executants || 'N/A',
    'Buyer(s)': transaction.claimants || 'N/A',
    'Consideration Value': formatCurrency(transaction.considerationValue),
    'Market Value': formatCurrency(transaction.marketValue),
    'Property Type': transaction.propertyType || 'N/A',
    'Property Extent': transaction.propertyExtent || 'N/A',
    'Village': transaction.village || 'N/A',
    'Street': transaction.street || 'N/A',
    'Survey No.': transaction.surveyNumbers || 'N/A',
    'Plot No.': transaction.plotNumber || 'N/A',
  };
};

// Group transactions by village
export const groupTransactionsByVillage = (transactions: Transaction[]): Record<string, number> => {
  const result: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    const village = transaction.village || 'Unknown';
    if (result[village]) {
      result[village]++;
    } else {
      result[village] = 1;
    }
  });
  
  return result;
};

// Filter transactions by date range
export const filterByDateRange = (
  transactions: Transaction[], 
  startDate: Date, 
  endDate: Date
): Transaction[] => {
  return transactions.filter(transaction => {
    if (!transaction.executionDate) return false;
    
    const executionDate = new Date(transaction.executionDate);
    return executionDate >= startDate && executionDate <= endDate;
  });
};

// Get total value of transactions
export const getTotalValue = (transactions: Transaction[]): number => {
  return transactions.reduce((total, transaction) => {
    if (!transaction.considerationValue) return total;
    return total + parseFloat(transaction.considerationValue);
  }, 0);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Extract first name from full name
export const getFirstName = (fullName: string | null): string => {
  if (!fullName) return '';
  return fullName.split(' ')[0];
};