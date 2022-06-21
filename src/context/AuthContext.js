import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import configData from "../config.json";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [userStatus, setUserStatus] = useState("Default");
    const history = useHistory()

    let loginUser = async (e) => {
        e.preventDefault()
        setUserStatus("Default");
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                setUserStatus("Unauthorized");
            }
            return error;
        });
        var bodyFormData = new FormData();
        bodyFormData.append('username', e.target.email.value);
        bodyFormData.append('password', e.target.password.value);
        bodyFormData.append('grant_type', 'password');
        bodyFormData.append('client_id', '3da4385d-5166-4c1f-9c4b-49afe82be47e');
        bodyFormData.append('client_secret', '123456');
        try {
            let response = await axios.post(`${configData.ApiUrl}/token`, bodyFormData);

            if (response.status === 200) {
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access_token))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                setUserStatus("Authorized");
                history.push('/')
            } else {
                setUserStatus("Unauthorized");
            }
        } catch (error) {
            setUserStatus("Unauthorized");
        }

    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        userStatus: userStatus,
    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.access_token))
        }
        setLoading(false)


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
