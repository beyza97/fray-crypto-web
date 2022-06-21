import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import configData from "../config.json";
import { useHistory } from 'react-router-dom'


const baseURL = configData.ApiUrl;

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext)
    const history = useHistory()
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access_token}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access_token);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        var bodyFormData = new FormData();
        bodyFormData.append('refresh_token', authTokens.refresh_token);
        bodyFormData.append('grant_type', 'refresh_token');
        bodyFormData.append('client_id', '3da4385d-5166-4c1f-9c4b-49afe82be47e');
        bodyFormData.append('client_secret', '123456');
        const response = await axios.post(`${configData.ApiUrl}/token`, bodyFormData);
        localStorage.setItem('authTokens', JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access_token));

        req.headers.Authorization = `Bearer ${response.data.access_token}`
        return req
    })

    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        async err => {
            const originalRequest = err.config;
            if (err.response.status === 403){
                history.push('/packages');
            }

            if (err.response.status === 401 && originalRequest.url === `${configData.ApiUrl}/token`) {
                logoutUser();
                return Promise.reject(err);
            }

            if (err.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                var bodyFormData = new FormData();
                bodyFormData.append('refresh_token', authTokens.refresh_token);
                bodyFormData.append('grant_type', 'refresh_token');
                bodyFormData.append('client_id', '3da4385d-5166-4c1f-9c4b-49afe82be47e');
                bodyFormData.append('client_secret', '123456');
                const response = await axios.post(`${configData.ApiUrl}/token`, bodyFormData);
                if (response.status === 200) {
                    localStorage.setItem('authTokens', JSON.stringify(response.data));

                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access_token));

                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
                    return axios(originalRequest);
                }
                else {
                    logoutUser();
                }
            }
        }
    );

    return axiosInstance
}

export default useAxios;