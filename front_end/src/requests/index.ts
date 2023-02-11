import axios, { AxiosRequestConfig } from "axios";
const instance = axios.create({
    baseURL:"http://localhost:3000",
    timeout: 20000
})
instance.interceptors.request.use(
    config=>config,
    err=>{Promise.reject(err)}
)
instance.interceptors.response.use(
    res=>res.data,
    err=>{Promise.reject(err)}
)
export default instance