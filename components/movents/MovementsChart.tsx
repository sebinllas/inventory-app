import { MovementResponse } from '@/types/movement';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Enum_MovementType } from '@prisma/client';
import { formatDateString } from '@/utils/date';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const MovementsChart = ({ data }: { data: MovementResponse[] }) => {
  const chartData = useMemo(() => (data ? toStockPerDay(data) : []), [data]);
  return (
    <div className='container px-6 py-4'>
      <h2 className='py-4 text-center text-2xl font-semibold'>
        {chartData.length > 0 ? chartData[chartData.length - 1].y : 0} Units
        <span className='block text-sm font-light'>Current Stock</span>
      </h2>
      <Chart
        options={chartOptions}
        series={[{ name: 'Quantity', data: chartData }]}
        type='area'
        height={350}
      />
    </div>
  );
};

const toStockPerDay = (data: MovementResponse[]) => {
  let count = 0;
  const result = {} as Record<string, number>;
  for (const i of data) {
    const factor = i.movementType === Enum_MovementType.IN ? 1 : -1;
    const date = new Date(i.date);
    const dateFormatted = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
    count = count + factor * i.quantity;
    result[dateFormatted] = count;
  }
  return Object.entries(result).map(([x, y]) => ({ x, y }));
};

const chartOptions: ApexOptions = {
  chart: {
    zoom: {
      enabled: true,
      autoScaleYaxis: true,
    },
  },
  markers: {
    size: 5,
  },
  tooltip: {
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      const data = w.config.series[seriesIndex].data[dataPointIndex];
      const delta =
        dataPointIndex > 0
          ? data.y - w.config.series[seriesIndex].data[dataPointIndex - 1].y
          : data.y;
      return toolTipHtml({ data, delta });
    },
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter: formatDateString,
    },
  },
  stroke: {
    curve: 'stepline',
    width: 2,
  },
  colors: ['#10b981'],
};

const toolTipHtml = ({
  data,
  delta,
}: {
  data: { x: string; y: number };
  delta: number;
}) => {
  return `
    <div class="bg-white p-2 shadow-md rounded-md">
      <h1 class="text-sm font-semibold">${new Date(data.x).toDateString()}</h1>
      <p class="text-sm font-light">Total: ${data.y} Units</p>
      <p class="text-sm font-light">
        Movement:  
        <span class="${delta > 0 ? 'text-emerald-600' : 'text-red-600'}"> 
          ${delta > 0 ? '+' : ''}${delta} 
        </span>
        Units
      </p>
    </div>
  `;
};
