import { MovementResponse } from '@/types/movement';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Enum_MovementType } from '@prisma/client';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const MovementsChart = ({ data }: { data: MovementResponse[] }) => {
  const chartData = useMemo(() => (data ? toChartData(data) : []), [data]);
  return (
    <div className='w-full px-20'>
      <h2 className='text-2xl font-semibold text-center py-4'>
        {chartData.length > 0 ? chartData[chartData.length - 1].y : 0} Units
        <span className='block text-sm font-light'>Current Stock</span>
      </h2>
      <Chart
        options={chartOptions}
        series={[{ name: 'Movements', data: chartData }]}
        type='area'
        height={350}
      />
    </div>
  );
};

const chartOptions: ApexOptions = {
  tooltip: {
    x: {
      formatter: (date) => new Date(date).toLocaleString(),
    },
  },
  markers: {
    size: 5,
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter: (date) => new Date(date).toLocaleDateString(),
    },
  },
  stroke: {
    curve: 'stepline',
    width: 2,
  },
  colors: ['#10b981'],
};

const toChartData = (data: MovementResponse[]) => {
  let count = 0;
  const result = [];
  for (const i of data) {
    const factor = i.movementType === Enum_MovementType.IN ? 1 : -1;
    count = count + factor * i.quantity;
    result.push({ x: new Date(i.date), y: count });
  }
  return result;
};
