import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import { MovementResponse } from '@/types/movement';
import { Loading } from '@/components/common/Loading';
import { MovementsChart } from './MovementsChart';
import { MovementsTable } from './MovementsTable';

interface MaterialMovementsDetailsProps {
  materialId: string;
  materialName?: string;
}

export const MaterialMovementsDetails = ({
  materialId,
  materialName,
}: MaterialMovementsDetailsProps) => {
  const { data, error, isLoading } = useSWR<MovementResponse[]>(
    `${API_ROUTES.movements}?material=${materialId}&expand=user`,
    fetcher
  );

  const renderContent = () => {
    if (isLoading) return <LoadingComponent />;
    if (error) return <ErrorComponent />;
    if (!data || data.length === 0) return <NoDataComponent />;
    return <MovementsTable data={data} materialName={materialName} />;
  };

  return (
    <>
      <div className='container flex w-fit flex-col justify-center px-6 py-4'>
        {renderContent()}
      </div>
      {data && data.length !== 0 && <MovementsChart data={data} />}
    </>
  );
};

const LoadingComponent = () => {
  return (
    <div className='p-10'>
      <Loading />
    </div>
  );
};

const NoDataComponent = () => {
  return (
    <div className='p-10 text-center'>
      There are no movements for this material
    </div>
  );
};

const ErrorComponent = () => {
  return <div className='p-10 text-center'>Failed to load movements</div>;
};
