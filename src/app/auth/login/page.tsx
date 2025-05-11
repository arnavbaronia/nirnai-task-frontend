import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Property Record Portal',
  description: 'Log in to your Property Record Portal account',
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}