import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function DataLineChart() {
  const uData = [40, 30, 20, 27, 18, 23, 34];
  const pData = [240, 139, 980, 390, 480, 380, 430];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Vekt' },
        { data: uData, label: 'Temperatur' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}