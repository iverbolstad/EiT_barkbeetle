import React, { useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ReactJson from 'react-json-view';
import { useDataFetcher } from '../hooks/fetchData';


const containerStyle = {
  width: '1680px',
  height: '800px',
};

const center = {
  lat: 64.5, lng: 10.5,
};

function MyMap() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
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

  const [setMap] = React.useState(null);

  const [showData, setShowData] = React.useState(false);

  const { fetcher } = useDataFetcher();

  const fetchSensorData = useCallback(async () => {
    try {
      const data = await fetcher(`
      https://dummyjson.com/products/1
              `);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(() => {
      fetchSensorData();
    }, 60_000 * 30);
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const test = {
    test: "hei"
  }

  const onMark = useCallback((tekst) => {
    setShowData(true);
    console.log(tekst)
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
        zoom={4.83}
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
