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
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        const ipData = await ipService();
        setipInfo(ipData);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
        setRerender(false);
      }
    };
    if (rerender) fetchIPInfo();
  }, [rerender]);

  return (
    <div className="App">
      <section className="App-container">
        {loading && (
          <img data-testid="loading-ball" src={ball} className="ball" />
        )}
        {error && (
          <>
            <GifPlayer
              data-testid="error-gif"
              gif={errorImg}
              still={errorStillImg}
            />
            <h2 data-testid="error-text" id="error-text">
              We were unable to retrieve your IP
            </h2>
          </>
        )}
        {!error && !loading && <GifPlayer gif={ipsoImg} still={ipsoStillImg} />}
        {ipInfo && (
          <div className="ipInfo">
            <div id="info-left">
              <h1 data-testid="ip-address">{ipInfo.ip}</h1>
              <small>Your IP Address</small>
              <p data-testid="isp">{ipInfo.isp}</p>
              <small>
                Your <abbr title="Internet Service Provider">ISP</abbr>
              </small>
              <p data-testid="location">
                {ipInfo.city}, {ipInfo.region} {ipInfo.postal_code}
              </p>
              <small>Your Location</small>
            </div>
            <div id="info-right">
              <img
                data-testid="ball"
                src={ball}
                id="info-ball"
                className="ball"
              />
            </div>
          </div>
        )}
        <details id="dev-menu">
          <summary>
            <div id="dev-menu-wrench">&#128295;</div>
          </summary>
          <div id="dev-menu-contents">
            <button
              onClick={() => {
                setLoading(false);
                setError(true);
                setipInfo(undefined);
              }}
            >
              Show Error State
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setError(false);
                setipInfo(undefined);
              }}
            >
              Show Loading State
            </button>
            <button
              onClick={() => {
                setError(false);
                setLoading(true);
                setRerender(true);
              }}
            >
              Rerender App
            </button>
          </div>
        </details>
      </section>
    </div>
  );
}

export default App;
