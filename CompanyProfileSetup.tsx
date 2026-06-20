// src/components/CompanyProfileSetup.tsx
import { clsx } from 'clsx';
import { useClient } from 'next/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { lucide } from '@web/types/lucide';
import { clsx as cn } from 'clsx';
import type { CompanyProfileSetupData } from '@/lib/data';

const CompanyProfileSetup = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      companyName,
      industry,
      size,
      jurisdiction,
    };
    const response = await fetch('/api/company-profile-setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    router.push('/dashboard/data-collection');
  };

  return (
    <div className="max-w-lg p-4 bg-zinc-50 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="font-bold text-zinc-900">Company Profile Setup</h2>
        <div className="mb-4">
          <label
            className={cn('block text-sm font-bold text-zinc-900')}
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className={cn('block w-full py-2 pl-10 text-sm text-zinc-600')}
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className={cn('block text-sm font-bold text-zinc-900')}
            htmlFor="industry"
          >
            Industry
          </label>
          <select
            id="industry"
            className={cn('block w-full py-2 pl-10 text-sm text-zinc-600')}
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
          >
            <option value="">Select Industry</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className={cn('block text-sm font-bold text-zinc-900')}
            htmlFor="size"
          >
            Size
          </label>
          <select
            id="size"
            className={cn('block w-full py-2 pl-10 text-sm text-zinc-600')}
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">Select Size</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className={cn('block text-sm font-bold text-zinc-900')}
            htmlFor="jurisdiction"
          >
            Jurisdiction
          </label>
          <select
            id="jurisdiction"
            className={cn('block w-full py-2 pl-10 text-sm text-zinc-600')}
            value={jurisdiction}
            onChange={(event) => setJurisdiction(event.target.value)}
          >
            <option value="">Select Jurisdiction</option>
          </select>
        </div>
        <button
          type="submit"
          className={cn('py-2 px-4 bg-zinc-900 text-white hover:bg-zinc-700')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompanyProfileSetup;