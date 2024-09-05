import {createContext, useContext, useState} from "react";
import {apiClient} from "../api/ApiClient";
import {executeJwtAuthenticationServices} from "../api/AuthenticationApiService";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}) {

    const [username, setUsername] = useState(null)
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if (username === 'complex' && password === 'Password') {
    //         setUsername(username)
    //         setAuthenticated(true)
    //         return true
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async function login(username, password) {
    //
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
    //
    //     try {
    //         const response = await executeBasicAuthenticationServices(baToken)
    //         if (response.status === 200) {
    //             setUsername(username)
    //             setAuthenticated(true)
    //             setToken(baToken)
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     config.headers.Authorization= baToken
    //                     return config
    //                 }
    //             )
    //
    //             return true
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch (error) {
    //         logout()
    //         return false
    //     }
    // }

    async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try {
            const response = await executeJwtAuthenticationServices(username,password)
            if (response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token
                setUsername(username)
                setAuthenticated(true)
                setToken(jwtToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization= jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}