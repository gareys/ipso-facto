import React, { useEffect, useState } from 'react';
import GifPlayer from 'react-gif-player';
import { IPInfo, ipService } from '../../services/ipService';
import { IpInfo } from '../IpInfo/IpInfo';
import { DevMenu } from '../DevMenu/DevMenu';
import ipsoImg from '../../images/ipso.gif';
import ipsoStillImg from '../../images/ipso-still.png';
import errorImg from '../../images/error.gif';
import errorStillImg from '../../images/error-still.png';
import ball from '../../images/favicon.svg';
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
        console.log(ipData);
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
        {loading && !ipInfo && (
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
        {ipInfo && <IpInfo ipInfo={ipInfo} />}
        <DevMenu
          setLoading={setLoading}
          setError={setError}
          setipInfo={setipInfo}
          setRerender={setRerender}
        />
      </section>
    </div>
  );
}

export default App;
