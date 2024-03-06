import React, { useCallback, useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDataFetcher } from '../hooks/fetchData';

export default function DataLineChart({ deviceId }) {
  const { fetcher } = useDataFetcher();
  const [sensorData, setSensorData] = useState({ temperature: [], weight: [], humidity: [] });
  const [xLabels, setXLabels] = useState([]);

  const fetchDeviceSensorData = useCallback(async () => {
    if (!deviceId) return;
    try {
      const data = await fetcher(`
        https://api.lab5e.com/span/collections/17kjmdb5n072g2/devices/${deviceId}/data
      `);
      const processedData = data.data.reduce((acc, datapoint) => {
        const date = new Date(parseInt(datapoint.received));
          acc.labels.push(date);
          var actual = datapoint.payload ? JSON.parse(atob(datapoint.payload)) : null;
          acc.temperature.push(actual.temperature);
          acc.weight.push(actual.weight);
          acc.humidity.push(actual.humidity);
          return acc;
      }, { temperature: [], weight: [], humidity: [], labels: [] });

      setSensorData({
        temperature: processedData.temperature,
        weight: processedData.weight,
        humidity: processedData.humidity,
      });
      setXLabels(processedData.labels);
    } catch (e) {
      console.error(e);
    }
  }, [fetcher, deviceId]);

  useEffect(() => {
    fetchDeviceSensorData();
  }, [fetchDeviceSensorData]);

  return (
    <>
      <div>
        <center>
          <h1>{deviceId}</h1>
        </center>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: sensorData.weight, label: 'Vekt', color: '#fdb462' },
          ]}
          xAxis={[{ scaleType: 'time', data: xLabels }]}
        />
        <LineChart
          width={500}
          height={300}
          series={[
            { data: sensorData.temperature, label: 'Temperatur', color: '#e15759' },
          ]}
          xAxis={[{ scaleType: 'time', data: xLabels }]}
        />
        <LineChart
          width={500}
          height={300}
          series={[
            { data: sensorData.humidity, label: 'Luftfuktighet' },
          ]}
          xAxis={[{ scaleType: 'time', data: xLabels }]}
        />
      </div>
    </>
  );
}
