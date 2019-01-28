// TODO: any type 없애기

import Config from "react-native-config";

const API_ROOT = Config.BASE_URL;

const handleErrors = (err: any) => {
  if (err && err.response && err.response.status === 401) {
    // authStore.logout();
  }
  return err;
};

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10 * 10000
    });
  });

const getQueryString = (params: any) =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

const requests = {
  del: (url: string) =>
    fetch(`${API_ROOT}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res: any) => res.jsonBody())
      .catch(handleErrors),
  get: (token: string, url: string) =>
    fetch(`${API_ROOT}${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res: any) => res.jsonBody())
      .catch(handleErrors),
  getWithQuery: (token: string, url: string, query: any) =>
    fetch(`${API_ROOT}${url}?${getQueryString(query)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(handleErrors),
  post: (token: string, url: string, body: Object) =>
    fetch(`${API_ROOT}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(handleErrors),
  put: (url: string, body: Object) =>
    fetch(`${API_ROOT}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(handleErrors)
};

export default {
  requests
};
