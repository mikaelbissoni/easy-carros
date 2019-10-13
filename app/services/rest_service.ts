import fetch from 'isomorphic-unfetch';

const dev = process.env.NODE_ENV !== 'production';

const baseURL = (url: string) => {
  const baseURL = dev ? process.env.devURL : process.env.prodURL;
  const result = (baseURL) ? `${baseURL + url}` : `${url}`;
  return result;
}

export const post = async (url: string, data: any) => {
  const res = await fetch(baseURL(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  return result;
};

export const get = async (url: string, config: {}) => {
  const res = await fetch(baseURL(url), config);

  const result = await res.json();
  return result;
};