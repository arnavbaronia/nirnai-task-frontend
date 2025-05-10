import PDFUploadForm from '@/components/upload/PDFUploadForm'
import TransactionsTable from '@/components/results/TransactionsTable'
import PDFPreviewPanel from '@/components/pdf-preview/PDFPreviewPanel'
import { useState } from 'react'
import { Transaction } from '@/types/transactions'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pdfFile, setPdfFile] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">PDF Transaction Extractor</h1>
      
      <div className="mb-8">
        <PDFUploadForm 
          onUploadSuccess={(file, transactions) => {
            setPdfFile(file)
            setTransactions(transactions)
          }} 
        />
      </div>

      {transactions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Extracted Transactions</h2>
            <TransactionsTable transactions={transactions} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
            <PDFPreviewPanel pdfFile={pdfFile} />
          </div>
        </div>
      )}
    </div>
  )
}