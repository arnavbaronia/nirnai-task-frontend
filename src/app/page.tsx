import Link from 'next/link';
import Button from '@/components/common/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">Property Record Portal</h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
        Search, upload, and manage property records all in one place. Track property transactions, view property history, and more.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link href="/auth/login">
          <Button size="large">Log In</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="outline" size="large">Create Account</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Search Records</h2>
          <p className="text-gray-600">
            Find property records by owner, location, or document details with our powerful search tool.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Upload Documents</h2>
          <p className="text-gray-600">
            Upload property documents to our secure database for easy access and management.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">View Analytics</h2>
          <p className="text-gray-600">
            Access detailed analytics on property values, transaction volume, and market trends.
          </p>
        </div>
      </div>
    </div>
  );
}