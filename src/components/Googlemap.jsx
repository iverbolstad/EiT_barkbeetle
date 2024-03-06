import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDataFetcher } from '../hooks/fetchData';
import Sidemenu from './Sidebar';
import DataLineChart from './LineChart';


const containerStyle = {
  width: '200vh',
  height: '100vh',
};

const center = {
  lat: 64.5, lng: 10.5,
};

function MyMap() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const googleMapsOptions = {
    fullscreenControl: false,
    mapTypeControlOptions: { mapTypeIds: [] },
    // styles: darkSkin,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: { position: 5.0 },
    isFractionalZoomEnabled: true,
    backgroundColor: '#101020',
  };

  const [map, setMap] = useState(null);

  const [showData, setShowData] = useState(false);
  const [deviceData, setDeviceData] = useState([])
  const [currDevice, setcurrDevice] = useState('')

  const { fetcher } = useDataFetcher();

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, [setMap]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, [setMap]);

  const fetchDevices = useCallback(async () => {
    try {
      const data = await fetcher(`
      https://api.lab5e.com/span/collections/17kjmdb5n072g2/devices
              `);
      data.devices.push(
          {
            deviceId: "TEST",
            tags: {
                lat: 63,
                lng: 10
            },
          },
          )
      data.devices.push(
          {
            deviceId: "TEST 2",
            tags: {
              lat: 62,
              lng: 9
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 3",
            tags: {
              lat: 60.4720,
              lng: 8.4689
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 4",
            tags: {
              lat: 61.8936,
              lng: 9.6895
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 5",
            tags: {
              lat: 59.9139,
              lng: 10.7522
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 6",
            tags: {
              lat: 63.4305,
              lng: 10.3951
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 7",
            tags: {
              lat: 67.2804,
              lng: 14.4049
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 8",
            tags: {
              lat: 68.4384,
              lng: 17.4272
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 9",
            tags: {
              lat: 58.9690,
              lng: 5.7331
            }
          }
        )
        data.devices.push(
          {
            deviceId: "TEST 10",
            tags: {
              lat: 69.6492,
              lng: 18.9560
            }
          }
        )

      setDeviceData(data);
    } catch (e) {
      console.error(e);
      setDeviceData([]);
    }
  }, [fetcher]);

  // https://api.lab5e.com/span/collections/{collectionId}/devices/{deviceId}
  // collid 17kjmdb5n072g2
  // devid 17km3k0e9d3658
  // Header api token


  useEffect(() => {
    fetchDevices();
    const interval = setInterval(() => {
      fetchDevices();
    }, 60_000 * 30);
    return () => clearInterval(interval);
  }, [fetchDevices]);

  const onMark = useCallback((deviceId) => {
    setShowData(true);
    setcurrDevice(deviceId);
  }, [])

  const renderMarkers = useCallback((location) => {

    let markers = []

    let posLocation = {
      lat: Number(location.tags.lat),
      lng: Number(location.tags.lng)
    }

    markers.push(
      <Marker
        key={location.deviceId ? location.deviceId : undefined}
        position={posLocation}
        label={
          location.deviceId ? location.deviceId : undefined
        }
        title={
          location.deviceId ? location.deviceId : undefined
        }
        onClick={() => {
          onMark(location.deviceId ? location.deviceId : "undefined");
        }}
      />
    )
    return markers;

  }, [onMark]);

  const mapMarkers = useMemo(() => {
    console.log(deviceData);
    if (deviceData && Array.isArray(deviceData.devices)) {
      console.log('HEER'+deviceData)
      return deviceData.devices.map((location) =>
        renderMarkers(location)
      );
    }
    return [];
  }, [renderMarkers, deviceData]);

  return isLoaded ? (
    <div style={{display: 'flex', height: '100vh'}}>
      <Sidemenu items={deviceData}/>

      <GoogleMap
        mapContainerStyle={containerStyle}
        options={googleMapsOptions}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setShowData(false)}
      >
        {mapMarkers}
      </GoogleMap>
      <div
        style={{
          height: '100%',
          width: '50%',
          display: showData ? 'block' : 'none',
          overflowY: 'auto',
        }}
      >
        <DataLineChart deviceId={currDevice} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
