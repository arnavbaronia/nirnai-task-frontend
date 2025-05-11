// User types
export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

// Transaction types
export interface Transaction {
  id: number;
  serialNumber: string | null;
  documentNumber: string | null;
  documentYear: string | null;
  executionDate: string | null;
  presentationDate: string | null;
  registrationDate: string | null;
  nature: string | null;
  executants: string | null;
  claimants: string | null;
  volumeNumber: string | null;
  pageNumber: string | null;
  considerationValue: string | null;
  marketValue: string | null;
  prNumber: string | null;
  propertyType: string | null;
  propertyExtent: string | null;
  village: string | null;
  street: string | null;
  surveyNumbers: string | null;
  plotNumber: string | null;
  remarks: string | null;
  createdAt: string;
}

export interface SearchTransactionsParams {
  buyer?: string;
  seller?: string;
  houseNumber?: string;
  surveyNumber?: string;
  documentNumber?: string;
}

export interface UploadResponse {
  success: boolean;
  count: number;
  data: Transaction[];
}

// Component props
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  register?: any;
  className?: string;
  disabled?: boolean;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (data: UserCredentials) => Promise<void>;
  logout: () => void;
}