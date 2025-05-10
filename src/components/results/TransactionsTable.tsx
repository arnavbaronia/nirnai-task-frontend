'use client'

import { Transaction } from '@/types/transactions'

type TransactionsTableProps = {
  transactions: Transaction[]
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions to display</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.documentNumber}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.documentNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.buyer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.seller}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}