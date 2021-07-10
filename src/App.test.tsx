import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import * as ipServiceModule from './ipService';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  it('toggles display of the loading ball', async () => {
    jest.spyOn(ipServiceModule, 'ipService').mockResolvedValue({
      ip: '1.1.1.1',
      isp: 'FOO ISP',
      city: 'FOO CITY',
      region: 'FOO REGION',
      postal_code: 'FOO POSTAL CODE',
    });
    const { getByText, getByTestId, queryByTestId } = await render(<App />);

    expect(queryByTestId('loading-ball')).not.toBeNull();
    await waitFor(() => getByText('1.1.1.1'));
    expect(queryByTestId('loading-ball')).toBeNull();
  });

  it('displays the IP address', async () => {
    jest.spyOn(ipServiceModule, 'ipService').mockResolvedValue({
      ip: '1.1.1.1',
      isp: 'FOO ISP',
      city: 'FOO CITY',
      region: 'FOO REGION',
      postal_code: 'FOO POSTAL CODE',
    });
    const { getByText, getByTestId } = render(<App />);
    await waitFor(() => getByText('1.1.1.1'));

    expect(getByTestId('ip-address').textContent).toBe('1.1.1.1');
    expect(getByTestId('isp').textContent).toBe('FOO ISP');
    expect(getByTestId('location').textContent).toBe(
      'FOO CITY, FOO REGION FOO POSTAL CODE'
    );
  });

  it('truncates and displays a long IPv6 address', async () => {
    jest.spyOn(ipServiceModule, 'ipService').mockResolvedValue({
      ip: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      isp: 'FOO ISP',
      city: 'FOO CITY',
      region: 'FOO REGION',
      postal_code: 'FOO POSTAL CODE',
    });
    const { getByText, getByTestId, getByTitle } = render(<App />);
    await waitFor(() => getByText('2001:0db8:85...'));

    expect(getByTestId('ip-address').textContent).toBe('2001:0db8:85...');
    expect(getByTitle('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeDefined();
    expect(getByTestId('isp').textContent).toBe('FOO ISP');
    expect(getByTestId('location').textContent).toBe(
      'FOO CITY, FOO REGION FOO POSTAL CODE'
    );
  });

  it('displays the error gif when ip data fails', async () => {
    jest.spyOn(ipServiceModule, 'ipService').mockRejectedValue('FOO ERROR');
    const { getByTestId } = render(<App />);

    await waitFor(() => getByTestId('error-gif'));

    expect(getByTestId('error-text')).not.toBeUndefined();
  });
});
