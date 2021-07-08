import React, { useEffect, useState } from 'react';
import ipsoImg from './ipso.gif';
import ipsoStillImg from './ipso-still.png';
import './App.css';
import GifPlayer from 'react-gif-player';

type IPInfo = {
  ip: string;
  isp: string;
  city: string;
  region: string;
  postal_code: string;
};

function App() {
  const [ipInfo, setipInfo] = useState<IPInfo | undefined>();

  useEffect(() => {
    const fetchIPInfo = async () => {
      const fetchRes = await fetch('https://json.geoiplookup.io/');
      const jsonRes = await fetchRes.json();
      setipInfo(jsonRes);
    };
    fetchIPInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <GifPlayer gif={ipsoImg} still={ipsoStillImg} />
        {ipInfo && (
          <>
            <h1>{ipInfo.ip}</h1>
            <p>{ipInfo.isp}</p>
            <p>
              {ipInfo.city}, {ipInfo.region} {ipInfo.postal_code}
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
