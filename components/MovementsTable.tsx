import { MovementResponse } from '@/types/movement';
import { formatDateTimeString } from '@/utils/date';
import { Enum_MovementType } from '@prisma/client';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';

export const MovementsTable = ({
  data,
  materialName,
}: {
  data: MovementResponse[];
  materialName?: string;
}) => {
  return (
    <table>
      <thead className='divide-y divide-slate-300'>
        {materialName && (
          <tr>
            <th colSpan={4} className='text-center'>
              Material: {materialName}
            </th>
          </tr>
        )}
        <tr>
          <th>Movement id</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Responsible</th>
        </tr>
      </thead>
      <tbody>{data.map(rowRenderer)}</tbody>
    </table>
  );
};

const rowRenderer = (movement: MovementResponse) => (
  <tr key={movement.id}>
    <td>{movement.id}</td>
    <td>{formatDateTimeString(movement.date)}</td>
    <td className='flex'>
      {movement.movementType === Enum_MovementType.IN ? (
        <span className='text-green-500'>
          <IconCaretUpFilled />
        </span>
      ) : (
        <span className='text-red-500'>
          <IconCaretDownFilled />
        </span>
      )}
      <span>{movement.quantity}</span>
    </td>
    <td>{movement.createdBy.name}</td>
  </tr>
);
