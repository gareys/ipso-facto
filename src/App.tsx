import React, { useEffect, useState } from 'react';
import GifPlayer from 'react-gif-player';
import { IPInfo, ipService } from './ipService';
import ipsoImg from './ipso.gif';
import ipsoStillImg from './ipso-still.png';
import errorImg from './error.gif';
import errorStillImg from './error-still.png';
import ball from './favicon.svg';
import './App.css';

function App() {
  const [ipInfo, setipInfo] = useState<IPInfo | undefined>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        const ipData = await ipService();
        setipInfo(ipData);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchIPInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <img data-testid="ball" src={ball} id="ball" />}
        {error && (
          <>
            <GifPlayer
              data-testid="error-gif"
              gif={errorImg}
              still={errorStillImg}
            />
            <h2 data-testid="error-text">We were unable to retrieve your IP</h2>
          </>
        )}
        {!error && !loading && <GifPlayer gif={ipsoImg} still={ipsoStillImg} />}
        {ipInfo && (
          <>
            <h1 data-testid="ip-address">{ipInfo.ip}</h1>
            <p data-testid="isp">{ipInfo.isp}</p>
            <p data-testid="location">
              {ipInfo.city}, {ipInfo.region} {ipInfo.postal_code}
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
