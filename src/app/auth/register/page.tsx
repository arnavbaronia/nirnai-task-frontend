import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - Property Record Portal',
  description: 'Create a new account on Property Record Portal',
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
}