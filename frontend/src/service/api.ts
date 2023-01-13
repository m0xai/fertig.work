const headers = {
  Authorization: 'Basic ' + btoa('user:password'),
  'Access-Control-Allow-Origin': '*',
};

export const fetcher = (url: string) =>
  fetch(url, { headers: headers }).then((r: Response) => {
    if (r.status === 500) {
      throw new Error('Hata 500');
    }
    if (r.status === 404) {
      throw new Error('Hata 404');
    }
    if (!r.ok) {
      throw new Error('Something went wrong!');
    }

    return r.json();
  });
