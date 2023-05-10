import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let context = window.location.hostname;
const getContext = () => {
  console.log("DEBUG LOGIN", process.env.VUE_APP_TENANT_NAME);
  if (context.indexOf("localhost") >= 0) {
    return process.env.VUE_APP_API_URL_DEV;
  } else {
    return process.env.VUE_APP_API_URL_PROD;
  }
};

let URL_CTX_API = getContext();
console.log(location);
console.log(URL_CTX_API);
const api = axios.create({
  baseURL: URL_CTX_API,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
