import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDataFetcher } from '../hooks/fetchData';
import Sidemenu from './Sidebar';

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
  const fetchDeviceSensorData = useCallback(async () => {
    try {
      const data = await fetcher(`
      https://api.lab5e.com/span/collections/17kjmdb5n072g2/devices/17km3k0e9d3658
              `);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchDevices();
    fetchDeviceSensorData();
    const interval = setInterval(() => {
      fetchDeviceSensorData();
    }, 60_000 * 30);
    return () => clearInterval(interval);
  }, [fetchDeviceSensorData, fetchDevices]);

  const onMark = useCallback((tekst) => {
    setShowData(true);
  }, [])

  const renderMarkers = useCallback((location) => {

    let markers = []

    let posLocation = {
      lat: Number(location.tags.lat),
      lng: Number(location.tags.lng)
    }

    markers.push(
      <Marker
        key={location.deviceId ? location.ideviceId : undefined}
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
      return deviceData.devices.map((location) =>
        renderMarkers(location)
      );
    }
    return [];
  }, [renderMarkers, deviceData]);

  return isLoaded ? (
    <div style={{display: 'flex'}}>
      {showData && <div></div>}

      <GoogleMap
        mapContainerStyle={containerStyle}
        options={googleMapsOptions}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // onClick={setShowData(false)}
      >
        {mapMarkers}
        <></>
      </GoogleMap>
      <div
        style={{
          height: '100%',
          width: '50%',
          display: showData ? 'block' : 'none',
        }}
      >

      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
