import DataProvider from '@bbfe/data-provider';

let id = 0;
let ajax = new DataProvider({
  timeout: 5000,
  requestIdResolver: function(options) {
    return options.method === 'GET' ? JSON.stringify({ options }) : id++;
  }
});

const request = async (url, method, body) => {
  let query = {};
  if(method == 'get') {
    query = body;
  }
  let options = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    options.body = body;
  }
  if (query) {
    options.query = query;
  }

  let result = await ajax.request(options);
  return result.json();
};

const interceptors = {
  addRequestInterceptor: ajax.addRequestInterceptor,
  addResponseInterceptor: ajax.addResponseInterceptor
};

export default { request, interceptors };
