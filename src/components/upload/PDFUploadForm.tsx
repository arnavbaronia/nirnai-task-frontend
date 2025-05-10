'use client'

import { useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { toast } from 'react-hot-toast'
import axios from 'axios'

type PDFUploadFormProps = {
  onUploadSuccess: (pdfFile: string, transactions: any[]) => void
}

export default function PDFUploadForm({ onUploadSuccess }: PDFUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileInputRef.current?.files?.length) return

    const file = fileInputRef.current.files[0]
    const formData = new FormData()
    formData.append('pdf', file)

    try {
      setIsUploading(true)
      // Replace with your actual API endpoint
      const response = await axios.post('/api/process-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      onUploadSuccess(URL.createObjectURL(file), response.data.transactions)
      toast.success('PDF processed successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Failed to process PDF')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Upload PDF</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Upload & Process'}
        </Button>
      </form>
    </div>
  )
}