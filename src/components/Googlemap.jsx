import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ReactJson from 'react-json-view';
import { useDataFetcher } from '../hooks/fetchData';


const containerStyle = {
  width: '150vh',
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

  const [showData, setShowData] = React.useState(false);

  const { fetcher } = useDataFetcher();

  const fetchDevices = useCallback(async () => {
    try {
      const data = await fetcher(`
      https://api.lab5e.com/span/collections/17kjmdb5n072g2/devices
              `);
      console.log(data);
    } catch (e) {
      console.error(e);
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

  

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, [setMap]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, [setMap]);

  const test = {
    test: "hei"
  }

  const onMark = useCallback((tekst) => {
    setShowData(true);
  }, [])

  return isLoaded ? (
    <div>

      {showData && <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              zIndex: 1000,
              backgroundColor: 'white',
              borderRadius: '5px',
              paddingLeft: '10px',
              paddingRight: '10px',
              maxWidth: '500px',
              maxHeight: '500px',
              overflow: 'auto',
            }}
          >
        <ReactJson
          src={test}
          displayDataTypes={false}
        />
        </div>
      }

      <GoogleMap
        mapContainerStyle={containerStyle}
        options={googleMapsOptions}
        center={center}
        zoom={3.9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // onClick={setShowData(false)}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={{ lat: 64, lng: 10 }} onClick={() => {
              onMark("Tester");
            }}/>
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyMap);
