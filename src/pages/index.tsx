import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getCompanyData } from '@/pages/api/companyData';

const inter = Inter({ subsets: ['latin'] });

interface Company {
  ein: number;
  company_name: string;
  plan_year: number;
  employee_count: number;
  company_state: string;
  premium_sum: number;
  broker_commission_sum: number;
  participants_sum: number;
}

export default function Home({ companies }: { companies: Company[] }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {companies.map((company, idx) => (
        <div
          key={`company-${idx}`}
          className='z-10 w-full max-w-5xl items-center justify-between font-mono mb-6 text-sm lg:flex'
        >
          <div className='border border-gray-900 px-2 w-full'>
            <h2 className='text-center text-xl font-semibold leading-6 text-gray-900 mb-12 mt-8'>
              {company.company_name}
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-16 text-center mb-6 lg:grid-cols-3'>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <div className='text-base leading-7 text-gray-600'>
                  {'State'}
                </div>
                <div className='text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                  {company.company_state}
                </div>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <div className='text-base leading-7 text-gray-600'>
                  {'Employees'}
                </div>
                <div className='text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                  {company.employee_count}
                </div>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <div className='text-base leading-7 text-gray-600'>
                  {'Year'}
                </div>
                <div className='text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                  {company.plan_year}
                </div>
              </div>
            </div>
            <details className='border-t boder-t-gray-900 text-base text-center'>
              <summary className='cursor-pointer text-sky-800 py-4'>
                {'Show more'}
              </summary>
              <main className='flex justify-center my-6'>
                <ul className='text-left w-fit'>
                  <li>
                    <strong>{'Premium: '}</strong>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact'
                    }).format(company.premium_sum)}
                  </li>
                  <li>
                    <strong>{'Participants: '}</strong>
                    {company.participants_sum}
                  </li>
                  <li>
                    <strong>{'Broker Commisions: '}</strong>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact'
                    }).format(company.broker_commission_sum)}
                  </li>
                </ul>
              </main>
            </details>
          </div>
        </div>
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  const companies = await getCompanyData();
  return {
    props: {
      companies: JSON.parse(companies)
    }
  };
}
