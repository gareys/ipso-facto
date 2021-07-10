export type IPInfo = {
  ip: string;
  isp: string;
  city: string;
  region: string;
  postal_code: string;
};

export const ipService = async (): Promise<IPInfo> => {
  const fetchRes = await fetch('https://json.geoiplookup.io/');
  return await fetchRes.json();
};
