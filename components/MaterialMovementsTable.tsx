import { API_ROUTES } from '@/constants/api';
import { fetcher } from '@/utils/fetcher';
import { Enum_MovementType } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';
import { RequestResultList } from './common/RequestResultList';
import { MovementResponse } from '@/types/movement';
import { Loading } from './common/Loading';
import { formatDateTimeString } from '@/utils/date';

interface MaterialMovementsTableProps {
  materialId: string;
}

export const MaterialMovementsTable = ({
  materialId,
}: MaterialMovementsTableProps) => {
  const { data, error, isLoading } = useSWR<MovementResponse[]>(
    `${API_ROUTES.movements}?material=${materialId}&expand=user`,
    fetcher
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Movement id</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Responsible</th>
        </tr>
      </thead>
      <tbody>
        <RequestResultList<MovementResponse>
          data={data}
          isError={error}
          isLoading={isLoading}
          loadingComponent={<LoadingComponent />}
          noDataComponent={<NoDataComponent />}
          errorComponent={<ErrorComponent />}
          itemRenderer={(movement) => (
            <tr key={movement.id}>
              <td>{movement.id}</td>
              <td>{formatDateTimeString(movement.date)}</td>
              <td>
                {movement.movementType === Enum_MovementType.IN ? (
                  <span className='text-green-500'>🡅 </span>
                ) : (
                  <span className='text-red-500'>🡇 </span>
                )}
                <span>{movement.quantity}</span>
              </td>
              <td>{movement.createdBy.name}</td>
            </tr>
          )}
        />
      </tbody>
    </table>
  );
};

const LoadingComponent = () => {
  return (
    <tr>
      <td colSpan={4} className='mx-auto p-10'>
        <Loading />
      </td>
    </tr>
  );
};

const NoDataComponent = () => {
  return (
    <tr className='text-center'>
      <td colSpan={4} className=' p-10'>
        There are no movements for this material
      </td>
    </tr>
  );
};

const ErrorComponent = () => {
  return (
    <tr className='text-center'>
      <td colSpan={4} className=' p-10'>
        Failed to load movements
      </td>
    </tr>
  );
};
