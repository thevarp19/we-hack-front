import {
    applyJwtAuth,
    configureRefreshRetry,
    createAxiosWithBaseUrl,
} from "./helper";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const axios = createAxiosWithBaseUrl(baseURL);
const axiosAuthorized = createAxiosWithBaseUrl(baseURL);

applyJwtAuth(axiosAuthorized);
configureRefreshRetry(axiosAuthorized);

export { axios, axiosAuthorized };
