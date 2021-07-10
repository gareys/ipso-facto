import React from 'react';
import { IPInfo } from '../../services/ipService';
import ball from '../../images/favicon.svg';

export const IpInfo = ({ ipInfo }: { ipInfo: IPInfo }) => (
  <div className="ipInfo">
    <div id="info-left">
      <h1 data-testid="ip-address">
        {ipInfo.ip.length > 15 ? (
          <abbr title={ipInfo.ip}>{ipInfo.ip.slice(0, 12)}...</abbr>
        ) : (
          <>{ipInfo.ip}</>
        )}
      </h1>
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
      <img data-testid="ball" src={ball} id="info-ball" className="ball" />
    </div>
  </div>
);
