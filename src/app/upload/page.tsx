'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PdfUploader from '@/components/pdf/PdfUploader';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/common/Button';
import Link from 'next/link';

export default function UploadPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadStats, setUploadStats] = useState<{count: number; data: any[]} | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  const handleUploadSuccess = (data) => {
    setUploadSuccess(true);
    setUploadStats(data);
  };

  const handleReset = () => {
    setUploadSuccess(false);
    setUploadStats(null);
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
      <h1 className="text-2xl font-bold mb-6">Upload Property Records</h1>
      
      {!uploadSuccess ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Upload PDF documents containing property transaction records</li>
              <li>Maximum file size: 50MB</li>
              <li>The system will extract and process property transaction data</li>
              <li>All extracted records will be searchable after processing</li>
            </ul>
          </div>
          
          <PdfUploader onUploadSuccess={handleUploadSuccess} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 text-green-800 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-2">Upload Successful!</h2>
          <p className="text-center text-gray-600 mb-6">
            {uploadStats?.count || 0} transaction records were successfully processed.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button onClick={handleReset}>Upload Another Document</Button>
            <Link href="/search">
              <Button variant="outline">Search Records</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}