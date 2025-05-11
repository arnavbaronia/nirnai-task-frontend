'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

interface Transaction {
  id: number;
  serialNumber?: string;
  documentNumber?: string;
  documentYear?: string;
  executionDate?: string | null;
  presentationDate?: string | null;
  registrationDate?: string | null;
  nature?: string;
  executants?: string;
  claimants?: string;
  volumeNumber?: string;
  pageNumber?: string;
  considerationValue?: string;
  marketValue?: string;
  prNumber?: string;
  propertyType?: string;
  propertyExtent?: string;
  village?: string;
  street?: string;
  surveyNumbers?: string;
  plotNumber?: string;
  remarks?: string;
  [key: string]: any;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  const toggleRowExpand = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sellers
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyers
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <>
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.documentNumber || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.executionDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.nature || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {transaction.executants || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {transaction.claimants || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(transaction.considerationValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="text" 
                      size="sm" 
                      onClick={() => toggleRowExpand(transaction.id)}
                    >
                      {expandedRow === transaction.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </td>
                </tr>
                {expandedRow === transaction.id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Property Details */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Property Details</h4>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Village:</dt>
                              <dd className="text-gray-900">{transaction.village || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Street:</dt>
                              <dd className="text-gray-900">{transaction.street || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Survey Numbers:</dt>
                              <dd className="text-gray-900">{transaction.surveyNumbers || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Plot Number:</dt>
                              <dd className="text-gray-900">{transaction.plotNumber || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Property Type:</dt>
                              <dd className="text-gray-900">{transaction.propertyType || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Property Extent:</dt>
                              <dd className="text-gray-900">{transaction.propertyExtent || 'N/A'}</dd>
                            </div>
                          </dl>
                        </div>

                        {/* Transaction Details */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Transaction Details</h4>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">PR Number:</dt>
                              <dd className="text-gray-900">{transaction.prNumber || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Document Year:</dt>
                              <dd className="text-gray-900">{transaction.documentYear || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Presentation Date:</dt>
                              <dd className="text-gray-900">{formatDate(transaction.presentationDate)}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Registration Date:</dt>
                              <dd className="text-gray-900">{formatDate(transaction.registrationDate)}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Volume Number:</dt>
                              <dd className="text-gray-900">{transaction.volumeNumber || 'N/A'}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Page Number:</dt>
                              <dd className="text-gray-900">{transaction.pageNumber || 'N/A'}</dd>
                            </div>
                          </dl>
                        </div>

                        {/* Financial Details */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Financial Details</h4>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Consideration Value:</dt>
                              <dd className="text-gray-900">{formatCurrency(transaction.considerationValue)}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Market Value:</dt>
                              <dd className="text-gray-900">{formatCurrency(transaction.marketValue)}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Remarks:</dt>
                              <dd className="text-gray-900">{transaction.remarks || 'N/A'}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}