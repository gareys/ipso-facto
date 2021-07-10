import React from 'react';
import { IPInfo } from '../../services/ipService';

type Props = {
  setipInfo: (value: React.SetStateAction<IPInfo | undefined>) => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setError: (value: React.SetStateAction<boolean>) => void;
  setRerender: (value: React.SetStateAction<boolean>) => void;
};

export const DevMenu = ({
  setipInfo,
  setLoading,
  setError,
  setRerender,
}: Props) => (
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
);
