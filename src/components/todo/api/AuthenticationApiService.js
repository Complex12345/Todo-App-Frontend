import {apiClient} from "./ApiClient";

export const executeBasicAuthenticationServices
    = (token) => apiClient.get('/basicauth', {
    headers: {
        Authorization: token
    }

})

export const executeJwtAuthenticationServices
    = (username, password) => apiClient.post('/authenticate'
    , {username, password}
)