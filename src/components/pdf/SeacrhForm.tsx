import React from 'react';
import { useForm } from 'react-hook-form';
import { SearchTransactionsParams } from '@/types';
import Button from '../common/Button';
import Input from '../common/Input';

interface SearchFormProps {
  onSearch: (data: SearchTransactionsParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchTransactionsParams>({
    defaultValues: {
      buyer: '',
      seller: '',
      houseNumber: '',
      surveyNumber: '',
      documentNumber: '',
    },
  });

  const onSubmit = (data: SearchTransactionsParams) => {
    // Remove empty fields
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value && value.trim() !== '')
    );
    onSearch(cleanedData as SearchTransactionsParams);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Search Property Records</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Buyer Name"
          name="buyer"
          placeholder="Enter buyer name"
          register={register}
          error={errors.buyer?.message}
        />
        
        <Input
          label="Seller Name"
          name="seller"
          placeholder="Enter seller name"
          register={register}
          error={errors.seller?.message}
        />
        
        <Input
          label="House Number"
          name="houseNumber"
          placeholder="Enter house/plot number"
          register={register}
          error={errors.houseNumber?.message}
        />
        
        <Input
          label="Survey Number"
          name="surveyNumber"
          placeholder="Enter survey number"
          register={register}
          error={errors.surveyNumber?.message}
        />
        
        <Input
          label="Document Number"
          name="documentNumber"
          placeholder="Enter document number"
          register={register}
          error={errors.documentNumber?.message}
        />
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Search Records
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;